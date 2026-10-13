import { useState, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ClothesList from "../../components/ClothesList";
import { ClothesProps } from "../../components/Clothes";
import ClothesDetailScreen from "../ClothesDetailScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "../../navigation/AppTabNavigator";
import { RootStackParamList } from "../../navigation/DetailsStackNavigator";
type Props = BottomTabScreenProps<
  RootTabParamList,
  "Search"
>;

export default function SearchScreen({ navigation }: Props) {
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  const URL = `${API_BASE_URL}/products`;

  const [clothes, setClothes] = useState<ClothesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(URL);

      if (!res.ok) {
        throw new Error("Не вдалося завантажити дані");
      }

      const data = await res.json();
      setClothes(data);
    } catch (err) {
      console.error(err);
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return clothes.filter((item) =>
      item.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase())
    );
  }, [searchQuery, clothes]);


  const handleLikeChange = (id: string | number, isLiked: boolean) => {
    setClothes((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, isLiked }
          : product
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        placeholder="Search"
        style={styles.search}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {searchQuery.trim() !== "" && (
      <ClothesList
        clothes={filteredProducts}
        loading={loading}
        error={error}
        onLikeChange={handleLikeChange}
        navigateToProduct={(product) => {
        navigation.navigate("Home", {
          screen: "ClothesDetail",
          params: {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            rating: product.rating,
            size: product.size,
            color: product.color,
          },
        });
      }}
      />
    )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  search: {
    backgroundColor: "#E5E8EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 10,
  },
});