import React from "react";

interface UserProvider {
  name: string;
  isCompany: boolean;
  companyId?: number;
  workerId?: number;
  address: string;
  domain: string;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setIsCompany: (value: boolean) => void;
  setCompanyId: (value: number) => void;
  setWorkerId: (value: number) => void;
  setDomain: (domain: string) => void;
}

const UserContext = React.createContext<UserProvider>({
  name: "",
  isCompany: false,
  address: "",
  domain: "",
  setName: (name: string) => {
    return;
  },
  setIsCompany: (value: boolean) => {
    return;
  },
  setCompanyId: (value: number) => {
    return;
  },
  setWorkerId: (value: number) => {
    return;
  },
  setAddress: (name: string) => {
    return;
  },
  setDomain: (name: string) => {
    return;
  },
});

export default UserContext;
