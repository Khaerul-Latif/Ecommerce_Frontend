import axios from "axios";
import { host } from "@/utils/constant";

const Axios = axios.create({
  baseURL: host
});

export default Axios;
