const express = require("express");
const { read, create, update } = require("../controllers/songsController");

const router = express.Router();

router.post("/", create);
router.get("/", read);
router.put("/", update);

module.exports = router;
