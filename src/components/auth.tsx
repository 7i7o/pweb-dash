import { useEffect, useReducer, useState } from "react";
import { ArConnect } from "permawebjs/auth";

type Permissions =
  | "ACCESS_ADDRESS"
  | "ACCESS_PUBLIC_KEY"
  | "ACCESS_ALL_ADDRESSES"
  | "SIGN_TRANSACTION"
  | "DISPATCH"
  | "ENCRYPT"
  | "DECRYPT"
  | "SIGNATURE"
  | "ACCESS_ARWEAVE_CONFIG";

const PERMS: Permissions[] = [
  "ACCESS_ADDRESS",
  "ACCESS_PUBLIC_KEY",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION",
  "DISPATCH",
  "ENCRYPT",
  "DECRYPT",
  "SIGNATURE",
  "ACCESS_ARWEAVE_CONFIG",
];

enum ActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
  ADD_ALL = "ADD_ALL",
  REMOVE_ALL = "REMOVE_ALL",
}

interface Action {
  type: ActionType;
  payload: Permissions;
}

interface State {
  perms: Permissions[];
}

const Auth = () => {
  const [hasArConnect, setHasArConnect] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clickedDisconnect, setClickedDisconnect] = useState(false);
  const [activeAddress, setActiveAddress] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [walletNames, setWalletNames] = useState([]);
  const [allAddresses, setAllAddresses] = useState([]);
  const [activePublicKey, setActivePublicKey] = useState([]);

  useEffect(() => {
    async function checkInstalled() {
      console.log("Calling isInstalled()");

      const response = await ArConnect.isInstalled();
      console.log(response);

      setHasArConnect(response);
    }
    void checkInstalled();
  }, []);

  const permissionsReducer = (prevState: State, action: Action): State => {
    const { type, payload } = action;
    switch (type) {
      case ActionType.ADD:
        return {
          ...prevState,
          perms: [payload, ...prevState.perms],
        };
      case ActionType.REMOVE:
        return {
          ...prevState,
          perms: prevState.perms.filter((e) => e !== payload),
        };
      case ActionType.ADD_ALL:
        return {
          perms: PERMS,
        };
      case ActionType.REMOVE_ALL:
        return {
          perms: [],
        };
      default:
        return prevState;
    }
  };
  const [state, dispatch] = useReducer(permissionsReducer, { perms: [] });

  const connectWallet = async () => {
    try {
      console.log("Calling connect()");
      const response = await ArConnect.connect({
        permissions: state.perms,
        appInfo: { name: "PermaWebJS Dash" },
      });
      console.log(JSON.stringify(response));

      //   setConnection(response);
      setClicked(false);
    } catch (err) {
      console.log("Couldn't connect wallet");
      console.log(err);
      setClicked(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      console.log("Calling disconnect()");
      const response = await ArConnect.disconnect();
      console.log(JSON.stringify(response));

      //   setConnection(response);
      setActiveAddress("");
      setPermissions([]);
      setWalletNames([]);
      setAllAddresses([]);
      setActivePublicKey([]);
      setClickedDisconnect(false);
    } catch (err) {
      console.log("Couldn't disconnect wallet");
      console.log(err);
      setClickedDisconnect(false);
    }
  };

  const getActiveAddress = async () => {
    try {
      console.log("Calling getActiveAddress()");
      const response = await ArConnect.getActiveAddress();
      console.log(JSON.stringify(response));
      setActiveAddress(response);
    } catch (err) {
      console.log("Couldn't getActiveAddress");
      setActiveAddress("");
      console.log(err);
    }
  };
  const getPermissions = async () => {
    try {
      console.log("Calling getPermissions()");
      const response = await ArConnect.getPermissions();
      console.log(JSON.stringify(response));
      setPermissions(response);
    } catch (err) {
      console.log("Couldn't getPermissions");
      setPermissions([]);
      console.log(err);
    }
  };
  const getWalletNames = async () => {
    try {
      console.log("Calling getWalletNames()");
      const response = await ArConnect.getWalletNames();
      console.log(JSON.stringify(response));
      setWalletNames(response);
    } catch (err) {
      console.log("Couldn't getWalletNames");
      setWalletNames([]);
      console.log(err);
    }
  };
  const getAllAddresses = async () => {
    try {
      console.log("Calling getAllAddresses()");
      const response = await ArConnect.getAllAddresses();
      console.log(JSON.stringify(response));
      setAllAddresses(response);
    } catch (err) {
      console.log("Couldn't getAllAddresses");
      setAllAddresses([]);
      console.log(err);
    }
  };
  const getActivePublicKey = async () => {
    try {
      console.log("Calling getActivePublicKey()");
      const response = await ArConnect.getActivePublicKey();
      console.log(JSON.stringify(response));
      setActivePublicKey(response);
    } catch (err) {
      console.log("Couldn't getActivePublicKey");
      setActivePublicKey([]);
      console.log(err);
    }
  };

  return (
    <>
      {!hasArConnect && (
        <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[2rem]">
          Install or enable ArConnect to continue
        </h2>
      )}
      {hasArConnect && (
        <>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[3rem]">
            Connection
          </h2>
          <div className="container mx-auto mt-0">
            <>
              <h3 className="text-xl font-extrabold tracking-tight text-gray-300 drop-shadow-md sm:text-[1rem]">
                Permissions
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
                {/* <div className="col-span-2">{JSON.stringify(state.perms)}</div> */}
                <div className="form-control col-span-2">
                  <div className="grid w-fit grid-cols-2 gap-x-32 gap-y-3">
                    <label
                      className="label col-span-1 flex cursor-pointer flex-row items-start"
                      key={-1}
                    >
                      <span className="drop-shadow-xs label-text text-left text-white">
                        All Permissions
                      </span>
                      <input
                        type="checkbox"
                        checked={state.perms.length === PERMS.length}
                        className="checkbox-primary checkbox ml-2"
                        onChange={(e) => {
                          dispatch({
                            type: e.target.checked
                              ? ActionType.ADD_ALL
                              : ActionType.REMOVE_ALL,
                            payload: "ACCESS_ADDRESS",
                          });
                        }}
                      />
                    </label>

                    {PERMS.map((p, i) => (
                      <label
                        className="label col-span-1 flex cursor-pointer flex-row items-start"
                        key={i}
                      >
                        <span className="drop-shadow-xs label-text text-left text-white">
                          {p}
                        </span>
                        <input
                          type="checkbox"
                          checked={state.perms.includes(p)}
                          className="checkbox-primary checkbox ml-2"
                          onChange={(e) => {
                            dispatch({
                              type: e.target.checked
                                ? ActionType.ADD
                                : ActionType.REMOVE,
                              payload: p,
                            });
                          }}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-1">
                  <button
                    className="btn-primary btn w-full"
                    disabled={clicked}
                    onClick={() => {
                      setClicked(true);
                      void connectWallet();
                    }}
                  >
                    Connect
                  </button>
                </div>
                <div className="col-span-1">
                  <button
                    className="btn-outline btn w-full"
                    disabled={clickedDisconnect}
                    onClick={() => {
                      setClickedDisconnect(true);
                      void disconnectWallet();
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[3rem]">
            Check Connection Permissions
          </h2>
          <div className="container mx-auto mt-0">
            <>
              <h3 className="text-xl font-extrabold tracking-tight text-gray-300 drop-shadow-md sm:text-[1rem]">
                getActiveAddress
              </h3>
              <div className="grid grid-cols-2 items-center gap-6 md:grid-cols-2">
                <div className="col-span-1">
                  <button
                    className="btn-primary btn w-full"
                    disabled={clicked}
                    onClick={() => {
                      void getActiveAddress();
                    }}
                  >
                    getActiveAddress
                  </button>
                </div>
                <div className="col-span-1">
                  <span className="font-bold text-white drop-shadow-sm">
                    {activeAddress}
                  </span>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-extrabold tracking-tight text-gray-300 drop-shadow-md sm:text-[1rem]">
                getPermissions
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
                <div className="col-span-1">
                  <button
                    className="btn-primary btn w-full"
                    disabled={clicked}
                    onClick={() => {
                      void getPermissions();
                    }}
                  >
                    getPermissions
                  </button>
                </div>
                <div className="col-span-1">
                  <span className="font-bold text-white drop-shadow-sm">
                    {permissions.length ? JSON.stringify(permissions) : ""}
                  </span>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-extrabold tracking-tight text-gray-300 drop-shadow-md sm:text-[1rem]">
                getWalletNames
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
                <div className="col-span-1">
                  <button
                    className="btn-primary btn w-full"
                    disabled={clicked}
                    onClick={() => {
                      void getWalletNames();
                    }}
                  >
                    getwalletNames
                  </button>
                </div>
                <div className="col-span-1">
                  <span className="font-bold text-white drop-shadow-sm">
                    {walletNames.length ? JSON.stringify(walletNames) : ""}
                  </span>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-extrabold tracking-tight text-gray-300 drop-shadow-md sm:text-[1rem]">
                getAllAddresses
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
                <div className="col-span-1">
                  <button
                    className="btn-primary btn w-full"
                    disabled={clicked}
                    onClick={() => {
                      void getAllAddresses();
                    }}
                  >
                    getAllAddresses
                  </button>
                </div>
                <div className="col-span-1">
                  <span className="font-bold text-white drop-shadow-sm">
                    {allAddresses.length ? JSON.stringify(allAddresses) : ""}
                  </span>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-extrabold tracking-tight text-gray-300 drop-shadow-md sm:text-[1rem]">
                getActivePublicKey
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
                <div className="col-span-1">
                  <button
                    className="btn-primary btn w-full"
                    disabled={clicked}
                    onClick={() => {
                      void getActivePublicKey();
                    }}
                  >
                    getActivePublicKey
                  </button>
                </div>
                <div className="col-span-1">
                  <span className="font-bold text-white drop-shadow-sm">
                    {activePublicKey.length
                      ? JSON.stringify(activePublicKey)
                      : ""}
                  </span>
                </div>
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
};

export default Auth;
