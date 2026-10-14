import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/DetailsStackNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ClothesDetail"
>;

export default function ClothesDetailScreen({ route }: Props) {
  const {
    title,
    price,
    image,
    description,
    rating,
    size,
    color,
  } = route.params;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const getColor = (item: string) => {
    switch (item.toLowerCase()) {
      case "black":
        return "#222";
      case "white":
        return "#fff";
      case "blue":
        return "#5b8def";
      case "dark blue":
        return "#193b70";
      case "light blue":
        return "#9ed8f5";
      case "beige":
        return "#d8c3a5";
      case "cream":
        return "#f5e6c8";
      case "gray":
        return "#888";
      case "green":
        return "#6fa36f";
      default:
        return "#ccc";
    }
  };

const addToCart = async () => {
  try {
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

    const response = await fetch(
      `${API_BASE_URL}/products/${route.params.id}`
    );

    if (!response.ok) {
      throw new Error("Не удалось получить товар");
    }

    const product = await response.json();

    if (product.isInCart) {
      Alert.alert(
        "Товар уже в корзине",
        "Нельзя добавить этот товар повторно."
      );
      return;
    }

    const updateResponse = await fetch(
      `${API_BASE_URL}/products/${route.params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isInCart: true,
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Не удалось добавить товар");
    }

    Alert.alert(
      "Успешно",
      "Товар добавлен в корзину!"
    );
  } catch (error) {
    console.error(error);

    Alert.alert(
      "Ошибка",
      "Не удалось добавить товар в корзину."
    );
  }
};

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>
        {title.toUpperCase()}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          ${price.toFixed(2)}
        </Text>

        <View style={styles.rating}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingText}>
            {rating}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {description || "No description available."}
      </Text>

      <Text style={styles.sectionTitle}>
        Size
      </Text>

      <View style={styles.sizes}>
        {size?.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.sizeButton,
              selectedSize === item && styles.selectedSize,
            ]}
            onPress={() => setSelectedSize(item)}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === item && styles.selectedSizeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        Color
      </Text>

      <View style={styles.colors}>
        {color?.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setSelectedColor(item)}
            style={[
              styles.colorOuter,
              selectedColor === item && styles.selectedColor,
            ]}
          >
            <View
              style={[
                styles.colorCircle,
                {
                  backgroundColor: getColor(item),
                },
              ]}
            />
          </TouchableOpacity>

              
        ))}
      </View>

    <View style={styles.actionButtons}>
      <TouchableOpacity 
          style={styles.actionButton} 
          onPress={addToCart}
                >
          <Text style={styles.actionButtonText}>Add to Bag</Text>
        </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {}}
      >
        <Text style={styles.actionButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageContainer: {
    width: "100%",
    height: 350,
    backgroundColor: "#f1f3f3",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d0d0d0",
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: "#333",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 5,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#279b75",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    fontSize: 16,
    color: "#222",
    marginRight: 4,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: "600",
  },

  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginHorizontal: 16,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },

  sizes: {
    flexDirection: "row",
    marginHorizontal: 16,
  },

  sizeButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  selectedSize: {
    backgroundColor: "#69b8a6",
    borderColor: "#69b8a6",
  },

  sizeText: {
    fontSize: 14,
    color: "#333",
  },

  selectedSizeText: {
    color: "#fff",
    fontWeight: "700",
  },

  colors: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 30,
  },

  colorOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  selectedColor: {
    borderColor: "#333",
    borderWidth: 2,
  },

  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 30,
    gap: 12,
  },

  actionButton: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#69b8a6",
    justifyContent: "center",
    alignItems: "center",
  },

  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

});