import axios from "axios";
const fetch = axios.create({
  baseURL:
    process.env.REACT_APP_NODE_ENV === "dev" ? "" : process.env.REACT_APP_URL,
});

export default fetch;
