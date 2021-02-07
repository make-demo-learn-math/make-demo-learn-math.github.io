import { describe, it, expect, beforeEach } from "../src/specish/specish.js";
import Features from "../src/Features.js";

describe("Features", () => {
  const NAME1 = "fake-feature-1";
  const NAME2 = "fake-feature-2";
  let features;

  beforeEach(() => {
    features = new Features([NAME1, NAME2]);
  });

  describe("constructor", () => {
    it("should set the feature names", () => {
      expect(features.names).toContain(NAME1);
      expect(features.names).toContain(NAME2);
    });

    it("should enable the features", () => {
      expect(features.isSet(NAME1)).toBe(true);
      expect(features.isSet(NAME2)).toBe(true);
    });
  });

  describe("toString", () => {
    it("should output the feature names", () => {
      const output = features.toString();
      expect(output).toContain(NAME1);
      expect(output).toContain(NAME2);
    });
  });

  describe("isSet", () => {
    it("should return false for an invalid name", () => {
      expect(features.isSet("invalid-name")).toBe(false);
    });

    describe("with all features disabled", () => {
      beforeEach(() => {
        features.state = 0;
      });

      it("should return false", () => {
        expect(features.isSet(NAME1)).toBe(false);
        expect(features.isSet(NAME2)).toBe(false);
      });
    });
  });
});
