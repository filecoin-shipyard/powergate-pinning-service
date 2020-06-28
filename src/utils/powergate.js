import { createPow } from "@textile/powergate-client";
require("dotenv").config();

var pow;

const POW_HOST = "http://localhost:6002";

export const getPowergateInstance = () => {
  if (pow) {
    return pow;
  } else {
    pow = createPow({ POW_HOST });
    return pow;
  }
};
