/*jshint esversion:6 */

const deepCopy = (obj, cache = new WeakMap()) => {

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

  if (cache.has(obj)) {
    return cache.get(obj);
  }

  cache.set(obj, copyObj);

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
};