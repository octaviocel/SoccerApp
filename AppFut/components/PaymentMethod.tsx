import React, { memo } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageRequireSource,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Input,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "../hoooks/useLayout";
import Text from "./Text";
import SelectBox from "./SelectBox";

interface Props {
  id: number;
  title: string;
  logo: ImageRequireSource;
}

interface PaymentMethodProps {
  selectedIndex: number;
  onChange(index: number): void;
  onAdd?(): void;
  data: Props[];
}

const PaymentMethod = memo(
  ({ onAdd, onChange, selectedIndex, data }: PaymentMethodProps) => {
    const { goBack } = useNavigation();
    const { height, width, top, bottom } = useLayout();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const changeIndex = React.useCallback(
      (i: number) => {
        return onChange(i);
      },
      [selectedIndex]
    );
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text category="title3">💰 Método de Pago</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onAdd}>
            <Layout level={"7"} style={styles.btnAdd}></Layout>
          </TouchableOpacity>
        </View>
        <Layout style={styles.content} level={"7"}>
          {data.map((item, i) => {
            return (
              <>
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.button,
                    { borderBottomWidth: i !== data.length - 1 ? 1 : 0 },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => changeIndex(i)}
                >
                  <View style={styles.option}>
                    <Image
                      source={item.logo}
                      /* @ts-ignore */
                      style={styles.logo}
                    />
                    <Text category="headline" marginLeft={8}>
                      {item.title}
                    </Text>
                  </View>
                  <SelectBox selected={i === selectedIndex} />
                </TouchableOpacity>
                {i === 0 && selectedIndex ===0 ? (
                  <View style={styles.cardDetails}>
                    <Text category="title3" marginBottom={24} marginTop={32}>
                      💰 Detalles de Tarjeta
                    </Text>
                    <Input placeholder="Ricardo Chavez" style={styles.cardName} />
                    <Input placeholder="1234 5678 9102 3456" />
                    <View style={styles.footer}>
                      <Input placeholder="***" style={styles.cvc} />
                      <Input placeholder="05/30" style={styles.date} />
                    </View>
                  </View>
                ) : null}
              </>
            );
          })}
        </Layout>
      </View>
    );
  }
);

export default PaymentMethod;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  cardDetails: {
    marginHorizontal: 24,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cvc: {
    flex: 1,
    marginRight: 11,
  },
  date: {
    flex: 1,
  },
  cardName: {
    marginBottom: 12,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  btnAdd: {
    borderRadius: 30,
  },
  logo: {
    width: 40,
    height: 40,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderColor: "rgba(123, 135, 148, 0.2)",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: "rgba(123, 135, 148, 0.2)",
    backgroundColor: "rgba(62, 76, 89, 0.2)",
  },
});
