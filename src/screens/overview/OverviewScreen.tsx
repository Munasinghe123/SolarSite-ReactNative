import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/common/Header';
import { PowerHeroCard } from '../../components/solar/PowerHeroCard';
import { StatCard } from '../../components/solar/StatCard';

interface OverviewScreenProps {
  onSelectTab?: (tab: 'overview' | 'analytics') => void;
  selectedTab?: 'overview' | 'analytics';
}

export const OverviewScreen: React.FC<OverviewScreenProps> = () => {
  return (
    <ScrollView className="flex-1 px-5 pt-4">
      {/* Header */}
      <Header title="Solar grid" isOnline={true} />

      {/* Hero Power Card */}
      <PowerHeroCard
        currentPower="4.82"
        unit="kW"
        comparisonText="+18.4% compared to yesterday at this hour"
        dailyTotal="28.4 kWh"
        efficiency="96.2%"
        gridExport="12.1 kWh"
      />

      {/* Stat Cards Grid */}
      <View className="mb-5 flex-row gap-3">
        <StatCard
          label="Battery Level"
          value="88%"
          subtext="Charging (1.2 kW)"
          subtextColor="text-emerald-400"
        />
        <StatCard
          label="CO2 Offset"
          value="14.6 kg"
          subtext="Today"
          subtextColor="text-emerald-400"
        />
      </View>

      {/* Status Banner */}
      <View className="mb-8 rounded-2xl bg-slate-900 p-4 border border-slate-800">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm font-semibold text-white">
              NativeWind Tailwind CSS
            </Text>
            <Text className="mt-0.5 text-xs text-slate-400">
              Tailwind CSS v3 + NativeWind v4 configured
            </Text>
          </View>
          <View className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </View>
      </View>
    </ScrollView>
  );
};
