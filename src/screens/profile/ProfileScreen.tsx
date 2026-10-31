import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { User, ShieldCheck, ChevronRight, LogOut, Settings, Bell } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#0A1A12]">
      {/* Header */}
      <View 
        className="w-full bg-[#0C2B1C] border-b border-emerald-900/40 items-center"
        style={{ 
          paddingHorizontal: wp('5.5%'), 
          paddingTop: hp('6.5%'), 
          paddingBottom: hp('3.5%') 
        }}
      >
        <View className="w-20 h-20 rounded-full border-2 border-white/80 bg-slate-600/70 items-center justify-center mb-3 shadow-md">
          <User color="#CBD5E1" size={42} />
        </View>

        <Text style={{ fontSize: hp('2.8%') }} className="font-extrabold text-white">
          Sankalpa Perera
        </Text>
        <Text style={{ fontSize: hp('1.6%') }} className="text-slate-300 mt-0.5">
          NIC: 982145678V
        </Text>

        <View className="flex-row items-center bg-emerald-900/60 border border-emerald-500/40 px-3 py-1 rounded-full mt-2">
          <ShieldCheck color="#34D399" size={14} />
          <Text className="text-emerald-300 text-xs font-semibold ml-1.5">
            Verified Prosumer
          </Text>
        </View>
      </View>

      {/* Profile Options List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ 
          paddingHorizontal: wp('5%'), 
          paddingTop: hp('3%'),
          paddingBottom: hp('14%') // Clearance for static bottom nav bar
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-2xl p-2 mb-4 shadow-sm border border-slate-200">
          <TouchableOpacity className="flex-row items-center justify-between p-3.5 border-b border-slate-100">
            <View className="flex-row items-center">
              <Settings color="#047857" size={18} />
              <Text style={{ fontSize: hp('1.8%') }} className="text-slate-800 font-semibold ml-3">
                Account Settings
              </Text>
            </View>
            <ChevronRight color="#94A3B8" size={16} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-3.5 border-b border-slate-100">
            <View className="flex-row items-center">
              <Bell color="#047857" size={18} />
              <Text style={{ fontSize: hp('1.8%') }} className="text-slate-800 font-semibold ml-3">
                Notification Preferences
              </Text>
            </View>
            <ChevronRight color="#94A3B8" size={16} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Landing')}
            className="flex-row items-center justify-between p-3.5"
          >
            <View className="flex-row items-center">
              <LogOut color="#EF4444" size={18} />
              <Text style={{ fontSize: hp('1.8%') }} className="text-red-500 font-semibold ml-3">
                Log Out
              </Text>
            </View>
            <ChevronRight color="#94A3B8" size={16} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
