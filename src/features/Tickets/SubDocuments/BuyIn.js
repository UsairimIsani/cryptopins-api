import mongoose from "mongoose";
export const BuyIn = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
});
