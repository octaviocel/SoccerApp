import React, { memo, useEffect, useState } from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import useLayout from "../../../hoooks/useLayout";
import AnimatedAppearance from "../../../components/AnimatedAppearance";
import Text from "../../../components/Text";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { getAdminLeague } from "../../../service/LigasService";
import { ActivityIndicator } from "react-native-paper";
import { Images } from "../../../assets/images";
import {
  NavigationProp,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { AppParamList } from "../../../navigation/type";

interface Props {
  id: number;
  title: string;
  image: any;
}
interface DataProps {
  cambio: boolean;
}

const TabCourse = memo((cambio: { cambio: boolean }) => {
  const { height, width, top, bottom } = useLayout();

  const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { ligasAdmin, fetched } = useSelector(
    (state: RootState) => state.ligas
  );

  const [loading, setLoading] = useState(false);

  // Dentro de tu componente de pantalla
  const isFocused = useIsFocused();

  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [collection, setCollection] = React.useState(1);

  useEffect(() => {
    //setCollection(1);
    //refreshing ? getLigasAdmin() : null;
    //setRefreshing(false);
    if (isFocused) {
      getLigasAdmin();
    }
  }, [isFocused]);

  const getLigasAdmin = () => {
    if (currentUser) {
      setLoading(true);
      dispatch(getAdminLeague(currentUser.id));
      setLoading(false);
    }
  };

  return (
    <AnimatedAppearance>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="yellow"
          style={{ height: 500 }}
        />
      ) : (
        <>
          <View style={styles.course}>
            {ligasAdmin.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.7}
                  onPress={() => navigate("LeagueAdmin", { value: item })}
                >
                  <ImageBackground
                    source={item.foto ? { uri: item.foto } : Images.liga}
                    style={{
                      width: 159 * (width / 375),
                      height: 128 * (height / 812),
                      marginBottom: 8,
                      padding: 20,
                    }}
                    imageStyle={{
                      borderRadius: 16,
                      // borderWidth: 4,
                      // borderColor: theme["color-primary-100"],
                    }}
                  >
                    {/* {collection === i ? (
                  <Icon pack="assets" name="exclude" />
                ) : null}
                <Text category="call-out" style={styles.textCollection}>                  
                  {item.title}
                </Text> */}
                  </ImageBackground>
                  <Text
                    category="call-out"
                    style={{ color: theme["color-primary-100"] }}
                  >
                    {item.nombre}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </AnimatedAppearance>
  );
});

export default TabCourse;

const themedStyles = StyleService.create({
  course: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
  textCollection: {
    bottom: 5,
    left: 10,
    position: "absolute",
    color: "black",
  },
});
