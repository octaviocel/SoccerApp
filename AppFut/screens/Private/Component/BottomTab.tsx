import React, { memo, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "../../../hoooks/useLayout";
import Homepage from "../Homepage";

import * as SecureStore from "expo-secure-store";

import { Images } from "../../../assets/images";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppParamList } from "../../../navigation/type";

interface Props {
  selectIndex?: number;
}

const BottomTab = memo(({ selectIndex }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [activeTab, setActiveTab] = React.useState(selectIndex);

  const DATA = [
    {
      id: 1,
      icon: "barChart1",
      navega: () => navigate("HomePage"),
    },
    {
      id: 2,
      icon: "exchange",
      navega: () => navigate("MenuLeague"),
    },
    { id: 3, icon: "logo", navega: () => navigate("Games") },
    { id: 4, icon: "search", navega: () => navigate("HomePage") },
    { id: 5, icon: "user", navega: () => navigate("Profile") },
  ];

  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();

  

  return (
    <Layout style={[styles.container, { paddingBottom: bottom }]} level={"2"}>
      <View style={styles.content}>
        {DATA.map((item, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={i}
              onPress={() => {
                //setSecure(i);
                item.navega();
              }}
            >
              {item.icon === "logo" ? (
                <Image
                  source={Images.futbol}
                  /* @ts-ignore */
                  style={styles.logo}
                />
              ) : (
                <Icon
                  pack="assets"
                  name={item.icon}
                  style={[
                    {
                      tintColor:
                        selectIndex === i
                          ? theme["text-primary-color"]
                          : theme["text-snow-color"],
                    },
                    styles.icon,
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Layout>
  );
});

export default BottomTab;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 32,
    
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
  },
  icon: {
    width: 20,
    height: 20,
  },
  logo: {
    width: 24,
    height: 24,
  },
});
