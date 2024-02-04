const router = require("express").Router();

const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

const thoughtRoutes = require("./thoughtRoutes");
router.use("/thoughts", thoughtRoutes);

module.exports = router;
