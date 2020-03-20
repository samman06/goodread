const express = require('express');
const router = express.Router();
const AdminController = require("../controller/AdminController");

router.post('/', (req, res) =>
    AdminController.login(req, res)
);

module.exports = router;
