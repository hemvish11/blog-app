"use client";
import styles from "./Article.module.css";
import HeaderHome from "../components/home-components/header/HeaderHome";
import protectedAuth from "../components/protectedAuth";
import CurrentArcticle from "../components/Article/page/CurrentArcticle";

const Article = () => {
  return (
    <>
      <HeaderHome />
      <CurrentArcticle />
    </>
  );
};

export default protectedAuth(Article);
