import { BlogUser } from "../models/user.model.js";

const createNewUserHelper = async (data) => {
  try {
    return await BlogUser.findOneAndUpdate({ email: data.email }, data, {
      upsert: true,
      new: true,
    });
  } catch (error) {
    console.log("Error in User Helper in CreateNewUser", error);
  }
};

const findAllUserHelper = async () => {
  try {
    return await BlogUser.find();
  } catch (error) {
    console.log("Error in User Helper in findAllUser", error);
  }
};

const findUserByIdHelper = async (_id) => {
  try {
    return await BlogUser.findById(_id);
  } catch (error) {
    console.log("Error in User Helper in findUserById", error);
  }
};

const findOneUserByFieldHelper = async (query) => {
  try {
    return await BlogUser.findOne(query);
  } catch (error) {
    console.log("Error in User Helper in findOneUserByField", error);
  }
};

const updateUserByIdHelper = async ({ query, updateBody, options }) => {
  try {
    return await BlogUser.findOneAndUpdate(query, updateBody, options);
  } catch (error) {
    console.log("Error in User Helper in updateUser", error);
  }
};

const deleteUserByIdHelper = async (_id) => {
  try {
    return await BlogUser.findByIdAndRemove(_id);
  } catch (error) {
    console.log("Error in User Helper in deleteUserById", error);
  }
};

export {
  createNewUserHelper,
  findAllUserHelper,
  findUserByIdHelper,
  updateUserByIdHelper,
  deleteUserByIdHelper,
  findOneUserByFieldHelper,
};
