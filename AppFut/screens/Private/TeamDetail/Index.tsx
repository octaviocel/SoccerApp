import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import useLayout from "../../../hoooks/useLayout";
import {
  Button,
  Layout,
  StyleService,
  TopNavigation,
  ViewPager,
  useStyleSheet,
} from "@ui-kitten/components";
import { Images } from "../../../assets/images";
import Container from "../../../components/Container";
import NavigationAction from "../../../components/NavigationAction";
import { TouchableOpacity, Image, ScrollView } from "react-native";
import Text from "../../../components/Text";
import Content from "../../../components/Content";
import { View } from "react-native";
import EduTabbar from "../Component/EduTabbar";
import PlayerShow from "./PlayerShow";
import PartidosShow from "./PartidosShow";
import EquipoShow from "./EquipoShow";
import Equipo from "../../../models/Equipo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppParamList } from "../../../navigation/type";

const TeamDetail = () => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [selectIndex, setSelectIndex] = useState(0);
  const { getState } = useNavigation();

  const { navigate } = useNavigation<NavigationProp<AppParamList>>();

  const equipo = new Equipo(
    getState().routes.find((item) => item.name === "TeamDetail")?.params[
      "value"
    ]
  );

  //   useEffect(() => {
  //     console.log(equipo.logo);
  //   }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="leftArrow" marginLeft={4} />}
        title={() => (
          //   <TouchableOpacity
          //     disabled
          //     style={[styles.btnTop, { width: 128 * (width / 375) }]}
          //   >
          //     {/* <Text status="blue" category="subhead">
          //       Mi Equipo
          //     </Text> */}
          //   </TouchableOpacity>
          <></>
        )}
      />
      <View>
        <Image
          source={{ uri: equipo.logo ? equipo.logo : "" }}
          /* @ts-ignore */
          style={{
            width: 150 * (width / 375),
            height: 140 * (width / 375),
            alignSelf: "center",
          }}
        />
        <Text category="title2" status="white" center marginBottom={8}>
          {equipo.nombre}
        </Text>
        <Text category="title4" status="white" center>
          Campo: {equipo.estadio}
        </Text>
        <Text category="subhead" status="white" opacity={0.5} center>
          DT {equipo.entrenador}
        </Text>
      </View>
      <Button 
      onPress={() => navigate("FormPlayer", { value: equipo.id })}
      children="Agregar Jugador" style={styles.btnBottom} />

      <Layout>
        <EduTabbar
          selectedIndex={selectIndex}
          onChange={setSelectIndex}
          style={styles.tabBar}
          tabs={["Jugadores", "Partidos", "Sobre"]}
        />
        <ViewPager
          selectedIndex={selectIndex}
          onSelect={setSelectIndex}
          shouldLoadComponent={(i) => i == selectIndex}
          style={{ height: height }}
        >
          <PlayerShow equipo={equipo.id} />
          <PartidosShow />
          <EquipoShow equipo={equipo} />
        </ViewPager>
      </Layout>
    </Container>
  );
};

export default TeamDetail;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  btnTop: {
    height: 32,
    borderRadius: 16,
    width: 128,
    backgroundColor: "color-primary-100",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
  },
  topNav: {
    marginBottom: -8,
  },
  checked: {
    tintColor: "color-primary-100",
  },
  statusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 24,
    marginRight: 34,
    marginTop: 32,
    marginBottom: 24,
  },
  btnBottom: {
    alignSelf: "center",
    marginTop: 8,
    //height: 400,
  },
  tabBar: {
    marginTop: 15,
    marginBottom: 8,
    marginHorizontal: 24,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
});
const Data_Status = [
  { id: 0, title: "Loss Weight" },
  { id: 1, title: "Muscle Gain" },
  { id: 2, title: "Less Snack" },
];

export const Data_Recipes = [
  {
    id: 0,
    name: "pizza",
    image: Images.pizzaBf,
    cals: 328,
  },
  {
    id: 1,
    name: "donut",
    image: Images.donutBf,
    cals: 328,
  },
  {
    id: 2,
    name: "pizza",
    image: Images.pizzaBf,
    cals: 328,
  },
];
