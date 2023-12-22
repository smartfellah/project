import { createServer, startServer } from "./server";

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

createServer()
  .then(startServer)

  .catch((err) => {
    console.log(err);
  });
