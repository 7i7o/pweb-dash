import { PWebProvider } from "~/context/pweb";
import EnvironmentToggle from "./environmentToggle";
import TxManager from "./txManager";
import WalletManager from "./walletManager";

const WalletAndTxs = () => {
  return (
    <PWebProvider>
      <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[3rem]">
        Environment
      </h2>
      <EnvironmentToggle />
      <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[3rem]">
        Wallets
      </h2>
      <div className="grid grid-rows-1 justify-items-center">
        <WalletManager />
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[3rem]">
        Transactions
      </h2>
      <div className="grid grid-rows-1 gap-4 sm:grid-rows-2 md:gap-8">
        <TxManager />
      </div>
    </PWebProvider>
  );
};

export default WalletAndTxs;
