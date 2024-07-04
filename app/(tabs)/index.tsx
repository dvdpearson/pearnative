import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import TransactionListView from '@/components/TransactionListView'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Text, View } from 'react-native';
//import { styled } from 'nativewind';

//const StyledView = styled(View)
//const StyledText = styled(Text)

type TransactionsDateList = {
  id: string;
  transactions: string;
};

export default function HomeScreen() {

  fetch('https://peersunapp.mypear.xyz/api/transactions', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'apiKey': 'Cq(CdA4a.^B-IO--!2zk8>qW{{9~0}KJX',
    },
  });

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<TransactionsDateList[]>([]);

  const getTransactions = async () => {
    try {
      const response = await fetch('https://peersunapp.mypear.xyz/api/transactions');
      const json = await response.json();

      console.log('done getting data')
      setData(json);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
    return () => {
      
    };
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    console.log('getting data')
    setRefreshing(true);
    getTransactions();
    

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Transactions</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <TransactionListView data={data} />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 32,
    paddingBottom: 0,
  },
  stepContainer: {
    flex: 1
  },
  reactLogo: {
    height: 278,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
