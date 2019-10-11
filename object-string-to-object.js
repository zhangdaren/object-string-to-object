
const Stack = require('./stack');

/**
 * 将object字符串解析为object
 * var a = "{setting:setting,id:\"index\"}";             ==> {"setting": setting, "id": "index"}
 * var b = "{title}";                                    ==> {"title": "title"}
 * var c = "{showModal, photoUrl}";                      ==> {"showModal": "showModal", "photoUrl": "photoUrl"}
 * var d = "{showModal, photoUrl: '2,2:\"fds\"afds'}";   ==> {"showModal": "showModal", "photoUrl": '2,2:\"fds\"afds'}
 * @param {*} string 
 */
function stringToObject(string) {
	// 预处理：先判断两侧是否有{}
	var stringBak = string;
	stringBak = stringBak.replace(/^{/, '').replace(/}$/, '');

	//开始转换
	var object = {}; //最后的结果
	var stack = new Stack();
	var hasMark = false; //表明当前字符串是否位于引号里
	var lastKey = ""; //上个key
	for (var i = 0; i < stringBak.length; i++) {
		var item = stringBak[i];
		if (item == ":") {
			if (hasMark) {
				//如果当前位于引号里
				stack.push(item);
				continue;
			}
			//从栈里取出当前的key
			var tmpArr = [];
			while (stack.top()) {
				tmpArr.unshift(stack.pop());
			}
			var key = tmpArr.join('').trim();
			lastKey = key;
			object[key] = "";
		} else if (item == ",") {
			if (hasMark) {
				//如果当前位于引号里
				stack.push(item);
				continue;
			}
			//从栈里取出当前的value
			var tmpArr = [];
			while (stack.top()) {
				tmpArr.unshift(stack.pop());
			}
			var value = tmpArr.join('').trim();
			if (lastKey) {
				//如果上一个字段是key的话
				object[key] = value.replace(/^"/, '').replace(/"$/, '');
				lastKey = value;
			} else {
				object[value] = value;
			}
		} else if (item == "\"" || item == "'") {
			stack.push(item);
			if (hasMark) {
				hasMark = false;
			} else {
				hasMark = true;
			}
		} else if (item != " ") {
			stack.push(item);
		}
	}
	//循环结束后，栈里面可能还会有字符串
	var tmpArr = [];
	while (!stack.isEmpty()) {
		tmpArr.unshift(stack.pop());
	}
	var key = tmpArr.join('').trim();
	if (lastKey) {
		//如果上一个字段是key的话，那么本个字段就当作value
		object[lastKey] = key.replace(/^"/, '').replace(/"$/, '');
	} else {
		//如果上一个字段已经匹配完，那么这里就把自身当作key，也作为value
		object[key] = key;
	}
	return object;
}

if (typeof module === 'object' && module.exports) {
	module.exports = stringToObject;
}
