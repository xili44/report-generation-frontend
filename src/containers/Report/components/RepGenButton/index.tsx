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
      await (
        await fetch(`http://127.0.0.1:8001/api/genome/${patientId}`, {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            Authorization: "Basic SuperUser:SYS",
          },
        })
      ).json();
    return response.data.detectedGenes;
  };
  const getPharmacogenomicsData = async (genomes: string[]) => {
    const data = JSON.stringify({ detectedGenes: genomes });
    const response: { data: IPharmacogenomics[]; success: boolean } = await (
      await fetch(
        `http://127.0.0.1:8001/api/pharmacogenomics/get-pharmacogenomics-from-genome/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Basic SuperUser:SYS",
          },
          body: data,
        }
      )
    ).json();
    return response.data;
  };
  const generatePDF = async (patient: IPatient) => {
    const doc = <MainPdfDocument patient={patient} />;
    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setIsModalOpen(true);
  };
  return (
    <Link href={`/report/download/${patientSelected?.id}`}>
      <Button type="primary" disabled={patientSelected == undefined}>
        Generate Report
      </Button>
    </Link>
  );
};

export default RepGenButton;
