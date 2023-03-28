import React, { memo, useEffect } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";

import Text from "../../../components/Text";
//import { Crypto_Types_Enum } from "constants/Type";
import MarketItem from "../Component/MarketItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppParamList } from "../../../navigation/type";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllLigas, getAllLigasLimit } from "../../../service/LigasService";

enum Crypto_Types_Enum {
  Grow = "grow",
  Down = "down",
}

const Market = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const dispatch = useDispatch<AppDispatch>();

  const { ligasPreview, fetched } = useSelector((state: RootState) => state.ligas);

  const { navigate } = useNavigation<NavigationProp<AppParamList>>();

  useEffect(() => {
    getLigas()
  }, [dispatch]);

  const getLigas=  ()=>{
    dispatch(getAllLigasLimit());
  }

  //console.log(ligas);
  return (
    <>
      {fetched ? (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text category="title2">Ligas</Text>
            <View style={styles.hour}>
              <Text status={"primary"} category="subhead" marginRight={4}>
                Ver todas
              </Text>
              <Icon pack="assets" name="arrow" style={styles.arrow} />
            </View>
          </View>
          {ligasPreview.map((item, i) => {
            return (
              <MarketItem
                item={item}
                key={i}
                style={styles.item}
                _onPres={() => navigate(`DetailTableLeague`, { value: item.id })}
              />
            );
          })}
        </View>
      ) : (
        <></>
      )}
    </>
  );
});

export default Market;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
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
});
