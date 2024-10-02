import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("calls the createBlog event handler with the right details when a new blog is created", async () => {
  const mockCreateBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={mockCreateBlog} />);

  const createButton = container.querySelector(".createButton");
  const inputs = screen.getAllByRole("textbox");

  await user.type(inputs[0], "New Blog Title");
  await user.type(inputs[1], "Author Name");
  await user.type(inputs[2], "https://newblog.com");
  await user.type(inputs[3], "10");

  await user.click(createButton);

  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: "New Blog Title",
    author: "Author Name",
    url: "https://newblog.com",
    likes: "10",
  });
});
