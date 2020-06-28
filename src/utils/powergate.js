import { createPow } from "@textile/powergate-client";
require("dotenv").config();

var pow;

const POW_HOST = process.env.POW_HOST;

export const getPowergateInstance = () => {
  if (pow) {
    return pow;
  } else {
    pow = createPow({ POW_HOST });
    return pow;
  }
};
