import React, { useState } from "react";
import { createWallet, getAddress, getBalance } from "permawebjs/wallet";
import { usePWebContext } from "~/context/pweb";

// const ENVIRONMENT = "local";

const WalletManager: React.FC = () => {
  const { wallet, setWallet, env } = usePWebContext();

  const [derivedAddress, setDerivedAddress] = useState<string>("");
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
        options: {
          winston: true,
        },
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
                    You are using a new wallet
                    <div className="dropdown dropdown-bottom">
                      <label
                        tabIndex={0}
                        className="btn-ghost btn-xs btn-circle btn text-info"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </label>
                      <div
                        tabIndex={0}
                        className="card dropdown-content compact rounded-box w-64 bg-base-100 shadow"
                      >
                        <div className="card-body">
                          <h2 className="card-title">Wallet Info</h2>
                          <p>
                            Address:{" "}
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
                        </div>
                      </div>
                    </div>
                  </p>
                  <button
                    className="btn-outline btn-sm btn w-full"
                    disabled={!clicked}
                    onClick={() => {
                      setClicked(false);
                      setClickedAddress(false);
                      setClickedBalance(false);
                      setDerivedAddress("");
                      setBalance("");
                      setWallet(null);
                    }}
                  >
                    Discard
                  </button>
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
          {wallet && clickedBalance && (
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
