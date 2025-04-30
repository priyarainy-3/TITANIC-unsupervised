
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcessedPassenger } from '@/utils/dataPreprocessing';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface ClusterAnalysisProps {
  processedData: ProcessedPassenger[];
  clusterLabels: number[];
  activeCluster: number | null;
}

const ClusterAnalysis: React.FC<ClusterAnalysisProps> = ({ 
  processedData, 
  clusterLabels,
  activeCluster 
}) => {
  // Group data by clusters
  const clusterGroups: Record<number, ProcessedPassenger[]> = {};
  processedData.forEach((passenger, i) => {
    const cluster = clusterLabels[i];
    if (!clusterGroups[cluster]) {
      clusterGroups[cluster] = [];
    }
    clusterGroups[cluster].push(passenger);
  });
  
  const clusters = Object.keys(clusterGroups).map(Number);
  const selectedCluster = activeCluster !== null ? activeCluster : clusters[0];
  const selectedPassengers = clusterGroups[selectedCluster] || [];
  
  // Calculate statistics for the selected cluster
  const totalPassengers = selectedPassengers.length;
  const avgAge = selectedPassengers.reduce((sum, p) => sum + p.age, 0) / totalPassengers;
  const avgFare = selectedPassengers.reduce((sum, p) => sum + p.fare, 0) / totalPassengers;
  const maleCount = selectedPassengers.reduce((sum, p) => sum + p.sex_male, 0);
  const femaleCount = selectedPassengers.reduce((sum, p) => sum + p.sex_female, 0);
  const malePercentage = (maleCount / totalPassengers) * 100;
  
  // Calculate survival rate if available
  const survivedCount = selectedPassengers.filter(p => p.survived === 1).length;
  const survivalRate = (survivedCount / totalPassengers) * 100;
  
  // Class distribution
  const classDistribution = {
    first: selectedPassengers.filter(p => p.pclass === 1).length,
    second: selectedPassengers.filter(p => p.pclass === 2).length,
    third: selectedPassengers.filter(p => p.pclass === 3).length,
  };
  
  // Calculate most common embarkation port
  const embarkCounts = {
    C: selectedPassengers.reduce((sum, p) => sum + p.embarked_C, 0),
    Q: selectedPassengers.reduce((sum, p) => sum + p.embarked_Q, 0),
    S: selectedPassengers.reduce((sum, p) => sum + p.embarked_S, 0),
  };
  
  const mostCommonEmbark = Object.entries(embarkCounts)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  // Calculate family statistics
  const avgFamilySize = selectedPassengers.reduce((sum, p) => sum + p.familySize, 0) / totalPassengers;
  const aloneCount = selectedPassengers.reduce((sum, p) => sum + p.isAlone, 0);
  const alonePercentage = (aloneCount / totalPassengers) * 100;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cluster {selectedCluster} Analysis</CardTitle>
        <CardDescription>
          Detailed statistics for {totalPassengers} passengers in this cluster
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Passenger Class Distribution</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-xs text-muted-foreground mb-1">First Class</div>
              <Progress value={(classDistribution.first / totalPassengers) * 100} className="h-2" />
              <div className="text-xs mt-1">{Math.round((classDistribution.first / totalPassengers) * 100)}%</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Second Class</div>
              <Progress value={(classDistribution.second / totalPassengers) * 100} className="h-2" />
              <div className="text-xs mt-1">{Math.round((classDistribution.second / totalPassengers) * 100)}%</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Third Class</div>
              <Progress value={(classDistribution.third / totalPassengers) * 100} className="h-2" />
              <div className="text-xs mt-1">{Math.round((classDistribution.third / totalPassengers) * 100)}%</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Gender Distribution</h3>
            <div className="flex items-center space-x-4">
              <div className="w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Male</span>
                  <span>Female</span>
                </div>
                <div className="flex h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500"
                    style={{ width: `${malePercentage}%` }} 
                  />
                  <div 
                    className="bg-pink-500"
                    style={{ width: `${100 - malePercentage}%` }} 
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>{Math.round(malePercentage)}%</span>
                  <span>{Math.round(100 - malePercentage)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Survival Rate</h3>
            <div className="flex flex-col">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Perished</span>
                <span>Survived</span>
              </div>
              <div className="flex h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="bg-red-500"
                  style={{ width: `${100 - survivalRate}%` }} 
                />
                <div 
                  className="bg-green-500"
                  style={{ width: `${survivalRate}%` }} 
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>{Math.round(100 - survivalRate)}%</span>
                <span>{Math.round(survivalRate)}%</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{avgAge.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Avg. Age</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">${avgFare.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Avg. Fare</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{avgFamilySize.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Avg. Family Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{mostCommonEmbark}</div>
            <div className="text-xs text-muted-foreground">Common Embarkation</div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium mb-2">Cluster Profile Summary</h3>
          <p className="text-sm text-muted-foreground">
            {getClusterProfile(selectedCluster, {
              survivalRate,
              malePercentage,
              avgAge,
              avgFare,
              classDistribution,
              alonePercentage
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate cluster profiles
function getClusterProfile(
  clusterId: number, 
  stats: {
    survivalRate: number,
    malePercentage: number,
    avgAge: number,
    avgFare: number,
    classDistribution: { first: number, second: number, third: number },
    alonePercentage: number
  }
) {
  const { survivalRate, malePercentage, avgAge, avgFare, classDistribution, alonePercentage } = stats;
  
  // Determine dominant class
  const classTotal = classDistribution.first + classDistribution.second + classDistribution.third;
  let dominantClass = "";
  if (classDistribution.first / classTotal > 0.5) dominantClass = "predominantly first class";
  else if (classDistribution.second / classTotal > 0.5) dominantClass = "predominantly second class";
  else if (classDistribution.third / classTotal > 0.5) dominantClass = "predominantly third class";
  else dominantClass = "mixed class";
  
  // Generate profile
  return `This cluster represents ${malePercentage > 60 ? "mostly male" : 
    malePercentage < 40 ? "mostly female" : "mixed gender"} passengers, ${dominantClass}, 
    with ${survivalRate > 50 ? "high" : "low"} survival rate (${Math.round(survivalRate)}%). 
    The average age is ${avgAge.toFixed(1)} years, with ${alonePercentage > 50 ? "many traveling alone" : 
    "most traveling with family"}. Average fare paid was $${avgFare.toFixed(2)}.`;
}

export default ClusterAnalysis;
