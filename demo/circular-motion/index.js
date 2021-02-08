import DemoContext from "../../src/DemoContext.js";
import CircularMotion from "./CircularMotion.js";

const MAIN_CANVAS_ID = "main-canvas"; // by convention

let theContext;

const start = async (mainWindow) => {
  try {
    theContext = new DemoContext(MAIN_CANVAS_ID);
    await new CircularMotion().start(theContext);
    mainWindow.console.log("Demo started");
  } catch (err) {
    if (theContext) {
      theContext.close();
    }

    mainWindow.console.error({ err }, "An unexpected error occurred");
    mainWindow.alert(`Unexpected error: ${err.message}`);
  }
};

start(window);
