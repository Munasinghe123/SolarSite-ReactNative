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
  Gauge, CreditCard, Battery, Navigation,
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
  const bentoTallHeight = Math.round(hp('23%'));
  const bentoShortHeight = Math.round(hp('11%'));

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
        className="flex-1 bg-[#F4F8F3] rounded-t-[36px] shadow-2xl relative -mt-4"
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
            opacity: 0.95 
          }}
        />


        {/* 4-Card Staggered Bento Grid */}
        <View className="flex-row gap-3.5 w-full mt-1">
          {/* Column 1 (Left): Tall (2 units) + Short (1 unit) */}
          <View className="flex-1 flex-col gap-3.5">
            {/* Card 1: Top-Left (Spans 2 Row Units) - Battery Arc Gauge */}
            <View 
              className="bg-[#072415] rounded-[28px] p-4 border border-emerald-500/20 shadow-lg shadow-emerald-950/20 justify-between items-center relative overflow-hidden"
              style={{ height: bentoTallHeight }}
            >
              {/* Arc Gauge */}
              <View className="w-full items-center justify-center relative mt-1">
                <Svg width="130" height="110" viewBox="0 0 130 110">
                  {/* Background Track Arc */}
                  <Circle
                    cx={65}
                    cy={55}
                    r={40}
                    fill="none"
                    stroke="#0E3320"
                    strokeWidth={9}
                    strokeDasharray={`${Math.round(2 * Math.PI * 40 * 0.75)} ${Math.round(2 * Math.PI * 40)}`}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                    rotation={135}
                    origin="65, 55"
                  />
                  {/* Active Progress Arc */}
                  <Circle
                    cx={65}
                    cy={55}
                    r={40}
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth={9}
                    strokeDasharray={`${Math.round(2 * Math.PI * 40 * 0.75)} ${Math.round(2 * Math.PI * 40)}`}
                    strokeDashoffset={Math.round(2 * Math.PI * 40 * 0.75 * (1 - 0.8))}
                    strokeLinecap="round"
                    rotation={135}
                    origin="65, 55"
                  />
                </Svg>
                
                {/* 80% Text in Center */}
                <View className="absolute inset-0 items-center justify-center pt-2">
                  <Text 
                    style={{ fontSize: hp('3%') }} 
                    className="font-extrabold text-white tracking-tight"
                  >
                    80%
                  </Text>
                </View>
              </View>

              {/* Below the Arch */}
              <View className="items-center justify-center pb-1 gap-1">
                <Text 
                  style={{ fontSize: hp('1.5%') }} 
                  className="font-semibold text-slate-300 text-center"
                >
                  Battery Health
                </Text>
                <Battery color="#6EE7B7" size={18} />
              </View>
            </View>

            {/* Card 3: Bottom-Left (Spans 1 Row Unit) - Est. Range Remaining */}
            <View 
              className="bg-white rounded-[28px] p-3.5 border border-amber-100/90 shadow-sm flex-row items-center"
              style={{ height: bentoShortHeight }}
            >
              <View className="w-11 h-11 rounded-2xl bg-amber-50 items-center justify-center border border-amber-200/60 shrink-0">
                <Navigation color="#D97706" size={20} />
              </View>

              <View className="flex-1 ml-2.5 justify-center">
                <View className="flex-row items-center gap-1">
                 
                  <Text 
                    style={{ fontSize: hp('1.2%') }} 
                    className="text-amber-800 font-bold uppercase tracking-wider"
                  >
                    Estimated Range
                  </Text>
                </View>
                <Text 
                  style={{ fontSize: hp('2.1%') }} 
                  className="font-extrabold text-slate-900 tracking-tight mt-0.5"
                >
                  50 km{' '}
                  <Text 
                    style={{ fontSize: hp('1.3%') }} 
                    className="font-medium text-amber-800"
                  >
                    left
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Column 2 (Right): Short (1 unit) + Tall (2 units) */}
          <View className="flex-1 flex-col gap-3.5">
            {/* Card 2: Top-Right (Spans 1 Row Unit) - Distance Travelled */}
            <View 
              className="bg-white rounded-[28px] p-3.5 border border-slate-100 shadow-sm flex-row items-center"
              style={{ height: bentoShortHeight }}
            >
              <View className="w-11 h-11 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100 shrink-0">
                <Gauge color="#047857" size={20} />
              </View>

              <View className="flex-1 ml-2.5 justify-center">
                <Text 
                  style={{ fontSize: hp('1.2%') }} 
                  className="text-[#047857] font-bold uppercase tracking-wider"
                >
                  Distance Travelled
                </Text>
                <Text 
                  style={{ fontSize: hp('2.1%') }} 
                  className="font-extrabold text-slate-900 tracking-tight mt-0.5"
                >
                  100 km
                </Text>
              </View>
            </View>

            {/* Card 4: Bottom-Right (Spans 2 Row Units) - Balance / Payment */}
            <View 
              className="bg-[#072415] rounded-[28px] p-4 border border-emerald-500/20 shadow-lg shadow-emerald-950/20 justify-between items-center relative overflow-hidden"
              style={{ height: bentoTallHeight }}
            >
              {/* Centered Credit Card Icon */}
              <View 
                className="items-center justify-center"
                style={{ marginTop: 14 }}
              >
                <CreditCard color="#22C55E" size={68} />
              </View>

              {/* Centered Balance Details */}
              <View className="w-full items-center pb-1">
                <Text 
                  style={{ fontSize: hp('2.4%') }} 
                  className="font-extrabold text-white text-center tracking-tight"
                >
                  20 USD{' '}
                  <Text 
                    style={{ fontSize: hp('1.4%') }} 
                    className="font-medium text-emerald-300/90"
                  >
                    remaining
                  </Text>
                </Text>

                <View className="mt-2 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  <Text 
                    style={{ fontSize: hp('1.25%') }} 
                    className="font-semibold text-[#86EFAC] text-center tracking-wide"
                  >
                    Pay as you go
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

       
      </View>
    </ScrollView>
  );
}
