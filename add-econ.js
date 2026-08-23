const fs = require('fs');
const q = require('./questions');

q["Economics"] = [
  {
    question: "Economics is mainly concerned with the study of:",
    options: ["Scarce resources and unlimited wants", "Weather", "Politics only", "Biology"],
    answer: 0
  },
  {
    question: "The basic economic problem is:",
    options: ["Inflation", "Scarcity", "Unemployment", "Taxation"],
    answer: 1
  },
  {
    question: "Opportunity cost is:",
    options: ["Money spent", "The next best alternative forgone", "Total revenue", "Profit made"],
    answer: 1
  },
  {
    question: "The reward for labour is:",
    options: ["Rent", "Wages", "Interest", "Profit"],
    answer: 1
  },
  {
    question: "The reward for capital is:",
    options: ["Wages", "Rent", "Interest", "Profit"],
    answer: 2
  },
  {
    question: "The reward for land is:",
    options: ["Rent", "Wages", "Interest", "Profit"],
    answer: 0
  },
  {
    question: "The reward for entrepreneurship is:",
    options: ["Rent", "Wages", "Interest", "Profit"],
    answer: 3
  },
  {
    question: "A production possibility curve shows:",
    options: ["Alternative production combinations", "Population growth", "Price changes only", "Unlimited production"],
    answer: 0
  },
  {
    question: "Demand means the quantity consumers are:",
    options: ["Able and willing to buy", "Forced to buy", "Unable to buy", "Producing"],
    answer: 0
  },
  {
    question: "The law of demand states that quantity demanded generally:",
    options: ["Rises as price rises", "Falls as price rises", "Never changes", "Equals supply"],
    answer: 1
  },
  {
    question: "The law of supply states that quantity supplied generally:",
    options: ["Falls as price rises", "Rises as price rises", "Never changes", "Falls as demand rises"],
    answer: 1
  },
  {
    question: "Market equilibrium occurs when:",
    options: ["Demand exceeds supply", "Supply exceeds demand", "Demand equals supply", "Price is zero"],
    answer: 2
  },
  {
    question: "An increase in demand usually causes equilibrium price to:",
    options: ["Fall", "Rise", "Remain zero", "Disappear"],
    answer: 1
  },
  {
    question: "An increase in supply usually causes equilibrium price to:",
    options: ["Rise", "Fall", "Double", "Remain fixed"],
    answer: 1
  },
  {
    question: "Price elasticity of demand measures responsiveness of quantity demanded to changes in:",
    options: ["Income", "Price", "Population", "Technology"],
    answer: 1
  },
  {
    question: "A perfectly inelastic demand curve is:",
    options: ["Horizontal", "Vertical", "Circular", "Upward sloping"],
    answer: 1
  },
  {
    question: "Demand for a normal good generally rises when:",
    options: ["Income rises", "Price rises", "Supply falls", "Population falls"],
    answer: 0
  },
  {
    question: "Demand for an inferior good may fall when:",
    options: ["Income rises", "Price falls", "Supply rises", "Population rises"],
    answer: 0
  },
  {
    question: "A substitute for tea is:",
    options: ["Coffee", "Sugar", "Salt", "Water"],
    answer: 0
  },
  {
    question: "A complement of a car is:",
    options: ["Petrol", "Rice", "Clothing", "Bread"],
    answer: 0
  },
  {
    question: "Utility means:",
    options: ["Cost of production", "Satisfaction from consumption", "Price of goods", "Amount supplied"],
    answer: 1
  },
  {
    question: "Marginal utility is the additional utility from:",
    options: ["All goods", "One extra unit consumed", "Selling goods", "Production"],
    answer: 1
  },
  {
    question: "Total utility is the:",
    options: ["Sum of utilities from units consumed", "Price of a good", "Cost of labour", "Level of supply"],
    answer: 0
  },
  {
    question: "A fixed cost:",
    options: ["Changes with output", "Does not vary with output in the short run", "Is always zero", "Equals profit"],
    answer: 1
  },
  {
    question: "A variable cost:",
    options: ["Changes with output", "Never changes", "Is always fixed", "Is revenue"],
    answer: 0
  },
  {
    question: "Total cost equals:",
    options: ["Fixed cost plus variable cost", "Revenue minus profit", "Price times demand", "Wages plus rent only"],
    answer: 0
  },
  {
    question: "Profit equals:",
    options: ["Total cost minus revenue", "Total revenue minus total cost", "Price minus demand", "Supply minus demand"],
    answer: 1
  },
  {
    question: "Total revenue is:",
    options: ["Price multiplied by quantity sold", "Cost multiplied by labour", "Profit multiplied by tax", "Demand multiplied by supply"],
    answer: 0
  },
  {
    question: "A monopoly is a market with:",
    options: ["One seller", "Two sellers", "Many sellers", "No seller"],
    answer: 0
  },
  {
    question: "An oligopoly is characterized by:",
    options: ["Many tiny firms", "A few large firms", "One buyer only", "No competition"],
    answer: 1
  }
];

fs.writeFileSync(
  './questions.js',
  'const questionBank = ' + JSON.stringify(q, null, 2) +
  ';\n\nmodule.exports = questionBank;\n'
);

console.log("Economics:", q["Economics"].length);
