import { Button, Text, View } from "react-native";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route }: Props) {
  const { username } = route.params;
  return (
    <View>
      <Text>Деталі про користувача {username}</Text>
    </View>
  );
}