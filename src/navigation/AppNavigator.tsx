import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OverviewScreen } from '../screens/overview/OverviewScreen';
import { AnalyticsScreen } from '../screens/analytics/AnalyticsScreen';

export const AppNavigator: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'analytics'>('overview');

  return (
    <View className="flex-1 bg-slate-950">
      {/* Top / Floating Tab Selector */}
      <View className="px-5 pt-3 pb-1">
        <View className="flex-row rounded-2xl bg-slate-900 p-1 border border-slate-800">
          <TouchableOpacity
            className={`flex-1 rounded-xl py-2.5 items-center ${
              selectedTab === 'overview' ? 'bg-emerald-600 shadow-sm' : ''
            }`}
            onPress={() => setSelectedTab('overview')}
            activeOpacity={0.8}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedTab === 'overview' ? 'text-white' : 'text-slate-400'
              }`}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-xl py-2.5 items-center ${
              selectedTab === 'analytics' ? 'bg-emerald-600 shadow-sm' : ''
            }`}
            onPress={() => setSelectedTab('analytics')}
            activeOpacity={0.8}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedTab === 'analytics' ? 'text-white' : 'text-slate-400'
              }`}
            >
              Analytics
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Screen Content */}
      <View className="flex-1">
        {selectedTab === 'overview' ? <OverviewScreen /> : <AnalyticsScreen />}
      </View>
    </View>
  );
};
