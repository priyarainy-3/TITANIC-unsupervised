
import React, { useState, useEffect } from 'react';
import { titanicData, Passenger } from '../data/titanicData';
import { preprocessData, standardizeData, ProcessedPassenger } from '../utils/dataPreprocessing';
import { pca, calculateExplainedVarianceRatio, calculateCumulativeExplainedVariance } from '../utils/pca';
import { kMeans, calculateWCSS, calculateSilhouetteScores } from '../utils/kMeans';
import ScatterPlot from './ScatterPlot';
import ClusterAnalysis from './ClusterAnalysis';
import ModelParameters from './ModelParameters';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const DataExplorer: React.FC = () => {
  const [processedData, setProcessedData] = useState<ProcessedPassenger[]>([]);
  const [standardizedData, setStandardizedData] = useState<number[][]>([]);
  const [pcaResult, setPcaResult] = useState<{
    components: number[][],
    explainedVariance: number[],
    transformedData: number[][]
  }>({ components: [], explainedVariance: [], transformedData: [] });
  
  const [clusterLabels, setClusterLabels] = useState<number[]>([]);
  const [pcaClusterLabels, setPcaClusterLabels] = useState<number[]>([]);
  const [activeCluster, setActiveCluster] = useState<number | null>(null);
  
  const [wcssData, setWcssData] = useState<{ name: number; wcss: number }[]>([]);
  const [silhouetteData, setSilhouetteData] = useState<{ name: number; score: number }[]>([]);
  const [explainedVarianceData, setExplainedVarianceData] = useState<{ 
    name: number; variance: number; cumulative: number 
  }[]>([]);
  
  // Initialize data and run preprocessing
  useEffect(() => {
    const processed = preprocessData(titanicData);
    setProcessedData(processed);
    
    const standardized = standardizeData(processed);
    setStandardizedData(standardized);
    
    // Initial PCA with 2 components
    const initialPca = pca(standardized, 2);
    setPcaResult(initialPca);
    
    // Calculate metrics for parameter tuning
    const kRange = [2, 3, 4, 5, 6, 7, 8, 9];
    const wcss = calculateWCSS(standardized, kRange);
    const silhouetteScores = calculateSilhouetteScores(standardized, kRange);
    
    setWcssData(kRange.map((k, i) => ({ name: k, wcss: wcss[i] })));
    setSilhouetteData(kRange.map((k, i) => ({ name: k, score: silhouetteScores[i] })));
    
    // Calculate explained variance for different numbers of components
    const componentsRange = [1, 2, 3, 4, 5];
    const varianceData: { name: number; variance: number; cumulative: number }[] = [];
    
    componentsRange.forEach(numComponents => {
      const result = pca(standardized, numComponents);
      const explainedVarianceRatio = calculateExplainedVarianceRatio(result.explainedVariance);
      const cumulativeVariance = calculateCumulativeExplainedVariance(explainedVarianceRatio);
      
      varianceData.push({
        name: numComponents,
        variance: explainedVarianceRatio[explainedVarianceRatio.length - 1],
        cumulative: cumulativeVariance[cumulativeVariance.length - 1]
      });
    });
    
    setExplainedVarianceData(varianceData);
    
    // Initial clustering with k=3
    runClustering(3, 2);
  }, []);
  
  const runClustering = (k: number, numComponents: number) => {
    if (standardizedData.length === 0) return;
    
    // Run clustering on original standardized data
    const { labels: origLabels } = kMeans(standardizedData, k);
    setClusterLabels(origLabels);
    
    // Ensure we have PCA data with the correct number of components
    let currentPcaResult = pcaResult;
    if (pcaResult.components.length !== numComponents) {
      currentPcaResult = pca(standardizedData, numComponents);
      setPcaResult(currentPcaResult);
    }
    
    // Run clustering on PCA-transformed data
    const { labels: pcaLabels } = kMeans(currentPcaResult.transformedData, k);
    setPcaClusterLabels(pcaLabels);
  };

  // Prepare data for scatter plot
  const createScatterData = (transformedData: number[][], labels: number[]) => {
    return transformedData.map((point, i) => ({
      x: point[0],
      y: point.length > 1 ? point[1] : 0,
      passengerId: processedData[i]?.passengerId || i,
      cluster: labels[i]
    }));
  };

  const scatterData = createScatterData(
    pcaResult.transformedData, 
    pcaClusterLabels
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card className="h-[500px]">
            <CardContent className="p-4 h-full">
              <Tabs defaultValue="pca" className="h-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="pca">PCA Clusters</TabsTrigger>
                    <TabsTrigger value="statistics">Statistics</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Data points:</span>
                    <Badge variant="outline">{titanicData.length}</Badge>
                  </div>
                </div>
                
                <TabsContent value="pca" className="h-[calc(100%-48px)]">
                  <ScatterPlot 
                    data={scatterData}
                    xLabel="Principal Component 1"
                    yLabel="Principal Component 2"
                    activeCluster={activeCluster}
                    setActiveCluster={setActiveCluster}
                  />
                </TabsContent>
                
                <TabsContent value="statistics" className="h-[calc(100%-48px)]">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-medium">Dataset Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <div className="text-2xl font-bold">
                            {Math.round(processedData.filter(p => p.survived === 1).length / processedData.length * 100)}%
                          </div>
                          <div className="text-sm text-muted-foreground">Survival Rate</div>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <div className="text-2xl font-bold">
                            {Math.round(processedData.reduce((sum, p) => sum + p.sex_male, 0) / processedData.length * 100)}%
                          </div>
                          <div className="text-sm text-muted-foreground">Male Passengers</div>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <div className="text-2xl font-bold">
                            {Math.round(processedData.reduce((sum, p) => sum + p.age, 0) / processedData.length)}
                          </div>
                          <div className="text-sm text-muted-foreground">Avg. Age</div>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <div className="text-2xl font-bold">
                            {Math.round(processedData.reduce((sum, p) => sum + p.isAlone, 0) / processedData.length * 100)}%
                          </div>
                          <div className="text-sm text-muted-foreground">Traveling Alone</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <ModelParameters 
            wcssData={wcssData}
            silhouetteData={silhouetteData}
            explainedVariance={explainedVarianceData}
            onRunClustering={runClustering}
          />
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="grid grid-cols-1 gap-4">
        <ClusterAnalysis 
          processedData={processedData}
          clusterLabels={pcaClusterLabels}
          activeCluster={activeCluster}
        />
      </div>
    </div>
  );
};

export default DataExplorer;
