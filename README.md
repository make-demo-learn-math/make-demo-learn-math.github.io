# make-demo-learn-math

- Making a demo or a simple game can be a great way to learn math
- You can do this with just a Raspberry Pi and VSCode
- Here some of the cool mathematical concepts that I've learned myself over the years

| Demo                                | Math                            |
| ----------------------------------- | ------------------------------- |
| Distant stars (click for next view) | simple hash (position to color) |
| Point clusters on planet            | reference frames, hypoteuse     |
| Camera motion                       | quaternions, SLERP              |

## Feature Flags

```javascript
class FeatureSet {
  constructor(names) {
    this.names = names;
    this.state = (1 << names.length) - 1;
  }

  toString() {
    let result = "Feature Set:\n";
    let mask = 1;
    for (const name of this.names) {
      result += `${mask}: ${name}\n`;
      mask <<= 1;
    }
    return result;
  }

  isSet(name) {
    const index = this.names.indexOf(name);
    return index > -1 && !!(this.state & (1 << index));
  }
}

const TheDemo = {
  features: new FeatureSet([
    "distant-stars",
    "point-clusters",
    "camera-motion",
  ]),
};

TheDemo.features.state = 7; // turns on the first 3 features
TheDemo.features.toString(); // lists each feature and its numeric value
```
