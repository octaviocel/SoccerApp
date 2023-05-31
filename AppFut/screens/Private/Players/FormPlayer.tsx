import React, { memo, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Layout,
  Datepicker,
  TopNavigation,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "../../../hoooks/useLayout";

import Text from "../../../components/Text";
import Container from "../../../components/Container";
import BasicHeader from "../Component/BasicHeader";
import * as ImagePicker from "expo-image-picker";
import { AppParamList } from "../../../navigation/type";
import BottomTab from "../Component/BottomTab";
import Content from "../../../components/Content";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator } from "react-native-paper";
import Jugador from "../../../models/Jugador";
import S3Service from "../../../service/S3Service";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { createJugador } from "../../../service/JugadorService";

const FormPlayer = memo(() => {
  const [data, setData] = useState(new Jugador());

  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();

  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const keyExtractor = (item: any, index: number) => index.toString();
  const [date, setDate] = React.useState(new Date());

  const SIZE_PIG = 195.97 * (width / 375);

  const [file, setFile] = React.useState<any | undefined>();
  const [image, setImage] = React.useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const { getState } = useNavigation();

  const equipoId = Number(
    getState().routes.find((item) => item.name === "FormPlayer")?.params[
      "value"
    ]
  );

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
          nombre: data.nombre,
          apePat: data.apePat,
          apeMat: data.apeMat,
          fechaNacimiento: date.toISOString().split("T")[0],
          altura: data.altura,
          peso: data.peso,
          numero: data.numero,
          foto: subir.id,
          equipo_id: equipoId,
        };
        dispatch(createJugador(dataSend));
        //console.log(response);
        toast.show("Jugador creada correctamente", {
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
    } catch (e) {
      console.log(e);
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
        <Text category="header">Alta Jugador</Text>
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
                Nombre (s):
              </Text>
              <Input
                placeholder="Nombre"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, nombre: text })}
              />

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Apellido Paterno:
              </Text>
              <Input
                placeholder="Entrenador"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, apePat: text })}
              />

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Apellido Materno:
              </Text>
              <Input
                placeholder="Estadio"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, apeMat: text })}
              />

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Fecha de Nacimiento:
              </Text>
              <Datepicker
                style={styles.input}
                date={date}
                onSelect={(nextDate) => setDate(nextDate)}
                min={new Date(currentYear - 50, 0, 1)} // Permitir selección de fechas de hasta 10 años atrás
                max={new Date(currentYear + 1, 11, 31)} // Permitir selección de fechas de hasta 10 años adelante
                placeholder="Fecha de inicio"
              />

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Altura:
              </Text>
              <Input
                placeholder="en Centimetros"
                status="primary"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(text) =>
                  setData({ ...data, altura: Number(text) })
                }
              />

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Peso:
              </Text>
              <Input
                placeholder="en Kilogramos"
                status="primary"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(text) =>
                  setData({ ...data, peso: Number(text) })
                }
              />

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Número del Jugador:
              </Text>
              <Input
                placeholder="10"
                keyboardType="numeric"
                status="primary"
                style={styles.input}
                onChangeText={(text) =>
                  setData({ ...data, numero: Number(text) })
                }
              />
              <Text style={{ marginTop: 15, fontSize: 15 }}>
                Imagen Jugador:
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
    </Container>
  );
});

export default FormPlayer;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  input: {
    marginVertical: 15,
  },
  bg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  inputFecha: {
    width: 160,
  },
  buttonsLiga: {
    margin: 20,
    width: 150,
  },
  title: {
    marginTop: 8,
    marginBottom: 20,
  },
  topContent: {
    height: 48,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  cancel: {
    width: 150,
    //marginLeft: 24,
    marginTop: 8,
    backgroundColor: "red",
  },
  save: {
    width: 150,
    //marginLeft: 24,
    marginTop: 8,
    backgroundColor: "green",
  },
  content: {
    marginHorizontal: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
