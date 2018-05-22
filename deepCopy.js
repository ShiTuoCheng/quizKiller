/*jshint esversion:6 */

function deepCopy(obj){

  let copyObj;

  if(!obj && typeof obj !== 'object'){

    return;
  }

  if(Array.isArray(obj)){

    copyObj = [];
  }else{
    copyObj = {};
    copyObj.constructor = obj;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const prop = obj[key];
      
      if(typeof prop === 'object'){

        copyObj[key] = deepCopy(prop);
      }else{
        copyObj[key] = prop;
      }
    }
  }

  return deepCopy;
}

function fibonachi(n, a=0, b=1) {

  if(n === 1) return 1;
  if(n === 0) return;

  return fibonachi(n - 1, a, b+a);
}