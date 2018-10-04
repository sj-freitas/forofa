const { Iterable } = require("./../lib");

const toPascalCase = word => {
  const begining = word.toUpperCase()[0];
  const ending = word.toLowerCase().slice(1);

  return `${begining}${ending}`;
};

class SentenceHelper extends Iterable {
  toCamelCase() {
    const pascalCased = super.skip(1).map(t => toPascalCase(t));
    const camelCased = super
      .take(1)
      .map(t => t.toLowerCase())
      .concat(pascalCased);

    return new this.constructor(camelCased);
  }

  toString() {
    let result = "";

    for (const curr of this.iterable) {
      result += curr;
    }
    return result;
  }
}

// Will show "thisIsASentence"
const sentence = ["  thIs  ", "   is  ", "   a  ", " sentence   "];
const result = new SentenceHelper(sentence)
  .map(t => t.trim())
  .toCamelCase()
  .toString();

console.log(result);
