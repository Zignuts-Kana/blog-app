import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

const { Mixed,ObjectId, Number, String } = mongoose.Schema.Types;

mongoose.plugin(slug);

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
      require: true,
      unique: true,
      slug: "title",
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
