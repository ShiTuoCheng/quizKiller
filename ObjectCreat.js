/**
 * 模拟object.create
 */

const obj1 = { id: 1 };

function _create(target) {
  function temp() {}
  temp.prototype = target;

  return new temp();
}

const obj2 = _create(obj1);
console.log(Reflect.getPrototypeOf(obj2) === obj1); // true
console.log(obj2.id); // 1