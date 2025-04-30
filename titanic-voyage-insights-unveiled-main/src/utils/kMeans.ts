
// K-means clustering implementation
export function kMeans(data: number[][], k: number, maxIterations: number = 100): {
  labels: number[],
  centroids: number[][],
  wcss: number
} {
  const n = data.length;
  const d = data[0].length;
  
  // Initialize centroids by selecting k random points
  const centroids: number[][] = [];
  const usedIndices = new Set<number>();
  
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * n);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      centroids.push([...data[idx]]);
    }
  }
  
  let labels: number[] = Array(n).fill(-1);
  let iterations = 0;
  let oldLabels: number[] = Array(n).fill(-2); // Different from initial labels
  
  // Iterate until convergence or max iterations
  while (!arraysEqual(labels, oldLabels) && iterations < maxIterations) {
    oldLabels = [...labels];
    
    // Assign each point to nearest centroid
    for (let i = 0; i < n; i++) {
      let minDist = Infinity;
      let minIndex = -1;
      
      for (let j = 0; j < k; j++) {
        const dist = euclideanDistance(data[i], centroids[j]);
        if (dist < minDist) {
          minDist = dist;
          minIndex = j;
        }
      }
      
      labels[i] = minIndex;
    }
    
    // Update centroids
    const newCentroids: number[][] = Array(k).fill(0).map(() => Array(d).fill(0));
    const counts: number[] = Array(k).fill(0);
    
    for (let i = 0; i < n; i++) {
      const label = labels[i];
      counts[label]++;
      
      for (let j = 0; j < d; j++) {
        newCentroids[label][j] += data[i][j];
      }
    }
    
    for (let i = 0; i < k; i++) {
      if (counts[i] > 0) {
        for (let j = 0; j < d; j++) {
          newCentroids[i][j] /= counts[i];
        }
        centroids[i] = newCentroids[i];
      }
    }
    
    iterations++;
  }
  
  // Calculate Within-Cluster Sum of Squares (WCSS)
  let wcss = 0;
  for (let i = 0; i < n; i++) {
    const centroid = centroids[labels[i]];
    wcss += Math.pow(euclideanDistance(data[i], centroid), 2);
  }
  
  return { labels, centroids, wcss };
}

// Calculate WCSS for a range of k values
export function calculateWCSS(data: number[][], kRange: number[]): number[] {
  return kRange.map(k => {
    const { wcss } = kMeans(data, k);
    return wcss;
  });
}

// Helper function to calculate Euclidean distance
function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(
    a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
  );
}

// Helper function to compare arrays
function arraysEqual(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

// Calculate silhouette score (simplified version)
export function silhouetteScore(data: number[][], labels: number[], centroids: number[][]): number {
  const n = data.length;
  const uniqueLabels = [...new Set(labels)];
  const k = uniqueLabels.length;
  
  if (k <= 1) return 0; // Need at least 2 clusters for silhouette
  
  let totalSilhouette = 0;
  
  for (let i = 0; i < n; i++) {
    const clusterI = labels[i];
    
    // Calculate average distance to points in same cluster (a)
    let a = 0;
    let sameClusterCount = 0;
    
    for (let j = 0; j < n; j++) {
      if (i !== j && labels[j] === clusterI) {
        a += euclideanDistance(data[i], data[j]);
        sameClusterCount++;
      }
    }
    
    if (sameClusterCount > 0) {
      a /= sameClusterCount;
    } else {
      a = 0; // Single element cluster
    }
    
    // Calculate average distance to points in nearest cluster (b)
    const avgDistancesByCluster: Record<number, { total: number, count: number }> = {};
    
    for (let j = 0; j < n; j++) {
      if (labels[j] !== clusterI) {
        const otherCluster = labels[j];
        if (!avgDistancesByCluster[otherCluster]) {
          avgDistancesByCluster[otherCluster] = { total: 0, count: 0 };
        }
        avgDistancesByCluster[otherCluster].total += euclideanDistance(data[i], data[j]);
        avgDistancesByCluster[otherCluster].count++;
      }
    }
    
    let b = Infinity;
    for (const cluster in avgDistancesByCluster) {
      const { total, count } = avgDistancesByCluster[cluster];
      const avgDistance = total / count;
      if (avgDistance < b) {
        b = avgDistance;
      }
    }
    
    // Calculate silhouette
    const silhouette = (b === Infinity || (a === 0 && b === 0)) ? 0 : (b - a) / Math.max(a, b);
    totalSilhouette += silhouette;
  }
  
  return totalSilhouette / n;
}

// Calculate silhouette scores for a range of k values
export function calculateSilhouetteScores(data: number[][], kRange: number[]): number[] {
  return kRange.map(k => {
    const { labels, centroids } = kMeans(data, k);
    return silhouetteScore(data, labels, centroids);
  });
}
