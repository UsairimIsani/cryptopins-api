import tracer from "tracer";
import Axios from "axios";
import Config from "../Config";
export const log = tracer.console({
  format: "{{message}}  - {{file}}:{{line}}"
}).log;
let headers = {
  "Content-Type": "application/json",
  "X-CC-Api-Key": Config.coinbase.apiKey,
  "X-CC-Version": Config.coinbase.version
};
export const axios = Axios.create({
  baseURL: "https://api.commerce.coinbase.com/",
  headers
});
export class Data {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
