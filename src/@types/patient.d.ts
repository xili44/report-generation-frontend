interface IPatient {
  id: number;
  dob: string;
  dateOfOrder: string;
  dateOfReport: string;
  ethnicity: string;
  gender: string;
  hn: string;
  name: string;
  orderedBy: string;
  title: string;
}

interface IPharmacogenomics {
  id: number;
  description: string;
  drug: string;
  gene: string;
}

interface IGeneDrugMapping {
  gene: string;
  drugs: { drug: string; description: string }[];
}
