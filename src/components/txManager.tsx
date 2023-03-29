import React, { useState } from "react";
import { usePWebContext } from "~/context/pweb";
import {
  createTransaction,
  postTransaction,
  signTransaction,
} from "permawebjs/transaction";

// const ENVIRONMENT = "local";
const TARGET_ADDRESS = "g8ZQPMSUnp-cqhMmRW5aSVa2GGop_yRQ0xyZ5DeIaBk";

const TxManager: React.FC = () => {
  const { wallet, env } = usePWebContext();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [tx, setTx] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [signedTx, setSignedTx] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [postedTx, setPostedTx] = useState<any | null>(null);
  const [clickedCreate, setClickedCreate] = useState<boolean>(false);
  const [clickedSign, setClickedSign] = useState<boolean>(false);
  const [clickedPost, setClickedPost] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [target, setTarget] = useState<string>(TARGET_ADDRESS);

  const createTx = async () => {
    try {
      console.log("Calling createTransaction()");
      const txPromise = await createTransaction({
        type: "wallet",
        quantity: amount,
        target: TARGET_ADDRESS,
        key: wallet
          ? wallet.key
          : {
              kty: "",
              e: "",
              n: "",
            },
        environment: env === "mainnet" ? "mainnet" : "local",
        // options: {
        //   signAndPost: true,
        // },
      });
      setTx(txPromise);
    } catch {
      console.log("Couldn't create new wallet");
    }
  };

  const signTx = async () => {
    try {
      console.log("Calling signTransaction()");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const signPromise = await signTransaction({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createdTransaction: tx,
        key: wallet
          ? wallet.key
          : {
              kty: "",
              e: "",
              n: "",
            },
        environment: env === "mainnet" ? "mainnet" : "local",
      });
      setSignedTx(signPromise);
    } catch {
      console.log("Couldn't create new wallet");
    }
  };

  const postTx = async () => {
    try {
      console.log("Calling postTransaction()");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const postPromise = await postTransaction({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        transaction: signedTx,
        key: wallet
          ? wallet.key
          : {
              kty: "",
              e: "",
              n: "",
            },
        environment: env === "mainnet" ? "mainnet" : "local",
      });
      setPostedTx(postPromise);
    } catch {
      console.log("Couldn't post transaction");
    }
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let result = e.target.value.replace(/\D/g, "");
    if (result) {
      result = `${parseInt(result)}`;
    }
    setAmount(result);
  };

  const handleTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value);
  };

  return (
    <div className="container mx-auto mt-0">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {/* createTransaction() */}
        <div className="form-control col-span-1 w-full max-w-xs">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="text"
            disabled={!wallet || clickedCreate}
            placeholder="Amount"
            className="input-bordered input-primary input w-full max-w-xs"
            id="amount"
            onChange={handleAmount}
            value={amount}
          />
        </div>
        <div className="cols-span-1 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Target Address</span>
          </label>
          <input
            type="text"
            disabled={!wallet || clickedCreate}
            placeholder="Target Address"
            className="input-bordered input-primary input w-full max-w-xs"
            id="target"
            onChange={handleTarget}
            value={target}
          />
        </div>
        <div className="form-control col-span-2 w-full max-w-xs">
          <label className="label">
            <span className="label-text">&nbsp;</span>
          </label>
          <button
            className="btn-primary btn w-full"
            disabled={
              !wallet || clickedCreate || !amount || parseInt(amount) < 1
            }
            onClick={() => {
              setClickedCreate(true);
              void createTx();
            }}
          >
            Create Tx (Transfer {amount}&nbsp;Winston
            {amount ? (parseInt(amount) > 1 ? "s" : "") : ""})
          </button>
        </div>
        <div className="col-span-4">
          {clickedCreate && (
            <div className="card rounded-lg bg-base-200 p-4">
              {!tx && <progress className="progress w-56"></progress>}
              {tx && (
                <div className="grid grid-cols-2 gap-1">
                  {!clickedSign && (
                    <button
                      className="btn col-span-1 mx-1 w-full"
                      disabled={!wallet || !clickedCreate || !tx}
                      onClick={() => {
                        setClickedCreate(false);
                        // setAmount("0");
                      }}
                    >
                      Reset
                    </button>
                  )}
                  {!clickedSign && (
                    <button
                      className="btn-primary btn col-span-1 mx-1 w-full"
                      disabled={!wallet || !clickedCreate || !tx}
                      onClick={() => {
                        setClickedSign(true);
                        void signTx();
                      }}
                    >
                      {!clickedSign ? "Sign" : "Post"}
                    </button>
                  )}
                  {clickedSign && (
                    <button
                      className="btn col-span-1 mx-1 w-full"
                      disabled={
                        !wallet ||
                        !clickedCreate ||
                        !tx ||
                        !clickedSign ||
                        !signedTx
                      }
                      onClick={() => {
                        setClickedSign(false);
                        setClickedCreate(false);
                        // setAmount("0");
                      }}
                    >
                      Reset
                    </button>
                  )}
                  {clickedSign && (
                    <button
                      className="btn-primary btn col-span-1 mx-1 w-full"
                      disabled={
                        !wallet ||
                        !clickedCreate ||
                        !tx ||
                        !clickedSign ||
                        !signedTx
                      }
                      onClick={() => {
                        setClickedPost(true);
                        void postTx();
                      }}
                    >
                      Post
                    </button>
                  )}
                  <p className="col-span-2">
                    Tx Id:{" "}
                    <strong className="break-all">
                      {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        tx?.id
                      }
                    </strong>
                    <br />
                    Target:{" "}
                    <strong className="break-all">
                      {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        tx?.target
                      }
                    </strong>
                    <br />
                    Quantity:{" "}
                    <strong className="break-all">
                      {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        tx?.quantity
                      }
                    </strong>
                    <br />
                    Data Size:{" "}
                    <strong className="break-all">
                      {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        tx?.data_size
                      }
                    </strong>
                    <br />
                    Signature:{" "}
                    <strong className="break-all">
                      {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        tx?.signature
                      }
                    </strong>
                    {/* <br />
                    <strong className="break-all">{JSON.stringify(tx)}</strong> */}
                  </p>
                </div>
              )}
            </div>
          )}
          {clickedPost && (
            <div className="card rounded-lg bg-base-200 p-4">
              {!postedTx && <progress className="progress w-56"></progress>}
              {postedTx && (
                <div className="grid grid-cols-2 gap-1">
                  <p className="col-span-2">
                    Your Posted tx:
                    <br />
                    <strong className="break-all">
                      {JSON.stringify(postedTx)}
                    </strong>
                  </p>
                  {/* <button
                    className="btn col-span-1 mx-1 w-full"
                    disabled={
                      !wallet ||
                      !clickedCreate ||
                      !tx ||
                      !clickedSign ||
                      !signedTx
                    }
                    onClick={() => {
                      setClickedSign(false);
                      setClickedCreate(false);
                      // setAmount("0");
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="btn-primary btn col-span-1 mx-1 w-full"
                    disabled={
                      !wallet ||
                      !clickedCreate ||
                      !tx ||
                      !clickedSign ||
                      !signedTx
                    }
                    onClick={() => {
                      setClickedPost(true);
                      void postTx();
                    }}
                  >
                    Post
                  </button> */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TxManager;
