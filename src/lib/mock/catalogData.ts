export const PLANS = {
  1: { planName: "Plan Basico",  coveragePercent: 50, fixedCopay: null, deductible: 250 },
  2: { planName: "Plan Plus",    coveragePercent: 70, fixedCopay: null, deductible: 180 },
  3: { planName: "Plan Premium", coveragePercent: 85, fixedCopay: 30,   deductible: 100 },
} as const;

export const HOSPITALS = [
  { id: 1, name: "Hospital Metropolitano", city: "Quito",     basePrice: 120, networkLevel: "premium" },
  { id: 2, name: "Clinica Central",        city: "Quito",     basePrice: 90,  networkLevel: "plus"    },
  { id: 3, name: "Hospital del Valle",     city: "Quito",     basePrice: 75,  networkLevel: "plus"    },
  { id: 4, name: "Centro Medico Familiar", city: "Guayaquil", basePrice: 45,  networkLevel: "basico"  },
];

export const SPECIALTY_MAP: Record<string, { id: number; name: string }> = {
  emergencias:       { id: 5, name: "Emergencias"       },
  cardiologia:       { id: 1, name: "Cardiología"       },
  dermatologia:      { id: 2, name: "Dermatología"      },
  traumatologia:     { id: 3, name: "Traumatología"     },
  gastroenterologia: { id: 4, name: "Gastroenterología" },
};
