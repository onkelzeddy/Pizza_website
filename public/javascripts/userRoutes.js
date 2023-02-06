const{ Router } = require("express");
const userService = require("./userService");

const router = Router();

router.post("/create_order", userService.createOrder);


module.exports = router;