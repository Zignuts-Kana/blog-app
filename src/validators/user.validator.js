import { body } from "express-validator";

const createUserValidator = [
    body('name').notEmpty(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({min:8}),
]

const loginUserValidator =  [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({min:8}),
]

export {createUserValidator,loginUserValidator}