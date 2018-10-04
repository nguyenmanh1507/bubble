// @flow
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { inject, observer } from 'mobx-react';
import EditTransactionModalManager from './EditTransactionModalManager';
import { ModalStore as ModalStoreType } from '../../stores/ModalStore';
import { TransactionStore as TransactionStoreType } from '../../stores/TransactionStore';

type Props = {
  ModalStore: ModalStoreType,
  TransactionStore: TransactionStoreType
};
class EditTransactionModal extends Component<Props> {
  render() {
    const { modalName, closeModal } = this.props.ModalStore;
    const isOpen = modalName === 'editTransaction';

    return (
      <>
        <EditTransactionModalManager>
          {({
            handleSubmit,
            handleChange,
            initialValues,
            state,
            handleChangeDate,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <div
                className={`modal fade ${isOpen ? 'show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title">Edit Transaction</h3>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Type</label>
                        <div />
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="income"
                            value="income"
                            onChange={handleChange}
                            defaultChecked={initialValues.type === 'income'}
                          />
                          <label className="form-check-label" htmlFor="income">
                            Income
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="expense"
                            value="expense"
                            onChange={handleChange}
                            defaultChecked={initialValues.type === 'expense'}
                          />
                          <label className="form-check-label" htmlFor="expense">
                            Expense
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          id="amount"
                          name="amount"
                          placeholder="200.000"
                          onChange={handleChange}
                          defaultValue={initialValues.amount}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          id="desc"
                          name="description"
                          placeholder="Buy Playstation 4"
                          onChange={handleChange}
                          defaultValue={initialValues.description}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <DatePicker
                          selected={state.startDate}
                          onChange={date => {
                            handleChangeDate(date, setFieldValue);
                          }}
                          className="form-control"
                          dateFormat="LL"
                          maxDate={moment()}
                        />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </EditTransactionModalManager>
        {isOpen && <div className="modal-backdrop fade show" />}
      </>
    );
  }
}

export default inject('ModalStore', 'TransactionStore')(
  observer(EditTransactionModal)
);
