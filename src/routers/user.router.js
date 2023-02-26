import { Router } from "express";
import {
  createUserValidator,
  loginUserValidator,
} from "../validators/user.validator.js";
import {
  singUpUserController,
  logInUserController,
  logoutUserController,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir('./public/uploads/', (err) => {
      cb(null, './public/uploads/');
    });
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname.replaceAll(' ','-'));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb("Invalid File Format!", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

const userRouter = Router();

userRouter.post("/singUp", createUserValidator, singUpUserController);

userRouter.post("/logIn", loginUserValidator, logInUserController);

userRouter.delete("/user/logOut", userAuthMiddleware, logoutUserController);

userRouter.post('/edit/:userId',upload.single('profileImage'), userAuthMiddleware, updateUserProfile);

export { userRouter };
