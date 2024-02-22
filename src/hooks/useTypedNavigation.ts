// eslint-disable-next-line import/order
import { useNavigation } from "@react-navigation/native";

// eslint-disable-next-line import/named
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../Navigation";

// maybe generate Types here later?
export const useTypedNavigation = () => {
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();
  return nav;
};
