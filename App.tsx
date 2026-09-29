import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppTabNavigator";
import AppTabNavigator from "./src/navigation/AppTabNavigator";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      {/* <AppTabNavigator /> */}
      <DrawerNavigator />
    </NavigationContainer>
  );
}