import React, { memo, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";

import Text from "../../../components/Text";
//import { Crypto_Types_Enum } from "constants/Type";
import MarketItem from "../Component/MarketItem";
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { AppParamList } from "../../../navigation/type";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllLigas, getAllLigasLimit } from "../../../service/LigasService";
import { getEquipoLiga } from "../../../service/EquipoService";

enum Crypto_Types_Enum {
  Grow = "grow",
  Down = "down",
}

const ShowEquipo = (values: { liga: number }) => {
  const styles = useStyleSheet(themedStyles);

  const dispatch = useDispatch<AppDispatch>();

  const { equipoLiga, fetched } = useSelector(
    (state: RootState) => state.equipos
  );

  const { navigate } = useNavigation<NavigationProp<AppParamList>>();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getEquiposLiga();
    }
  }, [isFocused, navigate]);

  const getEquiposLiga = () => {
    dispatch(getEquipoLiga(values.liga));
  };

  //console.log(ligas);
  return (
    <>
      {fetched ? (
        <View style={styles.container}>
          {/* <View style={styles.title}>
            <Text category="title2">Ligas</Text>
            <View style={styles.hour}>
              <Text status={"primary"} category="subhead" marginRight={4}>
                Ver todas
              </Text>
              <Icon pack="assets" name="arrow" style={styles.arrow} />
            </View>
          </View> */}
          {equipoLiga.map((item, i) => {
            return (
              <TouchableOpacity
              onPress={() => navigate("TeamDetail", { value: item })}
              >
                <View style={styles.item2} key={item.id}>
                  <View style={styles.state}>
                    <Layout style={styles.iconLogo} level={"2"}>
                      {/*
                  PONER LA IMAGEN
                  <Icon pack="assets" name={item.icon} style={{}} /> */}
                      <Image
                        source={{ uri: item.logo ? item.logo : "" }}
                        style={{
                          width: 40,
                          height: 40,
                          //marginBottom: 16,
                          borderRadius: 99,
                        }}
                      />
                    </Layout>
                    <View>
                      <Text category="headline">{item.nombre}</Text>
                      <Text
                        category="caption1"
                        uppercase
                        status={"placeholder"}
                      >
                        D.T. {item.entrenador}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rightItem}>
                    <Text category="headline">{item.estadio}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShowEquipo;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  hour: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    width: 12,
    height: 12,
  },
  item: {
    marginHorizontal: 24,
  },
  iconLogo: {
    width: 40,
    height: 40,
    marginBottom: 16,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  item2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  state: {
    flexDirection: "row",
  },
  rightItem: {
    alignItems: "flex-end",
  },
});
