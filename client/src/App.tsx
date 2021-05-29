import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchUserByJWT } from "./store/authReducer";
import Header from "./components/Header/Header";
import "./styles/Reset.scss";
import "./styles/App.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserByJWT());
  }, [dispatch]);

  return (
    <div>
      <Header />
    </div>
  );
};

export default App;
