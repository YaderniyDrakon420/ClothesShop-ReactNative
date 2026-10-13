import { Text, View, Button, StyleSheet } from "react-native";

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Детали магазина</Text>

      <Text style={styles.subtitle}>AURA — магазин одежды</Text>

      <Text style={styles.text}>
        Добро пожаловать в наш магазин одежды!
      </Text>

      <Text style={styles.text}>
        У нас вы можете найти современную одежду для мужчин и женщин.
      </Text>

      <View style={styles.info}>
        <Text style={styles.infoText}>👕 Новая коллекция</Text>
        <Text style={styles.infoText}>🚚 Доставка по городу</Text>
        <Text style={styles.infoText}>💳 Удобная оплата</Text>
        <Text style={styles.infoText}>⭐ Качественные товары</Text>
      </View>

      <Button title="Связаться с нами" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    marginBottom: 12,
    color: "#555",
  },

  info: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
  },

  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },

  contact: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
