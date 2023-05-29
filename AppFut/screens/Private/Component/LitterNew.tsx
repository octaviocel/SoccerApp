import React, { memo, useEffect, useState } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
import useLayout from "../../../hoooks/useLayout";
import Text from "../../../components/Text";
import S3Service from "../../../service/S3Service";

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
}

const LitterNew = memo(({ item }: ItemProps) => {
  const [src, setSrc] = useState("");
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const SIZE = 76 * (width / 375);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const { url } = await S3Service.get(item.foto);
    //console.log(url);
    setSrc(url);
  };

  return (
    <View style={styles.item}>
      <Image
        source={{ uri: src }}
        /* @ts-ignore */
        style={[styles.image, { width: SIZE, height: SIZE }]}
      />
      <View>
        <Text
          category="headline"
          marginBottom={8}
          maxWidth={235 * (width / 375)}
        >
          {item?.nombre}
        </Text>
        <View style={styles.timer}>
          <Icon pack="assets" name="time" style={styles.icTime} />
          <Text category="subhead" status={"placeholder"}>
            Fundada{" "}
            {item?.fechaFundacion
              ?.split("T")[0]
              .toString()
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("-")}
          </Text>
        </View>
        <View style={styles.timer}>
          <Text category="subhead" status={"placeholder"}>
            Ubicada: {item?.ubicacion}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default LitterNew;

const themedStyles = StyleService.create({
  item: {
    flexDirection: "row",
    marginBottom: 16,
    marginHorizontal: 24,
  },
  icTime: {
    width: 20,
    height: 20,
    tintColor: "text-placeholder-color",
  },
  timer: {
    flexDirection: "row",
  },
  image: {
    borderRadius: 16,
    marginRight: 16,
  },
});
