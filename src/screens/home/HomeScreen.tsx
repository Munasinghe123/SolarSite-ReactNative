import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Bell, Zap, MapPin, Calendar, ChevronRight, Check, Hourglass, User,
  Gauge, CreditCard, Battery, Navigation, Plus, Activity,
} from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { GradientButton } from '../../components/common/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import { TabName } from '../../components/common/BottomNavBar';
import dashboardBg from '../../assets/images/dashboard.png';
import heroLeaf from '../../assets/images/heroLeaf.png';
import cardLeaf from '../../assets/images/cardLeaf.png';
import pendingImg from '../../assets/images/pending.jpg';
import completedImg from '../../assets/images/completed.jpg';
import mahavali from '../../assets/images/mahavali.jpg';

export interface HomeScreenProps {
  onTabChange?: (tab: TabName) => void;
}

export default function HomeScreen({ onTabChange }: HomeScreenProps) {
  const leafHeight = Math.round(hp('17%'));
  const leafWidth = Math.round(leafHeight * (966 / 1628));
  const bentoShortHeight = Math.max(Math.round(hp('11.5%')), 88);
  const bentoTallHeight = bentoShortHeight * 2 + 14;

  return (
    <ScrollView
      className="flex-1 bg-[#0A1A12]"
      showsVerticalScrollIndicator={false}
      bounces={false}
      alwaysBounceVertical={false}
      overScrollMode="never"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="w-full relative overflow-hidden">
        <Image
          source={dashboardBg}
          resizeMode="cover"
          className="absolute inset-0 w-full h-full"
        />
        <View 
          className="w-full bg-black/70"
          style={{ 
            paddingHorizontal: wp('5.5%'), 
            paddingTop: hp('5.5%'), 
            paddingBottom: hp('3.5%') 
          }}
        >
          <View className="flex-row items-center justify-between">
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => onTabChange?.('Profile')}
              className="w-14 h-14 rounded-full border-2 border-white/80 bg-slate-600/70 items-center justify-center overflow-hidden shadow-md"
            >
              <User color="#CBD5E1" size={32} />
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.8}
              className="w-10 h-10 rounded-full bg-black/20 items-center justify-center relative"
            >
              <Bell color="#FFFFFF" size={24} />
              <View className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-black/30" />
            </TouchableOpacity>
          </View>

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

          <View 
            className="w-full rounded-3xl bg-[#0C2B1C]/85 border border-emerald-500/30 shadow-xl overflow-hidden relative"
            style={{ 
              paddingHorizontal: wp('5%'), 
              paddingVertical: hp('2.4%'),
              marginTop: hp('1%'),
            }}
          >
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
              Ready for your next battery swap?
            </Text>

            <View className="w-20 h-[2.5px] bg-[#FFC80A] rounded-full my-2.5" />

            <GradientButton
              title="Select Swap Station"
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
      </View>

      <View 
        className="flex-1 bg-[#E8EFE7] rounded-t-[36px] shadow-2xl relative -mt-4"
        style={{ 
          paddingHorizontal: wp('5.5%'), 
          paddingTop: hp('3%'), 
          paddingBottom: hp('15%'),
        }}
      >
        <Image
          source={cardLeaf}
          resizeMode="contain"
          className="absolute -left-10 bottom-6 pointer-events-none"
          style={{ 
            width: wp('58%'), 
            height: wp('78%'),  
          }}
        />

        <View className="flex-row items-center justify-between w-full max-w-[480px] self-center mb-3.5 px-0.5">
          <View className="flex-row items-center">
            <Text 
              style={{ fontSize: hp('2.1%') }} 
              className="font-extrabold text-[#064E3B] tracking-tight"
            >
              Current Status
            </Text>
          </View>

          <TouchableOpacity 
            activeOpacity={0.7}
            className="flex-row items-center bg-white px-3 py-1.5 rounded-full shadow-sm"
          >
            <Text 
              style={{ fontSize: hp('1.35%') }} 
              className="font-bold text-[#047857] mr-0.5"
            >
              View Details
            </Text>
            <ChevronRight color="#047857" size={14} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-3.5 w-full max-w-[480px] self-center">
          <View className="flex-1 flex-col gap-3.5">
            <View 
              className="rounded-[28px] p-4 border border-emerald-500/30 shadow-xl shadow-emerald-950/25 justify-between items-center relative overflow-hidden"
              style={{ height: bentoTallHeight }}
            >
              <LinearGradient
                colors={['#0d7459ff', '#022C22']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFill}
              />

              <View className="flex-row items-center w-full z-10">
                <View className="w-9 h-9 rounded-2xl bg-[#34D399]/15 border border-[#34D399]/30 items-center justify-center">
                  <Battery color="#34D399" size={18} />
                </View>
                <Text 
                  style={{ fontSize: hp('1.75%') }} 
                  className="font-bold text-white tracking-tight ml-2.5"
                >
                  Battery Health
                </Text>
              </View>

              <View className="w-full items-center justify-center relative my-auto shrink-0 z-10">
                <Svg width="135" height="110" viewBox="0 0 135 110">
                  <Circle
                    cx={67.5}
                    cy={55}
                    r={40}
                    fill="none"
                    stroke="#0B2B19"
                    strokeWidth={10}
                    strokeDasharray={`${Math.round(2 * Math.PI * 40 * 0.75)} ${Math.round(2 * Math.PI * 40)}`}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                    rotation={135}
                    origin="67.5, 55"
                  />
                  <Circle
                    cx={67.5}
                    cy={55}
                    r={40}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth={10}
                    strokeDasharray={`${Math.round(2 * Math.PI * 40 * 0.75)} ${Math.round(2 * Math.PI * 40)}`}
                    strokeDashoffset={Math.round(2 * Math.PI * 40 * 0.75 * (1 - 0.8))}
                    strokeLinecap="round"
                    rotation={135}
                    origin="67.5, 55"
                  />
                </Svg>
                
                <View className="absolute inset-0 items-center justify-center pt-2">
                  <Text 
                    style={{ fontSize: hp('2.8%') }} 
                    className="font-extrabold text-white tracking-tight mt-0.5"
                  >
                    80%
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center bg-[#153E26]/85 border border-emerald-500/30 px-4 py-1 rounded-full z-10 mb-0.5">
                <Text 
                  style={{ fontSize: hp('1.35%') }} 
                  className="font-bold text-[#FFC80A] tracking-wide"
                >
                  Good
                </Text>
              </View>
            </View>

            <View 
              className="bg-[#FFFDF8] rounded-[28px] p-3.5 border border-[#F4EBD7] shadow-sm flex-col justify-between relative overflow-hidden"
              style={{ height: bentoShortHeight }}
            >
              <LinearGradient
                colors={[
                  'rgba(255, 200, 10, 0.22)',
                  'rgba(255, 200, 10, 0.06)',
                  'transparent',
                ]}
                locations={[0, 0.45, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />

              <View className="flex-row items-center z-10">
                <View className="w-7 h-7 rounded-xl bg-[#FFF5DC] border border-[#FDE7B0] items-center justify-center shrink-0">
                  <Navigation color="#B45309" size={14} />
                </View>
                <Text 
                  style={{ fontSize: hp('1.3%') }} 
                  className="text-[#78350F] font-bold uppercase tracking-wider ml-2"
                  numberOfLines={1}
                >
                  REMAINING
                </Text>
              </View>

              <Text 
                style={{ fontSize: hp('2.3%') }} 
                className="font-extrabold text-[#0F172A] tracking-tight z-10"
                numberOfLines={1}
              >
                50 km{' '}
                <Text 
                  style={{ fontSize: hp('1.4%') }} 
                  className="font-medium text-slate-400"
                >
                  range
                </Text>
              </Text>

              <View className="w-full h-2 rounded-full bg-[#EFE6D2] overflow-hidden z-10">
                <View className="h-full rounded-full bg-[#FFC80A] w-[62%]" />
              </View>
            </View>
          </View>

          <View className="flex-1 flex-col gap-3.5">
            <View 
              className="bg-[#DCFCE7] rounded-[28px] p-3.5 border border-emerald-200/70 shadow-md shadow-emerald-950/10 flex-col justify-between relative overflow-hidden"
              style={{ height: bentoShortHeight }}
            >
              <LinearGradient
                colors={['#E6F9EE', '#CEF5DC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />

              <View className="flex-row items-center z-10">
                <View className="w-7 h-7 rounded-xl bg-white border border-emerald-200 items-center justify-center shrink-0 shadow-sm">
                  <Gauge color="#047857" size={14} />
                </View>
                <Text 
                  style={{ fontSize: hp('1.3%') }} 
                  className="text-[#065F46] font-bold uppercase tracking-wider ml-2"
                  numberOfLines={1}
                >
                  TRAVELLED
                </Text>
              </View>

              <Text 
                style={{ fontSize: hp('2.3%') }} 
                className="font-extrabold text-[#064E3B] tracking-tight z-10"
                numberOfLines={1}
              >
                100 km{' '}
                <Text 
                  style={{ fontSize: hp('1.4%') }} 
                  className="font-semibold text-emerald-700/60"
                >
                  total
                </Text>
              </Text>

              <View className="w-full h-2 rounded-full bg-white/80 overflow-hidden z-10">
                <View className="h-full rounded-full bg-[#047857] w-[72%]" />
              </View>
            </View>

            <View 
              className="rounded-[28px] p-4 border border-emerald-400/30 shadow-xl shadow-emerald-950/25 flex-col justify-between relative overflow-hidden"
              style={{ height: bentoTallHeight }}
            >
              <LinearGradient
                colors={['#0F7657', '#021810']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />

              <LinearGradient
                colors={[
                  'rgba(52, 211, 153, 0.30)',
                  'rgba(52, 211, 153, 0.08)',
                  'transparent',
                ]}
                locations={[0, 0.45, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />

              <View className="flex-row items-center justify-between w-full z-10">
                <View className="w-9 h-9 rounded-2xl bg-[#34D399]/15 border border-[#34D399]/30 items-center justify-center">
                  <CreditCard color="#34D399" size={18} />
                </View>
                <View className="bg-black/35 px-2.5 py-1 rounded-full border border-emerald-300/30">
                  <Text 
                    style={{ fontSize: hp('1.15%') }} 
                    className="font-bold text-[#FFC80A] tracking-wide"
                  >
                    Pay as you go
                  </Text>
                </View>
              </View>

              <View className="w-full my-auto py-2 z-10">
                <Text 
                  style={{ fontSize: hp('1.2%') }} 
                  className="text-emerald-200/80 font-bold uppercase tracking-wider mb-1"
                >
                  Balance
                </Text>
                <Text 
                  style={{ fontSize: hp('2.8%') }} 
                  className="font-extrabold text-white tracking-tight"
                  numberOfLines={1}
                >
                  20 USD{' '}
                  <Text 
                    style={{ fontSize: hp('1.4%') }} 
                    className="font-medium text-emerald-200/75"
                  >
                    left
                  </Text>
                </Text>
              </View>

              <TouchableOpacity 
                activeOpacity={0.85}
                className="w-full py-2.5 px-3 rounded-2xl bg-white flex-row items-center justify-center shadow-md z-10"
              >
                <Plus color="#064E3B" size={15} strokeWidth={2.5} />
                <Text 
                  style={{ fontSize: hp('1.4%') }} 
                  className="font-extrabold text-[#064E3B] tracking-wide ml-1.5"
                >
                  Top Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

       
      </View>
    </ScrollView>
  );
}
