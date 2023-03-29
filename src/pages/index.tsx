import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Auth from "~/components/auth";
import WalletAndTxs from "~/components/walletAndTxs";

const tabs = [
  "Wallet & Txs",
  "Auth (ArConnect)",
  "Smart Contracts",
  "Serverless Functions (EXM)",
];

const Home: NextPage = () => {
  const [active, setActive] = useState<string | undefined>(tabs[0]);

  return (
    <>
      <Head>
        <title>PWeb Dash</title>
        <meta name="description" content="permawebjs testing dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-start justify-start bg-gradient-to-b from-[white] to-[#15162c]">
        <div className="container flex flex-col items-start justify-start gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[5rem]">
            <span className="text-[purple]">PermaWeb</span>
            <span className="text-[white]">JS</span>{" "}
            <span className="text-[purple]">Dash</span>
          </h1>
          <div className="tabs tabs-boxed">
            {tabs.map((tab, i) => {
              return (
                <a
                  className={`tab ${active === tab ? "tab-active" : ""}`}
                  onClick={() => setActive(tab)}
                  key={i}
                >
                  {tab}
                </a>
              );
            })}
          </div>
          {active === tabs[0] && <WalletAndTxs />}
          {active === tabs[1] && <Auth />}
          {/* {active === tabs[2] && <SmartContracts />} */}
          {/* {active === tabs[3] && <EXM />} */}
        </div>
      </main>
    </>
  );
};

export default Home;
