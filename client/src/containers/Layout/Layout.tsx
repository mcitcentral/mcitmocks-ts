import { useDispatch } from "react-redux";

import Header from "../../components/Header";
import { fetchUserByAccessToken } from "../../store/authReducer";
import { useAppSelector } from "../../hooks";

const Layout: React.FC<{}> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const invitations = useAppSelector((state) => state.dashboard.interviewsAsInvitee);

  const onLogin = (accessToken: string) => {
    dispatch(fetchUserByAccessToken(accessToken));
  };

  const handleLogout = () => {};

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={onLogin}
        invitations={invitations}
        handleLogout={handleLogout}
      />
      <main>{children}</main>
    </>
  );
};

export default Layout;
