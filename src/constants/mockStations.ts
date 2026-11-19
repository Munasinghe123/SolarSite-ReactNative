import { Station, RadiusFilter } from '../types/station';

export const MOCK_STATIONS: Station[] = [
  {
    id: '1',
    name: 'SolarGrid - Town Hall Station',
    distance: '1.2 km away',
    distanceKm: 1.2,
    location: 'Colombo 07',
    batteriesReady: 8,
    openStatus: 'Open 24/7',
    lat: 6.9155,
    lng: 79.8635,
  },
  {
    id: '2',
    name: 'SolarGrid - Kollupitiya Junction',
    distance: '2.8 km away',
    distanceKm: 2.8,
    location: 'Galle Road',
    batteriesReady: 14,
    openStatus: 'Open 24/7',
    lat: 6.8998,
    lng: 79.8510,
  },
  {
    id: '3',
    name: 'SolarGrid - Bambalapitiya Hub',
    distance: '4.1 km away',
    distanceKm: 4.1,
    location: 'Duplication Road',
    batteriesReady: 6,
    openStatus: 'Open 24/7',
    lat: 6.8885,
    lng: 79.8587,
  },
  {
    id: '4',
    name: 'SolarGrid - Borella Crossing',
    distance: '5.5 km away',
    distanceKm: 5.5,
    location: 'Ward Place',
    batteriesReady: 11,
    openStatus: 'Open 24/7',
    lat: 6.9142,
    lng: 79.8778,
  },
  {
    id: '5',
    name: 'SolarGrid - Dehiwala Marine Hub',
    distance: '7.8 km away',
    distanceKm: 7.8,
    location: 'Hill Street',
    batteriesReady: 9,
    openStatus: 'Open 24/7',
    lat: 6.8516,
    lng: 79.8660,
  },
  {
    id: '6',
    name: 'SolarGrid - Nugegoda Super Hub',
    distance: '9.4 km away',
    distanceKm: 9.4,
    location: 'High Level Road',
    batteriesReady: 16,
    openStatus: 'Open 24/7',
    lat: 6.8728,
    lng: 79.8893,
  },
];

export function filterStations(
  stations: Station[],
  radius: RadiusFilter,
  query: string
): Station[] {
  return stations.filter((station) => {
    if (radius === '10 km' && station.distanceKm > 10) return false;
    if (radius === '25 km' && station.distanceKm > 25) return false;
    if (radius === '50 km' && station.distanceKm > 50) return false;

    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        station.name.toLowerCase().includes(q) ||
        station.location.toLowerCase().includes(q)
      );
    }
    return true;
  });
}
