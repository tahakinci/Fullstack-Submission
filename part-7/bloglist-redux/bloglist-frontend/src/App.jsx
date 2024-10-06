import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { loginUser, logoutUser, rememberUser } from "./reducers/usersReducer";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import { Routes, Route, Link } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(rememberUser(user));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(username, password));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(
        setNotification(
          {
            status: "error",
            message: "wrong username or password",
          },
          3
        )
      );
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>USERNAME</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>PASSWORD</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">LOGIN</Button>
    </Form>
  );

  if (user === null) {
    return (
      <Container>
        <Notification />
        <h2>Log in to application</h2>
        {loginForm()}
      </Container>
    );
  }

  return (
    <Container>
      <Notification />
      <h2>Blogs</h2>
      <div>
        <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name}{" "}
        logged in <button onClick={handleLogout}>logout</button>
      </div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Container>
  );
};

export default App;
