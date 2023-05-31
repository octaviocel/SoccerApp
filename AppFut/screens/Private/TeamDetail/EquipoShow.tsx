import React from "react";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "../../../hoooks/useLayout";
import { Images } from "../../../assets/images";
import { View, Image } from "react-native";
import AnimatedAppearance from "../../../components/AnimatedAppearance";
import Text from "../../../components/Text";
import ReadMore from "../../../components/ReadMore";
import Equipo from "../../../models/Equipo";

const EquipoShow = (values: {equipo: Equipo}) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const Item = React.useCallback(({ item }: any) => {
    return (
      <View style={styles.desView}>
        <Image
          source={item.image}
          /* @ts-ignore */
          style={styles.desIcon}
        />
        <View>
          <Text category="title4">{item.title}</Text>
          <Text
            category="caption1"
            opacity={0.5}
            marginRight={50 * (width / 375)}
          >
            {item.des}
          </Text>
        </View>
      </View>
    );
  }, []);
  return (
    <View style={styles.container}>
      <AnimatedAppearance>
        <View>
          <View style={styles.header}>
            <View>
              <Text category="headline">💻</Text>
              <Text category="subhead"> 0 puntos</Text>
            </View>
            <Layout style={styles.line} level={"2"} />
            <View>
              <Text category="headline">👨🏻</Text>
              <Text category="subhead"> 20 Jugadores</Text>
            </View>
            <Layout style={styles.line} level={"2"} />
            <View>
              <Text category="headline">📈</Text>
              <Text category="subhead"> 1° de la general</Text>
            </View>
          </View>
          <ReadMore
            marginBottom={16}
            children={`Equipo nacido en ${values.equipo.estadio}, con el entrenador ${values.equipo.entrenador}.`}
          />
          {/* <View style={styles.footer}>
            {/* {DATA.map((item, _) => {
              return <Item item={item} key={_} />;
            })} 
          </View> */}
        </View>
      </AnimatedAppearance>
    </View>
  );
};

export default EquipoShow;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  line: {
    width: 1,
  },
  desIcon: {
    marginRight: 16,
  },
  footer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "text-grey-700",
    paddingBottom: 0,
  },
  desView: {
    flexDirection: "row",
    marginBottom: 16,
  },
});
const DATA = [
  {
    id: 0,
    image: Images.flight,
    title: "100% online",
    des: "When an unknown printer took a galley of type and scrambled it to make a t specimen book",
  },
  {
    id: 1,
    image: Images.profit,
    title: "Beginner Level",
    des: "When an unknown printer took a galley of type and scrambled it to make a t specimen book",
  },
  {
    id: 2,
    image: Images.recycle,
    title: "Flexible deadlines",
    des: "When an unknown printer took a galley of type and scrambled it to make a t specimen book",
  },
];
