import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

interface LikedProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  rating?: string;
  size?: string[];
  color?: string[];
  isInCart: boolean;
  isLiked:boolean;
}

export default function LikedScreen () {

    const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
    
      const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);
      const [loading, setLoading] = useState(true);
    
      const fetchLiked = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/products`);
    
          const data: LikedProduct[] = await response.json();
    
          const productsInLiked = data.filter(
            (product) => product.isLiked === true
          );
    
          setLikedProducts(productsInLiked);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    
        useFocusEffect(
        useCallback(() => {
            fetchLiked();
        }, [])
        );
    
      if (loading) {
        return (
          <View style={styles.center}>
            <Text>Loading...</Text>
          </View>
        );
      }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Your favourites</Text>
    
          {likedProducts.length === 0 ? (
            <View style={styles.center}>
              <Text>You dont like products</Text>
            </View>
          ) : (
            <FlatList
              data={likedProducts}
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
});
