import tracer from "tracer";
import Axios from "axios";
export const log = tracer.console({
  format: "{{message}}  - {{file}}:{{line}}"
}).log;
let axios = Axios.create({
  baseURL: ""
});
