import axios from "axios";

export interface IDNSRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export interface IDNSQueryResponse {
  AD: boolean; // if response is validated with DNSSEC,
  Answer: IDNSRecord[];
}

export enum EthereumNetworks {
  homestead = "1",
  ropsten = "3",
  rinkeby = "4",
}

export interface DNSTextRecord {
  type: string;
  net: string;
  netId: EthereumNetworks;
  addr: string;
  dnssec?: boolean;
}

export const queryDns = async (domain: string): Promise<IDNSQueryResponse> => {
  const { data } = await axios.get<IDNSQueryResponse>(
    `https://dns.google/resolve?name=${domain}&type=TXT`
  );
  return data;
};

/**
 * Returns true for strings that are payrollah records
 * @param txtDataString e.g: '"payrollah net=ethereum netId=3 addr=0x87CB17B6d1745389d27c2fdC49560E74E126E2B9"'
 */
const isPayrollahRecord = (txtDataString: string) => {
  return txtDataString.startsWith("payrollah");
};

const trimValue = (str: string) => {
  return str.endsWith(";")
    ? str.substring(0, str.length - 1).trim()
    : str.trim();
};

/**
 * Adds key: value into object
 * @param obj Object that string will be added to
 * @param keyValuePair Takes string in the format of "key=value"
 * @example addKeyValuePair(objectToModify, "foo=bar")
 */
const addKeyValuePair = (obj: any, keyValuePair: string): any => {
  const [key, ...values] = keyValuePair.split("=");
  const value = values.join("="); // in case there were values with = in them
  /* eslint-disable no-param-reassign */
  // this is necessary because we modify the accumulator in .reduce
  obj[key.trim()] = trimValue(value);
  return obj;
};

/**
 * Parses one DNS-TXT record into DNSTextRecord
 * @param record e.g: '"payrollah net=ethereum netId=3 addr=0x87CB17B6d1745389d27c2fdC49560E74E126E2B9"'
 */
export const parseRecord = (record: string): DNSTextRecord => {
  const keyValuePairs = record.trim().split(" "); // tokenize into key=value elements
  const recordObject = {} as DNSTextRecord;
  const type = keyValuePairs.shift() || ""; // remove payrollah string first
  recordObject.type = type;
  keyValuePairs.reduce<DNSTextRecord>(addKeyValuePair, recordObject);
  return recordObject;
};

/**
 * Apply given dnssec result to each record
 * @param dnssec Boolean dependent on if dns sec was used
 */
const applyDnssecResults = <T>(dnssec: boolean) => (record: T): T => {
  return { ...record, dnssec };
};

/**
 * Takes a record set and breaks that info array of key value pairs
 * @param recordSet e.g: [{name: "google.com", type: 16, TTL: 3599, data: '"payrollah net=ethereum netId=3 addr=0x87CB17B6d1745389d27c2fdC49560E74E126E2B9"'}]
 */
const parseRecords = (
  recordSet: IDNSRecord[] = [],
  dnssec: boolean
): DNSTextRecord[] => {
  return recordSet
    .map((record) => record.data)
    .map((record) => record.slice(1, -1)) // removing leading and trailing quotes
    .filter(isPayrollahRecord)
    .map(parseRecord)
    .map(applyDnssecResults(dnssec));
};

/**
 * Queries a given domain and parses the results to retrieve payrollah record
 * @param domain Domain Name e.g: "payrollah.netlify.com"
 */
export const getRecords = async (domain: string): Promise<DNSTextRecord[]> => {
  const results = await queryDns(domain);
  const answers = results.Answer || [];
  return parseRecords(answers, results.AD);
};

/**
 * Verifies if record from domain and address is same
 * @param domain Domain Name e.g: "payrollah.netlify.com"
 * @param address Wallet Address of company in question e.g: "0x87CB17B6d1745389d27c2fdC49560E74E126E2B9"
 */
export const verifyAddress = async (
  domain: string,
  address: string,
  net = "ethereum",
  netId: EthereumNetworks = EthereumNetworks.ropsten
): Promise<boolean> => {
  const records = await getRecords(domain);
  const filteredRecords = records.filter(
    (record) => record.net === net && record.netId === netId
  );
  const validAddress = filteredRecords.map((record) => record.addr, []);
  return validAddress.includes(address);
};

// Example for kris
// const isVerified = await verifyAddress(
//   "jszh.me",
//   "0x87CB17B6d1745389d27c2fdC49560E74E126E2B9"
// );
