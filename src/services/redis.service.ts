import Redis from "ioredis";

import { redisConfig } from "../configs/redis.config";

export const redisClient = new Redis({
  host: redisConfig.host || "",
  port: Number(redisConfig.port) || 6379,
  username: redisConfig.username || "",
  password: redisConfig.password || "",
});

export const REDIS_KEY = "summaries";

(async () => {
  redisClient
    .connect()
    .then(() => console.log("connected to redis"))
    .catch(() => "unable to connect, may already be connected");
})();
