import { OpenAPIHono } from "@hono/zod-openapi";
import { routes } from "./routes";
import { authMiddleware } from "./middlewares";

export const app = new OpenAPIHono()
  .doc("/doc", {
    openapi: "3.0.0",
    info: { title: "My API", version: "1.0.0" },
  })
  .use("/*", authMiddleware)
  .route("/", routes);
