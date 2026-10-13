import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ClothesList from "../../components/ClothesList";
import { ClothesProps } from "../../components/Clothes";
import { useState, useEffect, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/DetailsStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
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
    } catch (err: any) {
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
    if (!searchQuery.trim()) return clothes;

    return clothes.filter((item) =>
      item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
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
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="auto" />

    <View style={styles.header}>
      <Image
        source={require("../../../assets/aura.png")}
        style={styles.shop}
      />
          <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
      >
        <Image
          source={require("../../../assets/maincart.webp")}
          style={styles.cart}
        />
      </TouchableOpacity>
    </View>

      <TextInput
        placeholder="Search"
        style={styles.search}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
   
      <ClothesList
      clothes={filteredProducts}
      loading={loading}
      error={error}
      onLikeChange={handleLikeChange}
      navigateToProduct={(product) =>
        navigation.navigate("ClothesDetail", {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
          rating: product.rating,
          size: product.size,
          color: product.color,
        })
      }
    />
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  shop: {
    width: 115,
    height: 47,
    resizeMode: "contain",
  },

  cart: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginLeft: 10,
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E8EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
});