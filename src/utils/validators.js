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
        if (!/^\d+(?:\.\d?)?$/.test(str) && !/^\d+(?:\.\d+)?$/.test(str)) return null;
        var legalNumStr = str.replace(/[^\d\.]/g, '');
        var num = Math.min(parseFloat(legalNumStr), maxNum) || 0;

        return num != parseFloat(legalNumStr) ? num.toString() : legalNumStr;
    };
}

function isDouble(value) {
    if (value == ''){
        return true
    }
    return /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(value)
}

//function minNumFormater(minNum) {
//    return function (str) {
//        var numStr = str.replace(/[^\d]/g, '');
//        var num = Math.max(parseInt(numStr), minNum) || 0;
//        return num.toString();
//    };
//}

function adjustNumFormater(adjustNum) {
    return function (str) {
        var numStr = str.replace(/[^\d]/g, '');
        //let num = ''
        //if (numStr < 500) {
        //    num = Math.max(parseInt(numStr), 500) || 0;
        //} else {
        //    num = Math.min(parseInt(numStr), adjustNum) || 0;
        //}
        //return num.toString();
        //if (numStr < 500) {
        //    num = Math.max(parseInt(numStr), 500) || 0;
        //    return num.toString();
        //}
        return numStr.toString();


    };
}
export default {
    mobile, idNO, maxNumFormater, isDouble, adjustNumFormater
};
