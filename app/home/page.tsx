"use client";
import HeaderHome from "../components/home-components/header/HeaderHome";
import Main from "../components/home-components/main/Main";
import protectedAuth from "../components/protectedAuth";

const Home = () => {
  return (
    <>
      <HeaderHome />
      <Main />
    </>
  );
};

export default protectedAuth(Home);
