import React from 'react';
import { Text, View } from 'react-native';

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  subtextColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  subtextColor = 'text-emerald-400',
}) => {
  return (
    <View className="flex-1 rounded-2xl bg-slate-900 p-4 border border-slate-800">
      <Text className="text-xs text-slate-400">{label}</Text>
      <Text className="mt-1 text-2xl font-bold text-white">{value}</Text>
      <Text className={`mt-1 text-xs ${subtextColor}`}>{subtext}</Text>
    </View>
  );
};
