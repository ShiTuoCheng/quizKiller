// 原型链继承
function child () {

}

function parent () {
  this.name = 'fuck';
}

child.prototype = new parent();

// 构造函数继承
function parent1 () {
  this.name = 'fuck';
}

function child1 () {
  parent1.call(this)
}

// 组合继承
function parent2 () {
  this.name = 'fuck';
}

function child2 () {
  parent2.call(this);
}

child2.prototype = new parent2();

// 寄生组合继承
function parent3 () {
  this.name = 'fuck';
}

function child3 () {
  parent3.call(this);
}

child3.prototype = Object.create(parent3);
child3.prototype.constructor = child3


