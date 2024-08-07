import React from "react";
import withAuth from "../components/withAuthOld";
import Home from "../page";

const ProtectedPage = () => {
  return <Home />;
};

export default withAuth(ProtectedPage);
