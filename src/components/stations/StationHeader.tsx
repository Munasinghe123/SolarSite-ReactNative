import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ArrowLeft, Search, Scan, MapPin } from 'lucide-react-native';
import { RadiusFilter } from '../../types/station';

interface StationHeaderProps {
  onBack: () => void;
  onScanPress?: () => void;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  selectedRadius: RadiusFilter;
  onRadiusChange: (radius: RadiusFilter) => void;
  radiusOptions?: RadiusFilter[];
}

export const StationHeader: React.FC<StationHeaderProps> = ({
  onBack,
  onScanPress,
  searchQuery,
  onSearchChange,
  selectedRadius,
  onRadiusChange,
  radiusOptions = ['10 km', '25 km', '50 km', 'All'],
}) => {
  return (
    <View
      style={{
        paddingHorizontal: wp('5.5%'),
        paddingTop: hp('2.8%'),
        paddingBottom: hp('1.8%'),
      }}
      className="w-full z-20"
    >
      {/* Row 1: Unified Floating White Pill Header */}
      <View className="flex-row items-center justify-between w-full rounded-3xl bg-[#0C2B1C]/85 border border-emerald-500/30 shadow-xl overflow-hidden  shadow-lg shadow-black/15 p-2">
        {/* Back Button (Styled to match QR Scanner Button) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          className="w-10 h-10 rounded-2xl bg-[#FFC80A] border border-emerald-500/30 items-center justify-center shadow-sm "
        >
          <ArrowLeft color="#000000ff" size={20} strokeWidth={4} />
        </TouchableOpacity>

        {/* Heading Title */}
        <View className="flex-1 px-3 items-center justify-center">
          <Text
            style={{ fontSize: hp('2.05%') }}
            className="font-extrabold text-white tracking-tight text-center leading-tight"
          >
            Select Swap Station
          </Text>
        </View>

        {/* QR Scanner Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onScanPress}
          className="w-10 h-10 rounded-2xl bg-[#FFC80A] border border-emerald-500/30 items-center justify-center shadow-sm relative active:bg-emerald-950"
        >
          <Scan color="#060606ff" size={20} strokeWidth={4} />
          <View className="w-1.5 h-1.5 rounded-full bg-[#FFC80A] absolute" />
        </TouchableOpacity>
      </View>

      {/* Row 2: Floating Search Bar Card */}
      <View className="mt-3 flex-row items-center bg-white border border-emerald-600/60 rounded-full px-4 py-2.5 shadow-md shadow-black/15">
        <Search color="#064E3B" size={20} strokeWidth={2.2} />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search a location, station, or city..."
          placeholderTextColor="#94A3B8"
          style={{ fontSize: hp('1.75%') }}
          className="flex-1 ml-3 text-slate-800 font-medium p-0"
        />
      </View>

      {/* Row 3: Floating Radius Filter Chips */}
      <View className="mt-2.5 flex-row items-center justify-between">
        {radiusOptions.map((option) => {
          const isSelected = selectedRadius === option;
          const isAll = option === 'All';

          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.85}
              onPress={() => onRadiusChange(option)}
              className="py-2 px-3.5 rounded-full flex-row items-center justify-center border shadow-md shadow-black/15"
              style={{
                minWidth: wp('19%'),
                backgroundColor: isSelected ? '#FFC80A' : '#064E3B',
                borderColor: isSelected ? '#FFC80A' : 'rgba(52, 211, 153, 0.25)',
              }}
            >
              {isAll && (
                <MapPin
                  color={isSelected ? '#0A1A12' : '#34D399'}
                  size={14}
                  strokeWidth={2.2}
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                style={{
                  fontSize: hp('1.55%'),
                  color: isSelected ? '#0A1A12' : '#E2E8F0',
                }}
                className="font-bold"
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
