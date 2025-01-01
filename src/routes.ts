import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

export const routes = new OpenAPIHono().openapi(
  createRoute({
    path: "/app/echo",
    method: "get",
    request: {
      query: z.object({ name: z.string() }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({ message: z.string() }),
          },
        },
        description: "Echoes the name",
      },
    },
  }),
  (c) => {
    const { name } = c.req.valid("query");
    return c.json({ message: `hello ${name}` });
  },
);
