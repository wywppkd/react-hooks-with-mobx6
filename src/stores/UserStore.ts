import { makeAutoObservable } from 'mobx';

type UserType =
  | {
      name: string;
      id: number;
    }
  | undefined;

export default class UserStore {
  user: UserType = undefined;
  constructor() {
    makeAutoObservable(this);
  }
  setUserInfo(value: UserType) {
    this.user = value;
  }
}
