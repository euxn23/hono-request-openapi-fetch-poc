import { serve } from "@hono/node-server";
import { app } from "./app";

serve(app, (info) => {
  console.log(`Server is running on ${info.address}:${info.port}`);
});
