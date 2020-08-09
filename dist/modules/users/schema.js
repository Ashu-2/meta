"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    email: String,
    is_suspended: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose.model('users', schema);
