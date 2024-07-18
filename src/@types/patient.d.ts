interface IPatient {
    ID: number;
    DOB: string;
    dateOfOrder: string;
    dateOfReport: string;
    ethnicity: string;
    gender: string;
    HN: string;
    name: string;
    orderedBy: string;
    title: string;
}

interface IPharmacogenomics {
    ID: number;
    description: string;
    drug: string;
    gene: string;
}

interface IGeneDrugMapping {
  gene: string;
  drugs: { drug: string; description: string }[];
}