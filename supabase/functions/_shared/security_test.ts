import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  createCorsHeaders,
  extractBearerToken,
  isAllowedOrigin,
  timingSafeEqual,
} from "./security.ts";

Deno.test("allows the production site and local development origins", () => {
  assertEquals(isAllowedOrigin("https://properties.maiprop.co"), true);
  assertEquals(isAllowedOrigin("http://localhost:4187"), true);
  assertEquals(isAllowedOrigin("http://127.0.0.1:4187"), true);
  assertEquals(isAllowedOrigin("https://evil.example"), false);
});

Deno.test("creates origin-specific CORS headers instead of wildcard headers", () => {
  const req = new Request("https://example.test", {
    headers: { Origin: "https://properties.maiprop.co" },
  });

  const headers = createCorsHeaders(req);

  assertEquals(headers["Access-Control-Allow-Origin"], "https://properties.maiprop.co");
  assertEquals(headers["Vary"], "Origin");
});

Deno.test("extracts bearer tokens case-insensitively", () => {
  assertEquals(extractBearerToken("Bearer abc123"), "abc123");
  assertEquals(extractBearerToken("bearer abc123"), "abc123");
  assertEquals(extractBearerToken("Basic abc123"), null);
  assertEquals(extractBearerToken(null), null);
});

Deno.test("compares secret values without leaking length matches", () => {
  assertEquals(timingSafeEqual("same-secret", "same-secret"), true);
  assertEquals(timingSafeEqual("same-secret", "same-secreu"), false);
  assertEquals(timingSafeEqual("short", "much-longer"), false);
});
