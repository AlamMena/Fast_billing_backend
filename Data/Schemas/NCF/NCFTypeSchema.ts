import { Schema } from "mongoose";

const NCFTypeSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true }
})