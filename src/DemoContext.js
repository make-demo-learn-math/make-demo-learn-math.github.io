import Features from "./Features.js";
import Pseudorandom from "./Pseudorandom.js";
import Timer from "./Timer.js";
import Ui from "./Ui.js";

export default class DemoContext {
  constructor(
    canvasId,
    featureNames = [],
    deps = { Features, Pseudorandom, Timer, Ui, window: globalThis }
  ) {
    const canvas = deps.window.document.getElementById(canvasId);
    if (!canvas) {
      throw new Error(`No element found with ID ${canvasId}`);
    }

    this.features = new deps.Features(featureNames);
    this.pseudorandom = new deps.Pseudorandom();
    this.timer = new deps.Timer();
    this.ui = new deps.Ui(canvas);
    this.visual = canvas.getContext("2d");

    // Automatically resize the canvas
    this.timer.forEachAnimationFrame(() => this.ui.autoSize(deps.window));
  }

  close() {
    if (this.timer) {
      this.timer.close();
    }
  }
}
