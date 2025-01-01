import createClient from "openapi-fetch";
import { paths } from "./openapi/generated";
import { describe, it, expect } from "vitest";
import { app } from "./app";

const honoRequest: typeof fetch = async (input, init) => {
  if (input instanceof URL) {
    return app.request(input.pathname + input.search, init);
  } else if (typeof input === "string") {
    return app.request(input, init);
  } else {
    const url = new URL(input.url);
    const pathname = url.pathname + url.search;
    return app.request(pathname, input);
  }
};

const apiClient = createClient<paths>({
  baseUrl: "https://localhost",
  fetch: honoRequest,
});

describe("GET /app/echo?name=world", () => {
  it("should return 200 if correct Authorization Header given", async () => {
    const { response, data } = await apiClient.GET("/app/echo", {
      params: { query: { name: "world" } },
      headers: {
        Authorization: "Bearer supersecret",
      },
    });

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: "hello world" });
  });
  it("should return 401 if incorrect Authorization Header given", async () => {
    const { response } = await apiClient.GET("/app/echo", {
      headers: {
        Authorization: "Bearer wrong",
      },
    } as any);

    expect(response.status).toBe(401);
  });
  it("should return 401 if Authorization Header not given", async () => {
    const { response } = await apiClient.GET("/app/echo", {} as any);

    expect(response.status).toBe(401);
  });
});
