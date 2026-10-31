import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Bell,
  Zap,
  MapPin,
  Calendar,
  ChevronRight,
  Check,
  User,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../../components/common/GradientButton';
import { BottomNavBar, TabName } from '../../components/common/BottomNavBar';
import BookingsScreen from '../bookings/BookingsScreen';
import ProfileScreen from '../profile/ProfileScreen';
import dashboardBg from '../../assets/images/dashboardBg.png';
import heroLeaf from '../../assets/images/heroLeaf.png';
import cardLeaf from '../../assets/images/cardLeaf.png';
import pendingImg from '../../assets/images/pending.png';
import completedImg from '../../assets/images/completed.png';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabName>('Home');

  // Exact proportional dimensions so Android never calculates 0 width with absolute positioning
  const leafHeight = Math.round(hp('17%'));
  const leafWidth = Math.round(leafHeight * (966 / 1628));

  return (
    <View className="flex-1 bg-white relative">
      {/* 1. Home Tab Content */}
      {activeTab === 'Home' && (
        <ScrollView
          className="flex-1 bg-[#0A1A12]"
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Top Header & Hero Area with dashboardBg */}
          <ImageBackground
            source={dashboardBg}
            resizeMode="cover"
            className="w-full"
          >
            {/* Dark Overlay on Dashboard Background */}
            <View 
              className="w-full bg-black/50"
              style={{ 
                paddingHorizontal: wp('5.5%'), 
                paddingTop: hp('5.5%'), 
                paddingBottom: hp('3.5%') 
              }}
            >
              {/* Top Bar: Profile Avatar & Notification Bell */}
              <View className="flex-row items-center justify-between">
                {/* Profile Avatar */}
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => setActiveTab('Profile')}
                  className="w-14 h-14 rounded-full border-2 border-white/80 bg-slate-600/70 items-center justify-center overflow-hidden shadow-md"
                >
                  <User color="#CBD5E1" size={32} />
                </TouchableOpacity>

                {/* Bell with red notification badge */}
                <TouchableOpacity 
                  activeOpacity={0.8}
                  className="w-10 h-10 rounded-full bg-black/20 items-center justify-center relative"
                >
                  <Bell color="#FFFFFF" size={24} />
                  <View className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-black/30" />
                </TouchableOpacity>
              </View>

              {/* Greeting */}
              <View style={{ marginTop: hp('1.8%'), marginBottom: hp('1.5%') }}>
                <Text 
                  style={{ fontSize: hp('3.6%') }}
                  className="font-extrabold text-white"
                >
                  Hi <Text className="text-[#FFC80A]">Sankalpa</Text>,
                </Text>
                <Text 
                  style={{ fontSize: hp('1.8%') }}
                  className="text-slate-200 font-medium mt-0.5"
                >
                  Good Morning!
                </Text>
              </View>

              {/* Hero Card: "Ready for your next energy transfer?" */}
              <View 
                className="w-full rounded-3xl bg-[#0C2B1C]/85 border border-emerald-500/30 shadow-xl overflow-hidden relative"
                style={{ 
                  paddingHorizontal: wp('5%'), 
                  paddingVertical: hp('2.4%'),
                  marginTop: hp('1%'),
                }}
              >
                {/* Decorative heroLeaf hugging the right corner without cropping */}
                <Image
                  source={heroLeaf}
                  resizeMode="contain"
                  className="absolute right-0 bottom-0 pointer-events-none"
                  style={{ 
                    width: leafWidth,
                    height: leafHeight,
                    opacity: 0.30,
                  }}
                />

                <Text 
                  style={{ fontSize: hp('2%'), maxWidth: wp('55%') }}
                  className="font-bold text-white leading-snug"
                >
                  Ready for your next energy transfer?
                </Text>

                {/* Golden Yellow Accent Underline */}
                <View className="w-14 h-[2.5px] bg-[#FFC80A] rounded-full my-2.5" />

                {/* Select Power Station Button (Width fit to content, left-aligned) */}
                <GradientButton
                  title="Select Power Station"
                  onPress={() => console.log('Select Power Station pressed')}
                  fitWidth={true}
                  contentAlignment="left"
                  colors={['#004F2C', '#00B565']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ 
                    height: hp('6.2%'), 
                    minHeight: 48, 
                    maxHeight: 56, 
                    marginTop: hp('1.2%') 
                  }}
                  className="self-start rounded-full border border-[#42A97C] shadow-lg"
                  textStyle={{ fontSize: hp('1.9%') }}
                  textClassName="text-white font-bold"
                  icon={
                    <View className="w-8 h-8 rounded-full bg-[#FFC80A] items-center justify-center mr-2 shadow-sm">
                      <Zap color="#000000" size={16} fill="#000000" />
                    </View>
                  }
                />
              </View>
            </View>
          </ImageBackground>

          {/* White Information Section (Bleeds all the way down behind bottom navigation) */}
          <View 
            className="flex-1 bg-[#F4F8F3] rounded-t-[36px] shadow-2xl relative -mt-4"
            style={{ 
              paddingHorizontal: wp('5.5%'), 
              paddingTop: hp('3%'), 
              paddingBottom: hp('15%'), // Generous bottom space so content scrolls freely above bottom bar
            }}
          >
            {/* Bigger Decorative cardLeaf on bottom-left */}
            <Image
              source={cardLeaf}
              resizeMode="contain"
              className="absolute -left-10 bottom-6 pointer-events-none"
              style={{ 
                width: wp('58%'), 
                height: wp('68%'), 
                opacity: 0.95 
              }}
            />

            {/* Section 1: Latest Reservation */}
            <View className="mb-5">
              <View className="flex-row items-center justify-between mb-3">
                <Text 
                  style={{ fontSize: hp('2.2%') }}
                  className="font-bold text-slate-900"
                >
                  Latest Reservation
                </Text>
                <TouchableOpacity 
                  activeOpacity={0.7} 
                  onPress={() => setActiveTab('Bookings')}
                  className="flex-row items-center"
                >
                  <Text 
                    style={{ fontSize: hp('1.6%') }}
                    className="text-slate-500 font-semibold"
                  >
                    View All &gt;
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Reservation Detail Card */}
              <View 
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex-row items-center p-3 relative"
                style={{ minHeight: hp('12%') }}
              >
                {/* Thumbnail Image */}
                <View className="w-24 h-24 rounded-xl overflow-hidden mr-3 bg-slate-100">
                  <Image
                    source={pendingImg}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Information Details */}
                <View className="flex-1 justify-center py-1">
                  {/* Header Row: Title & Confirmed Badge (Fully justified between across card width) */}
                  <View className="flex-row w-full items-center justify-between mb-1.5">
                    <Text 
                      style={{ fontSize: hp('1.95%') }}
                      className="font-bold text-slate-900"
                    >
                      Mahaweli Sub
                    </Text>
                    <View className="bg-[#059669] px-2.5 py-0.5 rounded-full">
                      <Text className="text-white text-[10px] font-bold tracking-wide">
                        Confirmed
                      </Text>
                    </View>
                  </View>

                  {/* Metric 1: Location */}
                  <View className="flex-row items-center mb-1">
                    <MapPin color="#F59E0B" size={13} />
                    <Text 
                      style={{ fontSize: hp('1.4%') }}
                      className="text-slate-600 font-medium ml-1.5"
                    >
                      10km Away
                    </Text>
                  </View>

                  {/* Metric 2: Capacity */}
                  <View className="flex-row items-center mb-1">
                    <Zap color="#F59E0B" size={13} fill="#F59E0B" />
                    <Text 
                      style={{ fontSize: hp('1.4%') }}
                      className="text-slate-600 font-medium ml-1.5"
                    >
                      Total Capacity 250 kw
                    </Text>
                  </View>

                  {/* Metric 3: Time & Yellow Arrow Button */}
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Calendar color="#94A3B8" size={13} />
                      <Text 
                        style={{ fontSize: hp('1.4%') }}
                        className="text-slate-500 font-medium ml-1.5"
                      >
                        Oct 25 10: 00 a.m
                      </Text>
                    </View>

                    {/* Yellow Circular Next Button */}
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      onPress={() => setActiveTab('Bookings')}
                      className="w-7 h-7 rounded-full bg-[#FFC80A] items-center justify-center"
                    >
                      <ChevronRight color="#FFFFFF" size={16} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Section 2: Reservations (Stats) */}
            <View className="mb-2">
              <View className="flex-row items-center justify-between mb-3">
                <Text 
                  style={{ fontSize: hp('2.2%') }}
                  className="font-bold text-slate-900"
                >
                  Reservations
                </Text>
                <TouchableOpacity 
                  activeOpacity={0.7} 
                  onPress={() => setActiveTab('Bookings')}
                  className="flex-row items-center"
                >
                  <Text 
                    style={{ fontSize: hp('1.6%') }}
                    className="text-slate-500 font-semibold"
                  >
                    View All &gt;
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 2 Stat Cards side-by-side: Pending & Completed */}
              <View className="flex-row gap-3">
                {/* Left Card: Pending */}
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => setActiveTab('Bookings')}
                  className="flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
                  style={{ height: hp('13%') }}
                >
                  <ImageBackground
                    source={pendingImg}
                    className="w-full h-full items-center justify-center"
                    resizeMode="cover"
                  >
                    <View className="w-full h-full bg-black/45 items-center justify-center p-2">
                      <Text 
                        style={{ fontSize: hp('3.5%') }}
                        className="font-extrabold text-[#FFC80A] leading-tight"
                      >
                        12
                      </Text>
                      <Text 
                        style={{ fontSize: hp('1.7%') }}
                        className="font-bold text-white tracking-wide"
                      >
                        Pending
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                {/* Right Card: Completed */}
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => setActiveTab('Bookings')}
                  className="flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative"
                  style={{ height: hp('13%') }}
                >
                  <ImageBackground
                    source={completedImg}
                    className="w-full h-full items-center justify-center"
                    resizeMode="cover"
                  >
                    <View className="w-full h-full bg-black/45 items-center justify-center p-2 relative">
                      <Text 
                        style={{ fontSize: hp('3.5%') }}
                        className="font-extrabold text-[#FFC80A] leading-tight"
                      >
                        10
                      </Text>
                      <Text 
                        style={{ fontSize: hp('1.7%') }}
                        className="font-bold text-white tracking-wide"
                      >
                        Completed
                      </Text>

                      {/* Green Check Badge in corner */}
                      <View className="absolute right-2 bottom-2 w-5 h-5 rounded-full bg-[#10B981] items-center justify-center">
                        <Check color="#FFFFFF" size={12} strokeWidth={3} />
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* 2. Bookings Tab Content */}
      {activeTab === 'Bookings' && <BookingsScreen />}

      {/* 3. Profile Tab Content */}
      {activeTab === 'Profile' && <ProfileScreen />}

      {/* Static / Still Persistent Bottom Navigation Bar (Never animates or moves) */}
      <View className="absolute bottom-0 left-0 right-0 z-30">
        <BottomNavBar activeTab={activeTab} onTabPress={(tab) => setActiveTab(tab)} />
      </View>
    </View>
  );
}
