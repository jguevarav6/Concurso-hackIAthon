export type PatientSummary = {
  id: number;
  fullName: string;
  documentNumber: string;
  city: string;
};

export type CopayInput = {
  hospitalId: number;
  hospitalName: string;
  city: string;
  basePrice: number;
  networkLevel: string;
  coveragePercent: number;
  fixedCopay?: number | null;
};
