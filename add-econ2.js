const fs = require('fs');
const q = require('./questions');

q["Economics"].push(
  {
    question: "Perfect competition has:",
    options: ["Many buyers and sellers", "One seller", "Two sellers only", "No buyers"],
    answer: 0
  },
  {
    question: "Inflation is a sustained rise in the:",
    options: ["General price level", "Population", "Exchange rate only", "Production only"],
    answer: 0
  },
  {
    question: "Deflation is a sustained fall in the:",
    options: ["General price level", "Population", "Labour force", "Exports"],
    answer: 0
  },
  {
    question: "Unemployment refers to people willing and able to work but:",
    options: ["Are retired", "Cannot find jobs", "Are students only", "Own businesses"],
    answer: 1
  },
  {
    question: "GDP measures the value of:",
    options: ["Final goods and services produced domestically", "Only exports", "Only imports", "Only government spending"],
    answer: 0
  },
  {
    question: "Per capita income is approximately:",
    options: ["National income divided by population", "Population divided by income", "Exports divided by imports", "GDP multiplied by population"],
    answer: 0
  },
  {
    question: "Fiscal policy involves government decisions about:",
    options: ["Taxation and spending", "Weather", "Population only", "Private wages"],
    answer: 0
  },
  {
    question: "Monetary policy is mainly concerned with:",
    options: ["Money supply and interest rates", "Road construction", "Agriculture only", "Population census"],
    answer: 0
  },
  {
    question: "A central bank is responsible for:",
    options: ["Monetary policy", "Selling clothes", "Producing food", "Building houses"],
    answer: 0
  },
  {
    question: "Commercial banks mainly:",
    options: ["Accept deposits and give loans", "Print all currency", "Make laws", "Collect customs duties"],
    answer: 0
  },
  {
    question: "A budget deficit occurs when government:",
    options: ["Revenue exceeds spending", "Spending exceeds revenue", "Has no debt", "Stops collecting taxes"],
    answer: 1
  },
  {
    question: "A budget surplus occurs when:",
    options: ["Spending exceeds revenue", "Revenue exceeds spending", "Imports exceed exports", "Prices fall"],
    answer: 1
  },
  {
    question: "Balance of trade is the difference between:",
    options: ["Visible exports and visible imports", "Income and savings", "Taxes and spending", "Wages and rent"],
    answer: 0
  },
  {
    question: "A favourable balance of trade occurs when:",
    options: ["Exports exceed imports", "Imports exceed exports", "Imports equal zero", "Exports equal zero"],
    answer: 0
  },
  {
    question: "Devaluation means:",
    options: ["Official reduction in currency value", "Increase in wages", "Fall in population", "Rise in exports only"],
    answer: 0
  },
  {
    question: "Exchange rate is the:",
    options: ["Price of one currency in terms of another", "Price of labour", "Cost of production", "Tax rate"],
    answer: 0
  },
  {
    question: "A tariff is a tax on:",
    options: ["Imports", "Local wages", "Exports only", "Savings"],
    answer: 0
  },
  {
    question: "An export is a good or service:",
    options: ["Sold to another country", "Bought from another country", "Produced at home only", "Destroyed"],
    answer: 0
  },
  {
    question: "An import is a good or service:",
    options: ["Bought from another country", "Sold abroad", "Produced only locally", "Given free"],
    answer: 0
  },
  {
    question: "Division of labour means:",
    options: ["Breaking production into specialized tasks", "Stopping production", "Hiring no workers", "Producing one good only"],
    answer: 0
  },
  {
    question: "Specialization can lead to:",
    options: ["Higher productivity", "Lower skill always", "No output", "Zero trade"],
    answer: 0
  },
  {
    question: "Capital as a factor of production refers to:",
    options: ["Man-made resources used in production", "Money only", "Land only", "Workers only"],
    answer: 0
  },
  {
    question: "Labour as a factor of production refers to:",
    options: ["Human effort used in production", "Machines", "Land", "Money"],
    answer: 0
  },
  {
    question: "Land as a factor of production includes:",
    options: ["Natural resources", "Only buildings", "Only workers", "Only money"],
    answer: 0
  },
  {
    question: "Entrepreneurship involves:",
    options: ["Organizing factors of production and bearing risk", "Only manual labour", "Only saving money", "Only buying goods"],
    answer: 0
  },
  {
    question: "Economic growth means an increase in:",
    options: ["Real output over time", "Prices only", "Population only", "Imports only"],
    answer: 0
  },
  {
    question: "Economic development includes improvements in:",
    options: ["Living standards and economic welfare", "Prices only", "Imports only", "Taxes only"],
    answer: 0
  },
  {
    question: "A consumer is a person who:",
    options: ["Uses goods and services", "Produces only", "Exports only", "Collects taxes"],
    answer: 0
  },
  {
    question: "A producer is one who:",
    options: ["Creates goods or services", "Only consumes goods", "Only saves money", "Only imports"],
    answer: 0
  },
  {
    question: "The main aim of economic activity is to:",
    options: ["Satisfy human wants", "Eliminate all resources", "Prevent production", "Stop consumption"],
    answer: 0
  }
);

fs.writeFileSync(
  './questions.js',
  'const questionBank = ' + JSON.stringify(q, null, 2) +
  ';\n\nmodule.exports = questionBank;\n'
);

console.log("Economics:", q["Economics"].length);
