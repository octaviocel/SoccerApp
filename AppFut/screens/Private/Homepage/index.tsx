import React, { memo } from "react";
import { View, Image, FlatList } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
} from "@ui-kitten/components";
import useLayout from "../../../hoooks/useLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Text from "../../../components/Text";
import Container from "../../../components/Container";
import BasicHeader from "../Component/BasicHeader";
//import { Images } from "assets/images";
import Market from "./Market";
import BottomTab from "../Component/BottomTab";
//import keyExtractor from "utils/keyExtractor";
import ListPopular from "./ListPopular";
import { AppParamList } from "../../../navigation/type";

import { Images } from "../../../assets/images";

const Homepage = memo(() => {
  type AppParamList = {
    NewsPage: undefined;
  };

  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const keyExtractor = (item: any, index: number) => index.toString();

  const SIZE_PIG = 195.97 * (width / 375);

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
                /*source={Images.safeMoney}*/
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

              <View style={styles.noticias}>
                <Text
                  marginLeft={24}
                  marginTop={16}
                  category="title3"
                  marginRight={50}
                >
                  Noticias de ultimo momento acerca de tu equipo favorito
                </Text>
                <Button
                  children={() => (
                    <Text category="subhead" status={"black"}>
                      Ver noticias
                    </Text>
                  )}
                  style={styles.learnMore}
                  size={"44"}
                  onPress={() => navigate("NewsPage")}
                />
              </View>
            </View>
            <Layout style={styles.topContent} />
            <Layout>
              <ListPopular />
              <Market />
            </Layout>
          </>
        )}
      />
      <BottomTab selectIndex={0} />
    </Container>
  );
});

export default Homepage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  noticias:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 130,
    marginLeft: 24,
    marginTop: 8,
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
});
