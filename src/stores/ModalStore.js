// @flow
import { decorate, observable, action } from 'mobx';

export class ModalStore {
  modalName = '';

  openModal = (name: string) => {
    this.modalName = name;
  };

  closeModal = () => {
    this.modalName = '';
  };
}

decorate(ModalStore, {
  modalName: observable,
  openModal: action,
  closeModal: action
});

export default new ModalStore();
