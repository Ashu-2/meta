"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    email: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});
exports.default = mongoose.model('teachers', teacherSchema);
