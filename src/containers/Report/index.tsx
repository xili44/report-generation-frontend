"use client";
import React from "react";
import { useEffect, useState } from "react";
import RepGenButton from "./components/RepGenButton";
import PreviewModal from "./components/PreviewModal";
import { Select } from "antd";
const ReportContainer: React.FC = () => {
  const [allPatients, setAllPatients] = useState<IPatient[]>([]);
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [patientSelected, setPatientSelected] = useState<IPatient>({
    id: 0,
    ethnicity: "",
    name: "",
    dob: "",
    orderedBy: "",
    dateOfOrder: "",
    dateOfReport: "",
    gender: "",
    title: "",
    hn: "",
  });

  const [pdfUrl, setPdfUrl] = useState<string>("");

  const constructName = (
    title: string | undefined,
    name: string | undefined
  ) => {
    if (name) {
      return title + ". " + name;
    } else {
      return undefined;
    }
  };

  const getAllPatients = async () => {
    const result: { results: IPatient[]; count: number } = await (
      await fetch("http://localhost:8001/api/patients/?limit=1000")
    ).json();
    const res: { value: number; label: string }[] = result.results.map(
      (patient: IPatient) => {
        return { value: patient.id, label: patient.name };
      }
    );
    res.sort((a, b) => (a.label < b.label ? -1 : 1));
    setAllPatients(result.results);
    setOptions(res);
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <div className="h-screen">
      <PreviewModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        pdfUrl={pdfUrl}
      />
      <div className="px-10 h-full">
        <div className="relative h-screen flex flex-row gap-10 items-start pt-10">
          {options && (
            <Select
              className="w-80"
              options={options}
              onChange={(value) =>
                setPatientSelected(
                  allPatients.find((patient) => patient.id == value) as IPatient
                )
              }
              placeholder="Select a patient to continue"
            />
          )}
          <div className="flex flex-col gap-2">
            <div>
              <strong>Name: </strong>{" "}
              {constructName(patientSelected?.title, patientSelected?.name) ||
                "--"}
            </div>
            <div>
              <strong>DOB: </strong> {patientSelected?.dob || "--"}
            </div>
            <div>
              <strong>Ethnicity: </strong> {patientSelected?.ethnicity || "--"}
            </div>
            <div>
              <strong>HN: </strong> {patientSelected?.hn || "--"}
            </div>
            <div>
              <strong>Gender: </strong> {patientSelected?.gender || "--"}
            </div>
            <div>
              <strong>Date Of Order: </strong>{" "}
              {patientSelected?.dateOfOrder || "--"}
            </div>
            <RepGenButton
              setIsModalOpen={setIsModalOpen}
              patientSelected={patientSelected}
              setPdfUrl={setPdfUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportContainer;
