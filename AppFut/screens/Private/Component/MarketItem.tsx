import React, { memo, useEffect, useState } from "react";
import {
  Image,
  StyleProp,
  Touchable,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "../../../components/Text";
import S3Service from "../../../service/S3Service";
//import { Crypto_Types_Enum } from "constants/Type";

enum Crypto_Types_Enum {
  Grow = "grow",
  Down = "down",
}

interface Props {
  id: number;
  nombre: string;
  foto: string;
  ubicacion: string;
  fechaFundacion: string;
  //status: Crypto_Types_Enum;
  // price: string;
  totalEquipos: string | number;
}
interface ItemProps {
  item: Props;
  style?: StyleProp<ViewStyle>;
  _onPres?: () => void;
}

const MarketItem = memo(({ item, style, _onPres }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const [src, setSrc] = useState("");

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const { url } = await S3Service.get(item.foto);
    //console.log(url);
    setSrc(url);
  };
  return (
    <TouchableOpacity onPress={_onPres}>
      <View style={[styles.item, style]}>
        <View style={styles.state}>
          <Layout style={styles.iconLogo} level={"2"}>
            {/*
            PONER LA IMAGEN
            <Icon pack="assets" name={item.icon} style={{}} /> */}
            <Image
              source={{ uri: src ? src : "" }}
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
            <Text category="caption1" uppercase status={"placeholder"}>
              {item.ubicacion}
            </Text>
          </View>
        </View>
        <View style={styles.rightItem}>
          <Text category="headline">
            {item.fechaFundacion
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("-")}
          </Text>
          <Text status={"green"} category="caption1">
            Equipos{" "}
            <Text status={"green"} category="caption1">
              {item.totalEquipos}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default MarketItem;

const themedStyles = StyleService.create({
  iconLogo: {
    width: 40,
    height: 40,
    marginBottom: 16,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  item: {
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
