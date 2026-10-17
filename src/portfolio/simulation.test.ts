import { describe, expect, it } from "vitest";
import { vesselPosition, workflowSteps } from "./simulation";

describe("maritime replay", () => {
  it("replays the same position and keeps tracks in the chart", () => {
    expect(vesselPosition(0, 0)).toEqual({ x: 215, y: 220 });
    expect(vesselPosition(0, 60)).toEqual(vesselPosition(0, 60));
    expect(vesselPosition(0, 60)).not.toEqual(vesselPosition(0, 0));
    for (let index = 0; index < 3; index++) {
      for (let time = 0; time <= 100; time++) {
        const { x, y } = vesselPosition(index, time);
        expect(x).toBeGreaterThan(80);
        expect(x).toBeLessThan(590);
        expect(y).toBeGreaterThan(60);
        expect(y).toBeLessThan(365);
      }
    }
  });
});

describe("agent acceptance", () => {
  it("requires correction and re-verification before acceptance when a finding occurs", () => {
    expect(workflowSteps(true)).toEqual([
      "prepare",
      "execute",
      "verify",
      "finding",
      "fix",
      "reverify",
      "accept",
    ]);
  });
  it("accepts verified work directly when no finding occurs", () => {
    expect(workflowSteps(false)).toEqual([
      "prepare",
      "execute",
      "verify",
      "accept",
    ]);
  });
});
