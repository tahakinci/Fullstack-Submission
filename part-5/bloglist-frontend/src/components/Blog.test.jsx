import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("<Blog /> renders only title and show button at the begining", () => {
  const blog = {
    title: "test title",
    author: "some guy",
    url: "test.com",
    likes: 5,
  };

  const { container } = render(<Blog blog={blog} />);

  const element = screen.getByText("test title");
  const div = container.querySelector(".detailDiv");
  expect(element).toBeDefined();
  expect(div).toHaveStyle("display: none");
});

test("<Blog /> renders url, author and likes after show button clicked", async () => {
  const blog = {
    title: "test title",
    author: "some guy",
    url: "test.com",
    likes: 5,
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const div = container.querySelector(".detailDiv");
  const button = screen.getByText("view");
  await user.click(button);

  expect(div).not.toHaveStyle("display: none");
});

test("<Blog /> calls like handler twice when like button clicked twice", async () => {
  const blog = {
    title: "test title",
    author: "some guy",
    url: "test.com",
    likes: 5,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleLikes={mockHandler} />);

  const user = userEvent.setup();
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
