import React from "react";
import { NavigationContainer } from "@react-navigation/native";

//CrearStack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Pantallas type
import { AppParamList, RootStackParamList } from "./type";
import Login from "../screens/Login/Login";
import Homepage from "../screens/Private/Homepage";
import { TableResponsive } from "../screens/Private/TableLeague";
import MenuLeague from "../screens/Private/MenuLeague/Index";
import NewsPage from "../screens/Private/News/indexNews";
import FormLeague from "../screens/Private/Ligas/FormLeague";
import Profile from "../screens/Private/Profile/Index";
import Activities from "../screens/Private/Partidos/Activities";
import FormEquipo from "../screens/Private/Equipos/FormEquipo";
import FormPlayer from "../screens/Private/Players/FormPlayer";
import FormPartido from "../screens/Private/Partidos/FormPartido";
import TableEstadisticas from "../screens/Private/Estadisticas/TableEstadisticas";
import LeagueAdmin from "../screens/Private/Settings/Index";
import TeamDetail from "../screens/Private/TeamDetail/Index";
import FormRegister from "../screens/Register/FormRegister";
import TypePay from "../screens/Register/TypePay";

const Stack = createNativeStackNavigator<AppParamList>();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomePage"
      >
        {/* <Stack.Screen name="Term" component={Term} />
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Onbroading" component={OnboardingNavigator} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Social" component={SocialNavigator} />
          <Stack.Screen name="Finance" component={FinanceNavigator} />
          <Stack.Screen name="Profile" component={ProfileNavigator} />
          <Stack.Screen name="Reading" component={ReadingStackNavigator} />
          <Stack.Screen name="ECommerce" component={ECommerceStackNavigator} />
          <Stack.Screen name="Fitness" component={FitnessNavigator} />
          <Stack.Screen name="Health" component={HealthStackNavigator} />
          <Stack.Screen name="Education" component={EducationStackNavigator} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={FormRegister} />
        <Stack.Screen name="TypeRegister" component={TypePay} />
        <Stack.Screen name="NewsPage" component={NewsPage} />
        <Stack.Screen name="HomePage" component={Homepage} />
        <Stack.Screen name="MenuLeague" component={MenuLeague} />
        <Stack.Screen name="DetailTableLeague" component={TableResponsive} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Games" component={Activities} />
        <Stack.Screen name="Estadisticas" component={TableEstadisticas} />
        <Stack.Screen name="LeagueAdmin" component={LeagueAdmin} />
        <Stack.Screen name="TeamDetail" component={TeamDetail} />


        {
          //Formularios
        }
        <Stack.Screen name="FormLeague" component={FormLeague} />
        <Stack.Screen name="FormTeam" component={FormEquipo} />
        <Stack.Screen name="FormPlayer" component={FormPlayer} />
        <Stack.Screen name="FormGame" component={FormPartido} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppContainer;
