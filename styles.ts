// styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  board: {
    position: "relative",
  },
  boardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  hexContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  hexagon: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  numberToken: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  controls: {
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  toggleContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#4a6741",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
