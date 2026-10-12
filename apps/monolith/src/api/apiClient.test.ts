import { describe, expect, it } from "vitest";
import { apiClient, createApiClient } from "./apiClient";

describe("singleton: the shared apiClient", () => {
  it("is the same object everywhere it is imported", async () => {
    const again = await import("./apiClient");
    expect(again.apiClient).toBe(apiClient);
  });

  it("test A: counts one request", async () => {
    const client = createApiClient({ latencyMs: 0 });
    await client.getProducts();
    expect(client.getRequestCount()).toBe(1);
  });

  it("test B: counts one request", async () => {
    const client = createApiClient({ latencyMs: 0 });
    await client.getProducts();
    expect(client.getRequestCount()).toBe(1);
  });
});

describe("factory: createApiClient", () => {
  it("gives every caller its own private state", async () => {
    const a = createApiClient({ latencyMs: 0 });
    const b = createApiClient({ latencyMs: 0 });
    await a.getProducts();
    expect(a.getRequestCount()).toBe(1);
    expect(b.getRequestCount()).toBe(0);
  });
});
