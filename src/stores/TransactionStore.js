// @flow
import { decorate, observable, action, runInAction } from 'mobx';

import { db } from '../firebase';

const getTransactionsCollectionName = {
  development: 'dev-transactions',
  test: 'test-transactions',
  production: 'transactions'
};

const TRANSACTIONS =
  getTransactionsCollectionName[process.env.NODE_ENV || 'development'];

export class TransactionStore {
  data = [];
  total = 0;
  loading = false;
  selectedTransaction = {
    id: '',
    income: '',
    type: '',
    amount: 0,
    date: '',
    description: ''
  };

  getData = () => {
    this.loading = true;
    db.collection(TRANSACTIONS)
      .orderBy('date', 'asc')
      .onSnapshot(snapshot => {
        let newData = [];
        let total = 0;
        snapshot.forEach(doc => {
          const data = doc.data();
          newData = [{ id: doc.id, ...data }, ...newData];
          if (data.type === 'income') {
            total += data.amount;
          } else {
            total -= data.amount;
          }
        });

        runInAction(() => {
          this.total = total;
          this.data = newData;
          this.loading = false;
        });
      });
  };

  addData = (value: Object) => {
    db.collection(TRANSACTIONS)
      .doc()
      .set(value)
      .then(() => {
        console.log('ADD new transaction success');
      })
      .catch(error => {
        console.log('Error when ADD new transaction', error);
      });
  };

  updateData = (id: string, value: Object) => {
    db.collection(TRANSACTIONS)
      .doc(id)
      .set(value)
      .then(() => {
        console.log('UPDATE new transaction success');
      })
      .catch(error => {
        console.log('Error when UPDATE new transaction', error);
      });
  };

  deleteData = (id: string) => {
    db.collection(TRANSACTIONS)
      .doc(id)
      .delete()
      .then(() => {
        console.log(`DELETE transaction ${id} success`);
      })
      .catch(error => {
        console.log('Error when delete new transaction', error);
      });
  };

  setSelectedTransaction = (id: string) => {
    const selected = this.data.find(d => d.id === id);
    if (selected) {
      this.selectedTransaction = selected;
    }
  };
}

decorate(TransactionStore, {
  data: observable,
  loading: observable,
  total: observable,
  selectedTransaction: observable,
  getData: action,
  setSelectedTransaction: action
});

export default new TransactionStore();
