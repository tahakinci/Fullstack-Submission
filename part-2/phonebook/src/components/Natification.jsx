const Notification = ({ message, status = "success" }) => {
  if (!message) return null;
  return <div className={`${status}`}>{message}</div>;
};

export default Notification;
