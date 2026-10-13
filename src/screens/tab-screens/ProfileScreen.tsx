import { Text, View, Button, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>👤</Text>

      <Text style={styles.title}>Вы не зарегистрированы</Text>

      <Text style={styles.text}>
        Войдите в аккаунт или зарегистрируйтесь,
        чтобы пользоваться всеми возможностями магазина.
      </Text>

      <View style={styles.button}>
        <Button title="Войти" onPress={() => {}} />
      </View>

      <View style={styles.button}>
        <Button title="Зарегистрироваться" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#fff",
  },

  icon: {
    fontSize: 60,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    lineHeight: 24,
  },

  button: {
    width: "80%",
    marginBottom: 15,
  },
});