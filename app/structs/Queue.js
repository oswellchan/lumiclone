export class Queue {
  constructor() {
    this.current = 0;
    this.store = [];
  }

  size() {
    return this.store.length - this.current;
  }

  enqueue(data) {
    this.store.push(data);
  }

  peek() {
    if (this.current >= this.store.length) {
      return null;
    }
    return this.store[this.current];
  }

  dequeue() {
    if (this.current >= this.store.length) {
      return null;
    }

    const deq = this.store[this.current];
    if (this.current > this.store.length / 2) {
      this.store = this.store.slice(0, this.current);
      this.current = 0;
    }

    return deq;
  }
}
