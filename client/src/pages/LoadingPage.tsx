import React from "react";
import Layout from "../containers/Layout";
import Loader from "../components/Loader";
import "../styles/LoadingPage.scss";

const LoadingPage: React.FC<{}> = () => {
  return (
    <Layout>
      <div className="loading">
        <Loader />
      </div>
    </Layout>
  );
};

export default LoadingPage;
