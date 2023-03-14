import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InsideParamListScrens } from "./type";
import Homepage from "../screens/Private/Homepage";

const Stack = createNativeStackNavigator<InsideParamListScrens>();

const InsideContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomePage"
      >
        <Stack.Screen name="HomePage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InsideContainer;
