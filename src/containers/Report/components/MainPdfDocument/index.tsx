import React from "react";
import { Page, Text, Image, Font, View, Document } from "@react-pdf/renderer";
import styles from "./styles";

type MainPdfDocumentPropsType = {
  patient: IPatient;
};
const MainPdfDocument: React.FC<MainPdfDocumentPropsType> = ({ patient }) => {
  const getPatientInfoElement = (label: string, data: string) => {
    return (
      <View style={styles.patient_info_element}>
        <Text>{label}: </Text>
        <Text>{data}</Text>
      </View>
    );
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.top_section}>
          <Text style={styles.header}>BH MedGene</Text>
          <Text style={styles.subheader}>Personalized Medicine Report</Text>
          <Image src="cover_img.png" />
        </View>
        <View style={styles.patient_info_section}>
          <View style={styles.patient_info_col}>
            {getPatientInfoElement("Patient Name", patient.name)}
            {getPatientInfoElement("HN", patient.HN)}
            {getPatientInfoElement("Date of Birth", patient.DOB)}
            {getPatientInfoElement("Gender", patient.gender)}
            {getPatientInfoElement("Ordered By", patient.orderedBy)}
          </View>
          <View style={styles.patient_info_col}>
            {getPatientInfoElement(
              "Hospital Name/Clinic",
              "Bumrumgrad Internaltional Hospital"
            )}
            {getPatientInfoElement("Date of Order", patient.dateOfOrder)}
            {getPatientInfoElement("Date Of Report", patient.dateOfReport)}
            {getPatientInfoElement("Ethinicity", patient.ethnicity)}
          </View>
        </View>
        <View style={styles.remark_section}>
          <Text>
            Remark: Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry&apos;s
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MainPdfDocument;
