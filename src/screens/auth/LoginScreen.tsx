import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LogIn, Eye, EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../../components/common/GradientButton';
import bg from '../../assets/images/bg.png';
import logo from '../../assets/images/logo.png';

export interface LoginScreenProps {
  onLogin?: (credentials: { nic: string; password: string }) => void;
  onRegister?: () => void;
  onBack?: () => void;
}

export default function LoginScreen({
  onLogin,
  onRegister,
  onBack,
}: LoginScreenProps) {
  const navigation = useNavigation();
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const iconSize = Math.min(Math.max(Math.round(hp('2.4%')), 18), 24);

  const handleLogin = () => {
    if (onLogin) {
      onLogin({ nic, password });
    }
    // Navigate user to Dashboard on login
    navigation.navigate('Dashboard');
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      navigation.navigate('Register');
    }
  };

  return (
    <ImageBackground 
      source={bg} 
      resizeMode="cover" 
      className="flex-1"
    >
      {/* Dark Overlay */}
      <View className="flex-1 bg-black/35">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View 
              className="w-full max-w-md self-center"
              style={{ paddingHorizontal: wp('5.5%'), paddingVertical: hp('2%') }}
            >
              {/* Top Hero Branding */}
              <View 
                className="items-center"
                style={{ marginBottom: hp('2%') }}
              >
                <Image 
                  source={logo} 
                  style={{ 
                    width: wp('22%'), 
                    height: wp('22%'), 
                    maxWidth: 95, 
                    maxHeight: 95,
                    marginBottom: hp('1%'),
                  }} 
                  resizeMode="contain" 
                />

                <Text 
                  style={{ fontSize: hp('4.2%') }}
                  className="font-extrabold text-center tracking-tight"
                >
                  <Text className="text-[#226D3B]">SOLAR </Text>
                  <Text className="text-[#55A952]">GRID</Text>
                </Text>

                <Text 
                  style={{ fontSize: hp('1.75%'), marginTop: hp('0.4%') }}
                  className="text-slate-200 font-medium text-center px-4"
                >
                  Smarter Energy Starts With the Sun
                </Text>
              </View>

              {/* Glassmorphic Form Card */}
              <View 
                className="bg-[#101A15]/75 border border-emerald-400/25 shadow-2xl"
                style={{ 
                  borderRadius: hp('3%'),
                  paddingHorizontal: wp('5%'), 
                  paddingVertical: hp('3%'),
                }}
              >
                <Text 
                  style={{ fontSize: hp('3.2%') }}
                  className="font-bold text-white text-center"
                >
                  Welcome Back
                </Text>
                <Text 
                  style={{ 
                    fontSize: hp('1.7%'), 
                    marginTop: hp('0.5%'), 
                    marginBottom: hp('2.5%') 
                  }}
                  className="text-slate-300 text-center"
                >
                  Sign In to access your information
                </Text>

                {/* NIC Number Field */}
                <View style={{ marginBottom: hp('1.8%') }}>
                  <Text 
                    style={{ fontSize: hp('1.75%'), marginBottom: hp('0.8%') }}
                    className="text-slate-100 font-medium"
                  >
                    NIC Number
                  </Text>
                  <View 
                    className="bg-white/20 rounded-xl border border-white/15 justify-center"
                    style={{ 
                      height: hp('6.2%'), 
                      minHeight: 48, 
                      maxHeight: 56, 
                      paddingHorizontal: wp('4%') 
                    }}
                  >
                    <TextInput
                      style={{ fontSize: hp('1.85%') }}
                      className="text-white h-full p-0"
                      placeholder="Enter NIC Number"
                      placeholderTextColor="rgba(255, 255, 255, 0.45)"
                      value={nic}
                      onChangeText={setNic}
                      autoCapitalize="characters"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View style={{ marginBottom: hp('1.8%') }}>
                  <Text 
                    style={{ fontSize: hp('1.75%'), marginBottom: hp('0.8%') }}
                    className="text-slate-100 font-medium"
                  >
                    Password
                  </Text>
                  <View 
                    className="bg-white/20 rounded-xl border border-white/15 justify-center relative"
                    style={{ 
                      height: hp('6.2%'), 
                      minHeight: 48, 
                      maxHeight: 56, 
                      paddingLeft: wp('4%'),
                      paddingRight: wp('12%'),
                    }}
                  >
                    <TextInput
                      style={{ fontSize: hp('1.85%') }}
                      className="text-white h-full p-0"
                      placeholder="Enter Password"
                      placeholderTextColor="rgba(255, 255, 255, 0.45)"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(prev => !prev)}
                      className="absolute right-3.5 h-full justify-center items-center"
                      activeOpacity={0.7}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      {showPassword ? (
                        <EyeOff color="rgba(255, 255, 255, 0.7)" size={iconSize} />
                      ) : (
                        <Eye color="rgba(255, 255, 255, 0.7)" size={iconSize} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Green Gradient Login Button */}
                <GradientButton
                  title="Login"
                  onPress={handleLogin}
                  colors={['#004F2C', '#00B565']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ 
                    height: hp('6.4%'), 
                    minHeight: 50, 
                    maxHeight: 58, 
                    marginTop: hp('1.2%') 
                  }}
                  className="w-full rounded-full border border-[#00B565]/40 shadow-lg"
                  textStyle={{ fontSize: hp('2.2%') }}
                  textClassName="text-[#FFC80A] font-bold"
                  icon={<LogIn color="#FFC80A" size={iconSize} />}
                />

                {/* OR Divider */}
                <View 
                  className="flex-row items-center"
                  style={{ 
                    marginVertical: hp('2.2%'), 
                    paddingHorizontal: wp('6%') 
                  }}
                >
                  <View className="flex-1 h-[1px] bg-white/35" />
                  <Text 
                    style={{ fontSize: hp('1.55%'), marginHorizontal: wp('3%') }}
                    className="text-white/75 font-semibold"
                  >
                    OR
                  </Text>
                  <View className="flex-1 h-[1px] bg-white/35" />
                </View>

                {/* Register Link */}
                <TouchableOpacity
                  onPress={handleRegister}
                  activeOpacity={0.75}
                  className="items-center justify-center"
                  style={{ paddingVertical: hp('0.5%') }}
                >
                  <Text 
                    style={{ fontSize: hp('1.9%') }}
                    className="text-[#FFC80A] font-semibold tracking-wide"
                  >
                    Register &gt;
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}
