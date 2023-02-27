import express from "express";
import fs from "fs";
import {
  createBlogController,
  findAllBlogController,
  findAllBlogsOfOneUserController,
  deleteBlogController,
  updateBlogController,
  findBlogBySlug,
  searchBlogController
} from "../controllers/blog.controller.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { createBlogValidator, updateBlogValidator } from "../validators/blog.validator.js";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir('./public/uploads/', (err) => {
      cb(null, './public/uploads/');
    });
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname.replaceAll(' ','-'));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb("Invalid File Format!", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

blogRouter.post(
  "/", userAuthMiddleware,
  upload.fields([{ name: "imageThumbnail", maxCount: 1 }, { name: "images", maxCount: 5 }]),
  createBlogController
);

blogRouter.get('/:slug', findBlogBySlug);

blogRouter.delete('/delete/:blogId', userAuthMiddleware, deleteBlogController);

blogRouter.post('/edit/:slug', userAuthMiddleware, upload.fields([{ name: "imageThumbnail", maxCount: 1 }, { name: "images", maxCount: 5 }]), updateBlogController);

blogRouter.get('/search/:search',userAuthMiddleware,searchBlogController);

export { blogRouter };
