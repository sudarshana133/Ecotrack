"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { signup } = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.post("/signup", signup);
exports.default = router;
