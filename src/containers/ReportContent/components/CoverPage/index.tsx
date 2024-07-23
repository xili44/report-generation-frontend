type CoverPagePropsType = {
  patient: IPatient;
  pageRef: React.RefObject<HTMLDivElement>;
};
const CoverPage: React.FC<CoverPagePropsType> = ({ patient, pageRef }) => {
  const getInfoEle = (label: string, data: string) => {
    return (
      <div className="flex flex-row gap-2">
        <div className="">{label}: </div>
        <div className="font-semibold">{data}</div>
      </div>
    );
  };
  return (
    <div className="w-full bg-white" ref={pageRef}>
      <div className="flex flex-col gap-8 items-center px-14">
        <div className="flex flex-col items-start gap-5">
          <div className="text-[#80643a] text-7xl font-extrabold">
            BH MedGene
          </div>
          <div className="text-[#80643a] text-4xl font-semibold">
            Personalised Medicine Report
          </div>
        </div>
        <div className="w-full aspect-video overflow-clip">
          <img src="/cover_img.png" alt="DNA" className="w-full " />
        </div>
        <div className="w-full bg-[#edeff1] p-5 flex flex-col gap-5">
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              {getInfoEle("Patient Name", patient?.name)}
              {getInfoEle("Date of Birth", patient?.dob)}
              {getInfoEle("Ordered By", patient?.orderedBy)}
              {getInfoEle("Date of Report", patient?.dateOfReport)}
            </div>
            <div className="flex flex-col gap-2">
              {getInfoEle("HN", patient?.hn)}
              {getInfoEle("Gender", patient?.gender)}
              {getInfoEle(
                "Hospital Name/Clinic",
                "Bumrungrad International Hospital"
              )}
              {getInfoEle("Ethnicity", patient?.ethnicity)}
            </div>
          </div>
          <div>
            <span className="text-[#80643a] font-semibold">Remark: </span>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
