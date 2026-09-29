import { Text, View, Button, TextInput } from "react-native";
import type { RootStackParamList } from "../navigation/DetailsStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
type Props = NativeStackScreenProps<RootStackParamList, "Profile">;
export default function ProfileScreen({ navigation }: Props) {
    const [name, onChangeName] = useState('')
    const isInputEmpty = name.trim() === "";
  return (
    <View>
      <Text>Профіль</Text>
      <TextInput 
        placeholder="введіть ваше ім'я" 
        onChangeText={onChangeName}
        value={name} 
        style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10
        }} 
    />
        <Button
        title="Відкрити деталі"
        disabled={isInputEmpty} 
        onPress={() => {
          navigation.navigate("Details", { username: name });
        }}
      />
    </View>
  );
}