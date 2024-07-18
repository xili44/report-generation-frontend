import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    gap: "10px",
    padding: "10px",
  },
  top_section: {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    gap: "15px",
  },
  header: {
    fontSize: "32px",
    color: "#80643a",
  },
  subheader: {
    fontSize: "24px",
    color: "#80643a",
  },
  patient_info_section: {
    width: "97%",
    display: "flex",
    flexDirection: "row",
    gap: "100px",
    fontSize: "10px",
    paddingHorizontal: "10px",
    paddingTop: "50px",
    margin: 20,
    position: "absolute",
    top: "400px",
    backgroundColor: "#edeff1"
},
  patient_info_col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "8px"
  },
  patient_info_element: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
  },
  remark_section: {
    width: "97%",
    fontSize: "10px",
    position: "absolute",
    top: "540px",
    backgroundColor: "#edeff1",
    margin: 20,
    padding: 10,
  }
});

export default styles;