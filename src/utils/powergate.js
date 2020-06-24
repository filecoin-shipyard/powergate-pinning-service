import { createPow } from "@textile/powergate-client";

const host = "http://13.233.128.236:6002"; // or whatever powergate instance you want

var pow;

export const getPowergateInstance = () => {
  if (pow) {
    return pow;
  } else {
    pow = createPow({ host });
    return pow;
  }
};
