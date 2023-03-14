import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";

import Text from "../../../components/Text";
//import { Crypto_Types_Enum } from "constants/Type";
import MarketItem from "../Component/MarketItem";

enum Crypto_Types_Enum {
  Grow = "grow",
  Down = "down",
}

const Market = memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
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
      {DATA.map((item, i) => {
        return <MarketItem item={item} key={i} style={styles.item} />;
      })}
    </View>
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
const DATA = [
  {
    id: 1,
    title: "Premier League",
    icon: "premier",
    coin: "Ocotlan",
    percent: "Equipos",
    status: Crypto_Types_Enum.Grow,
    price: "Actualmente",
    exchange: 18,
  },
  {
    id: 0,
    title: "Liga de barro",
    icon: "aque",
    coin: "San Felipe",
    percent: "Equipos",
    status: Crypto_Types_Enum.Grow,
    price: "Actualmente",
    exchange: 10,
  },
  {
    id: 2,
    title: "Liga Mx",
    icon: "liga",
    coin: "xoxocotlan",
    percent: "Equipos",
    status: Crypto_Types_Enum.Grow,
    price: "Actualmente",
    exchange: 21,
  },
  {
    id: 3,
    title: "Serie A",
    icon: "liga1",
    coin: "San martin",
    percent: "Equipos",
    status: Crypto_Types_Enum.Grow,
    price: "Actualmente",
    exchange: 13,
  },
  {
    id: 4,
    title: "Liga Esapñola",
    icon: "serieA",
    coin: "Santa Rosa",
    percent: "Equipos",
    status: Crypto_Types_Enum.Grow,
    price: "Actualmente",
    exchange: 43,
  },
];
