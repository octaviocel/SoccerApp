import React, { memo } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Image,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";

import { LinearGradient } from "expo-linear-gradient";
import useLayout from "../hoooks/useLayout";
import Text from "./Text";
import SelectBox from "./SelectBox";
import { Images } from "../assets/images";

interface ItemShippingProp {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
}

interface Props {
  id: number;
  image: ImageSourcePropType;
  level: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  title: string;
  description: string;
  titleButton: string;
}

interface ShippingToProps {
  //data: Props[];
  onAdd?(): void;
  selectedIndex: number;
  onChange(index: number): void;
  style?: StyleProp<ViewStyle>;
}

const ShippingTo = memo(
  ({ selectedIndex, onChange, onAdd, style }: ShippingToProps) => {
    const { width, height } = useLayout();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const changeIndex = React.useCallback(
      (i: number) => {
        return onChange(i);
      },
      [selectedIndex]
    );
    const refScrollView = React.useRef<ScrollView>(null);
    React.useEffect(() => {
      refScrollView.current?.scrollTo({
        x: selectedIndex * 200 - (width - 280) / 2,
        animated: true,
      });
    }, [selectedIndex]);
    return (
      <View style={[styles.container, style]}>
        <View style={styles.title}>
          <Text category="title3">Mi Suscripción</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onAdd}>
            <Layout level={"7"} style={styles.btnAdd}>
              {/* <Text
                category="caption1"
                marginVertical={6}
                marginHorizontal={10}
              >
                Add location
              </Text> */}
            </Layout>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={[styles.content]}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={refScrollView}
        >
          {DATAPLANS.map((item, i) => {
            let isActive = selectedIndex === i;
            return (
              <TouchableOpacity
                onPress={() => changeIndex(i)}
                activeOpacity={0.7}
                key={i}
              >
                <LinearGradient
                  colors={isActive ? COLORS_ACTIVE : COLORS_INACTIVE}
                  style={[
                    styles.linearBtn,
                    {
                      borderWidth: isActive ? 0 : 1,
                      borderColor: isActive
                        ? "transparent"
                        : theme["color-basic-1400"],
                    },
                  ]}
                >
                  <View style={styles.option}>
                    <SelectBox selected={isActive} />
                    {/* <View>
                      <Text category="title4">{item.name}</Text>
                      <Text category="subhead" marginVertical={4}>
                        {item.phoneNumber}
                      </Text>
                      <Text category="subhead">{item.location}</Text>
                    </View> */}
                    <Layout
                      style={[
                        styles.container,
                        {
                          height: 150 * (height / 812),
                          width: 210 * (width / 375),
                          backgroundColor: "transparent",
                        },
                      ]}
                      //level={''}
                    >
                      <View style={styles.leftView}>
                        <TouchableOpacity style={styles.btn}>
                          <Text status="blue" category="subhead">
                            {item.titleButton}
                          </Text>
                        </TouchableOpacity>
                        <View>
                          <Text
                            category="title4"
                            status="white"
                            marginBottom={8}
                          >
                            {item.title}
                          </Text>
                          <Text category="subhead" status="white" opacity={0.5}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={item.image}
                        /* @ts-ignore */
                        style={styles.image}
                      />
                    </Layout>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
);

export default ShippingTo;

const DATAPLANS = [
  {
    id: 0,
    level: "5",
    title: "Administrador de liga",
    titleButton: "$99",
    description:
      "Administra todas tus ligas en tiempo real, puedes agregar equipos sin límite, jugadores sin límite, partidos sin límite, etc.",
    image: Images.beStrong,
  },
  {
    id: 1,
    level: "8",
    title: "Usuario de liga",
    titleButton: "$39",
    description: "Observa los resultados de tu liga en tiempo real. Ve estadísticas de tus jugadores, equipos, partidos, etc.",
    image: Images.beSmart,
  },
  {
    id: 2,
    level: "6",
    title: "Free",
    titleButton: "$0",
    description: "Administra solo una liga, puedes agregar hasta 7 Equipos, 10 Jugadores. ",
    image: Images.beNice,
  },
  // {
  //   id: 3,
  //   level: "4",
  //   title: "Food For Strengs",
  //   titleButton: "Be Fly",
  //   description: "Get strong with food plans",
  //   image: Images.beFly,
  // },
];

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 16,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    marginHorizontal: 24,
    alignItems: "center",
  },

  btnAdd: {
    borderRadius: 30,
  },
  option: {
    flexDirection: "row",
  },
  linearBtn: {
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
  },
  leftView: {
    justifyContent: "space-between",
  },
  btn: {
    height: 22,
    borderRadius: 16,
    width: 70,
    backgroundColor: "color-primary-100",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  image: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
  },
});
const COLORS_ACTIVE = ["rgba(19, 51, 116, 1)", "rgba(81, 145, 240, 1)"];
const COLORS_INACTIVE = ["transparent", "transparent"];
