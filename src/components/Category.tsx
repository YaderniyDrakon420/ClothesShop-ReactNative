import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export interface CategoryProps {
    id?: string | number;
    title: string;
    description: string;
    image: string;
    onPress?: () => void;
}

function Category({ title, description, image, onPress }: CategoryProps) {
    return (
        <Pressable style={styles.category} onPress={onPress}>
            <View style={styles.iconContainer}>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                ) : null}
            </View>

            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    category: {
        alignItems: "center",
        width: 140,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#EEEEEE",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    title: {
        marginTop: 8,
        textAlign: "center",
        fontSize: 13,
        fontWeight: "500",
        lineHeight: 16,
    },
});

export default Category;