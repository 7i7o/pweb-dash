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
  //   const [connection, setConnection] = useState(null);

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
      setClickedDisconnect(false);
    } catch (err) {
      console.log("Couldn't disconnect wallet");
      console.log(err);
      setClickedDisconnect(false);
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
                  <div className="grid w-fit grid-cols-3 gap-x-32 gap-y-3 ">
                    {PERMS.map((p, i) => (
                      <label
                        className="label col-span-1 flex cursor-pointer flex-row items-start"
                        key={i}
                      >
                        <input
                          type="checkbox"
                          checked={state.perms.includes(p)}
                          className="checkbox-primary checkbox"
                          onChange={(e) => {
                            dispatch({
                              type: e.target.checked
                                ? ActionType.ADD
                                : ActionType.REMOVE,
                              payload: p,
                            });
                          }}
                        />
                        <span className="label-text">{p}</span>
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
        </>
      )}
    </>
  );
};

export default Auth;
