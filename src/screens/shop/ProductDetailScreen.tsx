import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ShopNavigatorParamList } from "../../navigation/types";
import { RootState } from "../../store";
import Product from "../../models/product";
import Colors from "../../constants/Colors";
import { addToCart } from "../../store/cart-slice";

type Props = NativeStackScreenProps<ShopNavigatorParamList, "ProductDetail">;

const ProductDetailsScreen = ({ route, navigation }: Props) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const selectedProduct: Product | undefined = useSelector<
    RootState,
    Product | undefined
  >((state) =>
    state.product.availableProducts.find((prod) => prod.id === productId)
  );

  if (!selectedProduct) {
    return (
      <View>
        <Text>No Product Found.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          onPress={() => {
            dispatch(
              addToCart({
                id: selectedProduct.id,
                price: selectedProduct.price,
                title: selectedProduct.title,
              })
            );
          }}
          title="Add to Cart"
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailsScreen;
