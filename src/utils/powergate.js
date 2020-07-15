import {
  createPow,
  ffsOptions as Options,
  ffsTypes as Types,
} from "@textile/powergate-client";
var pow;

const POW_HOST = "http://localhost:6002"; // or whatever powergate instance you want

export const getPowergateInstance = () => {
  if (pow) {
    // Return already existing powergate instance
    return pow;
  } else {
    // Create a new powergate instance
    pow = createPow({ POW_HOST });
    return pow;
  }
};

export const ffsOptions = Options;
export const ffsTypes = Types;
