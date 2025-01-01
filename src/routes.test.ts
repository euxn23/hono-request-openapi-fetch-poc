import createClient from "openapi-fetch";
import { paths } from "./openapi/generated";
import { describe, it, expect } from "vitest";
import { routes } from "./routes";

const honoRequest: typeof fetch = async (input, init) => {
  if (input instanceof URL) {
    return routes.request(input.pathname + input.search, init);
  } else if (typeof input === "string") {
    return routes.request(input, init);
  } else {
    const url = new URL(input.url);
    const pathname = url.pathname + url.search;
    return routes.request(pathname, input);
  }
};

const apiClient = createClient<paths>({
  baseUrl: "https://localhost",
  fetch: honoRequest,
});

describe("GET /app/echo", () => {
  it("should return 200 if query `name` given", async () => {
    const { response, data } = await apiClient.GET("/app/echo", {
      params: { query: { name: "world" } },
    });

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: "hello world" });
  });
  it("should return 400 if query `name` not given", async () => {
    const { response } = await apiClient.GET("/app/echo", {} as any);

    expect(response.status).toBe(400);
  });
});
