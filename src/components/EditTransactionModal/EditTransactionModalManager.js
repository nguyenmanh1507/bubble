// @flow
import * as React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { inject, observer } from 'mobx-react';

import { TransactionStore as TransactionStoreType } from '../../stores/TransactionStore';
import { ModalStore as ModalStoreType } from '../../stores/ModalStore';

const editTransactionSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  amount: Yup.string()
    .matches(/^[+]?\d+([.]\d+)?$/, 'Amount must be positive number')
    .required('Required'),
  description: Yup.string()
    .min(4, 'Description must be greater than 4 characters')
    .max(255, 'Description must be smaller than 255 characters')
    .required('Required')
});

type Props = {
  children: (props: Object) => React.Node,
  TransactionStore: TransactionStoreType,
  ModalStore: ModalStoreType
};
type State = { startDate: moment };
class EditTransactionManager extends React.Component<Props, State> {
  selectedDate = moment(this.props.TransactionStore.selectedTransaction.date);
  state = { startDate: this.selectedDate };

  handleChangeDate = (date: moment) => {
    this.setState({ startDate: date });
  };

  handleSubmit = async (value: Object, { resetForm }) => {
    const { id } = this.props.TransactionStore.selectedTransaction;
    value.date = moment(this.state.startDate).format();
    await this.props.TransactionStore.updateData(id, value);
    resetForm();
    this.props.ModalStore.closeModal();
  };

  render() {
    const { selectedTransaction: data } = this.props.TransactionStore;
    return (
      <Formik
        initialValues={{
          type: data.type,
          amount: data.amount,
          description: data.description,
          date: data.date
        }}
        onSubmit={this.handleSubmit}
        validationSchema={editTransactionSchema}
        enableReinitialize={true}
      >
        {formikProps =>
          this.props.children({
            ...formikProps,
            state: this.state,
            handleChangeDate: this.handleChangeDate
          })
        }
      </Formik>
    );
  }
}

export default inject('TransactionStore', 'ModalStore')(
  observer(EditTransactionManager)
);
