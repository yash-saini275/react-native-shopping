import React, { useState, useEffect, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";

import { View, Text, StyleSheet, Platform } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AdminNavigatorParamsList } from "../../navigation/types";
import { RootState } from "../../store";
import Product from "../../models/product";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { createProduct, updateProduct } from "../../store/product-slice";

type Props = NativeStackScreenProps<AdminNavigatorParamsList, "EditProduct">;

const EditProductScreen = ({ route, navigation }: Props) => {
  const prodId = route.params?.id;

  const dispatch = useDispatch();

  const product = useSelector<RootState, Product | undefined>((state) =>
    state.product.userProducts.find((product) => product.id === prodId)
  );

  const [title, setTitle] = useState(product ? product.title : "");
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Save"
              iconName={
                Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
              }
              onPress={submitHandler}
            />
          </HeaderButtons>
        );
      },
    });
  });

  const submitHandler = () => {
    if (product) {
      dispatch(updateProduct({ id: prodId, description, imageUrl, title }));
    } else {
      dispatch(
        createProduct({
          title: title,
          description: description,
          imageUrl: imageUrl,
          price: +price,
        })
      );
    }
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => {
              setImageUrl(text);
            }}
          />
        </View>
        {!product && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => {
                setPrice(text);
              }}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
