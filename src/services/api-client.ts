import axios from "axios";
import { CanceledError } from "axios";

export default axios.create({
  baseURL: "//localhost:3000/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export { CanceledError };
