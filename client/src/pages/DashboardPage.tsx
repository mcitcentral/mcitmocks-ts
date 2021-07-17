import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";

import Layout from "../containers/Layout";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchAll } from "../store/dashboardReducer";
import Calendar from "../components/Calendar/Calendar";
import LoadingPage from "./LoadingPage";
import "../styles/DashboardPage.scss";
import InterviewCard from "../components/InterviewCard/InterviewCard";

const DashboardPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.dashboard, shallowEqual);
  const authState = useAppSelector((state) => state.auth, shallowEqual);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  if (authState.isLoading || dashboardState.isLoading || !authState.user) return <LoadingPage />;

  const handleCancelInterview = async (interviewId: string) => {};
  const updateAvailabilities = async () => {};

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard__top">
          <div className="dashboard__topLeft">
            <h2 className="dashboard__title">UPCOMING MOCK</h2>
            <InterviewCard
              user={authState.user}
              interview={dashboardState.interviews[0]}
              handleCancelInterview={handleCancelInterview}
            />
          </div>
        </div>
        <div className="dashboard__main">
          <h2 className="dashboard__title">SCHEDULE</h2>
          <Calendar
            availabilities={dashboardState.availabilities}
            interviews={dashboardState.interviews}
            user={authState.user}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
