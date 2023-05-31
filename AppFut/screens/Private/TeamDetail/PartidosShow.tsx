import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { ScrollView, View } from "react-native";
import AnimatedAppearance from "../../../components/AnimatedAppearance";
import ProgressSchedule from "../Component/ProgressSchedule";

const PartidosShow = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      style={{ flex: 1, marginBottom: 500 }}
    >
      <View style={styles.container}>
        <AnimatedAppearance>
          <ProgressSchedule
            step={3}
            timeStep={["Jornada 1", "Jornada 2", "Jornada 3",]}
          />
        </AnimatedAppearance>
      </View>
    </ScrollView>
  );
};

export default PartidosShow;

const themedStyles = StyleService.create({
  container: {
    marginTop: 16,
    flexDirection: "row",
    flex: 1,
  },
});
