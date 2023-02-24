import express from "express";
import { userRouter } from "./user.router.js";
import { blogRouter } from "./blog.router.js";
import { categoryRouter } from "./category.router.js";
import {
  findAllCategoryHelper,
  findAllCategoryAllFieldHelper,
  findCategoryByFieldHelper,
  findOneCategoryByFieldHelper,
} from "../helpers/category.helper.js";
import {
  findAllBlogHelper,
  findOneBlogByFieldHelper,
} from "../helpers/blog.helper.js";
import { findBlogBySlug } from "../controllers/blog.controller.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    if (req.query && req.query.categories) {
      let category = req.query.categories;
      category = await findOneCategoryByFieldHelper({ name: category });
      console.log(category);
      return res.render("pages/update-category.ejs", { category });
    }
    if (req.query && req.query.slug) {
      const blog = await findOneBlogByFieldHelper({ slug:req.query.slug });
      console.log(blog);
      return res.render("pages/blog-view.ejs", { blog });
    }
    if (req.query && req.query.blog) {
      const blogs = await findAllBlogHelper();
      let letestBlog = blogs.slice(0, 1);
      letestBlog[0].description = letestBlog[0].description.slice(0, 200);
      let otherBlogs = blogs.slice(1);
      otherBlogs.forEach((blog, index) => {
        otherBlogs[index].description = blog.description.slice(0, 100);
      });
      const categoryList = await findAllCategoryHelper();
      console.log(categoryList);
      return res.render("pages/blog-page.ejs", { letestBlog, otherBlogs,categoryList });
    }
    return res.render("pages/dashboard.ejs",{user:undefined,token:undefined});
    // return res.render("pages/dashboard.ejs");
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
});

Router.get("/blogs", async (req, res) => {
  try {
    const blogs = await findAllBlogHelper();
    blogs.forEach((blog, index) => {
      blogs[index].description = blog.description.slice(0, 25);
    });
    return res.render("pages/blogs.ejs", { blogs });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
});

Router.get("/new-blog", async (req, res) => {
  try {
    const categoryList = await findAllCategoryHelper();
    return res.render("pages/new-blog.ejs", { categoryList });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
});

Router.get("/categories", async (req, res) => {
  try {
    const categoryList = await findAllCategoryAllFieldHelper();
    return res.render("pages/categories.ejs", { categoryList });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
});

Router.get("/new-category", (req, res) => {
  return res.render("pages/new-category.ejs");
});

Router.get("/register", (req, res) => {
  return res.render("pages/register.ejs");
});

Router.get("/login", (req, res) => {
  console.log("here");
  return res.render("pages/login.ejs");
});

Router.get("/forgot-password", (req, res) => {
  return res.render("pages/reset-password.ejs");
});

Router.get("/blog", async (req, res) => {
  const blogs = await findAllBlogHelper();
  let letestBlog = blogs.slice(0, 1);
  letestBlog[0].description = letestBlog[0].description.slice(0, 200);
  let otherBlogs = blogs.slice(1);
  otherBlogs.forEach((blog, index) => {
    otherBlogs[index].description = blog.description.slice(0, 100);
  });
  return res.render("pages/blog-page.ejs", { letestBlog, otherBlogs });
});

Router.get("/profile", (req, res) => {
  // singUpUserController;

  return res.render("pages/profile.ejs");
});

Router.get("/:slug", async (req, res) => {
  try {
    if (req.params && req.params.slug && req.params.slug.includes("-")) {
      const blog = await findBlogBySlug(req, res);
      const categoryList = await findAllCategoryHelper();
      return res.render("pages/update-blog.ejs", { blog, categoryList });
    }
    return res.render("pages/dashboard.ejs",{user:undefined,token:undefined});
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
});

Router.get("categories/:category", async (req, res) => {
  try {
    let { category } = req.params;
    category = await findCategoryByFieldHelper({ name: category });
    return res.render("pages/update-blog.ejs", { category });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
});

Router.use("/", userRouter);

Router.use("/blogs", blogRouter);

Router.use("/category", categoryRouter);

export { Router };
