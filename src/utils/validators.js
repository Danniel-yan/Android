
function mobile(value) {
  return /^1\d{10}$/.test(value);
}

function idNO(value) {
  return /^\d{17}[\d|x|X]$/.test(value)
}

export default {
  mobile, idNO
};
