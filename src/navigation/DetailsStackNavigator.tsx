import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/tab-screens/HomeScreen";
import ClothesDetailScreen from "../screens/ClothesDetailScreen";
import CartScreen from "../screens/CartScreen";

export type RootStackParamList = {
  Home: undefined;

  ClothesDetail: {
    id?: string | number;
    title: string;
    price: number;
    image: string;
    description?: string;
    rating?: string;
    size?: string[];
    color?: string[];
  };

    Cart:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function DetailsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ClothesDetail"
        component={ClothesDetailScreen}
        options={{
          title: "Товар",
        }}
      />

      <Stack.Screen  
        name="Cart"
        component={CartScreen}
        options={{
          title: "Your Bag",
        }}
        />

    </Stack.Navigator>
  );
}