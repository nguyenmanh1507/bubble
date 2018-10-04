// @flow
import React, { Component } from 'react';
import { inject } from 'mobx-react';
import moment from 'moment';

import { ModalStore as ModalStoreType } from '../../stores/ModalStore';
import { TransactionStore as TransactionStoreType } from '../../stores/TransactionStore';

type Props = {
  ModalStore: ModalStoreType,
  TransactionStore: TransactionStoreType,
  data: Object
};
class TransactionItem extends Component<Props> {
  render() {
    const { openModal } = this.props.ModalStore;
    const { deleteData, setSelectedTransaction } = this.props.TransactionStore;
    const { data } = this.props;

    return (
      <div className="card mb-3">
        <div className="card-body row align-items-center">
          <div
            className={`col-md-10 d-flex justify-content-between ${
              data.type === 'income' ? 'text-success' : 'text-danger'
            }`}
          >
            <div className="mr-3">
              <div>{data.description}</div>
              <div className="text-muted small font-italic">
                {moment(data.date).fromNow()}
              </div>
            </div>
            <div>
              {data.type === 'income' ? '+' : '-'}
              {data.amount.toLocaleString('vi-VI', {
                style: 'currency',
                currency: 'VND'
              })}
            </div>
          </div>
          <div className="col-md-2 text-right">
            <button
              className="btn btn-info mr-3"
              onClick={() => {
                setSelectedTransaction(data.id);
                openModal('editTransaction');
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Are you sure?')) {
                  deleteData(data.id);
                }
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('ModalStore', 'TransactionStore')(TransactionItem);
