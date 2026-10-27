import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Solar Grid</Text>
        <Text style={styles.subtitle}>
          Power your journey bro.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#64748B',
  },
});

export default App;