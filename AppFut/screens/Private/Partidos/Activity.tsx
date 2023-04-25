import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
import Text from "../../../components/Text";
import ActivityCard from "./ActivityCars";
import PartidoPen from "../../../models/PartidoPen";

interface DataCardProps {
  title: string;
  value: string | number;
}
interface DataProps {
  id: number;
  avatar: any;
  name: string;
  amount: number;
  data: DataCardProps[];
}
interface Props {
  data: PartidoPen;
  title: string;
}

const Activity = memo(({ data, title }: Props) => {
  const styles = useStyleSheet(themedStyles);
  const [dataInput, setDataInput] = React.useState(data);
  return (
    <>
      <View style={styles.title}>
        <Text category="title4">
          {title.substring(0, 10).split("-").reverse().join("-")}
        </Text>
        {/* <TouchableOpacity style={styles.btnDelete}>
          <Text category="caption1" status={"snow"} marginRight={4}>
            Delete all
          </Text>
          <Icon pack="assets" name="cancel" style={styles.iconCancel} />
        </TouchableOpacity> */}
      </View>
      <ActivityCard data={data} key={data.id} />
    </>
  );
});

export default Activity;

const themedStyles = StyleService.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconCancel: {
    width: 12,
    height: 12,
    tintColor: "text-snow-color",
  },
  btnDelete: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "background-basic-color-2",
    borderRadius: 4,
  },
});