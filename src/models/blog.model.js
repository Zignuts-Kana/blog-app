import mongoose from "mongoose";

const { Mixed,ObjectId, Number, String } = mongoose.Schema.Types;

const BlogDataSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    owner: {
      type: ObjectId,
      ref: "blog-user",
      require:true,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      require: true,
    },
    imageThumbnail: {
      type: Mixed,
      require: true,
    },
    images: [{ type: Mixed }],
  },
  {
    timestamps: true,
  }
);

const BlogData = mongoose.model("blog-data", BlogDataSchema);

export { BlogData };
