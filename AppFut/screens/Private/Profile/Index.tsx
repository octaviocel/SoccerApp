import React, { memo } from "react";
import useLayout from "../../../hoooks/useLayout";
import { View, ImageBackground, Image, TouchableOpacity } from "react-native";
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
import HeaderProfile from "./HeaderProfile";
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

const Profile = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const dispatch = useDispatch<AppDispatch>();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();

  const toast = useToast();

  const { currentUser, loading } = useSelector(
    (state: RootState) => state.user
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
      id: 0,
      title: "Agregar Liga",
      icon: "heart",
      _onPress: () => navigate("FormLeague"),
    },
    {
      id: 1,
      title: "Agregar Equipo",
      icon: "list",
      _onPress: () => navigate("FormTeam"),
    },
    {
      id: 2,
      title: "Agregar Jugadores",
      icon: "worldWide",
      _onPress: () => navigate("FormPlayer"),
    },
    { id: 3, title: "Ver Estadísticas", icon: "eye" },
    { id: 4, title: "Configuracion", icon: "settings" },
  ];

  const logout = () => {
    dispatch(signOut());
    navigate("HomePage");
  };
  //console.log(currentUser);

  if (!currentUser) {
    tos("Necesitas Iniciar Sesión para Funciones Premiun");
    navigate("HomePage");
  }
  if (!loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }
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
                  uri: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
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
            uri: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
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
        <HeaderProfile data={DATA_USER} />
        <View style={styles.action}>
          <Button
            accessoryLeft={<Icon pack="assets" name="star" />}
            status={"control"}
            size={"50"}
            children={currentUser?.role?.descripcion}
            style={styles.mess}
          />
          <Button
            accessoryLeft={<Icon pack="assets" name="leftChevron" />}
            size="50"
            children="Salir"
            onPress={logout}
            style={styles.following}
          />
        </View>
        <FrequencyTab
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          tabs={["Mis Ligas", "Configuraciones"]}
          style={styles.tabBar}
        />
        <ViewPager
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          style={styles.viewPager}
        >
          <TabCourse data={DATA_COLLECTION} />
          <View>
            <Content contentContainerStyle={styles.content}>
              {DATA.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i + item.title}
                    activeOpacity={0.7}
                    onPress={item._onPress}
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
        </ViewPager>
      </Animated.ScrollView>
      <BottomTab selectIndex={4} />
    </Container>
  );
});

export default Profile;

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
