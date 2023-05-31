import {
  Button,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import useLayout from "../../hoooks/useLayout";
import React, { useEffect } from "react";
import { Images } from "../../assets/images";
import Container from "../../components/Container";
import DeliveryHeader from "../../components/DeliveryHeader";
import Content from "../../components/Content";
import ShippingTo from "../../components/ShippingTo";
import Text from "../../components/Text";
import PaymentMethod from "../../components/PaymentMethod";
import User from "../../models/User";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createUser } from "../../service/UserService";
import { useToast } from "react-native-toast-notifications";
import { AppParamList } from "../../navigation/type";
import { ActivityIndicator } from "react-native-paper";

const TypePay = () => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { getState } = useNavigation();

  const [selectedShipPlace, setSelectedShipPlace] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const { navigate } = useNavigation<NavigationProp<AppParamList>>();

  const user = new User(
    getState().routes.find((item) => item.name === "TypeRegister")?.params[
      "value"
    ]
  );

  //   useEffect(() => {
  //     console.log(user);
  //   }, []);

  const handleSaveUser = async () => {
    try {
      setLoading(true);
      const dataSend = {
        nombre: user.nombre,
        apepat: user.apepat,
        apemat: user.apemat,
        email: user.email,
        password: user.password,
        rol_id: 1,
      };

      const actionResult = await dispatch(createUser(dataSend));
      const response = actionResult.payload;

      //console.log(response);

      if (actionResult.meta.requestStatus === "rejected") {
        const error = actionResult.payload.error; // Access the 'error' property from the payload
        console.log(error);

        toast.show("Error al crear el usuario", {
          type: "error",
          placement: "bottom",
          duration: 4000,
          style: {
            marginBottom: 200,
          },
        });
      } else {
        // Handle the successful case
        toast.show("Registro Completo", {
          type: "success",
          placement: "bottom",
          duration: 4000,
          style: {
            marginBottom: 200,
          },
        });

        navigate("Login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container style={styles.container} useSafeArea={false}>
      <DeliveryHeader title="Pago" iconLeft="leftArrow" iconRight="menu" />
      {loading ? (
        <>
          <ActivityIndicator
            size="large"
            color="yellow"
            style={{ height: 500 }}
          />
        </>
      ) : (
        <>
          <Content>
            <ShippingTo
              //data={DATAPLANS}
              selectedIndex={selectedShipPlace}
              onChange={setSelectedShipPlace}
              style={styles.shipping}
            />
            <PaymentMethod
              data={DATA_PAYMENT}
              selectedIndex={selectedCard}
              onChange={setSelectedCard}
            />
          </Content>
          <Layout style={styles.bottom}>
            <Text category="title4">Total</Text>
            <Text category="title3" status={"primary"}>
              $99.00
            </Text>
          </Layout>
          <Button
            children="Pagar"
            onPress={handleSaveUser}
            style={[{ marginBottom: bottom + 24 }, styles.checkOut]}
          />
        </>
      )}
    </Container>
  );
};

export default TypePay;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  shipping: {
    marginTop: 24,
    marginBottom: 32,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 18,
  },
  checkOut: {
    marginHorizontal: 24,
  },
});

const DATA_LOCATION = [
  {
    id: 0,
    name: "Home",
    phoneNumber: "0901-776-058",
    location: "Nam Tu Liem - Ha Noi",
  },
  {
    id: 1,
    name: "Home",
    phoneNumber: "0901-776-058",
    location: "Nam Tu Liem - Ha Noi",
  },
  {
    id: 2,
    name: "Work-Space",
    phoneNumber: "0901-776-058",
    location: "Nam Tu Liem - Ha Noi",
  },
];
const DATA_PAYMENT = [
  { id: 0, title: "Tarjeta Debito/Credito", logo: Images.creditCard },
  { id: 1, title: "Paypal", logo: Images.paypal },
  { id: 2, title: "Apple Pay", logo: Images.apple },
];
