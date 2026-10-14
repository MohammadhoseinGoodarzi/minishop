import { describe, expect, it } from "vitest";
import { createApiClient } from "./apiClient";
import { withCache } from "./withCache";

describe("withCache proxy", () => {
  it("sends one request for two calls at the same time", async () => {
    const client = createApiClient({ latencyMs: 0 });
    const cachedClient = withCache(client);

    await Promise.all([cachedClient.getProducts(), cachedClient.getProducts()]);

    expect(client.getRequestCount()).toBe(1);
  });

  it("forwards other methods to the real client", async () => {
    const client = createApiClient({ latencyMs: 0 });
    const cachedClient = withCache(client);

    await cachedClient.getProducts();

    expect(cachedClient.getRequestCount()).toBe(1);
  });
});
