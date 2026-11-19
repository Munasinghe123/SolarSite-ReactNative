import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Zap, Navigation as NavIcon, Clock } from 'lucide-react-native';
import { Station } from '../../types/station';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
export const COLLAPSED_HEIGHT = Math.round(SCREEN_HEIGHT * 0.10);
export const EXPANDED_HEIGHT = Math.round(SCREEN_HEIGHT * 0.58);
const HIDDEN_Y = EXPANDED_HEIGHT - COLLAPSED_HEIGHT;

interface StationBottomSheetProps {
  stations: Station[];
  selectedStationId?: string | null;
  onSelectStation?: (station: Station) => void;
  onBookSwap?: (station: Station) => void;
}

export const StationBottomSheet: React.FC<StationBottomSheetProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  onBookSwap,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const translateY = useRef(new Animated.Value(HIDDEN_Y)).current;
  const currentY = useRef(HIDDEN_Y);

  const snapTo = (toValue: number) => {
    currentY.current = toValue;
    setIsExpanded(toValue === 0);
    Animated.spring(translateY, {
      toValue,
      useNativeDriver: true,
      bounciness: 4,
      speed: 14,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 6;
      },
      onPanResponderGrant: () => {
        translateY.stopAnimation();
      },
      onPanResponderMove: (_, gestureState) => {
        const nextY = currentY.current + gestureState.dy;
        if (nextY >= -15 && nextY <= HIDDEN_Y + 30) {
          translateY.setValue(nextY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const finalY = currentY.current + gestureState.dy;

        if (gestureState.dy < -40 || gestureState.vy < -0.3) {
          snapTo(0);
        } else if (gestureState.dy > 40 || gestureState.vy > 0.3) {
          snapTo(HIDDEN_Y);
        } else {
          if (finalY < HIDDEN_Y / 2) {
            snapTo(0);
          } else {
            snapTo(HIDDEN_Y);
          }
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        height: EXPANDED_HEIGHT,
        transform: [{ translateY }],
      }}
      className="absolute bottom-0 w-full bg-[#0D2418] rounded-t-[36px] border-t border-emerald-500/25 shadow-2xl z-30 overflow-hidden"
    >
      {/* Grabbable Top Handle Area */}
      <View
        {...panResponder.panHandlers}
        className="w-full pt-3 pb-3 bg-[#0D2418]"
      >
        <View className="items-center py-1">
          <View className="w-14 h-1.5 rounded-full bg-emerald-400/40" />
        </View>

        <View className="flex-row items-center justify-between px-6 pt-1">
          <View className="flex-row items-center">
            <Text
              style={{ fontSize: hp('2.1%') }}
              className="font-extrabold text-white tracking-tight"
            >
              Nearby Stations
            </Text>
            <View className="ml-2.5 bg-[#FFC80A] px-2.5 py-0.5 rounded-full">
              <Text className="text-[#0A1A12] font-black text-xs">
                {stations.length}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => snapTo(isExpanded ? HIDDEN_Y : 0)}
            className="py-1 px-2"
          >
            <Text className="text-emerald-400 font-semibold text-xs">
              {isExpanded ? 'Collapse ↓' : 'View All ↑'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Inner Station Cards */}
      <ScrollView
        className="flex-1 px-5 pt-1"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        bounces={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: hp('10%') }}
      >
        {stations.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-slate-400 font-medium text-sm">
              No swap stations found in this radius.
            </Text>
          </View>
        ) : (
          stations.map((station) => {
            const isSelected = station.id === selectedStationId;

            return (
              <TouchableOpacity
                key={station.id}
                activeOpacity={0.9}
                onPress={() => onSelectStation?.(station)}
                className={`bg-[#133323] border rounded-3xl p-4 mb-3.5 shadow-md ${
                  isSelected ? 'border-emerald-400' : 'border-emerald-500/25'
                }`}
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-2">
                    <Text className="text-white font-extrabold text-base tracking-tight">
                      {station.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <NavIcon color="#34D399" size={12} />
                      <Text className="text-slate-300 text-xs font-semibold ml-1">
                        {station.distance} • {station.location}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-full flex-row items-center">
                    <Zap color="#FFC80A" size={13} fill="#FFC80A" />
                    <Text className="text-[#FFC80A] font-bold text-xs ml-1">
                      {station.batteriesReady} Ready
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between mt-3.5 pt-3 border-t border-emerald-500/15">
                  <View className="flex-row items-center">
                    <Clock color="#94A3B8" size={13} />
                    <Text className="text-slate-400 text-xs ml-1 font-medium">
                      {station.openStatus}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => onBookSwap?.(station)}
                    className="bg-[#00B565] px-4 py-2 rounded-full border border-emerald-300/40 active:opacity-80"
                  >
                    <Text className="text-white font-extrabold text-xs tracking-wide">
                      Book Swap
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </Animated.View>
  );
};
