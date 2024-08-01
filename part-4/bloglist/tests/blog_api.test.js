const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are three blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("uniq identifier of blogs is named as id", async () => {
  const response = await api.get("/api/blogs");
  const result = response.body.every((blog) => Object.hasOwn(blog, "id"));
  console.log(result);
  assert.strictEqual(result, true);
});

test("uniq identifier of blogs is not named as _id", async () => {
  const response = await api.get("/api/blogs");
  const result = response.body.every((blog) => Object.hasOwn(blog, "_id"));
  console.log(result);
  assert.strictEqual(result, false);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "test-blog",
    author: "tester",
    url: "testBlog.com",
    likes: 4,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  const titles = (await blogsAtEnd).map((b) => b.title);
  assert(titles.includes("test-blog"));
});

test("if no likes given to blog, its get the value of 0", async () => {
  const newBlog = {
    title: "0 liked blog",
    author: "man without likes",
    url: "nolike.com",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await helper.blogsInDb();
  const blogWithoutLikes = blogsAtEnd.find((b) => b.title === "0 liked blog");

  assert(blogWithoutLikes.hasOwnProperty("likes"), true);
  assert.strictEqual(blogWithoutLikes.likes, 0);
});

test("if title or url missing in newBlog, should return 400", async () => {
  const newBlogWithoutTitle = {
    author: "test-blog",
    url: "blogWithUrl.com",
    likes: 4,
  };
  const newBlogWithoutUrl = {
    title: "blogWithTitle",
    author: "test-blog",
    likes: 4,
  };

  await api.post("/api/blogs").send(newBlogWithoutTitle).expect(400);

  await api.post("/api/blogs").expect(400);
});

test("when valid id given, should delete that blog", async () => {
  const blogsAtBegining = await helper.blogsInDb();
  const blogToDelte = blogsAtBegining[0];

  await api.delete("/api/blogs").send(blogToDelte).expect(204);

  const blogAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogAtEnd.length, blogsAtBegining.length - 1);
});

test("when valid id with valid object given, should update successfully", async () => {
  const blogs = await helper.blogsInDb();
  const blogToUpdate = blogs[0];
  const blogObj = {
    title: "updated title",
    author: "updated author",
    url: "updatedUrl.com",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(blogObj)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
  assert(updatedBlog.title, "updated title");
  assert(updatedBlog.author, "test-author");
  assert(updatedBlog.url, "updatedUrl.com");
  assert(updatedBlog.likes, 3);
});
after(async () => {
  await mongoose.connection.close();
});
