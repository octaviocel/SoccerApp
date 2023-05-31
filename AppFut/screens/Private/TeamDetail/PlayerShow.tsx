import React, {useEffect} from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { Images } from "../../../assets/images";
import { ScrollView, View } from "react-native";
import ReviewItem from "../Component/ReviewItem";
import Content from "../../../components/Content";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { AppParamList } from "../../../navigation/type";
import { getJugadores } from "../../../service/JugadorService";

const PlayerShow = (values: {equipo: number}) => {
  const styles = useStyleSheet(themedStyles);

  const dispatch = useDispatch<AppDispatch>();

  const { jugadoresEquipo, fetched } = useSelector(
    (state: RootState) => state.jugadores
  );

  const isFocused = useIsFocused();

  const { navigate } = useNavigation<NavigationProp<AppParamList>>();


  useEffect(() => {
    if (isFocused) {
      getEquiposLiga();
    }
  }, [isFocused, navigate]);

  const getEquiposLiga = () => {
    dispatch(getJugadores(values.equipo));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      style={{ flex: 1, marginBottom: 500 }}
    >
      <View style={styles.container}>
        {jugadoresEquipo.map((item, _) => {
          return <ReviewItem item={item} key={_} />;
        })}
      </View>
    </ScrollView>
  );
};

export default PlayerShow;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});
const DATA = [
  {
    id: 0,
    avatar: Images.avatar0,
    name: "John Beckham",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 4,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a specimen book unknown printer. ”",
  },
  {
    id: 1,
    avatar: Images.avatar1,
    name: "Alex Dumino",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 5,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a t specimen book unknown printer. ”",
  },
  {
    id: 2,
    avatar: Images.avatar2,
    name: "Alex Smith",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 5,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a t specimen book unknown printer. ”",
  },
  {
    id: 0,
    avatar: Images.avatar0,
    name: "John Beckham",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 4,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a specimen book unknown printer. ”",
  },
  {
    id: 1,
    avatar: Images.avatar1,
    name: "Alex Dumino",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 5,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a t specimen book unknown printer. ”",
  },
  {
    id: 2,
    avatar: Images.avatar2,
    name: "Alex Smith",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 5,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a t specimen book unknown printer. ”",
  },
];
