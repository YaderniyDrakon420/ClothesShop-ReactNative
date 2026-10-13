import { useState, useEffect } from "react";
import {
    Text,
    View,
    FlatList,
    Button,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Category, { CategoryProps } from "../../components/Category";

export default function CategoriesScreen() {
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
    const URL = `${API_BASE_URL}/categories`;

    const navigation = useNavigation<any>();

    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(URL);

            if (!res.ok) {
                throw new Error("Не вдалося завантажити категорії");
            }

            const data: CategoryProps[] = await res.json();
            setCategories(data);
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

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Завантаження категорій...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
                <Button
                    title="Повторити завантаження"
                    onPress={fetchData}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Categories</Text>

            <FlatList
                data={categories}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <Category
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                            onPress={() =>
                                navigation.navigate("Home", {
                                    screen: "Home",
                                    params: {
                                        screen: "CategoryProducts",
                                        params: {
                                            categoryId: item.id,
                                            categoryTitle: item.title,
                                        },
                                    },
                                })
                            }
                    />
                )}
                ListEmptyComponent={
                    <Text>Категорій поки немає</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#FFFFFF",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    row: {
        justifyContent: "space-around",
        marginBottom: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
});