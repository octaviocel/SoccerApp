import React, { memo, useState } from "react";
import { View, Image, FlatList, Platform, TextInput } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Layout,
  RangeDatepicker,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "../../../hoooks/useLayout";

import Text from "../../../components/Text";
import Container from "../../../components/Container";
import BasicHeader from "../Component/BasicHeader";
import * as ImagePicker from "expo-image-picker";


const FormRol = memo(() => {
  <input type="file" />
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const keyExtractor = (item: any, index: number) => index.toString();
  const [range, setRange] = React.useState({});

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
      data.append("foto", JSON.stringify({
      name: result.uri.split("ImagePicker/")[1],
      type: `image/${result.uri.split("ImagePicker/")[1].split(".")[1]}`,
      uri:
      Platform.OS === "ios"
      ? result.uri.replace("file://", "")
       : result.uri,
      }));
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
                  marginLeft={100}
                  marginTop={16}
                  category="title3"
                  marginRight={100}
                >
                  Agregar Nuevo Rol
                </Text>

                <View style={styles.textAreaContainer} >
                  <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Descripción detallada del nuevo rol"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>

                <View style={styles.buttons}>
                  <Button
                    children={() => (
                      <Text category="subhead" status={"black"}>
                        Cancelar
                      </Text>
                    )}
                    style={styles.cancel}
                    size={"50"}
                  />

                  <Button
                    children={() => (
                      <Text category="subhead" status={"black"}>
                        Guardar
                      </Text>
                    )}
                    style={styles.save}
                    size={"50"}
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

export default FormRol;

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
    marginTop: 8,
    backgroundColor: 'red',
  },
  save: {
    width: 150,
    marginTop: 8,
    backgroundColor: 'green',
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
    },
    fecha: {
      flex: 1,
      marginTop: 10,
      marginBottom: 8,
      justifyContent: 'space-evenly',
    },
    textAreaContainer: {
      margin: 15,
      borderColor: "thistle",
      borderWidth: 1,
      padding: 5
    },
    textArea: {
      fontSize:20,
      color:'#FFFFFF',
      height: 250,
      justifyContent: "flex-start"
    }
});
