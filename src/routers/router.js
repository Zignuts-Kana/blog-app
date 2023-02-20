import express from "express";
import { userRouter } from "./user.router.js";
import { blogRouter } from "./blog.router.js";
import { categoryRouter } from "./category.router.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  return res.render('pages/profile.ejs');
});

Router.get('/blogs',(req,res) => {
  return res.render('pages/blogs.ejs')
})

Router.get('/new-blog',(req,res) => {
  return res.render('pages/new-blog.ejs')
})

Router.get('/categories',(req,res) => {
  return res.render('pages/categories.ejs')
})

Router.get('/new-category',(req,res) => {
  return res.render('pages/new-category.ejs')
})

Router.get("/register", (req, res) => {
  return res.render('pages/register.ejs');
});

Router.get("/login", (req, res) => {
  return res.render('pages/login.ejs');
});

Router.get("/forgot-password", (req, res) => {
  return res.render('pages/reset-password.ejs');
});

Router.get("/blog", (req, res) => {
  return res.render('pages/blog-page.ejs');
});

Router.get("/profile", (req, res) => {
  return res.render('pages/profile.ejs');
});

Router.use('/user',userRouter);

Router.use('/blog',blogRouter);

Router.use('/category',categoryRouter);

export { Router };
