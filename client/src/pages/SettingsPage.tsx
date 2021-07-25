import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";

import Layout from "../containers/Layout";
import UserSettingsCard from "../components/UserSettingsCard/UserSettingsCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import LoadingPage from "./LoadingPage";
import "../styles/DashboardPage.scss";
import { UserPreferences } from "../../../@types";

const SettingsPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.dashboard, shallowEqual);
  const authState = useAppSelector((state) => state.auth, shallowEqual);

  if (authState.isLoading || !authState.user) return <LoadingPage />;

  const handleUpdateSettings = async (id: string, prefs: Partial<UserPreferences>): Promise<void> => {
    // ???
  };

  return (
    <Layout>
      <div className="userSettings">
        <h2>USER SETTINGS</h2>
        <UserSettingsCard
          user={authState.user}
          handleUpdateSettings={handleUpdateSettings}
        />
      </div>
    </Layout>
  );
};

export default SettingsPage;
