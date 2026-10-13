import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

import Clothes, { ClothesProps } from "./Clothes";

interface ClothesListProps {
  clothes: ClothesProps[];
  loading: boolean;
  error: string | null;
  navigateToProduct: (product: ClothesProps) => void;
  onLikeChange: (id: string | number, isLiked: boolean) => void;
}

function ClothesList({
  clothes,
  loading,
  error,
  navigateToProduct,
  onLikeChange,
}: ClothesListProps) {

  const toggleLike = async (
    id: string | number,
    currentIsLiked: boolean
  ) => {
    try {
      const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

      const newLikedState = !currentIsLiked;

      const response = await fetch(
        `${API_BASE_URL}/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isLiked: newLikedState,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось изменить лайк");
      }

      onLikeChange(id, newLikedState);

    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={clothes}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}

        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigateToProduct(item)}
          >
            <Clothes
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              isLiked={item.isLiked}
              onToggleLike={() =>
                toggleLike(
                  item.id!,
                  item.isLiked ?? false
                )
              }
            />
          </Pressable>
        )}

        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Нічого не знайдено
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 15,
  },

  listContent: {
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 14,
  },

  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 8,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  errorText: {
    color: "red",
    fontSize: 14,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    color: "#888888",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ClothesList;