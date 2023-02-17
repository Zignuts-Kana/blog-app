import mongoose from "mongoose";

const { ObjectId, Number, String } = mongoose.Schema.Types;

const BlogCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    owner: {
      type: ObjectId,
      require: true,
      ref: "blog-user",
    },
  },
  {
    timestamps: true,
  }
);

const BlogUser = mongoose.model("blog-category", BlogCategorySchema);

export { BlogUser };
