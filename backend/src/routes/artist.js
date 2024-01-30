const express = require("express");
const { update, read, create } = require("../controllers/artistController");

const router = express.Router();

router.post("/", create);
router.get("/", read);
router.put("/", update);

module.exports = router;
