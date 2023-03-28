import React, { useState } from "react";
import { createWallet } from "permawebjs/wallet";
import { type CreateWalletReturnProps } from "permawebjs/dist/types/wallet";

const WalletManager: React.FC = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [wallet, setWallet] = useState<CreateWalletReturnProps | null>(null);

  const newWallet = async () => {
    try {
      console.log("Calling createWallet()");
      const wallet = await createWallet({
        seedPhrase: true,
        environment: "local",
      });
      setWallet(wallet);
    } catch {
      console.log("Couldn't create new wallet");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-1">
          <button
            className="btn-primary btn w-full"
            disabled={clicked}
            onClick={() => {
              setClicked(true);
              void newWallet();
            }}
          >
            New Wallet
          </button>
        </div>
        {clicked && (
          <div className="col-span-1">
            <div className="card rounded-lg bg-base-200 p-4">
              {!wallet && <progress className="progress w-56"></progress>}
              {wallet && (
                <>
                  <p className="mb-2 w-64">
                    Your wallet address is:
                    <br />
                    <strong className="break-all">{wallet.walletAddress}</strong>
                  </p>
                  {wallet.seedPhrase && (
                    <p className="mb-2 w-64">
                      Your wallet seed phrase is:
                      <br />
                      <code>{wallet.seedPhrase}</code>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletManager;
