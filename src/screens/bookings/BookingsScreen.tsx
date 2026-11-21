import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  MapPin,
  Zap,
  Calendar,
  Search,
  X,
  Clock,
} from 'lucide-react-native';
import backgroundImage from '../../assets/images/dashboard.png';
import cardLeaf from '../../assets/images/cardLeaf.png';

interface BookingItem {
  id: string;
  stationName: string;
  distance: string;
  location: string;
  power: string;
  scheduledTime: string;
  slotNumber: string;
}

const MOCK_BOOKINGS: BookingItem[] = [
  {
    id: '1',
    stationName: 'Mahavali Substation',
    distance: '10 km Away',
    location: 'Sector 4 • Colombo 07',
    power: '250 kW Allocated Transfer',
    scheduledTime: 'Oct 25, 10:00 AM',
    slotNumber: 'Slot #03',
  },
  {
    id: '2',
    stationName: 'Victoria Solar Hub',
    distance: '24 km Away',
    location: 'East Grid • Galle Road',
    power: '180 kW Grid Export',
    scheduledTime: 'Nov 02, 02:30 PM',
    slotNumber: 'Slot #01',
  },
  {
    id: '3',
    stationName: 'Town Hall Swap Station',
    distance: '1.2 km Away',
    location: 'Central Sector • Ward Place',
    power: '200 kW Full Battery Swap',
    scheduledTime: 'Oct 18, 04:15 PM',
    slotNumber: 'Slot #05',
  },
  {
    id: '4',
    stationName: 'Kollupitiya Super Hub',
    distance: '2.8 km Away',
    location: 'Marine Sector • Galle Road',
    power: '350 kW Fast Battery Swap',
    scheduledTime: 'Oct 28, 11:30 AM',
    slotNumber: 'Slot #02',
  },
];

export default function BookingsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    const q = searchQuery.trim().toLowerCase();
    if (q === '') return true;
    return (
      booking.stationName.toLowerCase().includes(q) ||
      booking.location.toLowerCase().includes(q) ||
      booking.power.toLowerCase().includes(q)
    );
  });

  return (
    <View className="flex-1 bg-[#0A1A12]">
      {/* Top Header with Natural Unzoomed Background Scoped to Header */}
      <View className="w-full relative overflow-hidden">
        <Image
          source={backgroundImage}
          resizeMode="cover"
          blurRadius={3}
          className="absolute inset-0 w-full h-full"
        />
        <View
          className="w-full bg-black/70"
          style={{
            paddingHorizontal: wp('5.5%'),
            paddingTop: hp('6%'),
            paddingBottom: hp('3.5%'),
          }}
        >
          {/* Header Title */}
          <Text
            style={{ fontSize: hp('3.2%') }}
            className="font-extrabold text-white tracking-tight"
          >
            My <Text className="text-[#FFC80A]">Bookings</Text>
          </Text>
          <Text
            style={{ fontSize: hp('1.65%') }}
            className="text-slate-300 font-medium mt-0.5"
          >
            Your online paid battery swaps
          </Text>

          {/* Floating White Search Bar */}
          <View className="mt-3.5 flex-row items-center bg-white border border-emerald-600/60 rounded-full px-4 py-2.5 shadow-md shadow-black/25">
            <Search color="#047857" size={18} strokeWidth={2.2} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search paid swaps or stations..."
              placeholderTextColor="#94A3B8"
              style={{ fontSize: hp('1.7%') }}
              className="flex-1 ml-2.5 text-slate-800 font-medium p-0"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                className="p-1"
              >
                <X color="#94A3B8" size={16} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Bottom Light Card Container Overlapping Header */}
      <View className="flex-1 w-full bg-[#E8EFE7] rounded-t-[36px] shadow-2xl relative -mt-4 overflow-hidden">
        {/* Background Leaf Decorations */}
        <Image
          source={cardLeaf}
          resizeMode="contain"
          className="absolute -left-12 bottom-6 pointer-events-none "
          style={{
            width: wp('58%'),
            height: wp('58%'),
          }}
        />

        <Image
          source={cardLeaf}
          resizeMode="contain"
          className="absolute -right-12 top-1 scale-y-[-1] scale-x-[-1] pointer-events-none "
          style={{
            width: wp('58%'),
            height: wp('58%'),
          }}
        />

        {/* Scrollable Cards Container Inside White Card */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          contentContainerStyle={{
            paddingHorizontal: wp('5.5%'),
            paddingTop: hp('3%'),
            paddingBottom: hp('15%'),
          }}
        >

        {/* Paid Swap Cards / Empty State */}
        {filteredBookings.length === 0 ? (
          <View className="w-full bg-white rounded-3xl p-6 items-center justify-center shadow-sm border border-slate-200/90 z-10 my-4">
            <Clock color="#94A3B8" size={32} />
            <Text className="text-slate-800 font-extrabold text-base mt-2">
              No Swaps Found
            </Text>
            <Text className="text-slate-400 text-xs text-center mt-1 font-medium">
              Try adjusting your search query.
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <View
              key={booking.id}
              className="bg-white rounded-3xl p-4 mb-3.5 shadow-sm border border-slate-200/90 z-10"
            >
              {/* Station Title & Paid Online Badge */}
              <View className="flex-row items-center justify-between mb-2">
                <Text
                  style={{ fontSize: hp('2%') }}
                  className="font-black text-slate-900 tracking-tight flex-1 pr-2"
                >
                  {booking.stationName}
                </Text>
                <View className="bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  <Text className="text-[#047857] text-[11px] font-black">
                    Paid Online
                  </Text>
                </View>
              </View>

              {/* Location & Distance */}
              <View className="flex-row items-center mb-1.5">
                <MapPin color="#D97706" size={13} />
                <Text
                  style={{ fontSize: hp('1.5%') }}
                  className="text-slate-600 font-semibold ml-1.5"
                >
                  {booking.distance} • {booking.location}
                </Text>
              </View>

              {/* Energy Capacity */}
              <View className="flex-row items-center mb-2.5">
                <Zap color="#D97706" size={13} fill="#D97706" />
                <Text
                  style={{ fontSize: hp('1.5%') }}
                  className="text-slate-600 font-semibold ml-1.5"
                >
                  {booking.power}
                </Text>
              </View>

              {/* Footer: Date & Slot Number */}
              <View className="flex-row items-center justify-between pt-2.5 border-t border-slate-100">
                <View className="flex-row items-center">
                  <Calendar color="#64748B" size={13} />
                  <Text
                    style={{ fontSize: hp('1.4%') }}
                    className="text-slate-400 font-medium ml-1.5"
                  >
                    Scheduled: {booking.scheduledTime}
                  </Text>
                </View>

                <View className="bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                  <Text
                    style={{ fontSize: hp('1.35%') }}
                    className="text-emerald-800 font-black tracking-wide"
                  >
                    {booking.slotNumber}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
        </ScrollView>
      </View>
    </View>
  );
}
