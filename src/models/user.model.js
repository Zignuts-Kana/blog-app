import mongoose from "mongoose";

const { Mixed,Number, String } = mongoose.Schema.Types;

const BlogUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 8,
    },token:{
      type:String,
    },role:{
      type:String,
      enum:['Admin','User'],
      default:'User'
    },profileImage: {
      type: Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const BlogUser = mongoose.model("blog-user", BlogUserSchema);

export { BlogUser };
