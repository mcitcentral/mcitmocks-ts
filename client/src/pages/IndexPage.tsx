import React from "react";

import IndexPageDetail from "../components/IndexPageDetail/IndexPageDetail";
import Layout from "../containers/Layout";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUserByAccessToken } from "../store/authReducer";
import "../styles/IndexPage.scss";

const IndexPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const onLogin = (accessToken: string) => {
    dispatch(fetchUserByAccessToken(accessToken));
  };

  return (
    <Layout>
      <div className="index">
        <IndexPageDetail isAuthenticated={isAuthenticated} onLogin={onLogin} />
      </div>
    </Layout>
  );
};

export default IndexPage;
