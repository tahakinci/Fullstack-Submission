import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: "none",
  };

  if (notification) {
    style.display = "block";

    setTimeout(() => {
      style.display = "none";
    }, 3000);
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
