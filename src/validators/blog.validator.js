import { check } from "express-validator";

const createBlogValidator = [
  check("title").notEmpty(),
  check("slug").notEmpty(),
  check("category").notEmpty(),
  check("description").notEmpty(),
  check("imageThumbnail").notEmpty(),
];

export { createBlogValidator };
