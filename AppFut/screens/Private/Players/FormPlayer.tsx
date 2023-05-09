import React, { memo, useState } from "react";
import { View, Image, FlatList, Platform } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Layout,
  Datepicker,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "../../../hoooks/useLayout";

import Text from "../../../components/Text";
import Container from "../../../components/Container";
import BasicHeader from "../Component/BasicHeader";
import * as ImagePicker from "expo-image-picker";
import { AppParamList } from "../../../navigation/type";

const FormPlayer = memo(() => {
 
  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();

  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const keyExtractor = (item: any, index: number) => index.toString();
  const [date, setDate] = React.useState(new Date());

  const SIZE_PIG = 195.97 * (width / 375);

  const [file, setFile] = React.useState<FormData | undefined>();
  const [image, setImage] = React.useState<string | null>(null);

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
    <Container style={styles.container} useSafeArea={false}>
      <Image
        //source={Images.bgCrypto}
        /* @ts-ignore */
        style={[styles.bg, { width: width, height: height / 2 }]}
      />
      <BasicHeader
        style={[{ marginTop: top }]}
        appearance={"control"}
        iconLeft={{ icon: "drawMenu" }}
        iconRight={{ icon: "user", _onPress: () => {} }}
        title="Players"
      />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        renderItem={() => (
          <>
            <View style={styles.title}>
              <Image
                //source={Images.safeMoney}
                resizeMode="center"
                style={{
                  width: SIZE_PIG,
                  height: SIZE_PIG,
                  position: "absolute",
                  right: -8,
                  top: -16,
                  transform: [{ rotateZ: "3deg" }],
                }}
              />

              <View>
                <Text
                  marginLeft={135}
                  marginTop={16}
                  category="title3"
                  marginRight={120}
                >
                  Alta de Jugador
                </Text>

                <Input
                  placeholder="Nombre"
                  status="primary"
                  style={styles.input}
                />
                <Input
                  placeholder="Apellido Paterno"
                  status="primary"
                  style={styles.input}
                />
                <Input
                  placeholder="Apellido Materno"
                  status="primary"
                  style={styles.input}
                />
                <Datepicker
                  style={styles.input}
                  date={date}
                  onSelect={(nextDate) => setDate(nextDate)}
                />
                <Input
                  keyboardType="numeric"
                  placeholder="Altura"
                  status="primary"
                  style={styles.input}
                />
                <Input
                  keyboardType="numeric"
                  placeholder="Número"
                  status="primary"
                  style={styles.input}
                />
                <Input
                  placeholder="Equipo"
                  status="primary"
                  style={styles.input}
                />

                <View style={{ margin: 10 }}>
                  <Button children={"Subir Imagen"} onPress={pickImage} />
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
                    onPress={() => navigate("Profile")}
                  />
                </View>
              </View>
            </View>
            <Layout style={styles.topContent} />
          </>
        )}
      />
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
