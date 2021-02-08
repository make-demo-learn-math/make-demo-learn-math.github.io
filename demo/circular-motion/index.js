import DemoContext from "../../src/DemoContext.js";
import CircularMotion from "./CircularMotion.js";

const MAIN_CANVAS_ID = "main-canvas"; // by convention

let theDemoContext;

try {
  theDemoContext = new DemoContext(MAIN_CANVAS_ID);
  new CircularMotion().start(theDemoContext);
} catch (err) {
  if (theDemoContext) {
    theDemoContext.close();
  }

  const mainWindow = window;
  mainWindow.console.error({ err }, "An unexpected error occurred");
  mainWindow.alert(`Unexpected error: ${err.message}`);
}
