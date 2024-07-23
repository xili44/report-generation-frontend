"use client";
import { NextPage } from "next";
import ReportContentContainer from "@/containers/ReportContent";
import { useEffect, useState } from "react";
import authorization from "@/constants/authorization";
const DownloadPage: NextPage<{ params: { patientId: number } }> = ({
  params,
}) => {
  const [patient, setPatient] = useState<IPatient>();
  const [genomes, setGenomes] = useState<string[]>([]);
  const [pharmacogenomicsData, setPharamcogenomicsData] = useState<
    IPharmacogenomics[]
  >([]);
  const getPatient = async (patientId: number) => {
    const response: IPatient = await (
      await fetch(`http://localhost:8001/api/patients/${patientId}`)
    ).json();
    setPatient(response);
  };
  const getPatientGenomes = async (patientId: number) => {
    const response: { detectedGenes: string[] } = await (
      await fetch(`http://localhost:8001/api/genomes/${patientId}`)
    ).json();
    setGenomes(response.detectedGenes);
    return response.detectedGenes;
  };
  const getPharmacogenomicsData = async (genomes: string[]) => {
    const data = JSON.stringify({ detectedGenes: genomes });
    const response: { data: IPharmacogenomics[] } = await (
      await fetch(
        `http://127.0.0.1:8001/api/pharmacogenomics/get-pharmacogenomics-from-genome/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: data,
        }
      )
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
