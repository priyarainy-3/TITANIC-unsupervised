
import React from 'react';
import { Separator } from "@/components/ui/separator";

const TitanicHeader: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Titanic Voyage Insights</h1>
          <p className="text-muted-foreground">
            Unsupervised exploration of passenger data using K-Means clustering and PCA
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Powered by</span>
          <div className="flex items-center space-x-1">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 p-1 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <circle cx="12" cy="12" r="10"/>
                <path d="m4.93 4.93 4.24 4.24"/>
                <path d="m14.83 9.17 4.24-4.24"/>
                <path d="m14.83 14.83 4.24 4.24"/>
                <path d="m9.17 14.83-4.24 4.24"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <span className="font-semibold">ClusterML</span>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default TitanicHeader;
