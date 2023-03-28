// app/context/theme.js

"use client";
import { type CreateWalletReturnProps } from "permawebjs/dist/types/wallet";
import React, { createContext, useContext, useState } from "react";

const ENV = "local";
// const ENV = "mainnet";
interface Props {
  children: React.ReactNode;
}
interface IPWebContext {
  wallet: CreateWalletReturnProps | null;
  setWallet: (wallet: CreateWalletReturnProps | null) => void;
  environment: "local" | "mainnnet";
}

const PWebContext = createContext<IPWebContext>({
  wallet: null,
  setWallet: () => {
    return null;
  },
  environment: ENV,
});

export const PWebProvider: React.FC<Props> = ({ children }) => {
  const [wallet, setWallet] = useState<CreateWalletReturnProps | null>(null);

  return (
    <PWebContext.Provider value={{ wallet, setWallet, environment: ENV }}>
      {children}
    </PWebContext.Provider>
  );
};

export const usePWebContext = () => useContext(PWebContext);
