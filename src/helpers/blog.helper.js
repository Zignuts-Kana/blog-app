import { BlogData } from "../models/blog.model.js";

const createNewBlogHelper = async (data) => {
  try {
    return await BlogData.findOneAndUpdate(
      { title: data.title },
      data,
      {
        upsert: true,
        new: true,
      }
    );
  } catch (error) {
    console.log("Error in User Helper in CreateNewBlogHelper", error);
  }
};

const findAllBlogHelper = async () => {
  try {
    return await BlogData.find().sort({ createdAt: -1 });
  } catch (error) {
    console.log("Error in User Helper in findAllBlogHelper", error);
  }
};

const findBlogByIdHelper = async (_id) => {
  try {
    return await BlogData.findById(_id);
  } catch (error) {
    console.log("Error in User Helper in findBlogByIdHelper", error);
  }
};

const findOneBlogByFieldHelper = async (query) => {
  try {
    console.log(query);
    return await BlogData.findOne(query);
  } catch (error) {
    console.log("Error in User Helper in findOneBlogByFieldHelper", error);
  }
};

const findBlogByFieldHelper = async (query) => {
  try {
    return await BlogData.find(query).sort({ createdAt: -1 });
  } catch (error) {
    console.log("Error in User Helper in findBlogByFieldHelper", error);
  }
};

const updateBlogByIdHelper = async ({ query, updateBody, options }) => {
  try {
    return await BlogData.findOneAndUpdate(query, updateBody, options);
  } catch (error) {
    console.log("Error in User Helper in updateBlogByIdHelper", error);
  }
};

const deleteBlogByIdHelper = async (_id) => {
  try {
    return await BlogData.findByIdAndRemove(_id);
  } catch (error) {
    console.log("Error in User Helper in deleteBlogByIdHelper", error);
  }
};

export {
  createNewBlogHelper,
  findAllBlogHelper,
  findBlogByIdHelper,
  findOneBlogByFieldHelper,
  updateBlogByIdHelper,
  deleteBlogByIdHelper,
  findBlogByFieldHelper,
};
