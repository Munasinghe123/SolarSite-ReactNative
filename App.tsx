import './global.css';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'analytics'>('overview');

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-950">
        <StatusBar barStyle="light-content" />
        <ScrollView className="flex-1 px-5 pt-4">
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
           
            <Text className="text-3xl font-bold tracking-tight text-white">
              Solar grid bro yoo
            </Text>
          </View>
          <View className="rounded-full bg-emerald-500/20 px-3 py-1 border border-emerald-500/30">
            <Text className="text-xs font-medium text-emerald-400">Online</Text>
          </View>
        </View>

        {/* Hero Power Card */}
        <View className="mb-5 overflow-hidden rounded-3xl bg-emerald-900/40 p-6 border border-emerald-500/30">
          <Text className="text-sm font-medium text-emerald-200">Current Generation</Text>
          <View className="mt-2 flex-row items-baseline">
            <Text className="text-5xl font-extrabold text-white">4.82</Text>
            <Text className="ml-2 text-xl font-semibold text-emerald-300">kW</Text>
          </View>
          <Text className="mt-1 text-xs text-emerald-300/80">
            +18.4% compared to yesterday at this hour
          </Text>

          {/* Quick Metrics */}
          <View className="mt-6 flex-row justify-between border-t border-emerald-500/20 pt-4">
            <View>
              <Text className="text-xs text-emerald-200/70">Daily Total</Text>
              <Text className="text-base font-bold text-white">28.4 kWh</Text>
            </View>
            <View>
              <Text className="text-xs text-emerald-200/70">Efficiency</Text>
              <Text className="text-base font-bold text-white">96.2%</Text>
            </View>
            <View>
              <Text className="text-xs text-emerald-200/70">Grid Export</Text>
              <Text className="text-base font-bold text-white">12.1 kWh</Text>
            </View>
          </View>
        </View>

        {/* Tab Selector */}
        <View className="mb-5 flex-row rounded-2xl bg-slate-900 p-1 border border-slate-800">
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

        {/* Stat Cards Grid */}
        <View className="mb-5 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-slate-900 p-4 border border-slate-800">
            <Text className="text-xs text-slate-400">Battery Level</Text>
            <Text className="mt-1 text-2xl font-bold text-white">88%</Text>
            <Text className="mt-1 text-xs text-emerald-400">Charging (1.2 kW)</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-slate-900 p-4 border border-slate-800">
            <Text className="text-xs text-slate-400">CO2 Offset</Text>
            <Text className="mt-1 text-2xl font-bold text-white">14.6 kg</Text>
            <Text className="mt-1 text-xs text-emerald-400">Today</Text>
          </View>
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
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

export default App;