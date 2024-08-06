import { AppProps } from "next/app";
import HeaderHome from "../components/home-components/header/HeaderHome";
import Main from "../components/home-components/main/Main";

const Home = ({}:AppProps) => {
  return (
    <>
      <HeaderHome />
      <Main />
    </>
  );
};

export default Home;