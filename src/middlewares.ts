import { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

export const authMiddleware: MiddlewareHandler = (c, next) => {
  const authorizationHeader = c.req.header("Authorization");
  if (!authorizationHeader) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  if (authorizationHeader !== "Bearer supersecret") {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  return next();
};
