import React, { memo } from "react";
import { Image, TouchableOpacity, ScrollView } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Text from "../../components/Text";
import Content from "../../components/Content";
import Container from "../../components/Container";
import { Images } from "../../assets/images/";
import ButtonText from "../../components/ButtonText";
//import { SignIn01_Data } from "./SignIn01";
import useLayout from "../../hoooks/useLayout";
import { AppParamList, RootStackParamList } from "../../navigation/type";

const Login = memo(() => {
 // const navigation = useNavigation();
 
 type AppParamList = {
  HomePage: undefined;
};

  const { navigate, goBack } =   useNavigation<NavigationProp<AppParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => (
          <TouchableOpacity >
            <Image marginTop={46}
              source={Images.futbol}
              /* @ts-ignore */
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      />
      <Content style={styles.content}>
        <Text category="header" marginTop={36} marginRight={100}>
              MatchMate
        </Text>
        <Input
          placeholder="Correo Electrónico"
          status="primary"
          style={styles.input}
        />
        <Input
          placeholder="Password"
          status="primary"
          style={styles.input}
        />
        <Button status='warning' style={styles.wallet} children="Iniciar Sesión" onPress={()=> navigate("HomePage")} />
        {/* <Button
          children="Connect Wallet"
          style={styles.wallet}
          status="control"
        /> */}
        <ButtonText
          category="call-out"
          status="primary"
          icon="rightChevron"
          title="Regístrate"
          styleIcon={styles.iconArrow}
        />
        <ButtonText
          category="call-out"
          status="primary"
          icon="rightChevron"
          title="¿Olvidaste tu contraseña?"
          styleIcon={styles.iconArrow}
          style={styles.btnText}
        />
        <ButtonText
          category="call-out"
          status="primary"
          icon="rightChevron"
          title="Contáctanos"
          styleIcon={styles.iconArrow}
          style={styles.btnText}
        />
        <ScrollView
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.btnImage, { paddingBottom: bottom +24, justifyContent: 'center'}]}
        >
          {/*SignIn01_Data.map((_, i) => {
            return <Image key={i} source={_.image} />;
          })*/}
        </ScrollView>
      </Content>
    </Container>
  );
});

export default Login;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 98,
    height: 98,
    marginLeft: 40,
  },
  iconArrow: {
    tintColor: "color-primary-100",
    marginRight: 8,
  },
  input: {
    marginVertical: 24,
  },
  wallet: {
    marginTop: 16,
    marginBottom: 32,
  },
  content: {
    marginHorizontal: 20,
  },
  btnImage: {
    justifyContent: "space-between",
    marginTop: 48,
    flex: 1,
  },
  btnText: {
    marginTop: 24,
  },
});
