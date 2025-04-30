
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import LineChart from './LineChart';
import { Label } from "@/components/ui/label";

interface ModelParametersProps {
  wcssData: { name: number; wcss: number }[];
  silhouetteData: { name: number; score: number }[];
  explainedVariance: { name: number; variance: number; cumulative: number }[];
  onRunClustering: (k: number, components: number) => void;
}

const ModelParameters: React.FC<ModelParametersProps> = ({
  wcssData,
  silhouetteData,
  explainedVariance,
  onRunClustering
}) => {
  const [numClusters, setNumClusters] = useState(3);
  const [numComponents, setNumComponents] = useState(2);
  const [activeTab, setActiveTab] = useState("kmeans");
  
  const handleRunClustering = () => {
    onRunClustering(numClusters, numComponents);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Model Parameters</CardTitle>
        <CardDescription>
          Adjust clustering and PCA parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kmeans" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="kmeans">K-Means</TabsTrigger>
            <TabsTrigger value="pca">PCA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kmeans" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="clusters">Number of Clusters (k): {numClusters}</Label>
              </div>
              <Slider
                id="clusters"
                min={2}
                max={9}
                step={1}
                value={[numClusters]}
                onValueChange={(value) => setNumClusters(value[0])}
              />
            </div>
            
            <div className="h-[200px]">
              <LineChart 
                data={wcssData}
                lines={[
                  { key: "wcss", color: "#3498db", name: "WCSS" }
                ]}
                xLabel="Number of Clusters (k)"
                yLabel="Within-Cluster Sum of Squares"
              />
            </div>
            
            <div className="h-[200px]">
              <LineChart 
                data={silhouetteData}
                lines={[
                  { key: "score", color: "#2ecc71", name: "Silhouette Score" }
                ]}
                xLabel="Number of Clusters (k)"
                yLabel="Silhouette Score"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="pca" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="components">Number of Components: {numComponents}</Label>
              </div>
              <Slider
                id="components"
                min={2}
                max={5}
                step={1}
                value={[numComponents]}
                onValueChange={(value) => setNumComponents(value[0])}
              />
            </div>
            
            <div className="h-[200px]">
              <LineChart 
                data={explainedVariance}
                lines={[
                  { key: "variance", color: "#9b59b6", name: "Explained Variance" },
                  { key: "cumulative", color: "#e74c3c", name: "Cumulative Variance" }
                ]}
                xLabel="Number of Components"
                yLabel="Explained Variance Ratio"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={handleRunClustering}>
            Run Clustering
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelParameters;
