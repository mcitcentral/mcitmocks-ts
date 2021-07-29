import React from "react";
import { shallowEqual } from "react-redux";

import Layout from "../containers/Layout";
import UserSettingsCard from "../components/UserSettingsCard/UserSettingsCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import LoadingPage from "./LoadingPage";
import { UserPreferences } from "../../../@types";
import "../styles/SettingsPage.scss";
import { updateUser } from "../store/authReducer";

const SettingsPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth, shallowEqual);

  if (authState.isLoading || !authState.user) return <LoadingPage />;

  const handleUpdateSettings = async (preferences: Partial<UserPreferences>): Promise<void> => {
    dispatch(updateUser(preferences));
  };

  return (
    <Layout>
      <div className="settings">
        <h2 className="settings__title">USER SETTINGS</h2>
        <UserSettingsCard user={authState.user} handleUpdateSettings={handleUpdateSettings} />
      </div>
    </Layout>
  );
};

export default SettingsPage;
