import React, { memo } from "react";
import { View, Image, FlatList } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
  Avatar
} from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { useNavigation } from "@react-navigation/native";
import useLayout from "../../../hoooks/useLayout";

import Text from "../../../components/Text";
import Container from "../../../components/Container";
import BasicHeader from "../Component/BasicHeader";
//import { Images } from "assets/images";
import BottomTab from "../Component/BottomTab";
//import keyExtractor from "utils/keyExtractor";
import { Images } from "../../../assets/images";
import MarketItem from "../Component/MarketItem";

const NewsPage = memo(() => {
    const { goBack } = useNavigation();
    const { height, width, top, bottom } = useLayout();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const keyExtractor = (item: any, index: number) => index.toString();
  
    const SIZE_IMAGE = 195.97 * (width / 375);
  
    return (
      <Container style={styles.container} useSafeArea={false}>
        <Image
          source={Images.bgCrypto}
          /* @ts-ignore */
          style={[styles.bg, { width: width, height: height / 2 }]}
        />
        <BasicHeader
          style={[{ marginTop: top }]}
          appearance={"control"}
          iconLeft={{ icon: "leftArrow" }}
          iconRight={{ icon: "user" }}
          title="MatchMate"
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
                  source={Images.mexico}
                  resizeMode="center"
                  style={{
                    width: SIZE_IMAGE,
                    height: SIZE_IMAGE,
                    position: "absolute",
                    right: -20,
                    top: -16,
                    transform: [{ rotateZ: "3deg" }],
                  }}
                />
  
                <View>
                  <Text
                    marginLeft={24}
                    marginTop={16}
                    category="title4"
                    marginRight={120}
                  >
               Chacarita liga su tecera derrota consecutiva y pude quedarse fuera de la liguilla
                  </Text>
                  <Button
                    children={() => (
                      <Text category="title4" status={"black"}>
                        Ver más
                      </Text>
                    )}
                    style={styles.news}
                    size={"44"}
                  />
                </View>

              
              </View>

              <View>
              <Image
                  source={Images.aire}
                  resizeMode="center"
                  style={{
                    width: SIZE_IMAGE,
                    height: SIZE_IMAGE,
                    position: "absolute",
                    right: -8,
                    top: -16,
                    transform: [{ rotateZ: "3deg" }],
                  }}
                />
  
                <View>
                  <Text
                    marginLeft={24}
                    marginTop={16}
                    category="title4"
                    marginRight={120}
                  >
                  EL cristiano Ronaldo Oaxaqueño rompe el record de salto de cualquier marca registrada
                  </Text>
                  <Button
                    children={() => (
                      <Text category="title4" status={"black"}>
                        Ver más
                      </Text>
                    )}
                    style={styles.news}
                    size={"44"}
                  />
                </View>
              </View>

              <View>
              <Image
                  source={Images.guyRiding}
                  resizeMode="center"
                  style={{
                    width: SIZE_IMAGE,
                    height: SIZE_IMAGE,
                    position: "absolute",
                    right: -8,
                    top: -16,
                    transform: [{ rotateZ: "3deg" }],
                  }}
                />
                <View>
                  <Text
                    marginLeft={24}
                    marginTop={16}
                    category="title4"
                    marginRight={120}
                  >
                    Señor Drogado entra en patineta y estropea el partido
                  </Text>
                  <Button
                    children={() => (
                      <Text category="title4" status={"black"}>
                        Ver mas
                      </Text>
                    )}
                    style={styles.news}
                    size={"44"}
                  />
                </View>
              </View>

              <View style={styles.title}>
                <Image
                  source={Images.mexico}
                  resizeMode="center"
                  style={{
                    width: SIZE_IMAGE,
                    height: SIZE_IMAGE,
                    position: "absolute",
                    right: -20,
                    top: -16,
                    transform: [{ rotateZ: "3deg" }],
                  }}
                />
  
                <View>
                  <Text
                    marginLeft={24}
                    marginTop={16}
                    category="title4"
                    marginRight={120}
                  >
               Chacarita liga su tecera derrota consecutiva y pude quedarse fuera de la liguilla
                  </Text>
                  <Button
                    children={() => (
                      <Text category="title4" status={"black"}>
                        Ver más
                      </Text>
                    )}
                    style={styles.news}
                    size={"44"}
                  />
                </View>

              
              </View>
              
              <Layout style={styles.topContent} />
              <Layout>

              </Layout>
            </>
          )}
        />
        <BottomTab />
      </Container>
    );
  });

  export default NewsPage;

  const themedStyles = StyleService.create({
    container: {
      flex: 1,
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
    learnMore: {
      width: 104,
      marginLeft: 24,
      marginTop: 8,
    },
    news: {
      width: 184,
      marginLeft: 24,
      marginTop: 8,
      backgroundColor: 'yellow',
    },
    content: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 24,
    },
  });
  