const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikedBlog = { likes: 0 };
  blogs.forEach((blog) => {
    if (blog.likes > mostLikedBlog.likes) mostLikedBlog = blog;
  });
  return mostLikedBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
