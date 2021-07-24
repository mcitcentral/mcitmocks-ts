import React from "react";
import Layout from "../containers/Layout";
import "../styles/LoadingPage.scss";

const LoadingPage: React.FC<{}> = () => {
  return (
    <Layout>
      <div className="loading">
        <div className="loader">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </Layout>
  );
};

export default LoadingPage;
