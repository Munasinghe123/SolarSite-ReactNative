import React, { useRef, useEffect, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { LocateFixed, Plus, Minus } from 'lucide-react-native';
import { Station } from '../../types/station';
import { getLeafletMapHtml } from './mapTemplate';

interface StationMapProps {
  stations: Station[];
  selectedStationId?: string | null;
  onSelectStation?: (station: Station) => void;
  bottomOffset?: number;
  permissionGranted?: boolean;
}

export const StationMap: React.FC<StationMapProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  bottomOffset = 0,
  permissionGranted = false,
}) => {
  const webViewRef = useRef<any>(null);
  const isFirstRender = useRef(true);

  // Memoize HTML so the WebView NEVER reloads on parent re-renders!
  const mapHtml = useMemo(() => getLeafletMapHtml(stations), []);

  // Update markers smoothly in JS without reloading the page
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    webViewRef.current?.injectJavaScript(`
      if (typeof window.updateStations === 'function') {
        window.updateStations(${JSON.stringify(stations)});
      }
      true;
    `);
  }, [stations]);

  // Recenter map using live GPS
  const handleRecenter = () => {
    webViewRef.current?.injectJavaScript(`
      if (typeof window.recenterOnUser === 'function') {
        window.recenterOnUser();
      }
      true;
    `);
  };

  // Zoom In
  const handleZoomIn = () => {
    webViewRef.current?.injectJavaScript(`
      if (window.map) {
        window.map.zoomIn();
      }
      true;
    `);
  };

  // Zoom Out
  const handleZoomOut = () => {
    webViewRef.current?.injectJavaScript(`
      if (window.map) {
        window.map.zoomOut();
      }
      true;
    `);
  };

  const triggerLocationSync = () => {
    webViewRef.current?.injectJavaScript(`
      if (typeof window.recenterOnUser === 'function') {
        window.recenterOnUser();
      } else if (typeof window.locateUser === 'function') {
        window.locateUser();
      }
      true;
    `);
  };

  // Trigger GPS detection when permission is granted
  useEffect(() => {
    if (permissionGranted) {
      const timer = setTimeout(() => {
        triggerLocationSync();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [permissionGranted]);

  // Pan to station marker when selected from bottom sheet
  useEffect(() => {
    if (selectedStationId) {
      webViewRef.current?.injectJavaScript(`
        if (typeof window.focusStation === 'function') {
          window.focusStation(${JSON.stringify(selectedStationId)});
        }
        true;
      `);
    }
  }, [selectedStationId]);

  // Handle messages from the WebView
  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'LOCATION_FOUND') {
        console.log('[SolarGrid Map] GPS Lock:', data.lat, data.lng, data.label || '');
      } else if (data.type === 'STATION_SELECTED') {
        const found = stations.find((s) => s.id === data.stationId);
        if (found && onSelectStation) {
          onSelectStation(found);
        }
      } else if (data.type === 'LOG') {
        console.log('[Leaflet Map]', data.message);
      }
    } catch {
      // Ignore unparseable messages
    }
  };

  return (
    <View className="absolute inset-0 w-full h-full bg-[#E5E7EB]">
      {/* Real Geographic Light Mode Map Layer (Streets, Parks, Oceans) */}
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml, baseUrl: 'http://localhost/' }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
        mixedContentMode="always"
        androidHardwareAccelerationDisabled={false}
        scrollEnabled={true}
        bounces={false}
        overScrollMode="never"
        onLoadEnd={triggerLocationSync}
        onMessage={handleMessage}
        style={{ flex: 1, backgroundColor: '#E5E7EB' }}
      />

      {/* Floating Map Controls (Right Side) */}
      <View
        style={{
          position: 'absolute',
          right: wp('5.5%'),
          bottom: bottomOffset + 18,
          alignItems: 'center',
        }}
        className="z-20"
      >
        {/* Zoom In & Out Cluster */}
        <View className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-black/25 mb-3 overflow-hidden">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleZoomIn}
            className="w-11 h-11 items-center justify-center active:bg-slate-100 border-b border-slate-100"
          >
            <Plus color="#064E3B" size={20} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleZoomOut}
            className="w-11 h-11 items-center justify-center active:bg-slate-100"
          >
            <Minus color="#064E3B" size={20} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* Recenter GPS Target Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleRecenter}
          className="w-12 h-12 rounded-full bg-white border border-slate-200/90 items-center justify-center shadow-xl shadow-black/25 active:bg-slate-100"
        >
          <LocateFixed color="#047857" size={24} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
