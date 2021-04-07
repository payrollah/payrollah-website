import React from "react";

interface UserContext {
  name: string;
  isCompany: boolean;
  companyId?: number;
  workerId?: number;
  address: string;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setIsCompany: (value: boolean) => void;
  setCompanyId: (value: number) => void;
  setWorkerId: (value: number) => void;
}

const UserContext = React.createContext<UserContext>({
  name: "",
  isCompany: false,
  address: "",
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
});

export default UserContext;
