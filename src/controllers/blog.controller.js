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

    const { title, description, slug, date, category,imageThumbnail, images } = req.body;
    
    console.log(
      title,
      description,
      title.toLowerCase().split(" ").join("-"),
      date,
      category,
      imageThumbnail,
      images
    );
    const stringDate = moment(Date(date)).format("DD-MMM-YYYY");
    console.log(
      title,
      description,
      title.toLowerCase().split(" ").join("-"),
      date,
      category,
      imageThumbnail,
      images
    );
    const blog = await createNewBlogHelper({
      title,
      description,
      slug: title.toLowerCase().split(" ").join("-"),
      date: stringDate,
      category,
      imageThumbnail,
      images,
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

const findAllSerchedBlogsController = async (req, res) => {
  try {
    return await findBlogByFieldHelper({
      owner: req.user._id,
      title: { $regex: req.body.serch, $options: "i" },
    });
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
    const slug = req.params.slug;
    const { title, description, date, category, imageThumbnail, images } =
      req.body;

    const stringDate = moment(Date(date)).format("DD-MMM-YYYY");

    const blog = await updateBlogByIdHelper({
      query: { slug },
      updateBody: {
        title,
        description,
        slug,
        date: stringDate,
        category,
        imageThumbnail,
        images,
      },
      options: { new: true, upsert: true },
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
  findAllSerchedBlogsController,
  deleteBlogController,
  updateBlogController,
};
