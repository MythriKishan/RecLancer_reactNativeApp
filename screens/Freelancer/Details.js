import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Card from '../../components/Card';
const Details = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Basic CardView Example</Text>
        </Card>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      alignItems: 'center', // Centered horizontally
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.white,
    },
    card: {
      height: 30,
      width: '100%',
      backgroundColor: '#f18484',
      justifyContent: 'center', //Centered vertically
      alignItems: 'center', // Centered horizontally
    },
  });
  export default Details;