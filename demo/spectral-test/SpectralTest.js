const MODULUS = 31;
const MULTIPLIER = 13; // A=3, B=13
const INITIAL_SEED = 27;
const NUM_SAMPLES = 12;

export default class SpectralTest {
  async start(context) {
    const visualContext = context.visual;
    let output = [];
    context.timer.forEachAnimationFrame((elapsedTime) => {
      const w = visualContext.canvas.width;
      const h = visualContext.canvas.height;
      const d = Math.min(w, h) / MODULUS;
      visualContext.save();
      visualContext.translate(0, h);
      visualContext.scale(d, -d);

      const lcg = (previous) => (MULTIPLIER * previous) % MODULUS;
      let seed = INITIAL_SEED;
      for (let i = 0; i < NUM_SAMPLES; i++) {
        if (output) output.push(seed);
        const previous = seed;
        seed = lcg(previous);
        visualContext.fillRect(seed, previous, 0.25, 0.25);
      }

      if (output) console.log({ output }, "Output");
      output = null;

      visualContext.restore();
    });
  }
}
