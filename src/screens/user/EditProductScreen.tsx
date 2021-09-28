import React, { useEffect, useReducer, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import { AdminNavigatorParamsList } from "../../navigation/types";
import { RootState } from "../../store";
import Product from "../../models/product";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Input from "../../components/UI/Input";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { createProduct, updateProduct } from "../../store/product-slice";

type Props = NativeStackScreenProps<AdminNavigatorParamsList, "EditProduct">;

enum FormActionType {
  UPDATE = "UPDATE",
}

interface FormAction {
  type: FormActionType;
  payload: {
    identifier: string;
    value: string;
    isValid: boolean;
  };
}

interface FormState {
  inputValues: {
    title: string;
    imageUrl: string;
    price: string;
    description: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    price: boolean;
    description: boolean;
  };
  formIsValid: boolean;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case FormActionType.UPDATE:
      const updatedInputValues = {
        ...state.inputValues,
        [action.payload.identifier]: action.payload.value,
      };

      const updatedInputValidities = {
        ...state.inputValidities,
        [action.payload.identifier]: action.payload.isValid,
      };

      let formIsValid = true;

      for (const [key, value] of Object.entries(updatedInputValidities)) {
        formIsValid = formIsValid && value;
      }

      return {
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        formIsValid,
      };
    default:
      return state;
  }
  return state;
};

const EditProductScreen = ({ route, navigation }: Props) => {
  const prodId = route.params?.id;

  const dispatch = useDispatch();

  const product = useSelector<RootState, Product | undefined>((state) =>
    state.product.userProducts.find((product) => product.id === prodId)
  );

  const INITIAL_STATE: FormState = {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      price: "",
      description: product ? product.description : "",
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
    },
    formIsValid: product ? true : false,
  };

  const [formState, dispatchFormState] = useReducer(formReducer, INITIAL_STATE);

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
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (product) {
      dispatch(
        updateProduct({
          id: prodId,
          description: formState.inputValues.description,
          imageUrl: formState.inputValues.imageUrl,
          title: formState.inputValues.title,
        })
      );
    } else {
      dispatch(
        createProduct({
          title: formState.inputValues.title,
          description: formState.inputValues.description,
          imageUrl: formState.inputValues.imageUrl,
          price: +formState.inputValues.price,
        })
      );
    }
    navigation.goBack();
  };

  const inputChangeHandler = useCallback(
    (identifier: string, inputValue: string, inputValidity: boolean) => {
      console.log(identifier, inputValue, inputValidity);
      dispatchFormState({
        type: FormActionType.UPDATE,
        payload: {
          identifier,
          value: inputValue,
          isValid: inputValidity,
        },
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          initialValue={formState.inputValues.title}
          initiallyValid={!!product}
          label="Title"
          required
          onInputChange={inputChangeHandler.bind(this, "title")}
        />
        <Input
          initialValue={formState.inputValues.imageUrl}
          initiallyValid={!!product}
          label="Image URL"
          required
          onInputChange={inputChangeHandler.bind(this, "imageUrl")}
        />
        {!product && (
          <Input
            initialValue={formState.inputValues.price}
            initiallyValid={!!product}
            label="Price"
            textInputProps={{ keyboardType: "decimal-pad" }}
            onInputChange={inputChangeHandler.bind(this, "price")}
          />
        )}

        <Input
          initialValue={formState.inputValues.description}
          initiallyValid={!!product}
          label="Description"
          onInputChange={inputChangeHandler.bind(this, "description")}
        />
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
