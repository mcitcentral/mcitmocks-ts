import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";

import Layout from "../containers/Layout";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchAll, searchAvailabilities, updateAvailabilities } from "../store/dashboardReducer";
import Calendar from "../components/Calendar/Calendar";
import LoadingPage from "./LoadingPage";
import "../styles/DashboardPage.scss";
import InterviewCard from "../components/InterviewCard/InterviewCard";
import AvailabilityCard from "../components/AvailabilityCard/AvailabilityCard";

const DashboardPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.dashboard, shallowEqual);
  const authState = useAppSelector((state) => state.auth, shallowEqual);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  if (authState.isLoading || dashboardState.isLoading || !authState.user) return <LoadingPage />;

  const handleCancelInterview = async (interviewId: string) => {};

  const handleUpdateAvailabilities = async (availabilityMap: { [key: string]: boolean }) => {
    dispatch(updateAvailabilities(availabilityMap));
  };

  const handleSearchAvailabilities = async (startTimes: string | string[]) => {
    dispatch(searchAvailabilities(startTimes));
  };

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
            updateAvailabilities={handleUpdateAvailabilities}
            searchAvailabilities={handleSearchAvailabilities}
          />
        </div>
        <div className="dashboard__searchResults">
          <h2 className="dashboard__title">MATCHES FOR YOUR AVAILABILITY</h2>
          {dashboardState.searchedAvailabilities.map((availability) => (
            <AvailabilityCard key={availability.id} availability={availability} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
