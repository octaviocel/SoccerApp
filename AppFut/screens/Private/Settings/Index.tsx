import React, { memo, useState } from "react";
import useLayout from "../../../hoooks/useLayout";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  Button,
  Icon,
  ViewPager,
  Layout,
  useTheme,
} from "@ui-kitten/components";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Container from "../../../components/Container";
import NavigationAction from "../../../components/NavigationAction";
import { Images } from "../../../assets/images";
import BottomTab from "../Component/BottomTab";
import FrequencyTab from "../Component/FrequencyTab";
import TabCourse from "../Component/TabCourse";
import HeaderProfile from "../Profile/HeaderProfile";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import Text from "../../../components/Text";
import Content from "../../../components/Content";

import Toast, { useToast } from "react-native-toast-notifications";
import LoadingComponent from "../Component/LoadingComponent";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppParamList } from "../../../navigation/type";
import { signOut } from "../../../redux/features/userReducer";
import { useDispatch } from "react-redux";
import { _ } from "numeral";
import Modal from "../Component/Modal";
import ReactNativeModal from "react-native-modal";
import Liga from "../../../models/Liga";
import EquipoShow from "./EquipoShow";
import PartidosShow from "../TeamDetail/PartidosShow";

const LeagueAdmin = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const { getState } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();

  const toast = useToast();

  //   const { currentUser, loading } = useSelector(
  //     (state: RootState) => state.user
  //   );

  const liga = new Liga(
    getState().routes.find((item) => item.name === "LeagueAdmin")?.params[
      "value"
    ]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  //const [selectedIndex2, setSelectedIndex2] = React.useState(0);
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const [header, setHeader] = React.useState(0);
  const onLayoutHeader = React.useCallback(
    (e: {
      nativeEvent: { layout: { height: React.SetStateAction<number> } };
    }) => setHeader(e.nativeEvent.layout.height),
    []
  );
  const input = [0, height * 0.06, height * 0.075, height * 0.09];

  const opacityHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      input,
      [0, 0, 0.1, 1],
      Extrapolate.CLAMP
    );
    const transY = interpolate(
      translationY.value,
      input,
      [30, 20, 15, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(translationY.value, input, [0, 0, 1, 1]);
    return {
      opacity: opacity,
      transform: [{ translateY: transY }, { scale: scale }],
      marginBottom: 8,
    };
  }, []);
  const scaleAvatar = useAnimatedStyle(() => {
    const scale = interpolate(translationY.value, input, [1, 0.9, 0.1, 0]);
    const opacity = interpolate(translationY.value, input, [1, 1, 0, 0]);
    return {
      transform: [{ scale: scale }],
      opacity: opacity,
      alignSelf: "center",
      zIndex: 9,
      top: header + top,
    };
  }, [header, top]);

  const CustomToast = ({ message }: { message: string }) => {
    return (
      <View style={{ backgroundColor: "#333", padding: 10, borderRadius: 5 }}>
        <Text style={{ color: "#fff", fontSize: 16 }}>{message}</Text>
      </View>
    );
  };

  const tos = (text: string) => {
    toast.show(text, {
      type: "warning",
      placement: "bottom",
      duration: 4000,
      //offset: 30,
      animationType: "slide-in",
      style: {
        marginBottom: 750,
      },
    });
  };

  const DATA = [
    {
      id: 1,
      title: "Agregar Equipo",
      icon: "list",
      _onPress: () => navigate("FormTeam"),
    },
    // {
    //   id: 5,
    //   title: "Ver Equipos",
    //   icon: "search",
    // // },
    // {
    //   id: 2,
    //   title: "Agregar Jugadores",
    //   icon: "worldWide",
    //   _onPress: () => navigate("FormPlayer"),
    // },
    {
      id: 3,
      title: "Ver Estadísticas",
      icon: "eye",
      _onPress: () => navigate("Estadisticas"),
    },
    { id: 4, title: "Configuracion ", icon: "settings" },
  ];

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={{
          position: "absolute",
          top: top,
          zIndex: 10,
        }}
        onLayout={onLayoutHeader}
        appearance={"control"}
        accessoryLeft={
          <View style={styles.flexRow}>
            <NavigationAction marginLeft={4} icon="nada" />
            <Animated.View style={opacityHeader}>
              <Avatar
                size="40"
                source={{
                  uri: liga.foto,
                }}
              />
            </Animated.View>
            <NavigationAction icon="nada" />
          </View>
        }
      />
      <Image
        source={Images.bgTeacher}
        /* @ts-ignore */
        style={styles.bgHeader}
      />
      <Animated.View style={scaleAvatar}>
        <Avatar
          source={{
            uri: liga.foto,
          }}
          size={"92"}
          //shape="square"
          /* @ts-ignore */
          style={[styles.avatar]}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          marginTop: top + header + 8,
          paddingBottom: bottom + 40,
        }}
      >
        <View>
          <View style={styles.container}>
            <Text category="title4" uppercase center marginBottom={8}>
              {liga.nombre}
            </Text>
            <Text category="subhead" status={"placeholder"} center>
              {liga.ubicacion}
            </Text>
            <View style={styles.social}>
              <Icon pack="assets" name="fb1" style={styles.iconSocial} />
              <Icon pack="assets" name="tw" style={styles.iconSocial} />
              <Icon pack="assets" name="ig" style={styles.iconSocial} />
            </View>
            <Layout style={styles.footer} level={"2"}></Layout>
          </View>
        </View>
        <FrequencyTab
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          tabs={["Liga", "Equipos", "Partidos"]}
          style={styles.tabBar}
        />
        <ViewPager
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          style={styles.viewPager}
        >
          <View>
            <Content contentContainerStyle={styles.content}>
              {DATA.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.7}
                    onPress={
                      item.id === 1
                        ? () => navigate("FormTeam", { value: liga.id })
                        : item._onPress
                    }
                    style={[
                      styles.item,
                      {
                        backgroundColor:
                          //  i === selectedIndex2
                          //theme["text-primary-color"],
                          "transparent",
                      },
                    ]}
                  >
                    <View style={styles.title}>
                      <Layout style={styles.layoutIc}>
                        <Icon
                          pack="assets"
                          name={item.icon}
                          style={{
                            tintColor:
                              // i === selectedIndex2
                              //theme["text-primary-color"],
                              theme["text-white-color"],
                          }}
                        />
                      </Layout>
                      <Text
                        marginLeft={16}
                        category="headline"
                        status={"white"}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <Icon
                      pack="assets"
                      name="arrowRight16"
                      style={[
                        styles.iconArr,
                        {
                          tintColor:
                            // i === selectedIndex2
                            // theme["text-black-color"],
                            theme["text-white-color"],
                        },
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </Content>
          </View>
          <View>
            <EquipoShow liga={liga.id} />
          </View>
          <View>
            <PartidosShow  />
          </View>
        </ViewPager>
      </Animated.ScrollView>
      <BottomTab selectIndex={4} />
    </Container>
  );
});

export default LeagueAdmin;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  viewPager: {
    marginBottom: 90,
  },
  tabBar: {
    marginBottom: 24,
  },
  action: {
    flexDirection: "row",
    marginTop: 16,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  mess: {
    flex: 1,
    marginRight: 16,
  },
  following: {
    flex: 1,
  },
  bgHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 9,
    width: "100%",
  },
  avatar: {
    borderWidth: 4,
    borderColor: "background-basic-color-1",
    marginBottom: 8,
  },
  content: {
    marginHorizontal: 16,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
    paddingBottom: 12,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  layoutIc: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconArr: {
    width: 12,
    height: 12,
  },
  linear: {
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  social: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  iconSocial: {
    width: 40,
    height: 40,
    marginHorizontal: 12,
  },
  footer: {
    borderRadius: 12,
    flexDirection: "row",
    marginHorizontal: 24,
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
});
const DATA_USER = {
  name: "Francis Dixon",
  avatar: Images.avatar11,
  following: 348,
  follower: 24,
  loves: 233,
};
const DATA_COLLECTION = [
  { id: 0, title: "Liga de las estrellas", image: Images.liga },
];
