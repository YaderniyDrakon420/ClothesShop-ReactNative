import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/tab-screens/HomeScreen"
import ProfileScreen from "../screens/tab-screens/ProfileScreen"
import { Image} from "react-native"
import SearchScreen from "../screens/tab-screens/SearchScreen"
import DetailsStackNavigator from "./DetailsStackNavigator"
import LikedScreen from "../screens/tab-screens/LikedScreen"
import CartScreen from "../screens/tab-screens/CartScreen"

export type RootTabParamList = {
    Home: undefined,
    Profile: undefined,
    Search: undefined,
    Liked:undefined,
    Cart:undefined,
    Details:undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()
const AppTabNavigator = () => {
    return (

    <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen
                name="Home"
                component={DetailsStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../assets/home.png")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../assets/search.png")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }} />
                    ),
                }} />
            <Tab.Screen
                name="Liked"
                component={LikedScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../assets/liked.png")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }} />
                    ),
                }} />
                <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../assets/cart.webp")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }} />
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../assets/profile.png")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }} />
                    ),
                }}
                listeners={() => ({
                    tabPress: () => {
                        console.log("pressed -> profile")
                    }
                })} />
            <Tab.Screen
                name="Details"
                component={DetailsStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../assets/details.png")}
                            style={{
                                width: 29,
                                height: 29,
                                opacity: focused ? 1 : 0.5
                            }} />
                    ),
                }} />
        </Tab.Navigator>
        )
}

export default AppTabNavigator;