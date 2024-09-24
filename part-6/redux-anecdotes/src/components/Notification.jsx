import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  let visibility = notification ? "block" : "none";

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: visibility,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
