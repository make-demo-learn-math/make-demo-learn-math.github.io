# make-demo-learn-math

- Making a demo or a simple web game can be a great way to learn math
- You can do this with just a Raspberry Pi and VSCode
- Here is a demo that I wrote to try out some possible game mechanics
- You are in orbit around a fictitious Mars-like planet
- Every player sees the same planet from the same orbit (currently it's only client side, so we need to design that in)
- Here are some of the mathematical concepts that I've learned from it:

| Feature                          | Math Concept                         |
| -------------------------------- | ------------------------------------ |
| Simple orbit                     | Kepler's third law, circular motion  |
| Smooth transitions between views | quaternions, SLERP                   |
| Point clusters on planet         | LCG w/seed, hypershere point picking |

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
