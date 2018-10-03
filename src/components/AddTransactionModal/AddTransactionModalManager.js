// @flow
import * as React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { inject } from 'mobx-react';

import { TransactionStore as TransactionStoreType } from '../../stores/TransactionStore';
import { ModalStore as ModalStoreType } from '../../stores/ModalStore';

const addTransactionSchema = Yup.object().shape({
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
class AddTransactionManager extends React.Component<Props, State> {
  state = { startDate: moment() };

  handleChangeDate = (date: moment) => {
    this.setState({ startDate: date });
  };

  handleSubmit = async (values: Object, { resetForm }) => {
    values.date = moment(this.state.startDate).format();
    await this.props.TransactionStore.addData(values);
    resetForm();
    this.props.ModalStore.closeModal();
  };

  render() {
    return (
      <Formik
        initialValues={{
          type: 'income',
          amount: '',
          description: '',
          date: ''
        }}
        onSubmit={this.handleSubmit}
        validationSchema={addTransactionSchema}
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

export default inject('TransactionStore', 'ModalStore')(AddTransactionManager);
