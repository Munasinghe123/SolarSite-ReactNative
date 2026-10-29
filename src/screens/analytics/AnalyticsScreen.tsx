import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/common/Header';

export const AnalyticsScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 px-5 pt-4">
      <Header title="Analytics" />

      <View className="mb-5 rounded-3xl bg-slate-900/60 p-6 border border-slate-800">
        <Text className="text-base font-semibold text-white">Production Analytics</Text>
        <Text className="mt-1 text-xs text-slate-400">
          Historical energy yield and consumption patterns
        </Text>

        <View className="mt-8 mb-4 h-40 items-center justify-center rounded-2xl bg-slate-950/60 border border-dashed border-slate-800">
          <Text className="text-sm text-slate-500">Analytics charts coming soon</Text>
        </View>
      </View>
    </ScrollView>
  );
};
