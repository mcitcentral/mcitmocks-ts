import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { fetchUserByJWT } from "./store/authReducer";
import IndexPage from "./pages/IndexPage";
import DashboardPage from "./pages/DashboardPage";
import LoadingPage from "./pages/LoadingPage";
import InterviewPage from "./pages/InterviewPage";

import "./styles/Reset.scss";
import "./styles/App.scss";
import { RootState } from "./store";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    dispatch(fetchUserByJWT());
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">{isAuthenticated ? <DashboardPage /> : <Redirect to="/" />}</Route>
        <Route path="/interviews/:interviewId">{isAuthenticated ? <InterviewPage /> : <Redirect to="/" />}</Route>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
