import React, { memo } from "react";
import { Image, TouchableOpacity, ScrollView, View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Datepicker,
  Icon,
  Layout,
  RangeDatepicker
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';


import Text from "../../../components/Text";
import Content from "../../../components/Content";
import Container from "../../../components/Container";
import { Images } from "../../../assets/images";
import ButtonText from "../../../components/ButtonText";
//import { SignIn01_Data } from "./SignIn01";
import useLayout from "../../../hoooks/useLayout";

const FormLeague = memo(() => {
  // const navigation = useNavigation();

  type AppParamList = {
    HomePage: undefined;
  };

  const [image, setImage] = React.useState(null);
  const [range, setRange] = React.useState({});
  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [date, setDate] = React.useState(new Date());

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => (
          <TouchableOpacity >
            <Image
              /*  source={Images.futbol}*/
              /* @ts-ignore */
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      />
      <Content style={styles.content}>
        <Text category="header">
          Agregar Liga
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
        <RangeDatepicker
          range={range}
          onSelect={nextRange => setRange(nextRange)}
        />

        <View style={styles.wallet}>
          <Button status='success' style={styles.wallet} children="Guardar" onPress={() => navigate("HomePage")} />
          <Button
            children="Cancelar"
            style={styles.wallet}
            status='danger'
          />
        </View>

        <ScrollView
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.btnImage, { paddingBottom: bottom + 24, justifyContent: 'center' }]}
        >
        </ScrollView>
      </Content>
    </Container>
  );
});

export default FormLeague;


const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 98,
    height: 98,
    marginLeft: 40,
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

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
