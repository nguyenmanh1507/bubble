// @flow
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import { ModalStore as ModalStoreType } from '../../stores/ModalStore';
import AddTransactionManager from './AddTransactionModalManager';

type Props = { ModalStore: ModalStoreType };
class AddTransactionModal extends Component<Props> {
  render() {
    const { modalName, closeModal } = this.props.ModalStore;
    const isOpen = modalName === 'addTransaction';

    return (
      <>
        <AddTransactionManager>
          {({
            handleSubmit,
            handleChange,
            state,
            handleChangeDate,
            setFieldValue,
            isSubmitting,
            isValidating,
            errors,
            touched,
            values
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
                      <h3 className="modal-title">Add Transaction</h3>
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
                            className={`form-check-input ${
                              errors.type ? 'is-invalid' : ''
                            }`}
                            type="radio"
                            name="type"
                            id="income"
                            value="income"
                            onChange={handleChange}
                            defaultChecked={true}
                          />
                          <label className="form-check-label" htmlFor="income">
                            Income
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className={`form-check-input ${
                              errors.type ? 'is-invalid' : ''
                            }`}
                            type="radio"
                            name="type"
                            id="expense"
                            value="expense"
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="expense">
                            Expense
                          </label>
                        </div>
                        {errors.type && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.type}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                          type="number"
                          className={`form-control ${
                            errors.amount && touched.amount ? 'is-invalid' : ''
                          }`}
                          id="amount"
                          name="amount"
                          placeholder="200.000"
                          onChange={handleChange}
                          value={values.amount}
                        />
                        {errors.amount && touched.amount ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.amount}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.description && touched.description
                              ? 'is-invalid'
                              : ''
                          }`}
                          id="desc"
                          name="description"
                          placeholder="Buy Playstation 4"
                          onChange={handleChange}
                          value={values.description}
                        />
                        {errors.description && touched.description ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.description}
                          </div>
                        ) : null}
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
                        type="submit"
                        className="btn btn-primary"
                        disabled={isValidating || isSubmitting}
                      >
                        Add new
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </AddTransactionManager>

        {isOpen && <div className="modal-backdrop fade show" />}
      </>
    );
  }
}

export default inject('ModalStore')(observer(AddTransactionModal));
