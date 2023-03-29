import { usePWebContext } from "~/context/pweb";

const EnvironmentToggle = () => {
  const { env, setEnv } = usePWebContext();

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setEnv("mainnet");
    } else {
      setEnv("local");
    }
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="form-control col-span-1 w-52">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            className="toggle-primary toggle"
            checked={env === "mainnet"}
            onChange={handleToggle}
          />
          <span
            className={`label-text text-xl font-bold text-${
              env === "mainnet" ? "primary" : "gray-500"
            } drop-shadow-md`}
          >
            {env}
          </span>
        </label>
      </div>
    </div>
  );
};

export default EnvironmentToggle;
