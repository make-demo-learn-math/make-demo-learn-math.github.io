export default class CircularMotion {
  start(demoContext) {
    const visualContext = demoContext.visual;
    let time = 0;
    demoContext.timer.forEachAnimationFrame((elapsedTime) => {
      const w = visualContext.canvas.width;
      const h = visualContext.canvas.height;
      const d = Math.min(w, h);
      visualContext.save();
      visualContext.translate(w / 2, h / 2);
      visualContext.scale(d / 2, -d / 2);
      visualContext.beginPath();

      visualContext.arc(0, Math.sin(time), 0.01, 0, 2 * Math.PI);
      visualContext.arc(Math.cos(time), 0, 0.01, 0, 2 * Math.PI);
      visualContext.arc(Math.cos(time), Math.sin(time), 0.01, 0, 2 * Math.PI);

      visualContext.restore();
      visualContext.stroke();
      time += elapsedTime;
    });
  }
}
