import React from "react";
import { Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootState } from "../../store";
import { ProductState } from "../../store/product-slice";
import Product from "../../models/product";
import ProductItem from "../../components/shop/ProductItem";
import { ShopNavigatorParamList } from "../../navigation/types";
import { addToCart } from "../../store/cart-slice";
import Colors from "../../constants/Colors";

type Props = NativeStackScreenProps<ShopNavigatorParamList, "ProductOverview">;

const ProductOverviewScreen = ({ route, navigation }: Props) => {
  const { availableProducts } = useSelector<RootState, ProductState>(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const selectHandler = (id: string, title: string) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      title: title,
    });
  };

  return (
    <FlatList<Product>
      data={availableProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          key={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          price={item.price}
          onSelect={() => {
            selectHandler(item.id, item.title);
          }}
          // onAddToCart={() => {
          //   dispatch(
          //     addToCart({ id: item.id, price: item.price, title: item.title })
          //   );
          // }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectHandler(item.id, item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(
                addToCart({ id: item.id, price: item.price, title: item.title })
              );
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductOverviewScreen;
