import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/tab-screens/HomeScreen";
import DetailsScreen from "../screens/tab-screens/DetailsScreen";
import OrdersScreen from "../screens/tab-screens/OrderScreen";
import SettingsScreen from "../screens/tab-screens/SettingsScreen";
import { Image } from "react-native";
import AppTabNavigator from "./AppTabNavigator";

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={AppTabNavigator} 
               options = {{
                        headerShown: true,
                    drawerIcon: ({focused}) => (
                        <Image
                            source={require("../../assets/home.png")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }} />
                    )
               }}
            />
            <Drawer.Screen name="Orders" component={OrdersScreen}
                options = {{
                    drawerIcon: ({focused}) => (
                        <Image
                            source={require("../../assets/details.png")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }} 
                             />
                        )
                    }}
            />
            <Drawer.Screen name="Settings" component={SettingsScreen}
                options = {{
                    drawerIcon: ({focused}) => (
                        <Image
                            source={require("../../assets/settings.png")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }} 
                             />
                        )
                    }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;