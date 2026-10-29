import React from 'react';
import { Text, View } from 'react-native';

interface PowerHeroCardProps {
  currentPower?: string;
  unit?: string;
  comparisonText?: string;
  dailyTotal?: string;
  efficiency?: string;
  gridExport?: string;
}

export const PowerHeroCard: React.FC<PowerHeroCardProps> = ({
  currentPower = '4.82',
  unit = 'kW',
  comparisonText = '+18.4% compared to yesterday at this hour',
  dailyTotal = '28.4 kWh',
  efficiency = '96.2%',
  gridExport = '12.1 kWh',
}) => {
  return (
    <View className="mb-5 overflow-hidden rounded-3xl bg-emerald-900/40 p-6 border border-emerald-500/30">
      <Text className="text-sm font-medium text-emerald-200">Current Generation</Text>
      <View className="mt-2 flex-row items-baseline">
        <Text className="text-5xl font-extrabold text-white">{currentPower}</Text>
        <Text className="ml-2 text-xl font-semibold text-emerald-300">{unit}</Text>
      </View>
      <Text className="mt-1 text-xs text-emerald-300/80">
        {comparisonText}
      </Text>

      {/* Quick Metrics */}
      <View className="mt-6 flex-row justify-between border-t border-emerald-500/20 pt-4">
        <View>
          <Text className="text-xs text-emerald-200/70">Daily Total</Text>
          <Text className="text-base font-bold text-white">{dailyTotal}</Text>
        </View>
        <View>
          <Text className="text-xs text-emerald-200/70">Efficiency</Text>
          <Text className="text-base font-bold text-white">{efficiency}</Text>
        </View>
        <View>
          <Text className="text-xs text-emerald-200/70">Grid Export</Text>
          <Text className="text-base font-bold text-white">{gridExport}</Text>
        </View>
      </View>
    </View>
  );
};
