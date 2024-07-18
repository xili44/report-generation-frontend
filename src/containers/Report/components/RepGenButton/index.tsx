"use client";
import React from "react";
import { Button } from "antd";
import MainPdfDocument from "../MainPdfDocument";
import { pdf } from "@react-pdf/renderer";
import Link from "next/link";
type RepGenButtonType = {
  patientSelected: IPatient | undefined;
  setIsModalOpen: (isOpen: boolean) => void;
  setPdfUrl: (url: string) => void;
};
const RepGenButton: React.FC<RepGenButtonType> = ({
  patientSelected,
  setIsModalOpen,
  setPdfUrl,
}) => {
  const getPatientGenomes = async (patientId: number) => {
    const response: { data: { detectedGenes: string[] }; success: boolean } =
      await (await fetch(`http://127.0.0.1:5000/genome/${patientId}`)).json();
    return response.data.detectedGenes;
  };
  const getPharmacogenomicsData = async (genomes: string[]) => {
    const data = JSON.stringify({ detectedGenes: genomes });
    const response: { data: IPharmacogenomics[]; success: boolean } = await (
      await fetch(`http://127.0.0.1:5000/pharmacogenomics`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      })
    ).json();
    return response.data;
  };
  const generatePDF = async (patient: IPatient) => {
    const genomes = await getPatientGenomes(patient.ID);
    const pharmacogenomicsData = await getPharmacogenomicsData(genomes);
    const doc = (
      <MainPdfDocument
        patient={patient}
        genomes={genomes}
        pharmacogenomicsData={pharmacogenomicsData}
      />
    );
    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setIsModalOpen(true);
  };
  return (
    <Link href={`/report/download/${patientSelected?.ID}`}>
      <Button type="primary" disabled={patientSelected == undefined}>
        Generate Report
      </Button>
    </Link>
  );
};

export default RepGenButton;
