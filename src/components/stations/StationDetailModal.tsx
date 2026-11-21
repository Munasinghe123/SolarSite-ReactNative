import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { MapPin, BatteryCharging, ArrowRight, X, Navigation } from 'lucide-react-native';
import { Station } from '../../types/station';
import { GradientButton } from '../common/GradientButton';
import cardLeaf from '../../assets/images/cardLeaf.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface StationDetailModalProps {
  visible: boolean;
  station: Station | null;
  onClose: () => void;
  onContinue?: (station: Station) => void;
  onNavigate?: (station: Station) => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({
  visible,
  station,
  onClose,
  onContinue,
  onNavigate,
}) => {
  if (!station) return null;

  const displayDistance = station.distance
    ? station.distance.replace(' away', '')
    : '10 km';
  const displayCapacity = station.totalCapacity || '200 kw';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-black/65 justify-center items-center px-6"
      >
        <TouchableWithoutFeedback>
          {/* Card Container */}
          <View
            className="w-full max-w-[340px] bg-[#072115] rounded-[32px] border border-emerald-500/35 overflow-hidden p-5 relative shadow-2xl shadow-black"
          >
            <Image
              source={cardLeaf}
              resizeMode="contain"
              className="absolute -left-12 bottom-6 pointer-events-none"
              style={{
                width: wp('58%'),
                height: wp('58%'),
              }}
            />

            <Image
              source={cardLeaf}
              resizeMode="contain"
              className="absolute -right-12 top-1 scale-y-[-1]  scale-x-[-1] pointer-events-none"
              style={{
                width: wp('58%'),
                height: wp('58%'),
              }}
            />

            {/* Close Button */}
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              className="absolute top-4 right-4 z-20 w-7 h-7 rounded-full bg-black/40 items-center justify-center border border-white/10"
            >
              <X size={15} color="#CBD5E1" strokeWidth={2.5} />
            </TouchableOpacity>

            {/* Title */}
            <Text
              numberOfLines={1}
              className="text-[#FFC80A] text-2xl font-black text-center mt-1 mb-4 tracking-tight px-6"
            >
              {station.name}
            </Text>

            {/* Station Hero Image */}
            <View className="w-full h-44 rounded-[22px] border-2 border-[#FFC80A] overflow-hidden mb-4 bg-emerald-950/40">
              <Image
                source={require('../../assets/images/mahavali.jpg')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            {/* Stats Pill Container */}
            <View className="flex-row items-center justify-between bg-[#0B2C1B]/85 border border-emerald-500/30 rounded-2xl py-3 px-4 mb-4">
              {/* Distance Section */}
              <View className="flex-1 flex-row items-center justify-center pr-2">
                <MapPin size={24} color="#FFC80A" strokeWidth={2.2} />
                <View className="ml-2.5">
                  <Text className="text-slate-300 text-[11px] font-medium leading-tight">
                    Distance
                  </Text>
                  <Text className="text-white text-[15px] font-extrabold leading-tight mt-0.5">
                    {displayDistance}
                  </Text>
                </View>
              </View>

              {/* Vertical Divider */}
              <View className="w-[1px] h-8 bg-emerald-500/30 mx-1" />

              {/* Total Capacity Section */}
              <View className="flex-1 flex-row items-center justify-center pl-2">
                <BatteryCharging size={24} color="#FFC80A" strokeWidth={2.2} />
                <View className="ml-2.5">
                  <Text className="text-slate-300 text-[11px] font-medium leading-tight">
                    Total Capacity
                  </Text>
                  <Text className="text-white text-[15px] font-extrabold leading-tight mt-0.5">
                    {displayCapacity}
                  </Text>
                </View>
              </View>
            </View>

            {/* Continue CTA Button */}
            <GradientButton
              title="Reserve Spot"
              onPress={() => onContinue?.(station)}
              colors={['#004F2C', '#00B565']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 50,
              }}
              className="w-full mb-4 rounded-full border border-[#42A97C] shadow-lg shadow-emerald-950/60"
              textClassName="text-white font-black text-base tracking-wide"
              rightIcon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={3} />}
            />

            <GradientButton
              title="Start Navigation"
              onPress={() => (onNavigate ? onNavigate(station) : onContinue?.(station))}
              colors={['#904e04ff', '#FFC80A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 50,
              }}
              className="w-full rounded-full border border-[#FFC80A] shadow-lg shadow-black/40"
              textClassName="text-[#071F15] font-black text-base tracking-wide"
              rightIcon={<Navigation size={18} color="#071F15" fill="#071F15" />}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};
