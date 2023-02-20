const router = require("express").Router();

//USING AUTH.ROUTES
const auth_routes = require("./auth.routes");
router.use(auth_routes);

module.exports = router;