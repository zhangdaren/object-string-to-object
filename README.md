# object string to object   
   
将object string解析为object（string为object转换的字符串，里面key是没有引号包围的），如：   

```js
var str = '{key:"abc"}';
```
转换后：   
```js
var obj = {key:"abc"};
```
   
虽然这种情况也是可以使用```eval('(' + str +')')```来实现解析为object的，
如果使用了es6变量简写时，如```var str = '{key:"abc", key2}';```，那么eval()就不能识别了。   
   
而使用```JSON.parse(str)```时，会报错：VM125:1 Uncaught SyntaxError: Unexpected token k in JSON at position 1，因为key不含引号。   
   
之所做这个，是因为在做小程序转uni-app工具时，遇到template标签上面有参数(如```{key:key,id:"index"}```)，需要将它提取出来，这时就想到将它转为object或json不就能直接取出来了嘛，而使用已知的方法都没法弄，只好自已写代码来进行解析了。   
   

## 安装   
   
```js
$ npm install object-string-to-object
```
  
## 使用方法   
   
```
const objectStringToObject = require('object-string-to-object');

var string = '{key:key,id:"index"}';

var object = objectStringToObject(string);

console.log(object);
```
   
输出：   
```
Object {key: "key", id: "index"}
```
   

## LICENSE
This repo is released under the [MIT](http://opensource.org/licenses/MIT).
