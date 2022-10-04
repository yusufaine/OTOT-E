import "dotenv/config";

import createServer from "./services/express.service";

const EXPRESS_PORT = Number(process.env.EXPRESS_PORT) ?? 8080;

const app = createServer();

app.listen(EXPRESS_PORT, () => {
  console.log(`[server] is running on http://localhost:${EXPRESS_PORT}`);
});
