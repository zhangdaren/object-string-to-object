const assert = require('assert');
const objectStringToObject = require('../object-string-to-object');

//
const key = "key";

var str1 = '{key}';
var str1_result = {
    key
};

var str2 = '{key:key,id:"index"}';
var str2_result = {
    key: key,
    id: "index"
};

var str3 = '{key: key, id: "index"}';
var str3_result = {
    key,
    id: "index"
};

var str4 = '{key: "key", id: "index"}';
var str4_result = {
    key: "key",
    id: "index"
};

var str5 = '{key, key2:\"dd\'33\'\"}';
var str5_result = {
    key,
    key2: "dd'33'"
};

var str6 = '{key:\"dd:\'33\'\"}';
var str6_result = {
    key: "dd:'33'"
};

//test
describe('#objectStringToObject.js', () => {
    describe('#objectStringToObject()', () => {
        it('objectStringToObject(str1) should return str1_result', () => {
            assert.deepStrictEqual(objectStringToObject(str1), str1_result);
        });

        it('objectStringToObject(str2) should return str2_result', () => {
            assert.deepStrictEqual(objectStringToObject(str2), str2_result);
        });

        it('objectStringToObject(str3) should return str3_result', () => {
            assert.deepStrictEqual(objectStringToObject(str3), str3_result);
        });

        it('objectStringToObject(str4) should return str4_result', () => {
            assert.deepStrictEqual(objectStringToObject(str4), str4_result);
        });

        it('objectStringToObject(str5) should return str5_result', () => {
            assert.deepStrictEqual(objectStringToObject(str5), str5_result);
        });

        it('objectStringToObject(str6) should return str6_result', () => {
            assert.deepStrictEqual(objectStringToObject(str6), str6_result);
        });
    });
});

setTimeout(() => {
    console.log("")
    console.log(objectStringToObject(str1))
    console.log(objectStringToObject(str2))
    console.log(objectStringToObject(str3))
    console.log(objectStringToObject(str4))
    console.log(objectStringToObject(str5))
    console.log(objectStringToObject(str6))
}, 300);

