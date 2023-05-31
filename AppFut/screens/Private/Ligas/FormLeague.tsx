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
import S3Service from "../../../service/S3Service";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import LigaService, { createLiga } from "../../../service/LigasService";
import { AppDispatch, RootState } from "../../../redux/store";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

export default function FormLeague() {
  // const navigation = useNavigation();

  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state: RootState) => state.user);

  const [data, setData] = useState({
    nombre: "",
    ubicacion: "",
  });

  const [image, setImage] = React.useState<string | null>(null);
  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [date, setDate] = React.useState(new Date());
  const currentYear = new Date().getFullYear();

  const [file, setFile] = React.useState<any | null>(null);

  const handleOnPress = () => {
    navigate("HomePage");
  };

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

  const handleOnPressSave = async () => {
    try {
      setLoading(true);
      //console.log(file);
      const subir = await S3Service.create(file);
      //console.log(subir);

      if (subir && currentUser) {
        const dataSend = {
          nombre: data.nombre,
          ubicacion: data.ubicacion,
          fechaFundacion: date.toISOString().split("T")[0],
          foto: subir.id,
          user_id: currentUser.id,
        };

        //*const response = await LigaService.createLiga2(dataSend);
        const response = dispatch(createLiga(dataSend));
        //console.log(response);
        toast.show("Liga creada correctamente", {
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
        <Text category="header">Agregar Liga</Text>
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
                Nombre de la liga:
              </Text>
              <Input
                placeholder="Nombre"
                status="primary"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, nombre: text })}
              />
              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Fecha de Fundación:
              </Text>
              <Datepicker
                style={styles.input}
                date={date}
                onSelect={(nextDate) => setDate(nextDate)}
                min={new Date(currentYear - 30, 0, 1)} // Permitir selección de fechas de hasta 10 años atrás
                max={new Date(currentYear + 1, 11, 31)} // Permitir selección de fechas de hasta 10 años adelante
                placeholder="Fecha de inicio"
              />

              <Text style={{ marginTop: 15, fontSize: 15 }}>
                Imagen de la liga:
              </Text>
              <View style={{ margin: 10, marginTop: 10, marginVertical: 24 }}>
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

              <Text style={{ marginTop: 15, fontSize: 15, marginBottom: -15 }}>
                Ubicaci&oacute;n de la liga:
              </Text>
              <Input
                placeholder="Ubicación"
                status="primary"
                keyboardAppearance="default"
                style={styles.input}
                onChangeText={(text) => setData({ ...data, ubicacion: text })}
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
