var _ = require('underscore');

exports.checkBody = function(params){
    if ('undefined' == typeof params)
        return false;
    var size = arguments.length;
    for (let i = 1; i < size; i++){
        let properties = arguments[i].split('.');
        let prop = properties.shift();
        if (prop[0] == '?'){
            prop = prop.substring(1, prop.length);
            if (typeof params[prop] == "undefined" || params[prop] == null)
                continue;
        }
        if (properties.length > 0){
            if (prop.indexOf('[]') != -1){ // Array
                prop = prop.substring(0, prop.length - 2);
                if (params[prop] == null)
                    return true;
                else if (!Array.isArray(params[prop]))
                    return "Please set the parameter '" + prop + "' as a array'";
                else {
                    for (var o = 0; o < params[prop].length; o++){
                        if ((r = this.checkBody(params[prop][o], properties.join('.'))) !== true)
                            return r + " in '" + prop + "' array object";
                    }
                }
            } else if (typeof params[prop] == "undefined") {
                return "Please set the parameter '" + arguments[i].replace('?', '') + "'"
            } else if (this.checkBody(params[prop], properties.join('.')) !== true) {
                return "Please set the parameter '" + arguments[i].replace('?', '') + "'";
            }
        } else if (prop.indexOf('[]') != -1){
            prop = prop.substring(0, prop.length - 2);
            if (params[prop] == null)
                return true;
            else if (!Array.isArray(params[prop]))
                return "Please set the parameter '" + prop + "' as a array'";
        } else if (typeof params[prop] == "undefined") {
            return "Please set the parameter '" + arguments[i].replace('?', '') + "'"
        }
    }
    return true;
};

exports.filter = function(objects, filterName, value){
    return _.filter(objects, function(obj){
        if (typeof obj[filterName] == 'undefined' || obj[filterName] == null) {
            return false;
        }else if (_.isArray(obj[filterName]) && _.contains(obj[filterName], value)){
            return true;
        } else if (obj[filterName] == value){
            return true;
        }
        return false;
    });
};

exports.isValidNumber = function(number){
    number = parseFloat(number);
    if (isNaN(number) || !isFinite(number))
        return false;
    return true;
};

exports.sortBy = function(objects, attr){
    if (typeof attr == 'undefined' || attr == null)
        return objects;
    else
        return _.sortBy(objects, attr);
};

exports.deleteAttributeArray = function(objects, size, attributeName){
    if ('undefined' == typeof objects || size <= 0)
        return objects;
    for (let i = 0; i < size; i++){
        delete objects[i][attributeName];
    }
    return objects;
};