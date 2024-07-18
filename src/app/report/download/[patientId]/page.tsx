"use client";
import { NextPage } from "next";
import ReportContentContainer from "@/containers/ReportContent";
import { useEffect, useState } from "react";
const DownloadPage: NextPage<{ params: { patientId: number } }> = ({
  params,
}) => {
  const [patient, setPatient] = useState<IPatient>();
  const [genomes, setGenomes] = useState<string[]>([]);
  const [pharmacogenomicsData, setPharamcogenomicsData] = useState<
    IPharmacogenomics[]
  >([]);
  const getPatient = async (patientId: number) => {
    const response: { data: IPatient; success: boolean } = await (
      await fetch(`http://127.0.0.1:5000/patient/${patientId}`)
    ).json();
    setPatient(response.data);
  };
  const getPatientGenomes = async (patientId: number) => {
    const response: { data: { detectedGenes: string[] }; success: boolean } =
      await (await fetch(`http://127.0.0.1:5000/genome/${patientId}`)).json();
    setGenomes(response.data.detectedGenes);
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
    setPharamcogenomicsData(response.data);
    return response.data;
  };
  const loadPdf = async (id: number) => {
    await getPatient(id);
    const genomesRes = await getPatientGenomes(id);
    await getPharmacogenomicsData(genomesRes);
  };
  useEffect(() => {
    loadPdf(params.patientId);
  }, []);
  return (
    <div>
      <ReportContentContainer
        patient={patient as IPatient}
        genomes={genomes}
        pharmacogenomicsData={pharmacogenomicsData}
      />
    </div>
  );
};

export default DownloadPage;
