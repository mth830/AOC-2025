import GLPK from "glpk.js";

const glpk = await GLPK();

const lpTemplate = {
  name: "integer-system",
  objective: {
    direction: glpk.GLP_MIN,
    name: "sum",
    vars: []
  },
  subjectTo: [],
  bounds: [],
  generals: []
};
const target = [3, 5, 4, 7];
const switches = [[3], [1, 3], [2], [2, 3], [0, 2], [0, 1]];

const getVars = usedLetters => {
  const vars = [];
  for (const letter of usedLetters.values()) {
    vars.push({ name: letter, coef: 1 });
  }
  return vars;
};

const getGenerals = usedLetters => [...usedLetters];

const getBounds = usedLetters => {
  const bounds = [];
  for (const letter of usedLetters.values()) {
    bounds.push({ name: letter, type: glpk.GLP_LO, lb: 0 });
  }
  return bounds;
};

const createGPLKObj = (target, switches) => {
  const lp = structuredClone(lpTemplate);
  const subject = [];
  const usedLetters = new Set();
  for (let i = 0; i < target.length; i++) {
    const sub = { name: "eq" + (i + 1), vars: [], bnds: { type: glpk.GLP_FX, lb: target[i], ub: target[i] } }
    for (let j = 0; j < switches.length; j++) {
      if (switches[j].includes(i)) {
        const currLetter = String.fromCharCode("a".charCodeAt(0) + j);
        const entry = { name: currLetter, coef: 1 };
        sub.vars.push(entry);
        usedLetters.add(currLetter);
      }
    }
    lp.subjectTo.push(sub);
  }
  lp.generals = getGenerals(usedLetters);
  lp.bounds = getBounds(usedLetters);
  lp.objective.vars = getVars(usedLetters);
  return lp;
};

const solve = (target, switches) => {
  const lp = createGPLKObj(target, switches);
  const result = glpk.solve(lp, { msgLevel: glpk.GLP_MSG_OFF });
  return result.result.z;
};
export { solve };
