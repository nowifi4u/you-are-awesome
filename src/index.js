// DO WHATEVER YOU WANT HERE

const createEnumerableProperty = (property) => {
    /*Object.defineProperty(Object.prototype, property, {
        get: function() { return Object.prototype._value; },
        set: function(newVal) {
            Object.prototype._value = newVal
        },
        enumerable: true,
    });*/
    return property      //:3
};

const createNotEnumerableProperty = (property) => {
    Object.defineProperty(Object.prototype, property, {
        get: function(){ 
            return Object.prototype._value; 
        },
        set: function(value){
            Object.prototype._value = value
        },
    });
    return property
};

const createProtoMagicObject = () => {
    let protoMagicObject = new Function()
    Object.defineProperty(protoMagicObject, '__proto__', { value: null })
    protoMagicObject.prototype = protoMagicObject.__proto__
    return protoMagicObject
    //return Function      //Слишком читерный путь :3
};

let incCount = 0
Function.prototype.valueOf = function() {
    return incCount
};
const incrementor = () => {
    incCount++
    return incrementor
};

let asyncIncCount = 0
const asyncIncrementor = () => {
    return new Promise((resolve) => {
        asyncIncCount++
        return resolve(asyncIncCount)
    })
};

const createIncrementer = () => {
    return {
        i: 0,
        next() {
            return { value: ++this.i }
        },
        [Symbol.iterator]() {
            return {
                next: () => {
                    return this.next()
                },
            };
        },
    };
}

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (args) => {
    return new Promise((resolve) => {
        setTimeout(function(){
            resolve(args)
        }, 1100)
    })
};


const getDeepPropertiesCount = (object) => {
    let properties = Object.getOwnPropertyNames(object);
    let answer = properties.length;
    properties.forEach(property => {
        if (Object.getOwnPropertyNames(object[property]).length > 0){
            answer += getDeepPropertiesCount(object[property]);
        }
    })
    return answer;
};



const createSerializedObject = function() {
    return null
};

const sortByProto = (objects) => {
    return objects.map((object, i) => {
        let count = 0
        while (object = object.__proto__){
             count++
        }
        return [count, objects[i]]
    }).sort((l, r) => l[0] - r[0]).map(([object, i]) => i)
};

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;
