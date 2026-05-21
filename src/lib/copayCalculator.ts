import type { CopayInput } from "@/types/database";
import type { HospitalRecommendation } from "@/types/agent";

export function calculateCopays(inputs: CopayInput[]): HospitalRecommendation[] {
  return inputs
    .map((input) => {
      const variableCopay = input.basePrice * (1 - input.coveragePercent / 100);
      const finalCopay =
        input.fixedCopay == null ? variableCopay : Math.min(input.fixedCopay, variableCopay);

      return {
        id: input.hospitalId,
        name: input.hospitalName,
        city: input.city,
        basePrice: roundMoney(input.basePrice),
        estimatedCopay: roundMoney(finalCopay),
        networkLevel: input.networkLevel
      };
    })
    .sort((a, b) => a.estimatedCopay - b.estimatedCopay);
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}
