import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  if (!notification) return null;
  return <div className={notification.status}>{notification.message}</div>;
};

export default Notification;
