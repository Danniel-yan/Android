
function mobile(value) {
  return /^1\d{10}$/.test(value);
}

function idNO(value) {
  return /^\d{17}[\d|x|X]$/.test(value)
}

function minNumFormater(minNum) {
  return function (str) {
    var numStr = str.replace(/[^\d]/g, '');
    var num = Math.max(parseInt(numStr), minNum) || 0;
    return num.toString();
  };
}
export default {
  mobile, idNO, minNumFormater
};
