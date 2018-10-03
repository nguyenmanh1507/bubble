// @flow
import { decorate, observable, action, runInAction } from 'mobx';

import { db } from '../firebase';

export class TransactionStore {
  data = [];
  total = 0;
  loading = false;

  getData = () => {
    this.loading = true;
    db.collection('transactions')
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
    db.collection('transactions')
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
    db.collection('transactions')
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
    db.collection('transactions')
      .doc(id)
      .delete()
      .then(() => {
        console.log(`DELETE transaction ${id} success`);
      })
      .catch(error => {
        console.log('Error when delete new transaction', error);
      });
  };
}

decorate(TransactionStore, {
  data: observable,
  loading: observable,
  total: observable,
  getData: action
});

export default new TransactionStore();
