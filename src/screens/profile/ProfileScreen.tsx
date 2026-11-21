import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  User,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Settings,
  Bell,
  CreditCard,
  Bike,
  PhoneCall,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../../assets/images/dashboard.png';
import cardLeaf from '../../assets/images/cardLeaf.png';

export default function ProfileScreen() {
  const navigation = useNavigation();

  // Dynamic responsive sizing calculations
  const avatarSize = Math.min(Math.max(wp('30%'), 70), 84);
  const avatarIconSize = Math.round(avatarSize * 0.48);
  const rowIconSize = Math.min(Math.max(Math.round(hp('2.2%')), 18), 22);

  return (
    <View className="flex-1 bg-[#0A1A12]">
      {/* Top Profile Header with Natural Unzoomed Background Scoped to Header */}
      <View className="w-full relative overflow-hidden">
        <Image
          source={backgroundImage}
          resizeMode="cover"
          blurRadius={3}
          className="absolute inset-0 w-full h-full"
        />
        <View
          className="w-full bg-black/70 items-center justify-center"
          style={{
            paddingHorizontal: wp('5.5%'),
            paddingTop: hp('6%'),
            paddingBottom: hp('4%'),
          }}
        >
          {/* Avatar Container */}
          <View
            className="mb-2.5 rounded-full border-2 border-white/80 bg-slate-600/70 items-center justify-center overflow-hidden shadow-md"
            style={{
              width: avatarSize,
              height: avatarSize,
            }}
          >
            <User color="#CBD5E1" size={avatarIconSize} />
          </View>

          {/* User Name */}
          <Text
            style={{ fontSize: hp('2.8%') }}
            numberOfLines={1}
            adjustsFontSizeToFit
            className="text-white font-extrabold tracking-tight text-center"
          >
            Sankalpa Munasinghe
          </Text>

          {/* User ID */}
          <Text
            style={{ fontSize: hp('1.7%') }}
            className="text-white/60 font-medium tracking-wide mt-0.5"
          >
            NIC: 23456785425789
          </Text>
        </View>
      </View>

      {/* Bottom Light Card Container */}
      <View className="flex-1 w-full bg-[#E8EFE7] rounded-t-[36px] shadow-2xl relative -mt-4 overflow-hidden">
        {/* Background Leaf Decorations */}
        <Image
          source={cardLeaf}
          resizeMode="contain"
          className="absolute -left-12 bottom-6 pointer-events-none opacity-40"
          style={{
            width: wp('58%'),
            height: wp('58%'),
          }}
        />

        <Image
          source={cardLeaf}
          resizeMode="contain"
          className="absolute -right-12 top-1 scale-y-[-1] scale-x-[-1] pointer-events-none opacity-40"
          style={{
            width: wp('58%'),
            height: wp('58%'),
          }}
        />

        {/* Scrollable Content Strictly Inside the White Card */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          contentContainerStyle={{
            paddingHorizontal: wp('5.5%'),
            paddingTop: hp('2.5%'),
            paddingBottom: hp('15%'),
          }}
        >
          {/* 1. Linked Vehicle */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between p-3.5 border-b border-slate-400/30"
          >
            <View className="flex-row items-center flex-1 pr-2">
              <Bike color="#047857" size={rowIconSize} />
              <View className="ml-3">
                <Text
                  style={{ fontSize: hp('1.8%') }}
                  className="text-slate-800 font-semibold"
                >
                  Linked EV
                </Text>
                <Text className="text-slate-500 text-xs font-medium mt-0.5">
                  Super Soco TC • WP BCD-4289
                </Text>
              </View>
            </View>
            <ChevronRight color="#000000ff" size={16} />
          </TouchableOpacity>

          {/* 2. Payment Methods */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between p-3.5 border-b border-slate-400/30"
          >
            <View className="flex-row items-center flex-1 pr-2">
              <CreditCard color="#047857" size={rowIconSize} />
              <View className="ml-3">
                <Text
                  style={{ fontSize: hp('1.8%') }}
                  className="text-slate-800 font-semibold"
                >
                  Payment Methods
                </Text>
                <Text className="text-slate-500 text-xs font-medium mt-0.5">
                  Visa •••• 4821 (Primary)
                </Text>
              </View>
            </View>
            <ChevronRight color="#000000ff" size={16} />
          </TouchableOpacity>

          {/* 3. Account Settings */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between p-3.5 border-b border-slate-400/30"
          >
            <View className="flex-row items-center">
              <Settings color="#047857" size={rowIconSize} />
              <Text
                style={{ fontSize: hp('1.8%') }}
                className="text-slate-800 font-semibold ml-3"
              >
                Account Settings
              </Text>
            </View>
            <ChevronRight color="#000000ff" size={16} />
          </TouchableOpacity>

          {/* 4. Notification Preferences */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between p-3.5 border-b border-slate-400/30"
          >
            <View className="flex-row items-center">
              <Bell color="#047857" size={rowIconSize} />
              <Text
                style={{ fontSize: hp('1.8%') }}
                className="text-slate-800 font-semibold ml-3"
              >
                Notification Preferences
              </Text>
            </View>
            <ChevronRight color="#000000ff" size={16} />
          </TouchableOpacity>

          {/* 5. Security & Privacy */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between p-3.5 border-b border-slate-400/30"
          >
            <View className="flex-row items-center">
              <ShieldCheck color="#047857" size={rowIconSize} />
              <Text
                style={{ fontSize: hp('1.8%') }}
                className="text-slate-800 font-semibold ml-3"
              >
                Security & Privacy
              </Text>
            </View>
            <ChevronRight color="#000000ff" size={16} />
          </TouchableOpacity>

          {/* 6. 24/7 Roadside Assistance */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between p-3.5 border-b border-slate-400/30"
          >
            <View className="flex-row items-center flex-1 pr-2">
              <PhoneCall color="#047857" size={rowIconSize} />
              <View className="ml-3">
                <Text
                  style={{ fontSize: hp('1.8%') }}
                  className="text-slate-800 font-semibold"
                >
                  Roadside Assistance
                </Text>
                <Text className="text-emerald-700 font-semibold text-xs mt-0.5">
                  24/7 Emergency Dispatch
                </Text>
              </View>
            </View>
            <ChevronRight color="#000000ff" size={16} />
          </TouchableOpacity>

          {/* 7. Log Out */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Landing')}
            className="flex-row items-center justify-between p-3.5 border-b border-slate-400/30"
          >
            <View className="flex-row items-center">
              <LogOut color="#EF4444" size={rowIconSize} />
              <Text
                style={{ fontSize: hp('1.8%') }}
                className="text-red-500 font-semibold ml-3"
              >
                Log Out
              </Text>
            </View>
            <ChevronRight color="#EF4444" size={16} />
          </TouchableOpacity>

          {/* App Version & Meta Footer */}
          <View className="items-center justify-center mt-6 mb-2">
            <View className="flex-row items-center mt-1">
              <Text className="text-slate-400 text-[11px] underline">Terms of Service</Text>
              <Text className="text-slate-300 text-[11px] mx-1.5">•</Text>
              <Text className="text-slate-400 text-[11px] underline">Privacy Policy</Text>
            </View>
            <Text className="text-emerald-700/60 font-semibold text-[10px] mt-1 tracking-wider uppercase">
              Developed By JS Munasinghe
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
