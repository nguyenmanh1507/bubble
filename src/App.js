// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { ModalStore as ModalStoreType } from './stores/ModalStore';
import { TransactionStore as TransactionStoreType } from './stores/TransactionStore';
import TransactionItem from './components/TransactionItem';
import AddTransactionModal from './components/AddTransactionModal';
import EditTransactionModal from './components/EditTransactionModal';

type Props = {
  ModalStore: ModalStoreType,
  TransactionStore: TransactionStoreType
};
class App extends Component<Props> {
  componentDidMount() {
    this.props.TransactionStore.getData();
  }

  render() {
    const { openModal } = this.props.ModalStore;
    const { data, total, loading } = this.props.TransactionStore;
    return (
      <div className="bg-light">
        <div className="container py-5">
          <h3>Total:</h3>
          <h1 className="mb-5">
            {total.toLocaleString('vi-VI', {
              style: 'currency',
              currency: 'VND'
            })}
          </h1>
          <div className="d-flex">
            <button
              className="btn btn-primary mr-3"
              onClick={() => {
                openModal('addTransaction');
              }}
            >
              Add transaction
            </button>
            <button className="btn btn-secondary">View reports</button>
          </div>
          <hr />

          {loading && (
            <div className="text-center py-3 text-info">
              <i className="fas fa-spinner fa-3x fa-spin" />
            </div>
          )}

          {data.map((d, index) => (
            <TransactionItem key={d.id} data={d} />
          ))}
        </div>
        {<AddTransactionModal />}
        {<EditTransactionModal />}
      </div>
    );
  }
}

export default inject('ModalStore', 'TransactionStore')(observer(App));
