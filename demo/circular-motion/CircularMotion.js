export default class CircularMotion {
  async start(context) {
    const visualContext = context.visual;
    context.timer.forEachAnimationFrame((elapsedTime) => {
      const w = visualContext.canvas.width;
      const h = visualContext.canvas.height;
      const d = Math.min(w, h);
      visualContext.save();
      visualContext.translate(w / 2, h / 2);
      visualContext.scale(d / 2, -d / 2);
      visualContext.beginPath();

      const time = Date.now() / 1000;
      visualContext.arc(Math.cos(time), Math.sin(time), 0.01, 0, 2 * Math.PI);

      visualContext.restore();
      visualContext.stroke();
    });
  }
}
