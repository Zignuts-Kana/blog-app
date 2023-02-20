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
    date: {
      type: String,
      require:true
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

const BlogCategory = mongoose.model("blog-category", BlogCategorySchema);

export { BlogCategory };
