function mobile(value) {
    return /^1\d{10}$/.test(value);
}

function idNO(value) {
    return /^\d{17}[\d|x|X]$/.test(value)
}

function maxNumFormater(maxNum) {
    return function (str) {
        var numStr = str.replace(/[^\d]/g, '');
        num = Math.min(parseInt(numStr), maxNum) || 0;
        return num.toString();
    };
}

export default {
    mobile, idNO, maxNumFormater
};
