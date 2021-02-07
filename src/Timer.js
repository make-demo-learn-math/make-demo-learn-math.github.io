export default class Timer {
  constructor(deps = { window: globalThis }) {
    this.window = deps.window;
    this.isClosed = false;
  }

  async sleep(millis) {
    return new Promise((resolve) => {
      this.window.setTimeout(resolve, millis);
    });
  }

  forEachAnimationFrame(callback) {
    if (this.isClosed) {
      throw new Error("Animation attempt failed. Timer closed.");
    }

    let previousTimestamp;
    const onFrame = (timestamp) => {
      const elapsedTime = (timestamp - previousTimestamp) / 1000;
      previousTimestamp = timestamp;

      callback(elapsedTime);

      if (!this.isClosed) {
        this.window.requestAnimationFrame(onFrame);
      }
    };

    previousTimestamp = this.window.performance.now();
    this.window.requestAnimationFrame(onFrame);
  }

  close() {
    this.isClosed = true;
  }
}
