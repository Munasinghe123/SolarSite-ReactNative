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
import { CircleUserRound, Eye, EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../../components/common/GradientButton';
import bg from '../../assets/images/bg.png';
import logo from '../../assets/images/logo.png';

export interface RegisterScreenProps {
  onRegister?: (data: {
    fullName: string;
    nic: string;
    contactNumber: string;
    password: string;
  }) => void;
  onLogin?: () => void;
  onBack?: () => void;
}

export default function RegisterScreen({
  onRegister,
  onLogin,
  onBack,
}: RegisterScreenProps) {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [nic, setNic] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const iconSize = Math.min(Math.max(Math.round(hp('2.4%')), 18), 24);

  const handleRegister = () => {
    if (onRegister) {
      onRegister({ fullName, nic, contactNumber, password });
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigation.navigate('Login');
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
              style={{ paddingHorizontal: wp('5.5%'), paddingVertical: hp('3%') }}
            >
              {/* Top Hero Branding */}
              <View 
                className="items-center"
                style={{ marginBottom: hp('2%') }}
              >
                <Image 
                  source={logo} 
                  style={{ 
                    width: wp('20%'), 
                    height: wp('20%'), 
                    maxWidth: 85, 
                    maxHeight: 85,
                    marginBottom: hp('0.8%'),
                  }} 
                  resizeMode="contain" 
                />

                <Text 
                  style={{ fontSize: hp('4%') }}
                  className="font-extrabold text-center tracking-tight"
                >
                  <Text className="text-[#226D3B]">SOLAR </Text>
                  <Text className="text-[#55A952]">GRID</Text>
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
                  Create Account
                </Text>
                <Text 
                  style={{ 
                    fontSize: hp('1.7%'), 
                    marginTop: hp('0.5%'), 
                    marginBottom: hp('2.2%') 
                  }}
                  className="text-slate-300 text-center"
                >
                  Sign Up to access your energy information
                </Text>

                {/* Full Name Field */}
                <View style={{ marginBottom: hp('1.6%') }}>
                  <Text 
                    style={{ fontSize: hp('1.75%'), marginBottom: hp('0.7%') }}
                    className="text-slate-100 font-medium"
                  >
                    Full Name
                  </Text>
                  <View 
                    className="bg-white/20 rounded-xl border border-white/15 justify-center"
                    style={{ 
                      height: hp('6%'), 
                      minHeight: 46, 
                      maxHeight: 54, 
                      paddingHorizontal: wp('4%') 
                    }}
                  >
                    <TextInput
                      style={{ fontSize: hp('1.85%') }}
                      className="text-white h-full p-0"
                      placeholder="Enter Full Name"
                      placeholderTextColor="rgba(255, 255, 255, 0.45)"
                      value={fullName}
                      onChangeText={setFullName}
                      autoCapitalize="words"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* NIC Number Field */}
                <View style={{ marginBottom: hp('1.6%') }}>
                  <Text 
                    style={{ fontSize: hp('1.75%'), marginBottom: hp('0.7%') }}
                    className="text-slate-100 font-medium"
                  >
                    NIC Number
                  </Text>
                  <View 
                    className="bg-white/20 rounded-xl border border-white/15 justify-center"
                    style={{ 
                      height: hp('6%'), 
                      minHeight: 46, 
                      maxHeight: 54, 
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

                {/* Contact Number Field */}
                <View style={{ marginBottom: hp('1.6%') }}>
                  <Text 
                    style={{ fontSize: hp('1.75%'), marginBottom: hp('0.7%') }}
                    className="text-slate-100 font-medium"
                  >
                    Contact Number
                  </Text>
                  <View 
                    className="bg-white/20 rounded-xl border border-white/15 justify-center"
                    style={{ 
                      height: hp('6%'), 
                      minHeight: 46, 
                      maxHeight: 54, 
                      paddingHorizontal: wp('4%') 
                    }}
                  >
                    <TextInput
                      style={{ fontSize: hp('1.85%') }}
                      className="text-white h-full p-0"
                      placeholder="Enter Contact Number"
                      placeholderTextColor="rgba(255, 255, 255, 0.45)"
                      value={contactNumber}
                      onChangeText={setContactNumber}
                      keyboardType="phone-pad"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View style={{ marginBottom: hp('1.6%') }}>
                  <Text 
                    style={{ fontSize: hp('1.75%'), marginBottom: hp('0.7%') }}
                    className="text-slate-100 font-medium"
                  >
                    Password
                  </Text>
                  <View 
                    className="bg-white/20 rounded-xl border border-white/15 justify-center relative"
                    style={{ 
                      height: hp('6%'), 
                      minHeight: 46, 
                      maxHeight: 54, 
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

                {/* Confirm Password Field */}
                <View style={{ marginBottom: hp('1.6%') }}>
                  <Text 
                    style={{ fontSize: hp('1.75%'), marginBottom: hp('0.7%') }}
                    className="text-slate-100 font-medium"
                  >
                    Confirm Password
                  </Text>
                  <View 
                    className="bg-white/20 rounded-xl border border-white/15 justify-center relative"
                    style={{ 
                      height: hp('6%'), 
                      minHeight: 46, 
                      maxHeight: 54, 
                      paddingLeft: wp('4%'),
                      paddingRight: wp('12%'),
                    }}
                  >
                    <TextInput
                      style={{ fontSize: hp('1.85%') }}
                      className="text-white h-full p-0"
                      placeholder="Confirm Password"
                      placeholderTextColor="rgba(255, 255, 255, 0.45)"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(prev => !prev)}
                      className="absolute right-3.5 h-full justify-center items-center"
                      activeOpacity={0.7}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      {showConfirmPassword ? (
                        <EyeOff color="rgba(255, 255, 255, 0.7)" size={iconSize} />
                      ) : (
                        <Eye color="rgba(255, 255, 255, 0.7)" size={iconSize} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Green Gradient Register Button */}
                <GradientButton
                  title="Register"
                  onPress={handleRegister}
                  colors={['#004F2C', '#00B565']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ 
                    height: hp('6.4%'), 
                    minHeight: 50, 
                    maxHeight: 58, 
                    marginTop: hp('1%') 
                  }}
                  className="w-full rounded-full border border-[#00B565]/40 shadow-lg"
                  textStyle={{ fontSize: hp('2.2%') }}
                  textClassName="text-[#FFC80A] font-bold"
                  icon={<CircleUserRound color="#FFC80A" size={iconSize} />}
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

                {/* Login Link */}
                <TouchableOpacity
                  onPress={handleLogin}
                  activeOpacity={0.75}
                  className="items-center justify-center"
                  style={{ paddingVertical: hp('0.5%') }}
                >
                  <Text 
                    style={{ fontSize: hp('1.9%') }}
                    className="text-[#FFC80A] font-semibold tracking-wide"
                  >
                    Login &gt;
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
