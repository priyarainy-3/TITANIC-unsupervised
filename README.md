

# Unsupervised Analysis of Titanic Passengers using K-Means and PCA

## 🚢 Project Overview

This project explores the famous Titanic dataset using unsupervised machine learning techniques. Instead of directly predicting survival, we aim to uncover hidden structures, patterns, and natural groupings among passengers. We utilize **K-Means clustering** to segment passengers into distinct groups and **Principal Component Analysis (PCA)** to reduce the dataset's dimensions, aiding visualization and potentially improving clustering performance.

The goal is to understand the characteristics of different passenger segments based on their available features, revealing insights into the diverse population aboard the Titanic.

## ✨ Project Goals

*   **Identify Passenger Segments:** Apply K-Means clustering to partition passengers into distinct subgroups based on their features.
*   **Reduce Dimensionality:** Use PCA to reduce the number of features while retaining significant variance, facilitating visualization.
*   **Determine Optimal Parameters:** Employ methods like the Elbow Method and Silhouette Score to find a suitable number of clusters (k) and use explained variance ratio for selecting PCA components.
*   **Analyze and Interpret Clusters:** Characterize the identified clusters by examining the distribution of original features (like Age, Pclass, Sex, Fare, FamilySize) within each group.
*   **Visualize Results:** Create visualizations (e.g., PCA scatter plot) to illustrate the clusters and component structure.
*   **Evaluate PCA Impact:** Compare clustering results on original vs. PCA-reduced data.


## 🛠️ Methodology

The analysis follows these key steps:

1.  **Data Loading & Initial EDA:** Loading the dataset and performing basic exploration (shape, types, missing values, summary statistics).
2.  **Preprocessing:**
    *   Handling missing values (e.g., imputing 'Age', 'Embarked').
    *   Engineering features like 'FamilySize' and 'IsAlone'.
    *   Encoding categorical features ('Sex', 'Embarked') using One-Hot Encoding.
    *   Selecting relevant features for clustering.
    *   **Crucially:** Scaling numerical features using `StandardScaler`.
3.  **Dimensionality Reduction (PCA):**
    *   Applying PCA to the scaled dataset.
    *   Analyzing cumulative explained variance to select the optimal number of components.
    *   Transforming the data into its principal components.
4.  **Clustering (K-Means):**
    *   Using the Elbow Method and Silhouette Scores to determine the optimal number of clusters (k).
    *   Applying K-Means clustering on both the original scaled data and the PCA-reduced data.
    *   Assigning cluster labels to each passenger.
5.  **Cluster Analysis & Interpretation:**
    *   Analyzing the characteristics of each cluster by examining the mean/median/mode of original features within them.
    *   Comparing feature distributions across clusters using statistics and visualizations.
    *   Developing profiles or "personas" for each identified passenger segment.
    *   Comparing cluster quality and characteristics between the full-feature and PCA-based results.
6.  **Visualization:**
    *   Plotting the cumulative explained variance for PCA.
    *   Plotting the Elbow curve and Silhouette scores for K-Means.
    *   Creating scatter plots of the first two principal components, colored by cluster ID.
    *   Generating plots (bar charts, box plots) to show feature distributions per cluster.

## 📂 Project Structure


.
├── data/
│ └── train.csv # Input dataset
├── notebooks/
│ └── titanic_unsupervised_analysis.ipynb # Main Jupyter Notebook with analysis
├── images/ # Optional: Folder for saving generated plots
└── README.md # This file

## ⚙️ Requirements

The project requires Python 3.x and the following libraries:

*   pandas
*   numpy
*   scikit-learn
*   matplotlib
*   seaborn






