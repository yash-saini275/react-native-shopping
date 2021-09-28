import React, { useReducer, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";

enum ActionType {
  INPUT_CHANGE = "INPUT_CHANGE",
  INPUT_BLUR = "INPUT_BLUE",
}

interface InputState {
  value: string;
  isValid: boolean;
  touched: boolean;
}

interface InputAction {
  type: ActionType;
  payload: {
    value?: string;
    isValid?: boolean;
    touched?: boolean;
  };
}

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case ActionType.INPUT_CHANGE:
      return {
        ...state,
        value: action.payload.value || state.value,
        isValid: action.payload.isValid || state.isValid,
      };

    case ActionType.INPUT_BLUR:
      return {
        ...state,
        touched: action.payload.touched || state.touched,
      };
    default:
      return state;
  }
};

const Input: React.FC<{
  initialValue: string;
  initiallyValid: boolean;
  label: string;
  required?: boolean;
  email?: string;
  min?: number;
  max?: number;
  minLength?: number;
  textInputProps?: TextInputProps;
  onInputChange: (value: string, isValid: boolean) => void;
}> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initiallyValid || false,
    touched: false,
  });

  const { onInputChange } = props;

  useEffect(() => {
    console.log(inputState);
    if (inputState.touched) {
      onInputChange(inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange]);

  const textChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }

    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }

    if (props.min && +text < props.min) {
      isValid = false;
    }

    if (props.max && +text > props.max) {
      isValid = false;
    }

    if (props.minLength && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({
      type: ActionType.INPUT_CHANGE,
      payload: {
        value: text,
        isValid,
      },
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: ActionType.INPUT_BLUR, payload: { touched: true } });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props.textInputProps}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!props.initiallyValid && <Text>Please enter a valid {props.label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Input;
