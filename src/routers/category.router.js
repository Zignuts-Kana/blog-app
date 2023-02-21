import {
  createCategoryController,
  findAllCategoryController,
  findAllCategoryOfOneUserController,
  deleteCategoryController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategoryController);

categoryRouter.delete('/delete/:deletId',deleteCategoryController);

categoryRouter.post('/edit/:name',updateCategoryController);

export { categoryRouter };
