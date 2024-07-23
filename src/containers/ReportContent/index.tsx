"use client";
import { Button, Spin } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import CoverPage from "./components/CoverPage";
import PharmacogenomicsReportPage from "./components/PharmacogenomicsReportPage";
type ReportContentContainerPropsType = {
  patient: IPatient;
  genomes: string[];
  pharmacogenomicsData: IPharmacogenomics[];
};
const ReportContentContainer: React.FC<ReportContentContainerPropsType> = ({
  patient,
  pharmacogenomicsData,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [geneDrugMappings, setGeneDrugMappings] = useState<IGeneDrugMapping[]>(
    []
  );
  const [pharmReportPages, setPharmReportPages] = useState<number>(0);
  const pharmReportPageRefs = useRef(
    Array.from({ length: 20 }, () =>
      useRef<React.RefObject<HTMLDivElement>>(null)
    )
  );
  const coverPageRef = useRef<HTMLDivElement>(null);

  const processPharamacogenomicsData = (
    pharmacogenomicsData: IPharmacogenomics[]
  ) => {
    const mappings: IGeneDrugMapping[] = [];
    pharmacogenomicsData?.forEach((item: IPharmacogenomics) => {
      if (mappings.find((val) => val.gene == item.gene)) {
        mappings
          .find((val) => val.gene == item.gene)
          ?.drugs.push({ drug: item.drug, description: item.description });
      } else {
        mappings.push({
          gene: item.gene,
          drugs: [{ drug: item.drug, description: item.description }],
        });
      }
    });
    return mappings;
  };

  useEffect(() => {
    const mappings = processPharamacogenomicsData(pharmacogenomicsData);
    setPharmReportPages(mappings.length);
    setGeneDrugMappings(mappings);
  }, [pharmacogenomicsData]);

  const addNewPage = async (pdf: jsPDF, canvas: HTMLCanvasElement) => {
    pdf.addPage();
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth * ratio, imgHeight * ratio);
  };

  const addPharmacogenomicsReportPage = async (pdf: jsPDF) => {
    for (let i = 0; i < pharmReportPages; i++) {
      const curPage = pharmReportPageRefs.current.at(i)
        .current as HTMLDivElement;
      const curCanvas = await html2canvas(curPage);
      addNewPage(pdf, curCanvas);
    }
  };
  const downloadPDF = async () => {
    setIsLoading(true);
    const pdf = new jsPDF("p", "mm", "a4", true);
    const coverPage = coverPageRef.current as HTMLDivElement;
    const canvas1 = await html2canvas(coverPage);
    addNewPage(pdf, canvas1);
    console.log(geneDrugMappings);
    console.log(pharmReportPages);
    await addPharmacogenomicsReportPage(pdf);
    pdf.deletePage(1);
    pdf.save(`report_${patient.name}.pdf`);
    setIsLoading(false);
  };
  return (
    <div className="flex justify-center relative bg-white ">
      <div className="w-[1000px]">
        <CoverPage patient={patient} pageRef={coverPageRef} />
        <div className="h-20"></div>
        {Array.from(Array(pharmReportPages).keys()).map(
          (page, index: number) => {
            return (
              <div key={page}>
                <PharmacogenomicsReportPage
                  pageRef={
                    pharmReportPageRefs.current.at(
                      index
                    ) as React.RefObject<HTMLDivElement>
                  }
                  geneDrugMappings={[
                    geneDrugMappings.at(index) as IGeneDrugMapping,
                  ]}
                />
              </div>
            );
          }
        )}
      </div>
      <Button
        type="primary"
        onClick={downloadPDF}
        className="absolute top-10 right-40"
        disabled={isLoading}
      >
        Download PDF {isLoading && <Spin />}
      </Button>
    </div>
  );
};

export default ReportContentContainer;
