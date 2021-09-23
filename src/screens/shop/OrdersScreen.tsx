import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import { RootState } from "../../store";
import { OrderState } from "../../store/order-slice";

const OrdersScreen = () => {
  const orders = useSelector<RootState, OrderState>((state) => state.order);

  return (
    <FlatList
      data={orders.orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.date}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
