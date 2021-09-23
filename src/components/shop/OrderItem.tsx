import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import { CartItem as CartItemModel } from "../../models/cart-item";
import Card from "../UI/Card";

const OrderItem: React.FC<{
  items: CartItemModel[];
  amount: number;
  date: Date;
}> = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date.toDateString()}</Text>
      </View>
      <Button
        title={`${showDetails ? "Hide" : "Show"} Details`}
        onPress={() => setShowDetails((prevState) => !prevState)}
        color={Colors.primary}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={Math.random().toString()}
              amount={cartItem.productPrice}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              deletable={false}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
