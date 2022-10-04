import { Express, Request, Response } from "express";

import {
  ALL_QUESTIONS_QUERY,
  LEETCODE_GRAPHQL_ENDPOINT,
  QuestionSummaryType,
} from "../configs/axios.config";
import { axiosInstance } from "../services/axios.service";
import { redisClient, REDIS_KEY } from "../services/redis.service";

async function getData() {
  const { data } = await axiosInstance.post<QuestionSummaryType[]>(
    LEETCODE_GRAPHQL_ENDPOINT,
    ALL_QUESTIONS_QUERY
  );

  return data;
}

function routes(app: Express) {
  app.get("/graphql", async (_req: Request, res: Response) => {
    console.time("/graphql runtime");
    const data = await getData();
    if (!data) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
    console.timeEnd("/graphql runtime");
  });

  app.get("/redis", async (_req: Request, res: Response) => {
    console.time("/redis runtime");

    const summaries = await redisClient.get(REDIS_KEY);

    if (!summaries) {
      console.log("Cache miss");
      const data = await getData();
      redisClient.setex(REDIS_KEY, 60, JSON.stringify(data));
      res.send(data);
    } else {
      console.log("Cache hit");
      const data = await redisClient.get(REDIS_KEY);
      res.send(JSON.parse(data));
    }
    console.timeEnd("/redis runtime");
  });

  app.get("/redis-clear", async (_req: Request, res: Response) => {
    console.log("Clearing redis");
    const resp = await redisClient.flushall();
    res.send(resp);
  });

  app.get("/ping", (_req: Request, res: Response) => {
    res.send("pong");
  });

  // catch unhandle routes
  app.use((req: Request, res: Response) => {
    res.status(404);
    res.json({
      title: "Not found",
      msg: `"${req.url}" is invalid`,
    });
  });
}

export default routes;
