import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";
import Container from "../../../components/Container";

const LoadingComponent = memo(() => {
  return (
    <Container style={styles.container} useSafeArea={false}>
      <Layout style={styles.container} level="1">
        <Spinner size="giant" />
      </Layout>
    </Container>
  );
});

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent:'center',
    alignItems: "center",
    //flexWrap: "wrap",
  },
});
