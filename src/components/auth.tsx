import { useState } from "react";
import { ArConnect } from "permawebjs/auth";

const Auth = () => {
  const [clicked, setClicked] = useState(false);
  const [clickedDisconnect, setClickedDisconnect] = useState(false);
  const [connection, setConnection] = useState(null);

  const connectWallet = async () => {
    try {
      console.log("Calling connect()");
      const response = await ArConnect.connect({
        permissions: ["ACCESS_ADDRESS"],
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
      <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[3rem]">
        Connection
      </h2>
      <div className="container mx-auto mt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* createWallet() */}
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
      </div>
    </>
  );
};
export default Auth;
