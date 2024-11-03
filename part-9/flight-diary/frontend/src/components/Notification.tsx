import { useEffect, useState } from "react";
import { INotification } from "./DiaryForm";

interface NotificationPropType {
  notification: INotification;
}
const Notification = ({ notification }: NotificationPropType) => {
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    setDisplay("block");
    setTimeout(() => {
      setDisplay("none");
    }, 3000);
  }, [notification]);

  return (
    <div
      style={{
        display: display,
        paddingTop: "1rem",
        paddingBottom: "1rem",
        fontSize: "20px",
      }}
      className={notification.status}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
