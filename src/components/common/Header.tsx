import React from 'react';
import { Text, View } from 'react-native';

interface HeaderProps {
  title?: string;
  isOnline?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Solar grid',
  isOnline = true,
}) => {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      <View>
        <Text className="text-3xl font-bold tracking-tight text-white">
          {title}
        </Text>
      </View>
      {isOnline && (
        <View className="rounded-full bg-emerald-500/20 px-3 py-1 border border-emerald-500/30">
          <Text className="text-xs font-medium text-emerald-400">Online</Text>
        </View>
      )}
    </View>
  );
};
