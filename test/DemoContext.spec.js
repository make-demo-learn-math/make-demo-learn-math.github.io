import { describe, it, expect, beforeEach } from "../src/specish/specish.js";
import Mock from "../src/specish/Mock.js";
import DemoContext from "../src/DemoContext.js";

describe("DemoContext", () => {
  const FAKE_CANVAS_ID = {};

  let mockCanvas;
  let mockWindow;
  let mockTimer;
  let mockUi;
  let deps;

  beforeEach(() => {
    mockCanvas = {
      getContext: Mock.fn().mockName("getContext"),
    };

    mockWindow = {
      document: {
        getElementById: Mock.fn(() => mockCanvas).mockName("getElementById"),
      },
    };

    mockTimer = {
      forEachAnimationFrame: Mock.fn().mockName("forEachAnimationFrame"),
      close: Mock.fn().mockName("close"),
    };

    mockUi = {
      autoSize: Mock.fn().mockName("autoSize"),
    };

    deps = {
      Features: function () {},
      Pseudorandom: function () {},
      Timer: function () {
        return mockTimer;
      },
      Ui: function () {
        return mockUi;
      },
      window: mockWindow,
    };
  });

  describe("constructor", () => {
    describe("with no element found", () => {
      beforeEach(() => {
        mockWindow.document.getElementById.mock.implementation = () => null;
      });

      it("should throw", () => {
        expect(
          () => new DemoContext(FAKE_CANVAS_ID, null, deps)
        ).toThrowSomething();
      });
    });
  });

  describe("close", () => {
    describe("with no timer set", () => {
      beforeEach(() => {
        const demoContext = new DemoContext(FAKE_CANVAS_ID, null, deps);
        demoContext.timer = null;
        demoContext.close();
      });

      it("should not invoke timer.close", () => {
        expect(mockTimer.close).not.toHaveBeenCalled();
      });
    });

    describe("with timer set", () => {
      beforeEach(() => {
        const demoContext = new DemoContext(FAKE_CANVAS_ID, null, deps);
        demoContext.close();
      });

      it("should invoke timer.close once", () => {
        expect(mockTimer.close).toHaveBeenCalledTimes(1);
      });
    });
  });
});
