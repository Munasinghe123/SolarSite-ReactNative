export type RadiusFilter = '10 km' | '25 km' | '50 km' | 'All';

export interface Station {
  id: string;
  name: string;
  distance: string;
  distanceKm: number;
  location: string;
  batteriesReady: number;
  openStatus: string;
  lat: number;
  lng: number;
}
