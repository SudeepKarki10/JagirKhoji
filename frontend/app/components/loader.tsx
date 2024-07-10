import { TailSpin } from "react-loader-spinner";

const loader = () => (
  <div className="grid place-items-center">
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="black"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default loader;
