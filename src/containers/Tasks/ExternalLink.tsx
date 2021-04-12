import React from "react";

interface ExternalLinkProps {
  name: string;
  href: string;
}

interface ExternalLinkEtherscanAddressProps {
  name: string;
  address: string;
}

const ETHERSCAN_BASE_URL = `https://ropsten.etherscan.io/`;

export const makeEtherscanAddressURL = (address: string): string => {
  return `${ETHERSCAN_BASE_URL}address/${address}`;
};

export const ExternalLink: React.FunctionComponent<ExternalLinkProps> = ({
  name,
  href,
}: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  );
};

export const ExternalLinkEtherscanAddress: React.FunctionComponent<ExternalLinkEtherscanAddressProps> = ({
  name,
  address,
}: ExternalLinkEtherscanAddressProps) => {
  const href = makeEtherscanAddressURL(address);

  return <ExternalLink name={name} href={href} />;
};
