import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Home, CalendarCheck, User } from 'lucide-react-native';

export type TabName = 'Home' | 'Bookings' | 'Profile';

export interface BottomNavBarProps {
  activeTab?: TabName;
  onTabPress?: (tabName: TabName) => void;
}

export function BottomNavBar({
  activeTab ,
  onTabPress,
}: BottomNavBarProps) {
  return (
    <View 
      className="w-full bg-[#103D2B] flex-row items-center justify-around rounded-t-[36px] border-t border-emerald-900/40 shadow-2xl"
      style={{ paddingTop: hp('1%'), paddingBottom: hp('1%') }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabPress?.('Home')}
        className="items-center px-6 py-1"
      >
        <Home color={activeTab === 'Home' ? '#FFC80A' : '#A7F3D0'} size={22} />
        <Text 
          style={{ fontSize: hp('1.4%') }}
          className={`font-semibold mt-1 ${activeTab === 'Home' ? 'text-[#FFC80A]' : 'text-emerald-200'}`}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabPress?.('Bookings')}
        className="items-center px-6 py-1"
      >
        <CalendarCheck color={activeTab === 'Bookings' ? '#FFC80A' : '#A7F3D0'} size={22} />
        <Text 
          style={{ fontSize: hp('1.4%') }}
          className={`font-semibold mt-1 ${activeTab === 'Bookings' ? 'text-[#FFC80A]' : 'text-emerald-200'}`}
        >
          Bookings
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabPress?.('Profile')}
        className="items-center px-6 py-1"
      >
        <User color={activeTab === 'Profile' ? '#FFC80A' : '#A7F3D0'} size={22} />
        <Text 
          style={{ fontSize: hp('1.4%') }}
          className={`font-semibold mt-1 ${activeTab === 'Profile' ? 'text-[#FFC80A]' : 'text-emerald-200'}`}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default BottomNavBar;
