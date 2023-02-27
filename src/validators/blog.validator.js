import expressValidator from 'express-validator';
const {body,param} = expressValidator;
/**
 * validate express incoming req.
 * @type {(arge is any[]|*)[]}
 */

const createBlogValidator = [
  body('title').notEmpty(),
  body('slug').notEmpty(),
  body('category').notEmpty(),
  body('description').notEmpty(),
];

const updateBlogValidator = [
  param('slug').exists(),
  body('title').notEmpty(),
  body('slug').notEmpty(),
  body('category').notEmpty(),
  body('description').notEmpty(),
];

export { createBlogValidator , updateBlogValidator };
