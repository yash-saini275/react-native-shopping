import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import Product from "../../models/product";
import { AdminNavigatorParamsList } from "../../navigation/types";

import { RootState } from "../../store";
import { deleteFromCart } from "../../store/cart-slice";
import { deleteProduct } from "../../store/product-slice";

type Props = NativeStackScreenProps<AdminNavigatorParamsList, "UserProducts">;

const UserProductsScreen = ({ route, navigation }: Props) => {
  const userProducts = useSelector<RootState, Product[]>(
    (state) => state.product.userProducts
  );

  const dispatch = useDispatch();

  const onSelectHandler = (id: string, title: string) => {
    navigation.navigate("EditProduct", { id, title });
  };

  const deleteHandler = (id: string) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct({ pid: id }));
          dispatch(deleteFromCart({ pid: id }));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          imageUrl={item.imageUrl}
          price={item.price}
          onSelect={() => {
            onSelectHandler(item.id, item.title);
          }}
          title={item.title}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              onSelectHandler(item.id, item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
