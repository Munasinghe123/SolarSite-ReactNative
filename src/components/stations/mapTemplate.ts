import { Station } from '../../types/station';

export function getLeafletMapHtml(stations: Station[]): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, html, #map { width: 100%; height: 100%; background: #E5E7EB; }
    
    .station-pin {
      background: #047857;
      border: 2.5px solid #FFFFFF;
      box-shadow: 0 4px 12px rgba(4, 120, 87, 0.45), 0 2px 4px rgba(0,0,0,0.15);
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      width: 38px;
      height: 38px;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .station-pin span {
      color: #FFC80A;
      font-size: 13px;
      line-height: 1;
      font-weight: 900;
    }
    .station-pin small {
      font-size: 9px;
      color: #FFFFFF;
      line-height: 1;
      margin-top: 1px;
      font-weight: 900;
    }

    .user-pulse-container {
      position: relative;
      width: 22px;
      height: 22px;
    }
    .user-pulse-core {
      width: 16px;
      height: 16px;
      background: #0284C7;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      position: absolute;
      top: 3px;
      left: 3px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      z-index: 2;
    }
    .user-pulse-wave {
      width: 22px;
      height: 22px;
      background: rgba(2, 132, 199, 0.35);
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      animation: pulse-ring 2s infinite ease-out;
      z-index: 1;
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.6); opacity: 1; }
      100% { transform: scale(2.2); opacity: 0; }
    }

    .leaflet-popup-content-wrapper {
      background: #FFFFFF;
      color: #0F172A;
      border-radius: 18px;
      box-shadow: 0 12px 28px rgba(0,0,0,0.18);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 4px;
      border: 1px solid #E2E8F0;
    }
    .leaflet-popup-content { margin: 10px 14px; }
    .leaflet-popup-tip { background: #FFFFFF; }
    .leaflet-control-attribution { display: none !important; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var defaultLat = 6.9271;
    var defaultLng = 79.8612;

    var map = L.map('map', {
      zoomControl: false,
      attributionControl: false,
      minZoom: 3,
      maxZoom: 19,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      boxZoom: true,
      dragging: true
    }).setView([defaultLat, defaultLng], 14);

    window.map = map;

    // Free OpenStreetMap Standard Tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    var userMarker = null;
    var stationMarkersMap = {};
    var rawStations = ${JSON.stringify(stations)};
    var currentBaseLat = defaultLat;
    var currentBaseLng = defaultLng;

    var hasCentered = false;
    var hasUserPanned = false;
    var lastUserCoords = null;

    // Detect user manual interaction with the map
    map.on('dragstart zoomstart', function() {
      hasUserPanned = true;
    });

    function sendToRN(payload) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(payload));
      }
    }

    // Place stations around base coordinates
    function plotStations(baseLat, baseLng, stationsToRender) {
      currentBaseLat = baseLat;
      currentBaseLng = baseLng;
      var list = stationsToRender || rawStations;

      Object.keys(stationMarkersMap).forEach(function(id) {
        map.removeLayer(stationMarkersMap[id]);
      });
      stationMarkersMap = {};

      var offsets = [
        { dLat: 0.007, dLng: 0.005 },
        { dLat: -0.012, dLng: -0.010 },
        { dLat: -0.020, dLng: 0.015 },
        { dLat: 0.025, dLng: -0.020 },
        { dLat: -0.035, dLng: -0.028 },
        { dLat: 0.040, dLng: 0.035 }
      ];

      list.forEach(function(s, idx) {
        var off = offsets[idx % offsets.length];
        var sLat = baseLat + off.dLat;
        var sLng = baseLng + off.dLng;

        var icon = L.divIcon({
          className: 'station-icon-wrap',
          html: '<div class="station-pin"><span>⚡</span><small>' + s.batteriesReady + '</small></div>',
          iconSize: [38, 38],
          iconAnchor: [19, 19]
        });

        var marker = L.marker([sLat, sLng], { icon: icon }).addTo(map)
          .bindPopup(
            '<b style="color:#064E3B; font-size:13px;">' + s.name + '</b><br>' +
            '<span style="color:#047857; font-size:12px; font-weight:bold;">⚡ ' + s.batteriesReady + ' Batteries Ready</span><br>' +
            '<span style="color:#64748B; font-size:11px;">' + s.distance + ' • ' + s.location + '</span>',
            { autoPan: false }
          );

        marker.on('click', function() {
          sendToRN({ type: 'STATION_SELECTED', stationId: s.id });
        });

        stationMarkersMap[s.id] = marker;
      });
    }

    // Dynamic marker update without page reload
    window.updateStations = function(newStations) {
      rawStations = newStations;
      plotStations(currentBaseLat, currentBaseLng, newStations);
    };

    // Plot initial stations immediately
    plotStations(defaultLat, defaultLng);

    function onLocationReceived(lat, lng, accuracy, shouldFly) {
      lastUserCoords = { lat: lat, lng: lng, accuracy: accuracy };
      sendToRN({ type: 'LOCATION_FOUND', lat: lat, lng: lng, accuracy: accuracy });

      if (!userMarker) {
        var userIcon = L.divIcon({
          className: 'user-marker-wrap',
          html: '<div class="user-pulse-container"><div class="user-pulse-wave"></div><div class="user-pulse-core"></div></div>',
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });
        userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
        userMarker.bindPopup('<b style="color:#0284C7; font-size:13px;">Your Live Location</b>', { autoPan: false });
      } else {
        userMarker.setLatLng([lat, lng]);
      }

      // Re-plot stations around actual user coordinates on first fix
      if (!hasCentered) {
        plotStations(lat, lng);
      }

      // ONLY move camera if shouldFly is true
      if (shouldFly) {
        hasCentered = true;
        map.flyTo([lat, lng], 15, { duration: 1.0 });
      }
    }

    // Single-shot location check (ZERO continuous background watcher)
    function fetchLocation(shouldFly) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(pos) {
            var canFly = shouldFly && !hasUserPanned;
            onLocationReceived(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy, canFly);
          },
          function(err) {
            sendToRN({ type: 'LOG', message: 'GPS error: ' + err.message });
          },
          { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
        );
      }
    }

    // Recenter GPS button: user explicitly requested to jump to location
    function recenterOnUser() {
      hasUserPanned = false;
      if (lastUserCoords) {
        map.flyTo([lastUserCoords.lat, lastUserCoords.lng], 15, { duration: 1.0 });
      }
      fetchLocation(true);
    }

    window.recenterOnUser = recenterOnUser;
    window.locateUser = function() { fetchLocation(!hasUserPanned); };

    // Center on specific station from bottom sheet
    window.focusStation = function(stationId) {
      hasUserPanned = true;
      var marker = stationMarkersMap[stationId];
      if (marker) {
        var latlng = marker.getLatLng();
        map.flyTo(latlng, 15.5, { duration: 1.0 });
        marker.openPopup();
      }
    };

    // Initial location on screen launch
    fetchLocation(true);
  </script>
</body>
</html>
  `;
}
