import { useEffect } from "react";

import Header from "../../components/Header";
import NotificationBar from "../NotificationBar/NotificationBar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUserByAccessToken, logoutUser } from "../../store/authReducer";
import { confirmInterview, fetchInterviews, rejectInterview } from "../../store/dashboardReducer";
import { setNotification } from "../../store/notificationReducer";

const Layout: React.FC<{}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const interviewsAsInvitee = useAppSelector((state) => state.dashboard.interviewsAsInvitee);
  const invitations = interviewsAsInvitee.filter((interview) => interview.status === "INVITED");

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchInterviews());
  }, [dispatch, isAuthenticated]);

  const onLogin = (accessToken: string) => dispatch(fetchUserByAccessToken(accessToken));
  const handleLogout = () => dispatch(logoutUser());

  const handleConfirmInterview = async (interviewId: string) => {
    const res = await dispatch(confirmInterview(interviewId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(setNotification({ message: "Interview confirmed!", status: "information" }));
    } else {
      // @ts-ignore
      dispatch(setNotification({ message: res?.error.message || "An error occured.", status: "error" }));
    }
  };
  const handleRejectInterview = async (interviewId: string) => {
    const res = await dispatch(rejectInterview(interviewId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(setNotification({ message: "Interview cancelled!", status: "information" }));
    } else {
      // @ts-ignore
      dispatch(setNotification({ message: res?.error.message || "An error occured.", status: "error" }));
    }
  };

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={onLogin}
        invitations={invitations}
        handleLogout={handleLogout}
        handleConfirmInterview={handleConfirmInterview}
        handleRejectInterview={handleRejectInterview}
      />
      <NotificationBar key="notification" />
      <main>{children}</main>
    </>
  );
};

export default Layout;
