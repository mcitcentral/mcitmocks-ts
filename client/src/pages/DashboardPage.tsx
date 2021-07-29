import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { startOfHour } from "date-fns";

import Layout from "../containers/Layout";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchAll,
  rejectInterview,
  searchAvailabilities,
  sendInvitation,
  updateAvailabilities,
} from "../store/dashboardReducer";
import { setNotification } from "../store/notificationReducer";
import Calendar from "../components/Calendar/Calendar";
import LoadingPage from "./LoadingPage";
import "../styles/DashboardPage.scss";
import InterviewCard from "../components/InterviewCard/InterviewCard";
import AvailabilityCard from "../components/AvailabilityCard/AvailabilityCard";
import { InterviewWithUserInfo } from "../../../@types";

const getNextInterview = (interviews: InterviewWithUserInfo[]) => {
  const currentTime = startOfHour(new Date());
  const sortedInterviews = interviews
    .filter((interview) => interview.startTime.getTime() >= currentTime.getTime() && interview.status === "CONFIRMED")
    .sort((A, B) => A.startTime.getTime() - B.startTime.getTime());
  return sortedInterviews[0];
};

const DashboardPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.dashboard, shallowEqual);
  const authState = useAppSelector((state) => state.auth, shallowEqual);
  const [nextInterview, setNextInterview] = useState<InterviewWithUserInfo | undefined>(
    getNextInterview(dashboardState.interviews)
  );

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    const _nextInterview = getNextInterview(dashboardState.interviews);
    setNextInterview(_nextInterview);
  }, [dashboardState.interviews]);

  if (authState.isLoading || dashboardState.isLoading || !authState.user) return <LoadingPage />;

  const handleCancelInterview = async (interviewId: string) => {
    const res = await dispatch(rejectInterview(interviewId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(setNotification({ message: "Interview cancelled.", status: "information" }));
    } else {
      // @ts-ignore
      dispatch(setNotification({ message: res?.error.message || "An error occured.", status: "error" }));
    }
  };

  const handleUpdateAvailabilities = async (availabilityMap: { [key: string]: boolean }) => {
    dispatch(updateAvailabilities(availabilityMap));
  };

  const handleSearchAvailabilities = async (startTimes: string | string[]) => {
    dispatch(searchAvailabilities(startTimes));
  };

  const handleSendInvitation = async (availabilityId: string) => {
    dispatch(sendInvitation(availabilityId));
    dispatch(setNotification({ message: "Invitation sent!", status: "success" }));
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard__top">
          <div className="dashboard__topLeft">
            <h2 className="dashboard__title">UPCOMING MOCK</h2>
            <InterviewCard
              user={authState.user}
              interview={nextInterview}
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
          {dashboardState.searchedAvailabilities.length > 0 && (
            <h2 className="dashboard__title">MATCHES FOR YOUR AVAILABILITY</h2>
          )}
          {dashboardState.searchedAvailabilities.map((availability) => (
            <AvailabilityCard
              key={availability.id}
              availability={availability}
              handleSendInvitation={handleSendInvitation}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
