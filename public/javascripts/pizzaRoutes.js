const{ Router } = require("express");
const pizzaDataService = require("./pizzaDataService");

const router = Router();

router.get("/:id", pizzaDataService.getPizzaById);


module.exports = router;