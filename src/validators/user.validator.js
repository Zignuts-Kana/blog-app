import { body } from "express-validator";

const createUserValidator = [
    body('name').notEmpty().trim(),
    body('email').notEmpty().isEmail().trim(),
    body('password').notEmpty().trim().isLength({min:8}),
]

const loginUserValidator =  [
    body('email').notEmpty().isEmail().trim(),
    body('password').notEmpty().trim().isLength({min:8}),
]

const userUpdateValidator = [

]

export {createUserValidator,loginUserValidator,userUpdateValidator}