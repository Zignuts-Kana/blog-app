import {
  createNewUserHelper,
  findAllUserHelper,
  findUserByIdHelper,
  updateUserByIdHelper,
  deleteUserByIdHelper,
  findOneUserByFieldHelper,
} from "../helpers/user.helper.js";
import { generateJWTToken } from "../middlewares/auth.middleware.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { query } from "express";

const singUpUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).send({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 8);
    let User = await createNewUserHelper({
      name,
      email,
      password: hashPassword,
    });
    const profileImage = User.profileImage&&User.profileImage.filename?User.profileImage.filename:undefined;
    const user = { _id: User._id, name: User.name, role: User.role, token: User.token, email: User.email,profileImage:profileImage?profileImage:undefined }
    // const user = { _id: User._id, name: User.name, role: User.role, token: User.token, email: User.email }
    if (User.role === "Admin") {
      return res.render("pages/dashboard.ejs", { user, token: User.token });
    } else {
      // return res.redirect('http://localhost:3000/?blog="true"');
      return res.render('pages/blog-page.ejs', { user, token: User.token, letestBlog: [], otherBlogs: [], categoryList: [] });
    }
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const logInUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user = await findOneUserByFieldHelper({ email });

    if (!user || !user.password) {
      return res.status(400).render("pages/error-page.ejs", { Message: "User Not Found!" });
    }

    const matchPassword = bcryptjs.compareSync(password, user.password);

    if (!matchPassword) {
      return res.status(401).render("pages/error-page.ejs", { Message: "Credencials Miss Mach!" });
    }

    const token = generateJWTToken({ _id: user._id });
    const User = await updateUserByIdHelper({
      query: { _id: user._id },
      updateBody: { token },
      options: { new: true },
    });
    const profileImage = User.profileImage&&User.profileImage.filename?User.profileImage.filename:undefined;
    user = { _id: User._id, name: User.name, role: User.role, token: User.token, email: User.email,profileImage:profileImage?profileImage:undefined }
    if (User.role === "Admin") {
      return res.render("pages/dashboard.ejs", { user, token: User.token });
    }
    return res.render('pages/blog-page.ejs', { user, token: User.token, letestBlog: [], otherBlogs: [], categoryList: [] });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const logoutUserController = async (req, res) => {
  try {
    const user = await updateUserByIdHelper({
      query: { email: req.user.email },
      updateBody: { $unset: { token: 1 } },
      options: { new: true },
    });
    return res.status(200).send({ Message: "Logout User SuccessFully!", user });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    let { userId } = req.params;
    const { name, email } = req.body;
    const profileImage = req.file;
    userId = mongoose.Types.ObjectId(userId);
    const user = await updateUserByIdHelper({ query: { _id: userId }, updateBody: { name, email, profileImage }, options: { new: true } });
    // return res.render('pages/dashboard.ejs',{user,token:user.token})
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
}

export { singUpUserController, logInUserController, logoutUserController, updateUserProfile };
