// @flow
import { decorate, observable, action, computed } from 'mobx';

export class SampleStore {
  name: string = 'ngmanh';
  age: number = 27;

  get getInfo(): string {
    return `${this.name} ::: ${this.age}`;
  }

  nextAge = () => {
    this.age = this.age + 1;
  };
}

decorate(SampleStore, {
  name: observable,
  age: observable,
  nextAge: action,
  getInfo: computed
});

export default new SampleStore();
