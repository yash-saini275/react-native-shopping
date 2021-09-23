import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import { Platform } from "react-native";

import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

import Colors from "../constants/Colors";
import { AdminNavigatorParamsList } from "./types";

const Stack = createNativeStackNavigator<AdminNavigatorParamsList>();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={({ route, navigation }) => ({
          title: "Your Products",
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Add"
                  iconName={
                    Platform.OS === "android" ? "md-create" : "ios-create"
                  }
                  onPress={() => {
                    navigation.navigate("EditProduct");
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ route, navigation }) => ({
          title: route.params ? "Edit Product" : "Add Product",
        })}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
