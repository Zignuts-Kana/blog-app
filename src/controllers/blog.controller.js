import {
  createNewBlogHelper,
  findAllBlogHelper,
  findBlogByIdHelper,
  findOneBlogByFieldHelper,
  updateBlogByIdHelper,
  findBlogByFieldHelper,
  deleteBlogByIdHelper,
  searchBlogByParams,
} from "../helpers/blog.helper.js";
import { validationResult } from "express-validator";
import { findAllCategoryHelper } from "../helpers/category.helper.js";
import { Schema } from "mongoose";
import moment from "moment";

const createBlogController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).send({ errors: errors.array() });
    }
    const { title, description, slug, date, category } = req.body;
    const { imageThumbnail, images } = req.files

    const stringDate = moment(new Date(date)).format("DD-MMM-YYYY");
    await createNewBlogHelper({
      owner:req.user._id,
      title,
      description,
      slug: title.trim().toLowerCase().replaceAll(" ", "-"),
      date: stringDate,
      category,
      imageThumbnail,
      images,
    });
    return res
      .status(201)
      .redirect('/blogs');
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
    const blogs = await findBlogByFieldHelper({
      owner: req.user._id,
      title: { $regex: req.body.serch, $options: "i" },
    });
    return res.render('', { blogs })
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const findBlogBySlug = async (req, res) => {
  try {
    //parse data for update
    const { slug } = req.params;
    return await findOneBlogByFieldHelper({ slug });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
}



const deleteBlogController = async (req, res) => {
  try {
    //delete by id and id in id of button
    let { blogId } = req.params;
    blogId = new Schema.ObjectId(blogId);
    const blog = await deleteBlogByIdHelper(blogId.path);
    return res.status(200).send({ Message: "Delete Blog Success!" });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const updateBlogController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).send({ errors: errors.array() });
    }
    const slug = req.params.slug;
    const { title, description, date, category } = req.body;
    const { imageThumbnail, images } = req.files;
    const stringDate = moment(new Date(date)).format("DD-MMM-YYYY");

    const blog = await updateBlogByIdHelper({
      query: { slug },
      updateBody: {
        title,
        owner:req.user._id,
        description,
        slug,
        date: stringDate,
        category,
        imageThumbnail,
        images,
      },
      options: { new: true, upsert: true },
    });

    return res.status(200).send({ Message: "Update Blog Successfully!", blog });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const searchBlogController = async (req,res) =>{
  try {
    const {search} = req.params;
    const searchBlogs = await searchBlogByParams(search);
    if (searchBlogs.length) {
      searchBlogs.forEach((blog,index) => {
        searchBlogs[index].description = blog.description.slice(0,100);
      });
    }
    const blogs = await findAllBlogHelper();
      let latestBlog = blogs && blogs.length ? blogs.slice(0, 1) : [];
      if (latestBlog.length) {
        latestBlog[0].description = latestBlog[0].description.slice(0, 200);
      }
      const categoryList = await findAllCategoryHelper();
    return res.status(200).render('pages/blog-page.ejs',{searchedBlogs:searchBlogs,letestBlog:latestBlog,categoryList ,otherBlogs:[]});
  } catch (error) {
    return res.status(500).send({Error:error});
  }
}

export {
  createBlogController,
  findAllBlogController,
  findAllBlogsOfOneUserController,
  findAllSerchedBlogsController,
  deleteBlogController,
  updateBlogController,
  findBlogBySlug,
  searchBlogController
};
