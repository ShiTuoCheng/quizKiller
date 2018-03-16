/*根据关键词找出 所在对象id */
/*jshint esversion: 6 */

var docs = [
  {
    id: 1,
    words: ['hello', "world"]
  }, {
    id: 2,
    words: ['hello', "hihi"]
  }, {
    id: 3,
    words: ['haha', "hello"]
  }, {
    id: 4,
    words: ['world', "nihao"]
  }
];

// low 时间复杂度 n^2
const findDocList = (docs, keyWords = []) => {
  if(!Array.isArray(docs)){
    return;
  }

  const ids = [];

  for (const doc of docs) {
    for (const keyWord of keyWords) {
      if (doc.words.includes(keyWord)) {
        ids.push(doc.id);
      }
    }
  }

  return [...new Set(ids)];
};
