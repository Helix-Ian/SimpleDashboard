import { Router } from 'express';
const router = Router();

const UserSchema = new mongoose.Schema({
    fName: {
      type: String,
      required: true
    },
    mName: {
      type: String,
    },
    lName: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    birthDate: {
      type: Date
    },
    manager: {
      type: String
    }
  });