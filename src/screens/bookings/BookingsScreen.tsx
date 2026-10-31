import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CalendarCheck, MapPin, Zap, ChevronRight } from 'lucide-react-native';

export default function BookingsScreen() {
  return (
    <View className="flex-1 bg-[#0A1A12]">
      {/* Header */}
      <View 
        className="w-full bg-[#0C2B1C] border-b border-emerald-900/40"
        style={{ 
          paddingHorizontal: wp('5.5%'), 
          paddingTop: hp('6%'), 
          paddingBottom: hp('2.5%') 
        }}
      >
        <Text 
          style={{ fontSize: hp('3%') }}
          className="font-extrabold text-white"
        >
          My <Text className="text-[#FFC80A]">Bookings</Text>
        </Text>
        <Text 
          style={{ fontSize: hp('1.7%') }}
          className="text-slate-300 mt-1"
        >
          Manage scheduled energy transfers & reservations
        </Text>
      </View>

      {/* Bookings List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ 
          paddingHorizontal: wp('5%'), 
          paddingTop: hp('2.5%'),
          paddingBottom: hp('14%') // Clearance for static bottom nav bar
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Sample Booking Item 1 */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-200">
          <View className="flex-row items-center justify-between mb-2">
            <Text style={{ fontSize: hp('2%') }} className="font-bold text-slate-900">
              Mahaweli Substation
            </Text>
            <View className="bg-emerald-600 px-2.5 py-0.5 rounded-full">
              <Text className="text-white text-[10px] font-bold">Confirmed</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-1.5">
            <MapPin color="#F59E0B" size={14} />
            <Text style={{ fontSize: hp('1.6%') }} className="text-slate-600 ml-1.5">
              10km Away • Sector 4
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Zap color="#F59E0B" size={14} fill="#F59E0B" />
            <Text style={{ fontSize: hp('1.6%') }} className="text-slate-600 ml-1.5">
              250 kW Allocated Transfer
            </Text>
          </View>

          <View className="flex-row items-center justify-between pt-2 border-t border-slate-100">
            <Text style={{ fontSize: hp('1.5%') }} className="text-slate-400 font-medium">
              Scheduled: Oct 25, 10:00 AM
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text style={{ fontSize: hp('1.5%') }} className="text-emerald-700 font-bold mr-1">
                Details
              </Text>
              <ChevronRight color="#047857" size={14} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sample Booking Item 2 */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-200">
          <View className="flex-row items-center justify-between mb-2">
            <Text style={{ fontSize: hp('2%') }} className="font-bold text-slate-900">
              Victoria Solar Farm
            </Text>
            <View className="bg-amber-500 px-2.5 py-0.5 rounded-full">
              <Text className="text-white text-[10px] font-bold">Pending</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-1.5">
            <MapPin color="#F59E0B" size={14} />
            <Text style={{ fontSize: hp('1.6%') }} className="text-slate-600 ml-1.5">
              24km Away • East Grid
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Zap color="#F59E0B" size={14} fill="#F59E0B" />
            <Text style={{ fontSize: hp('1.6%') }} className="text-slate-600 ml-1.5">
              180 kW Grid Export
            </Text>
          </View>

          <View className="flex-row items-center justify-between pt-2 border-t border-slate-100">
            <Text style={{ fontSize: hp('1.5%') }} className="text-slate-400 font-medium">
              Scheduled: Nov 02, 02:30 PM
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text style={{ fontSize: hp('1.5%') }} className="text-emerald-700 font-bold mr-1">
                Details
              </Text>
              <ChevronRight color="#047857" size={14} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
