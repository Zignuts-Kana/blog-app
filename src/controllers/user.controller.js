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
import bcryptjs from "bcryptjs";

const singUpUserController = async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const { name, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 8);
    const User = await createNewUserHelper({
      name,
      email,
      password: hashPassword,
    });
    // return res.render("pages/dashboard.ejs");
    return res.render("pages/dashboard.ejs",{user:User,token:User.token});
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const logInUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await findOneUserByFieldHelper({ email });

    if (!user || !user.password) {
      return res.status(400).render("pages/error-page.ejs",{ Message: "User Not Found!" });
    }

    const matchPassword = bcryptjs.compareSync(password, user.password);

    if (!matchPassword) {
      return res.status(401).render("pages/error-page.ejs",{ Message: "Credencials Miss Mach!" });
    }

    const token = generateJWTToken({ _id: user._id });
    const User = await updateUserByIdHelper({
      query: { _id: user._id },
      updateBody: { token },
      options: { new: true },
    });
    if (User.role === "Admin") {
      return res.render("pages/dashboard.ejs",{user:User,token:User.token});
    }else{
      return res.redirect('http://localhost:3000/?blog="true"');
    }
    // return res.render("pages/dashboard.ejs",{user:User,token});
    // return res.render("pages/dashboard.ejs",{user:User,token});
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

const logoutUserController = async (req, res) => {
  try {
    const user = await updateUserByIdHelper({
      query: { email: req.user.email },
      updateBody: {$unset: {token: 1 }},
      options: { new: true },
    });
    return res.status(200).send({ Message: "Logout User SuccessFully!", user });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

export { singUpUserController, logInUserController, logoutUserController };
