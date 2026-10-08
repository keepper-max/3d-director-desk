import { describe, expect, it } from "vitest";
import { resolveInitialDirectorUiMode } from "../directorMode";

describe("resolveInitialDirectorUiMode", () => {
  it("defaults to simple mode", () => {
    expect(resolveInitialDirectorUiMode("", null)).toBe("simple");
  });

  it("restores a professional preference when the host does not override it", () => {
    expect(resolveInitialDirectorUiMode("", "professional")).toBe("professional");
  });

  it("lets a valid host query override the stored preference", () => {
    expect(resolveInitialDirectorUiMode("?mode=simple", "professional")).toBe("simple");
    expect(resolveInitialDirectorUiMode("?mode=professional", "simple")).toBe("professional");
  });

  it("falls back to simple for an invalid host query", () => {
    expect(resolveInitialDirectorUiMode("?mode=advanced", "professional")).toBe("simple");
  });
});
