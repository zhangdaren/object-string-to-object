/**
 * 栈
 */
function Stack() {
	//使用数组存储数据
	var items = []; 
	//push 方法向栈里里压入一个元素
	this.push = function(item) {
		items.push(item);
	};
	//pop 方法把栈顶的元素弹出
	this.pop = function() {
		return items.pop();
	};
	//top 方法返回栈顶元素
	this.top = function() {
		return items[items.length - 1];
	};
	//isEmpty 返回栈是否为空
	this.isEmpty = function() {
		return items.length == 0;
	};
	//size 方法返回栈的大小
	this.size = function() {
		return items.length;
	};
	//clear 清空栈
	this.clear = function() {
		items = [];
	}
}
module.exports = Stack;
