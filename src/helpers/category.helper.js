import { BlogCategory } from "../models/category.model.js";

const createNewCategoryHelper = async (data) => {
  try {
    return await BlogCategory.findOneAndUpdate({ name: data.name }, data, {
      upsert: true,
      new: true,
    });
  } catch (error) {
    console.log("Error in User Helper in createNewCategoryHelper", error);
  }
};

const findAllCategoryHelper = async () => {
  try {
    return await BlogCategory.find().sort({createdAt:-1}).select('name -_id');
  } catch (error) {
    console.log("Error in User Helper in findAllCategoryHelper", error);
  }
};

const findAllCategoryAllFieldHelper = async () =>{
  try {
    return await BlogCategory.find().sort({createdAt:-1});
  } catch (error) {
    console.log("Error in User Helper in findAllCategoryHelper", error);
  }
}

const findCategoryByIdHelper = async (_id) => {
  try {
    return await BlogCategory.findById(_id);
  } catch (error) {
    console.log("Error in User Helper in findCategoryByIdHelper", error);
  }
};

const findCategoryByFieldHelper = async (query) => {
  try {
    return await BlogCategory.find(query).sort({createdAt:-1});
  } catch (error) {
    console.log("Error in User Helper in findCategoryByFieldHelper", error);
  }
};

const findOneCategoryByFieldHelper = async (query) => {
  try {
    return await BlogCategory.findOne(query);
  } catch (error) {
    console.log("Error in User Helper in findOneCategoryByFieldHelper", error);
  }
};

const updateCategoryByIdHelper = async ({ query, updateBody, options }) => {
  try {
    return await BlogCategory.findOneAndUpdate(query, updateBody, options);
  } catch (error) {
    console.log("Error in User Helper in updateCategoryByIdHelper", error);
  }
};

const deleteCategoryByIdHelper = async (_id) => {
  try {
    return await BlogCategory.findByIdAndRemove(_id);
  } catch (error) {
    console.log("Error in User Helper in deleteCategoryByIdHelper", error);
  }
};

export {
  createNewCategoryHelper,
  findAllCategoryHelper,
  findCategoryByIdHelper,
  updateCategoryByIdHelper,
  deleteCategoryByIdHelper,
  findCategoryByFieldHelper,
  findOneCategoryByFieldHelper,
  findAllCategoryAllFieldHelper,
};
