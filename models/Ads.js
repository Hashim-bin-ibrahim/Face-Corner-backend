const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const adsSchema = new mongoose.Schema(
  {
    adType: {
      type: String,
      enum: [
        "Awareness",
        "Traffic",
        "Engagement",
        "Leads",
        "App promotion",
        "Sales",
        null,
      ],
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "Active", "Ended", null],
      default: "Active",
    },
    adName: {
      type: String,
    },

    adLink: {
      type: String,
    },
    budget: {
      type: String,
    },
    starts: {
      type: Date,
      default: new Date(),
    },
    ends: {
      type: Date,
      default: new Date(),
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ads", adsSchema);
