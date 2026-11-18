import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LogIn, CircleUserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../../components/common/GradientButton';
import bg from '../../assets/images/bg.png';
import logo from '../../assets/images/logo.png';

export default function LandingScreen() {
  const navigation = useNavigation();
  const iconSize = Math.min(Math.max(Math.round(hp('2.6%')), 20), 26);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View className="flex-1 relative">
      <Image 
        source={bg} 
        resizeMode="cover" 
        className="absolute inset-0 w-full h-full"
      />

      <View className="flex-1 bg-black/60">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
        >
          <View 
            className="flex-1 justify-between w-full max-w-[460px] self-center"
            style={{ 
              paddingHorizontal: wp('6%'),
              paddingTop: hp('5%'),
              paddingBottom: hp('4%'),
            }}
          >
            <View 
              className="flex-1 items-center justify-center"
              style={{ paddingVertical: hp('3%') }}
            >
              <Image 
                source={logo} 
                style={{
                  width: wp('28%'),
                  height: wp('28%'),
                  maxWidth: 130,
                  maxHeight: 130,
                  minWidth: 80,
                  minHeight: 80,
                  marginBottom: hp('2%'),
                }} 
                resizeMode="contain" 
              />

              <Text 
                style={{ fontSize: hp('5.8%') }}
                className="font-extrabold text-center tracking-tight"
              >
                <Text className="text-emerald-500">BATTERY </Text>
                <Text className="text-[#FFC80A]">SWAPPER</Text>
              </Text>

              <Text 
                style={{ fontSize: hp('2%'), paddingHorizontal: wp('4%') }}
                className="text-white text-center font-medium mt-1"
              >
                Swap fast. Ride far.
              </Text>
            </View>

            <View 
              className="w-full px-2"
              style={{ 
                gap: hp('1.8%'), 
                paddingBottom: hp('2%'),
              }}
            >
              <GradientButton
                title="Login"
                onPress={handleLogin}
                colors={['#004F2C', '#00B565']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ 
                  height: hp('5.8%'), 
                  minHeight: 52, 
                  maxHeight: 62,
                }}
                className="w-full border border-[#00B565] shadow-lg"
                textStyle={{ fontSize: hp('2.1%') }}
                textClassName="text-[#FFC80A] font-bold"
                icon={<LogIn color="#FFC80A" size={iconSize} />}
              />

              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleRegister}
                style={{ 
                  height: hp('5.8%'), 
                  minHeight: 52, 
                  maxHeight: 62,
                }}
                className="w-full rounded-full flex-row items-center justify-center border-2 border-[#FFC80A] bg-white/15 shadow-md active:bg-white/25"
              >
                <CircleUserRound color="#FFC80A" size={iconSize} />
                <Text 
                  style={{ fontSize: hp('2.1%') }} 
                  className="text-[#FFC80A] font-bold ml-2.5 tracking-wide"
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
