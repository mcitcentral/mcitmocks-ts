import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { resetNotification } from "../../store/notificationReducer";
import { FiAlertCircle, FiAlertTriangle, FiCheck } from "react-icons/fi";
import "./NotificationBar.scss";

const NotificationBar: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.notification);

  useEffect(() => {
    if (notification.message) setTimeout(() => dispatch(resetNotification()), 2500);
  }, [notification, dispatch]);

  const renderIcon = () => {
    if (notification.status === "success") return <FiCheck />;
    if (notification.status === "error") return <FiAlertTriangle />;
    if (notification.status === "information") return <FiAlertCircle />;
  };

  return (
    <div className="notificationBar" data-active={!!notification.message} data-status={notification.status}>
      {renderIcon()}
      <div className="notificationBar__msg">{notification.message}</div>
    </div>
  );
};

export default React.memo(NotificationBar);
