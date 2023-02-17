import {
  createNewBlogHelper,
  findAllBlogHelper,
  findBlogByIdHelper,
  findOneBlogByFieldHelper,
  updateBlogByIdHelper,
  findBlogByFieldHelper,
  deleteBlogByIdHelper,
} from "../helpers/blog.helper.js";
import { validationResult } from "express-validator";
import moment from "moment";

const createBlogController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, slug, date, category, imageThumbnail, image } =
      req.body;

    const stringDate = moment(new Date(date)).format("DD-MMM-YYYY");

    const blog = await createNewBlogHelper({
      title,
      description,
      slug,
      date: stringDate,
      category,
      imageThumbnail,
      image,
    });

    return res
      .status(201)
      .send({ Message: "New Blog Added Successfully!", blog });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const findAllBlogController = async (req, res) => {
  try {
    const blogs = await findAllBlogHelper();
    return res.status(200).send(blogs);
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const findAllBlogsOfOneUserController = async (req, res) => {
  try {
    //req.user from auth
    const blogs = await findBlogByFieldHelper({ owner: req.user._id });
    return res.status(200).send(blogs);
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const deleteBlogController = async (req, res) => {
  try {
    //delete by id and id in id of button
    const { blogId } = req.params;
    const blog = await deleteBlogByIdHelper(blogId);
    return res.status(200).send({ Message: "Delete Blog Success!" });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const updateBlogController = async (req, res) => {
  try {
    const { title, description, slug, date, category, imageThumbnail, image } =
      req.body;

    const stringDate = moment(new Date(date)).format("DD-MMM-YYYY");

    const blog = await createNewBlogHelper({
      title,
      description,
      slug,
      date: stringDate,
      category,
      imageThumbnail,
      image,
    });

    return res.status(201).send({ Message: "Update Blog Successfully!", blog });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

export {
  createBlogController,
  findAllBlogController,
  findAllBlogsOfOneUserController,
  deleteBlogController,
  updateBlogController,
};
