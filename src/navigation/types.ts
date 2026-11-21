export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Bookings: undefined;
  Profile: undefined;
  SwapStations: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
