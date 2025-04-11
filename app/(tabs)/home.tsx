import React from "react";
import { useColorScheme, View, Animated } from "react-native";
// COMPONENTS
import MyText from "@/components/text";
import MySearch from "@/components/search";
import MyButtonCategory from "@/components/buttonCategory";
import MyCard from "@/components/card";
// HOOKSFE
import useHomeInterpolate from "@/hooks/Frontend/homeScreen/useHomeInterpolate";
import useProducts from "@/hooks/Frontend/homeScreen/useProducts";

export default function Home() {
    const colorScheme = useColorScheme() ?? "light";
    const textColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

    const { selectedCategory, setSelectedCategory, filteredProducts } =
        useProducts();

    const {
        scrollY,
        fontSizeAnim,
        textDecsOpacity,
        textOpacity,
        searchOpacity,
        searchScale,
        headerBackgroundColor,
        headerBorderWidth,
        headerTextOpacity,
        headerSearchOpacity,
        headerCategoryOpacity,
        CategoryOpacity,
    } = useHomeInterpolate(colorScheme);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colorScheme === "dark" ? "#131514" : "white",
            }}
        >
            {/* Header Fixed Konten */}
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    paddingTop: 50,
                    paddingHorizontal: 25,
                    backgroundColor: headerBackgroundColor,
                    borderBottomWidth: headerBorderWidth,
                    borderBottomColor: "rgba(255,255,255,0.7)",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Header Fixed Text */}
                    <Animated.Text
                        style={{
                            fontSize: fontSizeAnim,
                            textTransform: "uppercase",
                            fontFamily: "LexBold",
                            color: textColor,
                            opacity: headerTextOpacity,
                        }}
                    >
                        Ndaru Farm
                    </Animated.Text>

                    {/* Header Fixed Tombol Cari */}
                    <Animated.View
                        style={{
                            flex: 1,
                            marginLeft: 10,
                            opacity: headerSearchOpacity,
                        }}
                    >
                        <MySearch />
                    </Animated.View>
                </View>

                {/* Header Fixed Tombol Kategori */}
                <Animated.View
                    style={{
                        opacity: headerCategoryOpacity,
                        paddingVertical: 10,
                    }}
                >
                    <MyButtonCategory
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </Animated.View>
            </Animated.View>

            {/* Header Konten */}
            <Animated.ScrollView
                contentContainerStyle={{
                    paddingTop: 100,
                    paddingBottom: 80,
                    paddingHorizontal: 25,
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                {/* Header Teks */}
                <View className="mb-5 flex-col justify-start w-full">
                    <Animated.Text
                        style={{
                            fontSize: fontSizeAnim,
                            textTransform: "uppercase",
                            color: textColor,
                            fontFamily: "LexBold",
                            opacity: textOpacity,
                        }}
                    >
                        Ndaru Farm
                    </Animated.Text>

                    {/* Header Deskripsi Teks */}
                    <Animated.View style={{ opacity: textDecsOpacity }}>
                        <MyText fontSize={18} textstyle="uppercase">
                            Pertanian sehat dan bersih
                        </MyText>
                    </Animated.View>
                </View>

                {/* Header Tombol cari */}
                <Animated.View
                    style={{
                        transform: [{ scale: searchScale }],
                        opacity: searchOpacity,
                    }}
                >
                    <MySearch />
                </Animated.View>

                {/* Header Tombol Kategori */}
                <Animated.View
                    className="py-6"
                    style={{ opacity: CategoryOpacity }}
                >
                    <MyButtonCategory
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </Animated.View>

                {/* Body Card Konten */}
                <View className="w-full gap-8">
                    {filteredProducts.map((item) => (
                        <MyCard
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            quantity={item.quantity}
                            detailType={item.detailType}
                            buttonType={item.buttonType}
                            buttonTitle={item.buttonTitle}
                            date={item.date}
                        />
                    ))}
                </View>
            </Animated.ScrollView>
        </View>
    );
}
