import {
  createCategoryController,
  findAllCategoryController,
  findAllCategoryOfOneUserController,
  deleteCategoryController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.post("/",userAuthMiddleware, createCategoryController);

categoryRouter.delete('/delete/:deletId',userAuthMiddleware,deleteCategoryController);

categoryRouter.post('/edit/:name',userAuthMiddleware,updateCategoryController);

export { categoryRouter };
