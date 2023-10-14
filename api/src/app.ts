import http from "http";
import { AddressInfo } from "net";
import { createServer } from "@/services/express";
import { logger } from "@/services/logger";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "3600";

async function startServer() {
  const app = createServer();

  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(
      `Server ready at http://${addressInfo.address}:${addressInfo.port}`
    );
  });

  const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`);

      server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });
    });
  });
}

export default startServer;
