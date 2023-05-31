import React, { memo, useState } from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
} from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Icon,
  Layout,
  Datepicker,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Text from "../../components/Text";
import Content from "../../components/Content";
import Container from "../../components/Container";
import { Images } from "../../assets/images";
import ButtonText from "../../components/ButtonText";
//import { SignIn01_Data } from "./SignIn01";
import useLayout from "../../hoooks/useLayout";
import BottomTab from "../Private/Component/BottomTab";
import { AppParamList } from "../../navigation/type";
import S3Service from "../../service/S3Service";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { createUser } from "../../service/UserService";
import { AppDispatch, RootState } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

export default function FormRegister() {
  // const navigation = useNavigation();

  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);


  const [data, setData] = useState({
    nombre: "",
    apepat: "",
    apemat: "",
    email: "",
    password: "",
    rol_id: 0,
  });

  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);




  const handleOnPressSave = async () => {
    try {
      setLoading(true);

      const dataSend = {
        nombre: data.nombre,
        apepat: data.apepat,
        apemat: data.apemat,
        email: data.email,
        password: data.password,
        rol_id: data.rol_id,
      };

      const actionResult = await dispatch(createUser(dataSend));
      const response = actionResult.payload;

      console.log(response);

      if (actionResult.meta.requestStatus === 'rejected') {
        const error = actionResult.payload.error; // Access the 'error' property from the payload
        console.log(error);

        toast.show("Error al crear el usuario", {
          type: "error",
          placement: "bottom",
          duration: 4000,
          style: {
            marginBottom: 100,
          },
        });
      } else {
        // Handle the successful case
        toast.show("Usuario creado correctamente", {
          type: "success",
          placement: "bottom",
          duration: 4000,
          style: {
            marginBottom: 100,
          },
        });
        goBack();
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        accessoryLeft={() => (
          <TouchableOpacity>
            <Image
              /*  source={Images.futbol}*/
              /* @ts-ignore */
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      />
      <Content style={styles.content}>
        <Text category="header">Agregar Usuario</Text>
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
            <KeyboardAwareScrollView>
              <Text style={{ marginTop: 20, fontSize: 15, marginBottom: -15 }}>
                Nombre:
              </Text>
              <Input
                placeholder="Nombre"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, nombre: text })}
              />
              <Text style={{ marginTop: 20, fontSize: 15, marginBottom: -15 }}>
                Apellido Paterno
              </Text>
              <Input
                placeholder="Apellido Materno"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, apepat: text })}
              />
              <Text style={{ marginTop: 20, fontSize: 15, marginBottom: -15 }}>
                Apellido Materno:
              </Text>
              <Input
                placeholder="Apellido Materno"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, apemat: text })}
              />
              <Text style={{ marginTop: 20, fontSize: 15, marginBottom: -15 }}>
                email:
              </Text>
              <Input
                placeholder="Email"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, email: text })}
              />
              <Text style={{ marginTop: 20, fontSize: 15, marginBottom: -15 }}>
                password:
              </Text>
              <Input
                placeholder="Password"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, password: text })}
              />
              <Text style={{ marginTop: 20, fontSize: 15, marginBottom: -15 }}>
                Numero de Rol:
              </Text>
              <Input
                placeholder="Numero de Rol"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, rol_id: Number(text) })}
              />


              {/* <Input
          placeholder="Total de equipos"
          status="primary"
          style={styles.input}
        /> */}

              <View style={styles.buttons}>
                <Button
                  children="Cancelar"
                  style={styles.buttonsLiga}
                  status="danger"
                  onPress={goBack}
                />
                <Button
                  status="success"
                  style={styles.buttonsLiga}
                  children="Guardar"
                  onPress={handleOnPressSave}
                />
              </View>
            </KeyboardAwareScrollView>
          </>
        )}
        <ScrollView
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.btnImage,
            { paddingBottom: bottom + 24, justifyContent: "center" },
          ]}
        ></ScrollView>
      </Content>
      <BottomTab selectIndex={0} />
    </Container>
  );
}

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
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  buttonsLiga: {
    margin: 20,
    width: 150,
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