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
  env: string;
  setEnv: (env: string) => void;
}

const PWebContext = createContext<IPWebContext>({
  wallet: null,
  setWallet: () => {
    return null;
  },
  env: ENV,
  setEnv: () => {
    return null;
  },
});

export const PWebProvider: React.FC<Props> = ({ children }) => {
  const [wallet, setWallet] = useState<CreateWalletReturnProps | null>(null);
  const [env, setEnv] = useState<string>(ENV);

  return (
    <PWebContext.Provider value={{ wallet, setWallet, env, setEnv }}>
      {children}
    </PWebContext.Provider>
  );
};

export const usePWebContext = () => useContext(PWebContext);
