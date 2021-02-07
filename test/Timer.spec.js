import { describe, it, expect, beforeEach } from "../src/specish/specish.js";
import Mock from "../src/specish/Mock.js";
import Timer from "../src/Timer.js";

describe("Timer", () => {
  describe("sleep", () => {
    let mockWindow;

    beforeEach(() => {
      mockWindow = {
        setTimeout: Mock.fn().mockName("setTimeout"),
      };

      const deps = {
        window: mockWindow,
      };

      new Timer(deps).sleep();
    });

    it("should invoke setTimeout once", () => {
      expect(mockWindow.setTimeout).toHaveBeenCalledTimes(1);
    });
  });

  describe("forEachAnimationFrame", () => {
    // Fake times (in seconds)
    const TIME_NOW = 3;
    const TIME_FRAME_EVENT = 7;

    // Simple timestamp (in milliseconds)
    const getTimestamp = (time) => time * 1000;

    let mockWindow;
    let deps;
    let mockCallback;

    beforeEach(() => {
      mockWindow = {
        performance: {
          now: Mock.fn(() => getTimestamp(TIME_NOW)).mockName(
            "performance.now"
          ),
        },
        requestAnimationFrame: Mock.fn().mockName("requestAnimationFrame"),
      };

      deps = {
        window: mockWindow,
      };

      mockCallback = Mock.fn().mockName("callback");
    });

    it("should throw for a closed timer", () => {
      expect(() => {
        const timer = new Timer(deps);
        timer.close();
        timer.forEachAnimationFrame(() => {});
      }).toThrowSomething();
    });

    describe("without frame event", () => {
      beforeEach(() => {
        new Timer(deps).forEachAnimationFrame(mockCallback);
      });

      it("should invoke performance.now once", () => {
        expect(mockWindow.performance.now).toHaveBeenCalledTimes(1);
      });

      it("should invoke requestAnimationFrame once", () => {
        expect(mockWindow.requestAnimationFrame).toHaveBeenCalledTimes(1);
      });

      it("should not invoke the callback", () => {
        expect(mockCallback).not.toHaveBeenCalled();
      });
    });

    describe("with frame event", () => {
      beforeEach(() => {
        mockWindow.requestAnimationFrame.mock.implementation = (onFrame) =>
          onFrame(getTimestamp(TIME_FRAME_EVENT));

        mockCallback.mock.implementation = () => {
          // Reset the mock rAF implementation to avoid an endless loop
          mockWindow.requestAnimationFrame.mock.implementation = () => {};
        };

        new Timer(deps).forEachAnimationFrame(mockCallback);
      });

      it("should invoke performance.now once", () => {
        expect(mockWindow.performance.now).toHaveBeenCalledTimes(1);
      });

      it("should invoke requestAnimationFrame twice", () => {
        expect(mockWindow.requestAnimationFrame).toHaveBeenCalledTimes(2);
      });

      it("should invoke the callback once with the elapsed time", () => {
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWithShallow(
          TIME_FRAME_EVENT - TIME_NOW
        );
      });
    });
  });

  describe("close", () => {
    describe("with a running animation", () => {
      let mockWindow;

      beforeEach(() => {
        mockWindow = {
          performance: {
            now: () => 0,
          },
          requestAnimationFrame: Mock.fn((onFrame) => onFrame(0)).mockName(
            "requestAnimationFrame"
          ),
        };
      });

      it("should stop the animation", () => {
        const timer = new Timer({ window: mockWindow });
        timer.forEachAnimationFrame(() => timer.close());
        expect(mockWindow.requestAnimationFrame).toHaveBeenCalledTimes(1);
      });
    });
  });
});
