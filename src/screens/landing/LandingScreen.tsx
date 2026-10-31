import React from 'react';
import {
  Image,
  ImageBackground,
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
import { LogIn, CircleUserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../../components/common/GradientButton';
import bg from '../../assets/images/bg.png';
import logo from '../../assets/images/logo.png';

export interface LandingScreenProps {
  onLogin?: () => void;
  onRegister?: () => void;
}

export default function LandingScreen({ onLogin, onRegister }: LandingScreenProps) {
  const navigation = useNavigation();
  const iconSize = Math.min(Math.max(Math.round(hp('2.6%')), 20), 26);

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigation.navigate('Login');
    }
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
      style={styles.background}
    >
      {/* Dark Overlay */}
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.contentContainer}>
            {/* Center / Hero Branding */}
            <View style={styles.heroSection}>
              <Image 
                source={logo} 
                style={styles.logo} 
                resizeMode="contain" 
              />

              <Text style={styles.title}>
                <Text style={styles.titleSolar}>SOLAR </Text>
                <Text style={styles.titleSite}>GRID</Text>
              </Text>

              <Text style={styles.subtitle}>
                Smarter Energy Starts With the Sun
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              {/* Green Gradient Pill Login Button */}
              <GradientButton
                title="Login"
                onPress={handleLogin}
                colors={['#004F2C', '#00B565']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
                className="w-full border border-[#00B565] shadow-lg"
                textStyle={styles.buttonText}
                textClassName="text-[#FFC80A]"
                icon={<LogIn color="#FFC80A" size={iconSize} />}
              />

              {/* Glassmorphic / Gold Border Register Button */}
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleRegister}
                style={styles.button}
                className="w-full rounded-full flex-row items-center justify-center border-2 border-[#FFC80A] bg-white/15 shadow-md active:bg-white/25"
              >
                <CircleUserRound color="#FFC80A" size={iconSize} />
                <Text 
                  style={styles.registerButtonText} 
                  className="font-bold ml-2.5 tracking-wide"
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('4%'),
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
  },
  heroSection: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('3%'),
  },
  logo: {
    width: wp('28%'),
    height: wp('28%'),
    maxWidth: 130,
    maxHeight: 130,
    minWidth: 80,
    minHeight: 80,
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: hp('5.8%'),
    fontWeight: '800',
    textAlign: 'center',
  },
  titleSolar: {
    color: '#10B981',
  },
  titleSite: {
    color: '#FFC80A',
  },
  subtitle: {
    color: '#CBD5E1',
    textAlign: 'center',
    fontSize: hp('2%'),
    fontWeight: '500',
    paddingHorizontal: wp('4%'),
  },
  actionContainer: {
    width: '100%',
    gap: hp('1.8%'),
    paddingBottom: hp('2%'),
  },
  button: {
    height: hp('6.8%'),
    minHeight: 52,
    maxHeight: 62,
  },
  buttonText: {
    fontSize: hp('2.1%'),
  },
  registerButtonText: {
    color: '#FFC80A',
    fontSize: hp('2.1%'),
  },
});
