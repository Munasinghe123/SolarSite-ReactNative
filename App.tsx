import './global.css';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-950">
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;