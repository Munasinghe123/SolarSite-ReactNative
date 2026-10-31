import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Home, CalendarCheck, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export type TabName = 'Home' | 'Bookings' | 'Profile';

export interface BottomNavBarProps {
  activeTab?: TabName;
  onTabPress?: (tabName: TabName) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'Home',
  onTabPress,
}) => {
  const navigation = useNavigation();

  const handlePress = (tabName: TabName) => {
    if (onTabPress) {
      onTabPress(tabName);
    } else {
      try {
        navigation.navigate(tabName as any);
      } catch (e) {
        console.log(`Navigate to ${tabName}`);
      }
    }
  };

  const renderIcon = (tabName: TabName, color: string, size: number) => {
    switch (tabName) {
      case 'Home':
        return <Home color={color} size={size} />;
      case 'Bookings':
        return <CalendarCheck color={color} size={size} />;
      case 'Profile':
        return <User color={color} size={size} />;
    }
  };

  const tabs: { name: TabName; label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'Bookings', label: 'Bookings' },
    { name: 'Profile', label: 'Profile' },
  ];

  return (
    <View 
      className="w-full bg-[#103D2B] flex-row items-center justify-around rounded-t-[36px] border-t border-emerald-900/40 shadow-2xl"
      style={{ 
        paddingTop: hp('1%'), 
        paddingBottom: hp('1%') 
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.name;
        const iconColor = isActive ? '#FFC80A' : '#A7F3D0';
        const textColor = isActive ? 'text-[#FFC80A]' : 'text-emerald-200';

        return (
          <TouchableOpacity
            key={tab.name}
            activeOpacity={0.8}
            onPress={() => handlePress(tab.name)}
            className="items-center px-6 py-1"
          >
            {renderIcon(tab.name, iconColor, 22)}
            <Text 
              style={{ fontSize: hp('1.4%') }}
              className={`font-semibold mt-1 ${textColor}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavBar;
