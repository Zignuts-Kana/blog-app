import { body } from "express-validator";

const createBlogValidator = [
  body["title"].notEmpty(),
  body["slug"].notEmpty(),
  body["category"].notEmpty(),
  body["description"].notEmpty(),
  body["imageThumbnail"].notEmpty(),
];

export { createBlogValidator };
