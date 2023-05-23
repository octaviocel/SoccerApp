import React, { memo } from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
} from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Icon,
  Layout,
  Datepicker,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Text from "../../../components/Text";
import Content from "../../../components/Content";
import Container from "../../../components/Container";
import { Images } from "../../../assets/images";
import ButtonText from "../../../components/ButtonText";
//import { SignIn01_Data } from "./SignIn01";
import useLayout from "../../../hoooks/useLayout";
import BottomTab from "../Component/BottomTab";
import { AppParamList } from "../../../navigation/type";
import { DataTable } from 'react-native-paper';


const optionsPerPage = [2, 3, 4];
export default function TableEstadisticas() {
  // const navigation = useNavigation();

  const [page, setPage] = React.useState(0);

  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        accessoryLeft={() => (
          <TouchableOpacity>
            <Image
              /*  source={Images.futbol}*/
              /* @ts-ignore */
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      />
      <Content style={styles.content}>
        <Text category="header" marginTop={36} marginRight={100}>
          Mejores Goleadores
        </Text>
        <DataTable>
          <DataTable.Header style={styles.headerRow}>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>Dessert</Text>
            </DataTable.Title>
            <DataTable.Title
              style={[styles.headerCell, { justifyContent: "flex-end" }]}
              numeric
            >
              <Text style={styles.headerText}>Calories</Text>
            </DataTable.Title>
            <DataTable.Title
              style={[styles.headerCell, { justifyContent: "flex-end" }]}
              numeric
            >
              <Text style={styles.headerText}>Fat</Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row style={styles.dataRow}>
            <DataTable.Cell style={styles.dataCell}>
              <Text style={styles.dataText}>Frozen yogurt</Text>
            </DataTable.Cell>
            <DataTable.Cell
              style={[styles.dataCell, { justifyContent: "flex-end" }]}
              numeric
            >
              <Text style={styles.dataText}>159</Text>
            </DataTable.Cell>
            <DataTable.Cell
              style={[styles.dataCell, { justifyContent: "flex-end" }]}
              numeric
            >
              <Text style={styles.dataText}>6.0</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.dataRow}>
            <DataTable.Cell style={styles.dataCell}>
              <Text style={styles.dataText}>Frozen yogurt</Text>
            </DataTable.Cell>
            <DataTable.Cell
              style={[styles.dataCell, { justifyContent: "flex-end" }]}
              numeric
            >
              <Text style={styles.dataText}>159</Text>
            </DataTable.Cell>
            <DataTable.Cell
              style={[styles.dataCell, { justifyContent: "flex-end" }]}
              numeric
            >
              <Text style={styles.dataText}>6.0</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Content>
      <BottomTab selectIndex={0} />
    </Container>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dataTable: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  headerRow: {
    backgroundColor: "#F2F2F2",
  },
  headerCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  dataRow: {
    backgroundColor: "#fff",
  },
  dataCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  dataText: {
    fontSize: 14,
    color: "#555",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  paginationText: {
    fontSize: 12,
    color: "#999",
  },
  paginationButton: {
    padding: 8,
  },
  paginationButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
  },
});
