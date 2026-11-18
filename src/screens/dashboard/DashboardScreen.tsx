import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomNavBar, TabName } from '../../components/common/BottomNavBar';
import HomeScreen from '../home/HomeScreen';
import BookingsScreen from '../bookings/BookingsScreen';
import ProfileScreen from '../profile/ProfileScreen';

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');

  return (
    <View className="flex-1 relative">
      {activeTab === 'Home' && <HomeScreen onTabChange={setActiveTab} />}
      {activeTab === 'Bookings' && <BookingsScreen />}
      {activeTab === 'Profile' && <ProfileScreen />}

      <View className="absolute bottom-0 left-0 right-0 z-30">
        <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </View>
  );
}
