import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LandingScreen from '../screens/landing/LandingScreen';


export const AppNavigator: React.FC = () => {
  

  return (
    <View className="flex-1 bg-slate-950">
      <LandingScreen />
      

     
    </View>
  );
};
