import { Station, RadiusFilter } from '../types/station';

export const MOCK_STATIONS: Station[] = [
  {
    id: '1',
    name: 'Mahavali Sub',
    distance: '10 km',
    distanceKm: 10,
    location: 'Colombo 07',
    batteriesReady: 8,
    openStatus: 'Open 24/7',
    lat: 6.9155,
    lng: 79.8635,
    totalCapacity: '200 kw',
  },
  {
    id: '2',
    name: 'Battery Swapper - Kollupitiya Junction',
    distance: '2.8 km away',
    distanceKm: 2.8,
    location: 'Galle Road',
    batteriesReady: 14,
    openStatus: 'Open 24/7',
    lat: 6.8998,
    lng: 79.8510,
    totalCapacity: '350 kw',
  },
  {
    id: '3',
    name: 'Battery Swapper - Bambalapitiya Hub',
    distance: '4.1 km away',
    distanceKm: 4.1,
    location: 'Duplication Road',
    batteriesReady: 6,
    openStatus: 'Open 24/7',
    lat: 6.8885,
    lng: 79.8587,
    totalCapacity: '180 kw',
  },
  {
    id: '4',
    name: 'Battery Swapper - Borella Crossing',
    distance: '5.5 km away',
    distanceKm: 5.5,
    location: 'Ward Place',
    batteriesReady: 11,
    openStatus: 'Open 24/7',
    lat: 6.9142,
    lng: 79.8778,
    totalCapacity: '250 kw',
  },
  {
    id: '5',
    name: 'Battery Swapper - Dehiwala Marine Hub',
    distance: '7.8 km away',
    distanceKm: 7.8,
    location: 'Hill Street',
    batteriesReady: 9,
    openStatus: 'Open 24/7',
    lat: 6.8516,
    lng: 79.8660,
    totalCapacity: '300 kw',
  },
  {
    id: '6',
    name: 'Battery Swapper - Nugegoda Super Hub',
    distance: '9.4 km away',
    distanceKm: 9.4,
    location: 'High Level Road',
    batteriesReady: 16,
    openStatus: 'Open 24/7',
    lat: 6.8728,
    lng: 79.8893,
    totalCapacity: '400 kw',
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
