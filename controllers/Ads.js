const Ads = require("../models/Ads");
const stripe = require("stripe")(
  "sk_test_51LvLfBSGOMf6OU7oevQvvfDb9V8D8LyGqva3MjdNRqux1ZOiXa32x4uYZGWoDUXU8Ao5bic3bF5uLvYsCicvkujy00Lp20ErTh"
);
const uuid = require("uuid");

exports.getAllAds = async (req, res) => {
  try {
    const post = await Ads.find()
      .populate("user", "first_name last_name gender picture username ")
      .sort({ createdAt: -1 });
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createAds = async (req, res) => {
  try {
    const post = await new Ads(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.StripePayment = async (req, res) => {
  try {
    const { product, token } = req.body;
    // console.log("product", product);
    // console.log("price", product.price);
    const idempotencyKey = uuid();
    return stripe.costomers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create({}, { idempotencyKey });
      })
      .then((result) => res.status(200).json(result));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
