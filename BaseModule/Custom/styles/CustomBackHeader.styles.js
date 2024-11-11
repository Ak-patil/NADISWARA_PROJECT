import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 72,
    paddingBottom: 16,
    width: "100%",
  },

  backIconWrapper: {
    borderWidth: 1,
    borderColor: "#E1E2E5",
    marginRight: 64,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  text: { fontSize: 20 },

  cartRed: {
    width: 10,
    height: 10,
    backgroundColor: "#FF6464",
    position: "absolute",
    borderRadius: 50,
    right: 0,
    top: 0,
    zIndex: 5,
  },
});
