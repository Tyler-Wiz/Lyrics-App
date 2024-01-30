const express = require("express");
const { read, create } = require("../controllers/playlistController");

const router = express.Router();

router.post("/", create);
router.get("/", read);

module.exports = router;
