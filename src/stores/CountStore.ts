import { makeAutoObservable } from 'mobx';

type CountType = number | undefined;

export default class CountStore {
  count: CountType = undefined;
  constructor() {
    makeAutoObservable(this);
  }
  setCount(value: CountType) {
    this.count = value;
  }
}
