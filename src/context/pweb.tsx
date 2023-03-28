// app/context/theme.js

"use client";
import { type CreateWalletReturnProps } from "permawebjs/dist/types/wallet";
import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}
interface IPWebContext {
  wallet: CreateWalletReturnProps | null;
  setWallet: (wallet: CreateWalletReturnProps | null) => void;
}

const defaultState = {
  wallet: null,
  setWallet: () => {
    return null;
  },
};

const PWebContext = createContext<IPWebContext>(defaultState);

export const PWebProvider: React.FC<Props> = ({ children }) => {
  const [wallet, setWallet] = useState<CreateWalletReturnProps | null>(
    defaultState.wallet
  );

  return (
    <PWebContext.Provider value={{ wallet, setWallet }}>
      {children}
    </PWebContext.Provider>
  );
};

export const usePWebContext = () => useContext(PWebContext);
