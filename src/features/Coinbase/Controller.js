import { axios, Data } from "../../util";
import { log } from "util";
import { TicketModel } from "../Tickets/Model";
import { BuyIn } from "../Tickets/SubDocuments/BuyIn";
// (req,res,next)=>{}
export const getChargeById = (req, res, next) => {
  if (req.query.cid) {
    axios.get(`charges/${req.query.cid}`).then(charge => {
      let data = new Data(
        true,
        "Successfully fetched charge order!",
        charge.data
      );
      res.json(data);
    });
  }
};
export const getAllCharges = (req, res, next) => {
  axios
    .get(`charges`)
    .then(charges => {
      let data = new Data(
        true,
        "Successfully fetched all charges ever made!",
        charges.data
      );
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
};
export const createCharge = (req, res, next) => {
  const ticketId = req.body.ticketId;
  TicketModel.findById(ticketId)
    .then(ticket => {
      if (Date.parse(ticket.duration[1]) >= Date.now()) {
        let charge = {
          name: `Ticket No ${ticket._id}`,
          description: `Buy in to  Crytopins' Ticket no ${ticket._id}`,
          pricing_type: "fixed_price",
          local_price: {
            amount: ticket.buyInPrice.amount,
            currency: "USD"
          }
        };
        axios
          .post(`charges`, charge)
          .then(chargeRes => {
            TicketModel.findByIdAndUpdate(ticketId)
              .then(ticket => {
                ticket.currentValue += ticket.buyInPrice;
                ticket.buyins.push(new BuyIn(ticket.buyInPrice));
                ticket.bidders.push(req._user);
                ticket
                  .save()
                  .then(updatedTiket => {
                    log(chargeRes.data);
                    let data = new Data(
                      true,
                      "Successfully made a charge!",
                      chargeRes.data
                    );
                    res.json(data);
                  })
                  .catch(err => {
                    return err;
                  });
              })
              .catch(err => {
                return err;
              });
          })
          .catch(err => {
            return err;
          });
      } else {
        let data = new Data(false, "Ticket has Expired", null);

        res.json(data);
      }
    })
    .catch(err => {
      next(err);
    });
};
