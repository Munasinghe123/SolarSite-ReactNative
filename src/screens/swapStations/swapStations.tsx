import React, { useState, useEffect } from 'react';
import { View, StatusBar, Platform, PermissionsAndroid, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { RadiusFilter, Station } from '../../types/station';
import { MOCK_STATIONS, filterStations } from '../../constants/mockStations';
import { StationHeader } from '../../components/stations/StationHeader';
import { StationMap } from '../../components/stations/StationMap';
import {
  StationBottomSheet,
  COLLAPSED_HEIGHT,
} from '../../components/stations/StationBottomSheet';
import { StationDetailModal } from '../../components/stations/StationDetailModal';

export default function SwapStations() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRadius, setSelectedRadius] = useState<RadiusFilter>('10 km');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAndRequestLocation = async () => {
      if (Platform.OS === 'android') {
        try {
          // Check if already granted first
          const hasFine = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          const hasCoarse = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
          );

          if (hasFine || hasCoarse) {
            if (isMounted) setIsLocationPermissionGranted(true);
            return;
          }

          // Otherwise prompt user
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ]);

          const fineGranted =
            granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;
          const coarseGranted =
            granted['android.permission.ACCESS_COARSE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

          if (isMounted && (fineGranted || coarseGranted)) {
            setIsLocationPermissionGranted(true);
          }
        } catch (err) {
          console.warn('Location permission error:', err);
        }
      } else {
        if (isMounted) {
          setIsLocationPermissionGranted(true);
        }
      }
    };

    checkAndRequestLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredStations = filterStations(MOCK_STATIONS, selectedRadius, searchQuery);

  const handleBookSwap = (station: Station) => {
    Alert.alert(
      'Confirm Swap Reservation',
      `Reserve 1 battery at ${station.name}?\n\nReady Units: ${station.batteriesReady}\n15-minute hold timer will begin.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Reserve',
          style: 'default',
          onPress: () => {
            Alert.alert('Reserved!', `Battery reserved at ${station.name}. Navigate there now.`);
          },
        },
      ]
    );
  };

  return (
    <View className="relative flex-1 bg-[#07170F] items-center">
      <StatusBar barStyle="dark-content" />

      {/* Layer 0: Geographic Interactive Street Map */}
      <StationMap
        stations={filteredStations}
        selectedStationId={selectedStation?.id}
        onSelectStation={setSelectedStation}
        bottomOffset={COLLAPSED_HEIGHT}
        permissionGranted={isLocationPermissionGranted}
      />

      {/* Layer 1: Top Search & Radius Filter Card */}
      <StationHeader
        onBack={() => navigation.goBack()}
        onScanPress={() => console.log('Scan pressed')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRadius={selectedRadius}
        onRadiusChange={setSelectedRadius}
      />

      {/* Layer 2: Swipeable Stations Bottom Sheet */}
      <StationBottomSheet
        stations={filteredStations}
        selectedStationId={selectedStation?.id}
        onSelectStation={setSelectedStation}
        onBookSwap={handleBookSwap}
      />

      {/* Layer 3: Tapped Station Details Card Modal */}
      <StationDetailModal
        visible={!!selectedStation}
        station={selectedStation}
        onClose={() => setSelectedStation(null)}
        onContinue={(st) => {
          setSelectedStation(null);
          handleBookSwap(st);
        }}
        onNavigate={(st) => {
          setSelectedStation(null);
          Alert.alert('Navigation Started', `Routing to ${st.name}...`);
        }}
      />
    </View>
  );
}
