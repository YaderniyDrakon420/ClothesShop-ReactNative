import { View, Text, StyleSheet, Image } from "react-native";

export interface ClothesProps {
  id?: string | number;
  title: string;
  price: number;
  image: string;
  description?: string;
  rating?: string;
  size?: string[];
  color?: string[];
}

function Clothes({ title, price, image }: ClothesProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <Text style={styles.price}>
        - ${price.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#f1f3f3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  price: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
  },
});

export default Clothes;