import {
  createPow,
} from "@textile/powergate-client";

const POW_HOST = 'http://0.0.0.0:6002'; // or whatever powergate instance you want

export async function getPowergateInstance() {
  const { user } = window.store.getState().app;

  // Create a new powergate instance
  const pow = createPow({ POW_HOST });

  if (user && user.token) {
    pow.setToken(user.token);
  }

  return pow;
};
