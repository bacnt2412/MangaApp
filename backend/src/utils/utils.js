const Object = {
  addValueInObject: (object, key, value) => {
    var res = {};
    var textObject = JSON.stringify(object);

    if (textObject === '{}') {
      res = JSON.parse('{"' + key + '":"' + value + '"}');
    } else {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
        res = JSON.parse(
          '{' +
            textObject.substring(1, textObject.length - 1) +
            ',"' +
            key +
            '":' +
            value +
            '}'
        );
      } else {
        res = JSON.parse(
          '{' +
            textObject.substring(1, textObject.length - 1) +
            ',"' +
            key +
            '":"' +
            value +
            '"}'
        );
      }
    }
    return res;
  }
};
module.exports = {
  Object
};
