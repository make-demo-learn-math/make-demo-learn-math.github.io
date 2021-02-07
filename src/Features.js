export default class Features {
  constructor(names) {
    this.names = names;
    this.state = (1 << names.length) - 1;
  }

  toString() {
    let result = "Features:\n";
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
