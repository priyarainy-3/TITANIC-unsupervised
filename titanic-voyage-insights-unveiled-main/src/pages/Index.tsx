
import React from "react";
import TitanicHeader from "@/components/TitanicHeader";
import DataExplorer from "@/components/DataExplorer";

const Index = () => {
  return (
    <div className="container mx-auto py-4 px-4 md:px-6 space-y-6">
      <TitanicHeader />
      <DataExplorer />
      <footer className="text-center text-sm text-muted-foreground mt-16 pb-4">
        <p>Titanic Voyage Insights - Unsupervised Learning Exploration</p>
        <p>Data analysis and visualization using K-Means clustering and PCA</p>
      </footer>
    </div>
  );
};

export default Index;
