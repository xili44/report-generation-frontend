import base64 from "base-64";

const username = "SuperUser";
const password = "SYS";
const authorization = "Basic " + base64.encode(username + ":" + password);

export default authorization;
