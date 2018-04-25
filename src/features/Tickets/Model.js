import mongoose from "mongoose";
import { BuyIn } from "./SubDocuments/BuyIn";

let TicketsSchema = new mongoose.Schema(
  {
    title: String,
    bidders: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    buyInPrice: BuyIn,
    buyIns: [BuyIn],
    currentValue: {
      type: Number
    },
    duration: [
      {
        type: Date,
        required: true
      }
    ]
  },
  { timestamps: true }
);
export const TicketModel = mongoose.model("ticket", TicketsSchema);
