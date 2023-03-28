import React from "react";
import Container from "../../../components/Container";
import { FlatList, Image, View } from "react-native";
import BasicHeader from "../Component/BasicHeader";
import BottomTab from "../Component/BottomTab";
import { useNavigation, useTheme } from "@react-navigation/native";
import useLayout from "../../../hoooks/useLayout";
import {
  Button,
  Icon,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import { useScreenDimensions } from "../../../hoooks/useScreenDimensions";
import { Table, Row } from "react-native-table-component";
import { StyleSheet } from "react-native";
import { RotationHint } from "./RotationHint";
import Text from "../../../components/Text";
import NavigationAction from "../../../components/NavigationAction";
import ReadMore from "../../../components/ReadMore";

interface Props {
  value?: number;
}

// Table header items
const head = ["Equipo", "PJ", "V", "E", "D", "Pts"];

// Table data rows
const data = [
  ["El barrio", "4", "2", "1", "5", "54"],
  ["PIO FC", "9", "3", "1", "3", "30"],
  ["Ultimate FC", "3", "2", "1", "4", "42"],
  ["Porcinos", "10", "4", "1", "5", "14"],
  ["1K", "6", "3", "1", "1", "15"],
];

// Indices (columns) to include on a small screen
export const smallScreenIndices = [0, 1, 2, 3, 4, 5];

// Indices to include on a medium screen
export const mediumScreenIndices = [0, 1, 2, 4, 5];

export const TableResponsive: React.FunctionComponent<Props> = (props) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const keyExtractor = (item: any, index: number) => index.toString();

  const SIZE_PIG = 195.97 * (width / 375);

  const breakpoint = useBreakpoint();

  return (
    <Container style={styles.container}>
      <Image
        /* @ts-ignore */
        style={[styles.bg, { width: width, height: height / 2 }]}
      />
      <TopNavigation
        style={styles.header}
        title={""}
        accessoryLeft={<NavigationAction icon="undo" status="opacity" />}
        //accessoryRight={<NavigationAction icon="settings" status="opacity" />}
      />

      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        renderItem={() => (
          <>
            <View style={styles.title}>
              {/* <Image
                source={Images.safeMoney}
                resizeMode="center"
                style={{
                  width: SIZE_PIG,
                  height: SIZE_PIG,
                  position: "absolute",
                  right: -8,
                  top: -16,
                  transform: [{ rotateZ: "3deg" }],
                }}
              /> */}
              <Icon
                pack="assets"
                name="premier"
                resizeMode="center"
                style={{
                  width: SIZE_PIG,
                  height: SIZE_PIG,
                  position: "absolute",
                  right: -8,
                  top: -16,
                  transform: [{ rotateZ: "3deg" }],
                }}
              />

              <View>
                <Text
                  marginLeft={24}
                  marginTop={16}
                  category="title3"
                  marginRight={120}
                >
                  Premier League
                </Text>
                {/* <Button
                  children={() => (
                    <Text category="subhead" status={"black"}>
                      Learn more
                    </Text>
                  )}
                  style={styles.learnMore}
                  size={"44"}
                /> */}
                <View style={styles.learnMore}></View>
              </View>
            </View>
            <Table style={styles.table}>
              {/* Header row */}
              <Row
                data={reduceDataForScreenSize(
                  head,
                  breakpoint,
                  smallScreenIndices,
                  mediumScreenIndices
                )}
                style={styles.head}
                textStyle={styles.text}
              />

              {/* Data rows */}
              {data.map((entry, index) => (
                <Row
                  key={index}
                  data={reduceDataForScreenSize(
                    entry,
                    breakpoint,
                    smallScreenIndices,
                    mediumScreenIndices
                  )}
                  style={styles.dataRow}
                  textStyle={styles.text}
                />
              ))}
            </Table>
            <Text
              category="title4"
              marginBottom={4}
              marginLeft={24}
              fontFamily="Overpass-Bold"
            >
              Sobre la liga
            </Text>
            <ReadMore
              children={DESCRIPTION}
              marginHorizontal={24}
              marginBottom={32}
            />
          </>
        )}
      />
      <BottomTab />
    </Container>
  );
};
const DESCRIPTION = `Wales typed the words "Hello, World!" after launching Wikipedia on January 15, 2001, and the moment has been immortalized in an NFT that sold for $750,000 at Christie's on Wednesday wales the auction house said in a statement.
An NFT is a piece of digital content linked to the blockchain, the digital database underpinning cryptocurrencies such as bitcoin and ethereum.
They transform digital works of art and other collectibles into one-of-a-kind, verifiable assets that are easy to trade on the blockchain, and have seen a huge spike of interest in the art world.`;


const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  title: {
    marginTop: 8,
    marginBottom: 20,
  },
  topContent: {
    height: 48,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  learnMore: {
    width: 104,
    marginLeft: 24,
    marginTop: 8,
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    marginTop: 30,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dataRow: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    margin: 6,
    fontSize: 14,
    textAlign: "center",
  },
  header: {
    borderBottomColor: "color-basic-1500",
    //borderBottomWidth: 1,
  },
});

export enum Breakpoint {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export function reduceDataForScreenSize(
  data: any[],
  breakpoint: Breakpoint,
  smallBreakpointIndices: number[],
  mediumBreakpointIndices: number[]
) {
  switch (breakpoint) {
    case Breakpoint.SMALL:
      // Return only data in the smallBreakpointIndices
      return data.filter((_, i) => smallBreakpointIndices.indexOf(i) !== -1);
    case Breakpoint.MEDIUM:
      // Return only data in the mediumBreakpointIndices
      return data.filter((_, i) => mediumBreakpointIndices.indexOf(i) !== -1);
    default:
      // Don't filter the data at all
      return data;
  }
}

export function useBreakpoint(): Breakpoint {
  const { width } = useScreenDimensions();
  //console.log(`Determining device breakpoint for width: ${width}`);

  if (width < 500) {
    //console.log(`= Breakpoint.SMALL`);
    return Breakpoint.SMALL;
  } else if (width >= 500 && width < 1000) {
    //console.log(`= Breakpoint.MEDIUM`);
    return Breakpoint.MEDIUM;
  } else {
    // console.log(`= Breakpoint.LARGE`);
    return Breakpoint.LARGE;
  }
}
