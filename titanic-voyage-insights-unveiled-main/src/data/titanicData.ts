
// This is sample data based on the Titanic dataset
// In a production app, this would be loaded from an API or CSV
export interface Passenger {
  passengerId: number;
  survived: number;
  pclass: number;
  name: string;
  sex: string;
  age: number | null;
  sibSp: number;
  parch: number;
  ticket: string;
  fare: number;
  cabin: string | null;
  embarked: string | null;
}

export const titanicData: Passenger[] = [
  {
    passengerId: 1,
    survived: 0,
    pclass: 3,
    name: "Braund, Mr. Owen Harris",
    sex: "male",
    age: 22,
    sibSp: 1,
    parch: 0,
    ticket: "A/5 21171",
    fare: 7.25,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 2,
    survived: 1,
    pclass: 1,
    name: "Cumings, Mrs. John Bradley (Florence Briggs Thayer)",
    sex: "female",
    age: 38,
    sibSp: 1,
    parch: 0,
    ticket: "PC 17599",
    fare: 71.2833,
    cabin: "C85",
    embarked: "C"
  },
  {
    passengerId: 3,
    survived: 1,
    pclass: 3,
    name: "Heikkinen, Miss. Laina",
    sex: "female",
    age: 26,
    sibSp: 0,
    parch: 0,
    ticket: "STON/O2. 3101282",
    fare: 7.925,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 4,
    survived: 1,
    pclass: 1,
    name: "Futrelle, Mrs. Jacques Heath (Lily May Peel)",
    sex: "female",
    age: 35,
    sibSp: 1,
    parch: 0,
    ticket: "113803",
    fare: 53.1,
    cabin: "C123",
    embarked: "S"
  },
  {
    passengerId: 5,
    survived: 0,
    pclass: 3,
    name: "Allen, Mr. William Henry",
    sex: "male",
    age: 35,
    sibSp: 0,
    parch: 0,
    ticket: "373450",
    fare: 8.05,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 6,
    survived: 0,
    pclass: 3,
    name: "Moran, Mr. James",
    sex: "male",
    age: null,
    sibSp: 0,
    parch: 0,
    ticket: "330877",
    fare: 8.4583,
    cabin: null,
    embarked: "Q"
  },
  {
    passengerId: 7,
    survived: 0,
    pclass: 1,
    name: "McCarthy, Mr. Timothy J",
    sex: "male",
    age: 54,
    sibSp: 0,
    parch: 0,
    ticket: "17463",
    fare: 51.8625,
    cabin: "E46",
    embarked: "S"
  },
  {
    passengerId: 8,
    survived: 0,
    pclass: 3,
    name: "Palsson, Master. Gosta Leonard",
    sex: "male",
    age: 2,
    sibSp: 3,
    parch: 1,
    ticket: "349909",
    fare: 21.075,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 9,
    survived: 1,
    pclass: 3,
    name: "Johnson, Mrs. Oscar W (Elisabeth Vilhelmina Berg)",
    sex: "female",
    age: 27,
    sibSp: 0,
    parch: 2,
    ticket: "347742",
    fare: 11.1333,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 10,
    survived: 1,
    pclass: 2,
    name: "Nasser, Mrs. Nicholas (Adele Achem)",
    sex: "female",
    age: 14,
    sibSp: 1,
    parch: 0,
    ticket: "237736",
    fare: 30.0708,
    cabin: null,
    embarked: "C"
  },
  {
    passengerId: 11,
    survived: 1,
    pclass: 3,
    name: "Sandstrom, Miss. Marguerite Rut",
    sex: "female",
    age: 4,
    sibSp: 1,
    parch: 1,
    ticket: "PP 9549",
    fare: 16.7,
    cabin: "G6",
    embarked: "S"
  },
  {
    passengerId: 12,
    survived: 1,
    pclass: 1,
    name: "Bonnell, Miss. Elizabeth",
    sex: "female",
    age: 58,
    sibSp: 0,
    parch: 0,
    ticket: "113783",
    fare: 26.55,
    cabin: "C103",
    embarked: "S"
  },
  {
    passengerId: 13,
    survived: 0,
    pclass: 3,
    name: "Saundercock, Mr. William Henry",
    sex: "male",
    age: 20,
    sibSp: 0,
    parch: 0,
    ticket: "A/5. 2151",
    fare: 8.05,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 14,
    survived: 0,
    pclass: 3,
    name: "Andersson, Mr. Anders Johan",
    sex: "male",
    age: 39,
    sibSp: 1,
    parch: 5,
    ticket: "347082",
    fare: 31.275,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 15,
    survived: 0,
    pclass: 3,
    name: "Vestrom, Miss. Hulda Amanda Adolfina",
    sex: "female",
    age: 14,
    sibSp: 0,
    parch: 0,
    ticket: "350406",
    fare: 7.8542,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 16,
    survived: 1,
    pclass: 2,
    name: "Hewlett, Mrs. (Mary D Kingcome)",
    sex: "female",
    age: 55,
    sibSp: 0,
    parch: 0,
    ticket: "248706",
    fare: 16,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 17,
    survived: 0,
    pclass: 3,
    name: "Rice, Master. Eugene",
    sex: "male",
    age: 2,
    sibSp: 4,
    parch: 1,
    ticket: "382652",
    fare: 29.125,
    cabin: null,
    embarked: "Q"
  },
  {
    passengerId: 18,
    survived: 1,
    pclass: 2,
    name: "Williams, Mr. Charles Eugene",
    sex: "male",
    age: null,
    sibSp: 0,
    parch: 0,
    ticket: "244373",
    fare: 13,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 19,
    survived: 0,
    pclass: 3,
    name: "Vander Planke, Mrs. Julius (Emelia Maria Vandemoortele)",
    sex: "female",
    age: 31,
    sibSp: 1,
    parch: 0,
    ticket: "345763",
    fare: 18,
    cabin: null,
    embarked: "S"
  },
  {
    passengerId: 20,
    survived: 1,
    pclass: 3,
    name: "Masselmani, Mrs. Fatima",
    sex: "female",
    age: null,
    sibSp: 0,
    parch: 0,
    ticket: "2649",
    fare: 7.225,
    cabin: null,
    embarked: "C"
  },
  // Additional passenger records would be included in a real dataset
  // This is just a sample set for development purposes
];
