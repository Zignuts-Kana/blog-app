import { body, param } from "express-validator";

const createBlogValidator = [
  body("name").notEmpty(),
];

const updateBlogValidator = [
  param("name").exists(),
  body("name").notEmpty(),
];

export { createBlogValidator , updateBlogValidator };
