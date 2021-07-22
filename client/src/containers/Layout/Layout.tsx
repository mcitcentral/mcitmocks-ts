import { useDispatch } from "react-redux";

import Header from "../../components/Header";
import { fetchUserByAccessToken, logoutUser } from "../../store/authReducer";
import { useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { confirmInterview, fetchInterviews, rejectInterview } from "../../store/dashboardReducer";

const Layout: React.FC<{}> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const interviewsAsInvitee = useAppSelector((state) => state.dashboard.interviewsAsInvitee);
  const invitations = interviewsAsInvitee.filter((interview) => interview.status === "INVITED");

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchInterviews());
  }, [dispatch, isAuthenticated]);

  const onLogin = (accessToken: string) => dispatch(fetchUserByAccessToken(accessToken));
  const handleLogout = () => dispatch(logoutUser());
  const handleConfirmInterview = (interviewId: string) => dispatch(confirmInterview(interviewId));
  const handleRejectInterview = (interviewId: string) => dispatch(rejectInterview(interviewId));

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
      <main>{children}</main>
    </>
  );
};

export default Layout;
