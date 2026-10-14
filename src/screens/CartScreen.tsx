import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

interface CartProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  rating?: string;
  size?: string[];
  color?: string[];
  isInCart: boolean;
}

export default function CartScreen() {
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);

      const data: CartProduct[] = await response.json();

      const productsInCart = data.filter(
        (product) => product.isInCart === true
      );

      setCartProducts(productsInCart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
const removeFromCart = async (id: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isInCart: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось удалить товар из корзины");
    }

    setCartProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  } catch (error) {
    console.error(error);

    Alert.alert(
      "Ошибка",
      "Не удалось удалить товар из корзины."
    );
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cartProducts.length === 0 ? (
        <View style={styles.center}>
          <Text>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
                    <View style={styles.info}>
                <Text style={styles.productTitle}>
                  {item.title}
                </Text>

                <Text style={styles.price}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  product: {
    flexDirection: "row",
    backgroundColor: "#f1f3f3",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  info: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },

  productTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#279b75",
    marginTop: 8,
  },

  removeButton: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 8,
},

removeButtonText: {
  fontSize: 18,
  fontWeight: "700",
  color: "#333",
},
});
