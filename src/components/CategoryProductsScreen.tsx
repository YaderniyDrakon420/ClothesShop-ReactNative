import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/DetailsStackNavigator";
interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    categoryId?: string;
    description?: string;
    rating?: number;
    size?: string[];
    color?: string[];
}

export default function CategoryProductsScreen() {
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
    const route = useRoute<any>();
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { categoryId, categoryTitle } = route.params;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${API_BASE_URL}/products`);

                if (!res.ok) {
                    throw new Error("Не вдалося завантажити товари");
                }

                const data: Product[] = await res.json();

                const filteredProducts = data.filter(
                    (product) =>
                        String(product.categoryId) === String(categoryId)
                );

                setProducts(filteredProducts);
            } catch (err) {
                console.error(err);
                setError("Помилка підключення до сервера");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [API_BASE_URL, categoryId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Завантаження товарів...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{categoryTitle}</Text>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
    <TouchableOpacity
        style={styles.product}
        activeOpacity={0.8}
        onPress={() =>
            navigation.navigate("ClothesDetail", {
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                description: item.description ?? "",
                rating: String(item.rating ?? 0),
                size: item.size ?? [],
                color: item.color ?? [],
            })
        }
    >
        {item.image ? (
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
        ) : (
            <View style={styles.placeholder} />
        )}

        <Text style={styles.title}>
            {item.title}
        </Text>

        <Text style={styles.price}>
            {item.price} €
        </Text>
    </TouchableOpacity>
)}
                ListEmptyComponent={
                    <Text>В этой категории пока нет товаров.</Text>
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
    list: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 20,
    },
    product: {
        width: "48%",
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        backgroundColor: "#EEEEEE",
    },
    placeholder: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        backgroundColor: "#EEEEEE",
    },
    title: {
        marginTop: 8,
        fontSize: 14,
    },
    price: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "bold",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
});