import React, { useState } from "react";
import { createWallet, getAddress, getBalance } from "permawebjs/wallet";
import { usePWebContext } from "~/context/pweb";

// const ENVIRONMENT = "local";

const WalletManager: React.FC = () => {
  const { wallet, setWallet, env } = usePWebContext();

  const [derivedAddress, setDerivedAddress] = useState<string>("null");
  const [balance, setBalance] = useState<string>("");

  const [clicked, setClicked] = useState<boolean>(false);
  const [clickedAddress, setClickedAddress] = useState<boolean>(false);
  const [clickedBalance, setClickedBalance] = useState<boolean>(false);

  const newWallet = async () => {
    try {
      console.log("Calling createWallet()");
      const wallet = await createWallet({
        seedPhrase: true,
        environment: env === "mainnet" ? "mainnet" : "local",
      });
      setWallet(wallet);
    } catch {
      console.log("Couldn't create new wallet");
    }
  };

  const checkAddress = async () => {
    try {
      console.log("Calling getAddress()");
      const checkedAddress = await getAddress({
        key: wallet
          ? wallet.key
          : {
              kty: "",
              e: "",
              n: "",
            },
        environment: env === "mainnet" ? "mainnet" : "local",
      });
      setDerivedAddress(checkedAddress);
      //   setClickedBalance(false);
    } catch {
      console.log("Couldn't derive wallet address");
    }
  };

  const checkBalance = async () => {
    try {
      console.log("Calling getBalance()");
      const balanceChecked = await getBalance({
        address: wallet ? wallet.walletAddress : "",
        environment: env === "mainnet" ? "mainnet" : "local",
      });
      setBalance(balanceChecked);
      //   setClickedBalance(false);
    } catch {
      console.log("Couldn't create new wallet");
    }
  };

  return (
    <div className="container mx-auto mt-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* createWallet() */}
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
        <div className="col-span-1">
          {clicked && (
            <div className="card rounded-lg bg-base-200 p-4">
              {!wallet && <progress className="progress w-56"></progress>}
              {wallet && (
                <>
                  <p className="w-64">
                    Your new wallet:&nbsp;
                    <strong className="break-all">
                      {wallet.walletAddress}
                    </strong>
                  </p>
                  {/* {wallet.seedPhrase && (
                    <p className="mb-2 w-64">
                      Your wallet seed phrase is:
                      <br />
                      <code>{wallet.seedPhrase}</code>
                    </p>
                  )} */}
                </>
              )}
            </div>
          )}
        </div>

        {/* getAddress() */}
        <div className="col-span-1">
          <button
            className="btn-primary btn w-full"
            disabled={
              // clickedBalance ||
              wallet ? false : true
            }
            onClick={() => {
              setClickedAddress(true);
              void checkAddress();
            }}
          >
            Get Address
          </button>
        </div>
        <div className="col-span-1">
          {clickedAddress && (
            <div className="card rounded-lg bg-base-200 p-4">
              {!derivedAddress && (
                <progress className="progress w-56"></progress>
              )}
              {derivedAddress && (
                <p className="w-64">
                  Address derived from private key:&nbsp;
                  <strong className="break-all">{derivedAddress}</strong>
                </p>
              )}
            </div>
          )}
        </div>

        {/* getBalance() */}
        <div className="col-span-1">
          <button
            className="btn-primary btn w-full"
            disabled={
              // clickedBalance ||
              wallet ? false : true
            }
            onClick={() => {
              setClickedBalance(true);
              void checkBalance();
            }}
          >
            Get Balance
          </button>
        </div>
        <div className="col-span-1">
          {clickedBalance && (
            <div className="card rounded-lg bg-base-200 p-4">
              {!balance && <progress className="progress w-56"></progress>}
              {balance && (
                <p className="w-64">
                  Your balance:&nbsp;
                  <strong className="break-all">{balance}</strong>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletManager;
