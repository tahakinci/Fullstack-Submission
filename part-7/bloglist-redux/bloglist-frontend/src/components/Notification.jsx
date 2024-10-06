import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  if (!notification) return null;
  return <Alert variant={notification.status}>{notification.message}</Alert>;
};

export default Notification;
