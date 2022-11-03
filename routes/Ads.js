const express = require("express");
const { createAds, getAllAds, StripePayment } = require("../controllers/Ads");

const router = express.Router();

router.post("/createAds", createAds);
router.get("/getAllAds", getAllAds);
router.post("/payment", StripePayment);

module.exports = router;
