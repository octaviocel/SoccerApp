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
import Text from "../../../components/Text";
import Content from "../../../components/Content";
import Container from "../../../components/Container";
import { Images } from "../../../assets/images";
import ButtonText from "../../../components/ButtonText";
//import { SignIn01_Data } from "./SignIn01";
import useLayout from "../../../hoooks/useLayout";
import BottomTab from "../Component/BottomTab";
import { AppParamList } from "../../../navigation/type";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator } from "react-native-paper";
import S3Service from "../../../service/S3Service";
import { useDispatch } from "react-redux";
import { createEquipo } from "../../../service/EquipoService";
import { AppDispatch } from "../../../redux/store";
import { useToast } from "react-native-toast-notifications";

export default function FormEquipo() {
  // const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const { getState } = useNavigation();

  const ligaId = Number(
    getState().routes.find((item) => item.name === "FormTeam")?.params["value"]
  );
  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [file, setFile] = React.useState<any | undefined>();
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    nombre: "",
    entrenador: "",
    estadio: "",
    liga_id: ligaId,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const handleOnPress = async () => {
    try {
      setLoading(true);
      const subir = await S3Service.create(file);

      if (subir) {
        const dataSend = {
          ...data,
          logo: subir.id,
        };

        dispatch(createEquipo(dataSend));
        toast.show("Equipo creado correctamente", {
          type: "success",
          placement: "bottom",
          duration: 4000,
          //offset: 30,
          animationType: "slide-in",
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
        <Text category="header">Agregar Equipo</Text>
        <KeyboardAwareScrollView>
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
              <Text style={{ marginTop: 20, fontSize: 15, marginBottom: -15 }}>
                Nombre del Equipo:
              </Text>
              <Input
                placeholder="Nombre"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, nombre: text })}
              />

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Nombre del Entrenador / Titular del Equipo:
              </Text>
              <Input
                placeholder="Entrenador"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, entrenador: text })}
              />

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Nombre del Campo de Juego:
              </Text>
              <Input
                placeholder="Estadio"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, estadio: text })}
              />

              <Text style={{ marginTop: 15, fontSize: 15 }}>
                Logo del Equipo:
              </Text>
              <View style={{ margin: 10, marginTop: 10 }}>
                <Button children="Subir Imagen" onPress={pickImage} />
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 200,
                      height: 200,
                      alignSelf: "center",
                      margin: 15,
                    }}
                  />
                )}
              </View>

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
                  onPress={handleOnPress}
                />
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
      </Content>
      <BottomTab selectIndex={0} />
    </Container>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  equipos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icon: {
    width: 98,
    height: 98,
    marginLeft: 40,
  },
  buttons: {
    marginTop: 24,
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
  inputEquipo: {
    width: 160,
  },
  inputOb: {
    height: 98,
  },
  inputFecha: {
    width: 160,
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
