import React from "react";

const Notification = ({ notification }) => {
  if (!notification) return null;
  return <div className={notification.status}>{notification.message}</div>;
};

export default Notification;
