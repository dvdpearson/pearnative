import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  transactionName: {
    padding: 5,
    fontSize: 12,
    width: '75%'
  },
  transactionAmount: {
    fontSize: 12,
    width: '25%'
  },
  transactionItem: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  }
});

type TransactionsDateList = {
    data: [{
        id: string;
        transactions: string;
    }]
  };

const TransactionListView = (data: TransactionsDateList) => {

    let transactionDates = data.data;
    const sectionz: any = [];

    //console.log(transactionDates)

    let days = 5;
    let i = 0;

    transactionDates.forEach((dt) => {
        //console.log(dt)
        i++;
        if (i > 5) { return false; }
        sectionz.push({
            title: dt.id,
            data: dt.transactions
        });
    });

    //console.log(sectionz)

  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionz}
        renderItem={({item}) => (
            <View style={styles.transactionItem}>
                <Text style={styles.transactionName}>{item.plaid_transaction_name}</Text>
                <Text style={styles.transactionAmount}>{item.plaid_transaction_amount}</Text>
            </View>
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item.id}`}
      />
    </View>
  );
};

export default TransactionListView;