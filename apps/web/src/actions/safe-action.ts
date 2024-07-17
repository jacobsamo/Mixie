import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient({
  // Can also be an async function.
  handleReturnedServerError(e, utils) {
    // You can access these properties inside the `utils` object.
    const { clientInput, bindArgsClientInputs, metadata, ctx } = utils;

    return "Oh no, something went wrong!";
  },
});