import React, { memo } from "react";
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

export default function FormLeague() {
  // const navigation = useNavigation();

  const [image, setImage] = React.useState<string | null>(null);
  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [date, setDate] = React.useState(new Date());
  const [file, setFile] = React.useState<FormData | undefined>();

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

    if (!result.cancelled && result.uri) {
      try {
        const data = new FormData();
        data.append(
          "foto",
          JSON.stringify({
            name: result.uri.split("ImagePicker/")[1],
            type: `image/${result.uri.split("ImagePicker/")[1].split(".")[1]}`,
            uri:
              Platform.OS === "ios"
                ? result.uri.replace("file://", "")
                : result.uri,
          })
        );
        // await ImagesService.uploadRN(data);
        setFile(data);
      } catch (error) {
        console.log(error);
      }

      setImage(result.uri);
    }
  };

  return (
    <Container style={styles.container}>
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
        <Input placeholder="Nombre" status="primary" style={styles.input} />
        <Datepicker
          style={styles.input}
          date={date}
          onSelect={(nextDate) => setDate(nextDate)}
          placeholder="Fecha de inicio"
        />

        <View style={{ margin: 10, marginTop: 10, marginVertical: 24 }}>
          <Button children="Quiero Una Subir Imagen" onPress={pickImage} />
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

        <Input placeholder="Ubicación" status="primary" style={styles.input} />

        <Input
          placeholder="Total de equipos"
          status="primary"
          style={styles.input}
        />

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
            onPress={() => navigate("Profile")}
          />
        </View>

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
      <BottomTab selectIndex={4} />
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
