import mongoose from "mongoose";
import { BuyIn } from "./SubDocuments/BuyIn";

let TicketsSchema = new mongoose.Schema(
  {
    bidders: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    buyInPrice: BuyIn,
    buyIns: [BuyIn],
    currentValue: {
      type: Number
    },
    expiry: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);
export const TicketModel = mongoose.model("ticket", TicketsSchema);
