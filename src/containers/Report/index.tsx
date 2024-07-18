"use client";
import React from "react";
import { useEffect, useState } from "react";
import RepGenButton from "./components/RepGenButton";
import Autosuggest from "react-autosuggest";
import PreviewModal from "./components/PreviewModal";

const ReportContainer: React.FC = () => {
  const [allPatients, setAllPatients] = useState<IPatient[]>([]);
  const [suggestions, setSuggestions] = useState<IPatient[]>([]);
  const [value, setValue] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [patientSelected, setPatientSelected] = useState<IPatient>();

  const [pdfUrl, setPdfUrl] = useState<string>("");

  const getAllPatients = async () => {
    const result: { data: IPatient[]; success: Boolean } = await (
      await fetch("http://127.0.0.1:5000/patients")
    ).json();
    setAllPatients(result.data);
  };

  const getSuggestions = async (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const filteredList =
      inputLength === 0
        ? []
        : allPatients.filter(
            (patient) =>
              patient.name.toLowerCase().slice(0, inputLength) === inputValue
          );
    setSuggestions(filteredList);
  };
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion: IPatient) => suggestion.name;

  const renderSuggestion = (suggestion: IPatient) => (
    <div>{suggestion.name}</div>
  );

  const inputProps = {
    placeholder: "Search for a patient",
    value,
    onChange,
  };
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
  useEffect(() => {
    const patient = allPatients.filter((patient) => patient.name == value);
    if (patient.length > 0) {
      setPatientSelected(patient[0]);
    } else {
      setPatientSelected(undefined);
    }
  }, [value]);
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
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={{
              input: "w-96 px-5 py-2 rounded-lg",
              suggestionsContainer:
                "max-h-[50vh] overflow-scroll no-scrollbar bg-gray-50",
              suggestion: "px-5",
              suggestionHighlighted: "bg-gray-200",
            }}
          />
          <div className="flex flex-col gap-2">
            <div>
              <strong>Name: </strong>{" "}
              {constructName(patientSelected?.title, patientSelected?.name) ||
                "--"}
            </div>
            <div>
              <strong>DOB: </strong> {patientSelected?.DOB || "--"}
            </div>
            <div>
              <strong>Ethnicity: </strong> {patientSelected?.ethnicity || "--"}
            </div>
            <div>
              <strong>HN: </strong> {patientSelected?.HN || "--"}
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
