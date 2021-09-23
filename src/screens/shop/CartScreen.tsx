import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

import Colors from "../../constants/Colors";

import { RootState } from "../../store";
import { CartState, clearCart, removeFromCart } from "../../store/cart-slice";
import { addOrder } from "../../store/order-slice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartData = useSelector<RootState, CartState>((state) => state.cart);

  const cartItems = Object.entries(cartData.items)
    .map((item) => {
      const key = item[0];
      const cartItem = item[1];
      return {
        productId: key,
        productTitle: cartItem.productTitle,
        productPrice: cartItem.productPrice,
        quantity: cartItem.quantity,
        sum: cartItem.sum,
      };
    })
    .sort((a, b) => (a.productId > b.productId ? 1 : -1));

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${((Math.abs(cartData.totalAmount) * 100) / 100).toFixed(2)}
          </Text>
        </Text>
        <Button
          title="Order Now"
          onPress={() => {
            dispatch(
              addOrder({ cartItems, totalAmount: cartData.totalAmount })
            );
            dispatch(clearCart({}));
          }}
          color={Colors.accent}
          disabled={cartItems.length === 0}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            onRemove={() => {
              dispatch(removeFromCart({ id: itemData.item.productId }));
            }}
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
            deletable
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});

export default CartScreen;
