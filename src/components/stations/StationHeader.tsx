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
        paddingTop: hp('3.2%'),
        paddingBottom: hp('2.6%'),
      }}
      className="w-full   z-20"
    >
      {/* Row 1: Back Button, Title, Scanner Button */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          className="w-10 h-10 items-center justify-center -ml-1.5 rounded-full active:bg-white/10"
        >
          <ArrowLeft color="#064E3B" size={24} strokeWidth={2.5} />
        </TouchableOpacity>

        <View className="flex-1 ml-2">
          <Text
            style={{ fontSize: hp('2.35%') }}
            className="font-extrabold text-[#064E3B] tracking-tight leading-tight"
          >
            Select Swap Station
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onScanPress}
          className="w-11 h-11 rounded-2xl bg-[#064E3B] border border-emerald-500/30 items-center justify-center shadow-md relative active:bg-emerald-950"
        >
          <Scan color="#FFC80A" size={22} strokeWidth={2.2} />
          <View className="w-1.5 h-1.5 rounded-full bg-[#FFC80A] absolute" />
        </TouchableOpacity>
      </View>

      {/* Row 2: Search Input Bar */}
      <View className="mt-4 flex-row items-center bg-[#064E3B] border border-emerald-500/30 rounded-2xl px-4 py-2.5 shadow-sm">
        <Search color="#34D399" size={20} strokeWidth={2.2} />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search a location, station, or city..."
          placeholderTextColor="#ffffffff"
          style={{ fontSize: hp('1.75%') }}
          className="flex-1 ml-3 text-white font-medium p-0"
        />
      </View>

      {/* Row 3: Radius Filter Chips */}
      <View className="mt-3.5 flex-row items-center justify-between">
        {radiusOptions.map((option) => {
          const isSelected = selectedRadius === option;
          const isAll = option === 'All';

          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.85}
              onPress={() => onRadiusChange(option)}
              className="py-2 px-4 rounded-full flex-row items-center justify-center border"
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
