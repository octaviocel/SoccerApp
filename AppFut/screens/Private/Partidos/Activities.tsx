import React, { memo, useEffect } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";

import Text from "../../../components/Text";
import Content from "../../../components/Content";
import Container from "../../../components/Container";
import NavigationAction from "../../../components/NavigationAction";
import BottomTab from "../Component/BottomTab";
import Activity from "./Activity";
import { Images } from "../../../assets/images";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { getPartidosPendientes } from "../../../service/PartidosService";
import PartidoPen from "../../../models/PartidoPen";

const Activities = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const dispatch = useDispatch<AppDispatch>();

  const { partidos, fetched } = useSelector(
    (state: RootState) => state.partidos
  );

  const [dataToday, setDataToday] = React.useState(DATA_TODAY);
  const [data12, setData12] = React.useState(DATA_12);

  useEffect(() => {
    getPartidos();
  }, [dispatch]);

  const getPartidos = () => {
    dispatch(getPartidosPendientes());
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.header}
        title={"Proximos Partidos"}
        //accessoryLeft={<NavigationAction icon="undo" status="opacity" />}
        //accessoryRight={<NavigationAction icon="calendar" status="opacity" />}
      />
      <Content contentContainerStyle={styles.content}>
        {partidos.map((partido, i) => {
          return <Activity key={i} title={partido.fecha.toString()} data={partido} />;
        })}
        
      </Content>
      <BottomTab selectIndex={2} />
    </Container>
  );
});

export default Activities;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingVertical: 36,
    marginHorizontal: 24,
  },
  header: {
    borderBottomColor: "color-basic-1500",
    borderBottomWidth: 1,
  },
});
const DATA_TODAY = [
  {
    id: 0,
    avatar: Images.avatar0,
    name: "Christian Roger",
    amount: 4261.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "Transaction Date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "Trading Pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "Worth", value: 4261.67 },
    ],
  },
  {
    id: 1,
    avatar: Images.avatar2,
    name: "Alex Turboe",
    amount: -280.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "worth", value: 4261.67 },
    ],
  },
  {
    id: 2,
    avatar: Images.avatar3,
    name: "Flex Adameith",
    amount: 4261.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "worth", value: 4261.67 },
    ],
  },
];
const DATA_12 = [
  {
    id: 0,
    avatar: Images.avatar0,
    name: "Christian Roger",
    amount: 4261.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "Transaction Date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "Trading Pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "Worth", value: 4261.67 },
    ],
  },
  {
    id: 1,
    avatar: Images.avatar2,
    name: "Alex Turboe",
    amount: -280.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "worth", value: 4261.67 },
    ],
  },
  {
    id: 2,
    avatar: Images.avatar3,
    name: "Flex Adameith",
    amount: 4261.67,
    data: [
      { title: "Amount Bought", value: "0.234 BTC" },
      { title: "date", value: "12/06/2020" },
      { title: "Amount Sold", value: "0.234 BTC" },
      { title: "pair", value: "BBTC / USDT" },
      { title: "Cost", value: 3889.49 },
      { title: "worth", value: 4261.67 },
    ],
  },
];
