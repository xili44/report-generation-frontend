import { useEffect, useState } from "react";

type PharmacogenomicsReportPagePropsType = {
  geneDrugMappings: IGeneDrugMapping[];
  pageRef: React.RefObject<HTMLDivElement>;
};

const PharmacogenomicsReportPage: React.FC<
  PharmacogenomicsReportPagePropsType
> = ({ geneDrugMappings, pageRef }) => {
  return (
    <div className="w-full bg-white py-12" ref={pageRef}>
      <div className="flex flex-col gap-8 items-center px-14">
        <div className="bg-[#00507b] w-full flex justify-center py-4 text-white text-4xl">
          Pharmacogenomics Report
        </div>
        <div className="w-full border-2 border-t-0 border-black p-4">
          {geneDrugMappings?.map((data: IGeneDrugMapping, index: number) => {
            return (
              <div key={index}>
                <div className="font-semibold underline mb-4">{data.gene}</div>
                {data.drugs.map((drug, index: number) => {
                  return (
                    <div key={index} className="mb-4">
                      <div className="font-semibold mb-2">{drug.drug}</div>
                      <div>{drug.description}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PharmacogenomicsReportPage;
