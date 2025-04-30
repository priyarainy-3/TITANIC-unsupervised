
import { Passenger } from "../data/titanicData";

export interface ProcessedPassenger {
  passengerId: number;
  pclass: number;
  sex_male: number;
  sex_female: number;
  age: number;
  sibSp: number;
  parch: number;
  fare: number;
  embarked_C: number;
  embarked_Q: number;
  embarked_S: number;
  familySize: number;
  isAlone: number;
  survived?: number; // Only used for interpretation, not for clustering
}

export const preprocessData = (passengers: Passenger[]): ProcessedPassenger[] => {
  // Create a deep copy to avoid modifying the original data
  const processedData: ProcessedPassenger[] = [];
  
  // Calculate statistics for imputation
  const ages = passengers.filter(p => p.age !== null).map(p => p.age as number);
  const meanAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;
  
  const embarkedCounts: Record<string, number> = {};
  passengers.forEach(p => {
    if (p.embarked) {
      embarkedCounts[p.embarked] = (embarkedCounts[p.embarked] || 0) + 1;
    }
  });
  const modeEmbarked = Object.entries(embarkedCounts)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  // Process each passenger
  passengers.forEach(passenger => {
    // Handle missing values
    const age = passenger.age !== null ? passenger.age : meanAge;
    const embarked = passenger.embarked || modeEmbarked;
    
    // Feature engineering
    const familySize = passenger.sibSp + passenger.parch + 1;
    const isAlone = familySize === 1 ? 1 : 0;
    
    // One-hot encoding for categorical features
    const processedPassenger: ProcessedPassenger = {
      passengerId: passenger.passengerId,
      pclass: passenger.pclass,
      sex_male: passenger.sex === "male" ? 1 : 0,
      sex_female: passenger.sex === "female" ? 1 : 0,
      age: age,
      sibSp: passenger.sibSp,
      parch: passenger.parch,
      fare: passenger.fare,
      embarked_C: embarked === "C" ? 1 : 0,
      embarked_Q: embarked === "Q" ? 1 : 0,
      embarked_S: embarked === "S" ? 1 : 0,
      familySize,
      isAlone,
      survived: passenger.survived
    };
    
    processedData.push(processedPassenger);
  });
  
  return processedData;
};

// Standardize the features (z-score normalization)
export const standardizeData = (data: ProcessedPassenger[]): number[][] => {
  // Create a feature matrix without non-numeric or identifier columns
  const featureNames: (keyof ProcessedPassenger)[] = [
    'pclass', 'sex_male', 'sex_female', 'age', 
    'sibSp', 'parch', 'fare', 
    'embarked_C', 'embarked_Q', 'embarked_S',
    'familySize', 'isAlone'
  ];
  
  const featureMatrix: number[][] = data.map(passenger => 
    featureNames.map(feature => passenger[feature] as number)
  );
  
  // Calculate mean and std for each feature
  const means: number[] = [];
  const stds: number[] = [];
  
  for (let j = 0; j < featureNames.length; j++) {
    const featureValues = featureMatrix.map(row => row[j]);
    const mean = featureValues.reduce((sum, val) => sum + val, 0) / featureValues.length;
    
    const squaredDiffs = featureValues.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / featureValues.length;
    const std = Math.sqrt(variance) || 1; // Use 1 if std is 0 to avoid division by zero
    
    means.push(mean);
    stds.push(std);
  }
  
  // Apply standardization
  const standardizedMatrix: number[][] = featureMatrix.map(row => 
    row.map((val, j) => (val - means[j]) / stds[j])
  );
  
  return standardizedMatrix;
};
