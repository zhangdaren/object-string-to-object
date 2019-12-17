
const Stack = require('./stack');

/**
 * 将object字符串解析为object
 * let a = "{setting:setting,id:\"index\"}";             ==> {"setting": setting, "id": "index"}
 * let b = "{title}";                                    ==> {"title": "title"}
 * let c = "{showModal, photoUrl}";                      ==> {"showModal": "showModal", "photoUrl": "photoUrl"}
 * let d = "{showModal, photoUrl: '2,2:\"fds\"afds'}";   ==> {"showModal": "showModal", "photoUrl": '2,2:\"fds\"afds'}
 * @param {*} string 
 */
function stringToObject(string) {
	// 预处理：先判断两侧是否有{}
	let stringBak = string;
	stringBak = stringBak.replace(/^{/, '').replace(/}$/, '');

	//开始转换
	let object = {}; //最后的结果
	let stack = new Stack();
	let hasMark = false; //表明当前字符串是否位于引号里
	let hasSquareBrackets = false; //中括号
	let lastKey = ""; //上个key
	for (let i = 0; i < stringBak.length; i++) {
		let item = stringBak[i];
		if (item == ":") {
			if (hasMark || hasSquareBrackets) {
				//如果当前位于引号里
				stack.push(item);
				continue;
			}
			//从栈里取出当前的key
			let tmpArr = [];
			while (stack.top()) {
				tmpArr.unshift(stack.pop());
			}
			let key = tmpArr.join('').trim();
			lastKey = key;
			object[key] = "";
		} else if (item == ",") {
			if (hasMark || hasSquareBrackets) {
				//如果当前位于引号里
				stack.push(item);
				continue;
			}
			//从栈里取出当前的value
			let tmpArr = [];
			while (stack.top()) {
				tmpArr.unshift(stack.pop());
			}
			let value = tmpArr.join('').trim();
			if (lastKey) {
				//如果上一个字段是key的话
				object[lastKey] = value.replace(/^"/, '').replace(/"$/, '');
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
		} else if (item == "[") {
			stack.push(item);
			hasSquareBrackets = true;
		} else if (item == "]") {
			stack.push(item);
			hasSquareBrackets = false;
		} else if (item != " ") {
			stack.push(item);
		}
	}
	//循环结束后，栈里面可能还会有字符串
	let tmpArr = [];
	while (!stack.isEmpty()) {
		tmpArr.unshift(stack.pop());
	}
	let key = tmpArr.join('').trim();
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
