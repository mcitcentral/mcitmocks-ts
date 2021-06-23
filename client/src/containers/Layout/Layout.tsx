import { useDispatch, useSelector, useStore } from "react-redux";

import { RootState } from "../../store";
import Header from "../../components/Header";
import { fetchUserByAccessToken } from "../../store/authReducer";
import TimeBlock from "../../components/Calendar/TimeBlock/TimeBlock";

const Layout: React.FC<{}> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const onLogin = (accessToken: string) => {
    dispatch(fetchUserByAccessToken(accessToken));
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogin={onLogin}/>
      <main>{children}</main>
    </>
  );
};

export default Layout;
