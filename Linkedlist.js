class NodeItem {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}


class LinkedList {
  constructor() {
    this.head = new NodeItem('head');
  }
  
  find(item) {
    let currentItem = this.head;
    while(currentItem.value !== item) {
      currentItem = currentItem.next;
    }
    return currentItem;
  }

  insert(newValue, to) {
    const target = this.find(to);
    const newNode = new NodeItem(newValue);
    if (target) {
      newNode.next = target.next;
      newNode.previous = target;
      target.next = newNode;
    }
  }

  display() {
    let currentItem = this.head;
    while(currentItem.next) {
      console.log(currentItem.next.value);
      currentItem = currentItem.next;
    }
  }
  
  findPrevious(item) {
    let currentItem = this.head;
    while(currentItem.next !== null && currentItem.next.value !== item) {
      currentItem = currentItem.next;
    }
    return currentItem;
  }

  findLast(item) {
    let currentItem = this.head;
    
  }

  remove(item) {
    const target = this.findPrevious(item);
    if (target) {
      target.previous.next = target.next;
      target.next.previous = target.previous;
      target.next = null;
      target.previous = null;
    }
  }
}

const link = new LinkedList();
link.insert('one', 'head');
link.insert('two', 'one');
link.insert('three', 'two');
link.remove('two')
link.display();