import { type NextPage } from "next";
import Head from "next/head";
import WalletManager from "~/components/walletManager";
import { PWebProvider } from "~/context/pweb";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PWeb Dash</title>
        <meta name="description" content="permawebjs testing dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[white] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[5rem]">
            <span className="text-[purple]">PermaWeb</span>
            <span className="text-[white]">JS</span>{" "}
            <span className="text-[purple]">Dash</span>
          </h1>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[3rem]">
            Wallet Utilities
          </h2>
          <PWebProvider>
            <div className="grid grid-rows-1 gap-4 sm:grid-rows-2 md:gap-8">
              <WalletManager />
            </div>
          </PWebProvider>
        </div>
      </main>
    </>
  );
};

export default Home;
