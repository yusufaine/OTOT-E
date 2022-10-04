import { createClient } from "redis";

export const redisClient = createClient();
export const REDIS_KEY = "summaries";

(async () => {
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();
