import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import React, { memo, useEffect } from "react";
import Container from "../../../components/Container";
import BasicHeader from "../Component/BasicHeader";
import {
  Button,
  Icon,
  Layout,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import Text from "../../../components/Text";
import BottomTab from "../Component/BottomTab";
import { useNavigation, useTheme } from "@react-navigation/native";
import useLayout from "../../../hoooks/useLayout";
import NavigationAction from "../../../components/NavigationAction";
import Content from "../../../components/Content";
import { LinearGradient } from "expo-linear-gradient";
import LitterNew from "../Component/LitterNew";
import { Images } from "../../../assets/images";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { getAllLigas } from "../../../service/LigasService";

const MenuLeague = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const keyExtractor = (item: any, index: number) => index.toString();

  const SIZE_PIG = 195.97 * (width / 375);
  const dispatch = useDispatch<AppDispatch>();

  const { ligas, fetched } = useSelector((state: RootState) => state.ligas);

  useEffect(() => {
    getLigas();
  }, [dispatch]);

  const getLigas = () => {
    dispatch(getAllLigas());
  };

  return (
    <Container style={{ flex: 1 }} useSafeArea={false}>
      <ImageBackground
        source={{ uri: "https://i.blogs.es/338a2a/futbol/1366_2000.jpeg" }}
        style={{
          width: width,
          height: 295 * (height / 812),
          position: "absolute",
        }}
      />
      <TopNavigation
        appearance={"control"}
        //accessoryLeft={<NavigationAction  icon="leftArrow" />}
        //accessoryRight={<NavigationAction icon="heart" />}
      />
      <Content contentContainerStyle={{ paddingTop: 115 * (height / 350) }}>
        <LinearGradient
          style={styles.linearCard}
          colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.27)"]}
        >
          <Text
            category="title3"
            style={{ textAlign: "center", color: "#215190" }}
          >
            Explora en un solo lugar
          </Text>
        </LinearGradient>

        {fetched ? (
          ligas.map((item, i) => {
            return (
              <TouchableOpacity>
                <LitterNew item={item} key={i} />
              </TouchableOpacity>
            );
          })
        ) : (
          <></>
        )}
      </Content>
      <BottomTab selectIndex={1} />
    </Container>
  );
});

export default MenuLeague;

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
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  line: {
    height: 1,
    marginBottom: 10,
    marginTop: 32,
    backgroundColor: "#CED0DE",
    opacity: 0.5,
  },
  linearCard: {
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 20,
    marginBottom: 32,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 0.8 }],
  },
  footer: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  titleFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
const DESCRIPTION = `Wales typed the words "Hello, World!" after launching Wikipedia on January 15, 2001, and the moment has been immortalized in an NFT that sold for $750,000 at Christie's on Wednesday wales the auction house said in a statement.
  An NFT is a piece of digital content linked to the blockchain, the digital database underpinning cryptocurrencies such as bitcoin and ethereum.
  They transform digital works of art and other collectibles into one-of-a-kind, verifiable assets that are easy to trade on the blockchain, and have seen a huge spike of interest in the art world.`;
const DATA = [
  {
    id: 0,
    title: "Liga Mexicana",
    date: "Ultimo partido 3 days ago",
    image: Images.collection3,
  },
  {
    id: 1,
    title: "Premier League",
    date: "Ultimo partido 3 days ago",
    image: Images.collection2,
  },
  {
    id: 2,
    title: "Liga Santander",
    date: "Ultimo partido 3 days ago",
    image: Images.collection1,
  },
  {
    id: 3,
    title: "Liga Mexicana",
    date: "Ultimo partido 3 days ago",
    image: Images.collection3,
  },
  {
    id: 4,
    title: "Premier League",
    date: "Ultimo partido 3 days ago",
    image: Images.collection2,
  },
  {
    id: 5,
    title: "Liga Santander",
    date: "Ultimo partido 3 days ago",
    image: Images.collection1,
  },
];
