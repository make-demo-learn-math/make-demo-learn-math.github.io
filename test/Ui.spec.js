import { describe, it, expect, beforeEach } from "../src/specish/specish.js";
import Mock from "../src/specish/Mock.js";
import Ui from "../src/Ui.js";

describe("Ui", () => {
  describe("constructor", () => {
    it("should save the canvas element", () => {
      const canvasElement = {};
      expect(new Ui(canvasElement).canvasElement).toBe(canvasElement);
    });

    it("should throw for a null element", () => {
      expect(() => new Ui(null)).toThrowSomething();
    });
  });

  describe("autoSize", () => {
    let canvasElement;
    let mainWindow;

    beforeEach(() => {
      canvasElement = {};
      mainWindow = {
        innerWidth: 7,
        innerHeight: 3,
      };

      new Ui(canvasElement).autoSize(mainWindow);
    });

    it("should set canvas width to window inner width", () => {
      expect(canvasElement.width).toBe(mainWindow.innerWidth);
    });

    it("should set canvas height to window inner height", () => {
      expect(canvasElement.height).toBe(mainWindow.innerHeight);
    });
  });

  describe("userClick", () => {
    let canvasElement;

    beforeEach(() => {
      canvasElement = {
        removeEventListener: Mock.fn().mockName("removeEventListener"),
        addEventListener: Mock.fn().mockName("addEventListener"),
      };
    });

    describe("without click event", () => {
      beforeEach(() => {
        new Ui(canvasElement).userClick();
      });

      it("should invoke addEventListener once", () => {
        expect(canvasElement.addEventListener).toHaveBeenCalledTimes(1);
      });

      it("should not invoke removeEventListener", () => {
        expect(canvasElement.removeEventListener).not.toHaveBeenCalled();
      });
    });

    describe("with click event", () => {
      beforeEach(() => {
        canvasElement.addEventListener.mock.implementation = (type, listener) =>
          listener();
        new Ui(canvasElement).userClick();
      });

      it("should invoke addEventListener once", () => {
        expect(canvasElement.addEventListener).toHaveBeenCalledTimes(1);
      });

      it("should invoke removeEventListener once", () => {
        expect(canvasElement.removeEventListener).toHaveBeenCalledTimes(1);
      });
    });
  });
});
