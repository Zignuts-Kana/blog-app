import {
  createNewCategoryHelper,
  findAllCategoryHelper,
  findCategoryByFieldHelper,
  findCategoryByIdHelper,
  updateCategoryByIdHelper,
  deleteCategoryByIdHelper,
  findOneCategoryByFieldHelper,
} from "../helpers/category.helper.js";
import { validationResult } from "express-validator";
import { Schema } from "mongoose";
import moment from "moment-timezone";

const createCategoryController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    
    const date = moment(Date.now()).tz("Asia/Calcutta|Asia/Kolkata").format("DD-MMM-YYYY");

    const category = await createNewCategoryHelper({
      name,date
    });

    return res
      .status(201)
      .redirect('/categories')
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const findAllCategoryController = async (req, res) => {
  try {
    const blogs = await findAllCategoryHelper();
    return res.status(200).send(blogs);
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const findAllCategoryOfOneUserController = async (req, res) => {
  try {
    //req.user from auth
    const blogs = await findCategoryByFieldHelper({ owner: req.user._id });
    return res.status(200).send(blogs);
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    //delete by id and id in id of button
    let { deletId } = req.params;
    deletId = new Schema.ObjectId(deletId);
    const blog = await deleteCategoryByIdHelper(deletId.path);
    return res.status(200).send({ Message: "Delete Category Success!" });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.params;
    
    const updateName = req.body.name;
    console.log(updateName);

    const blog = await updateCategoryByIdHelper({
      query: { name },
      updateBody: { name:updateName },
      options: { new: true },
    });

    return res
      .status(201)
      .redirect('/categories')
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

export {
  createCategoryController,
  findAllCategoryController,
  findAllCategoryOfOneUserController,
  deleteCategoryController,
  updateCategoryController,
};
