function mobile(value) {
    return /^1[34578]\d{9}$/.test(value);
}

function idNO(value) {
    return /^\d{17}[\d|x|X]$/.test(value)
}

function floatNum(num) {
    return /^\d+(?:\.\d?)?$/.test(num) || /^\d+(?:\.\d+)?$/.test(num);
}

function maxNumFormater(maxNum) {
    return function (str) {
        var numStr = str.replace(/[^\d]/g, '');
        var num = Math.min(parseInt(numStr), maxNum) || 0;
        return num.toString();
    };
}

function maxFloatFormater(maxNum) {
    return function (str) {
        if(!/^\d+(?:\.\d?)?$/.test(str) && !/^\d+(?:\.\d+)?$/.test(str)) return null;
        var legalNumStr = str.replace(/[^\d\.]/g, '');
        var num = Math.min(parseFloat(legalNumStr), maxNum) || 0;

        return num != parseFloat(legalNumStr) ? num.toString() : legalNumStr;
    };
}

export default {
    mobile, idNO, maxNumFormater
};
