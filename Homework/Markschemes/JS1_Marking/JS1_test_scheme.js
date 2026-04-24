// Run with `node JS1_test_scheme.js` to grade the student's JS1_student.js file.
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const STUDENT_FILE = path.join(__dirname, "JS1_student.js");

function extractFunctionSource(fileSource, functionName) {
  const pattern = new RegExp(
    `function\\s+${functionName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\}`,
    "m",
  );
  const match = fileSource.match(pattern);
  return match ? match[0] : "";
}

function sourceShowsNumberConversion(functionSource) {
  return /Number\s*\(|parseInt\s*\(|parseFloat\s*\(|\+\s*prompt\s*\(/.test(
    functionSource,
  );
}

function extractNumbers(text) {
  const matches = String(text).match(/-?\d+(?:\.\d+)?/g) || [];
  return matches.map((n) => Number(n));
}

function outputContainsApprox(outputLines, expected, tolerance = 0.02) {
  return outputLines.some((line) =>
    extractNumbers(line).some((num) => Math.abs(num - expected) <= tolerance),
  );
}

function makeFakeDateClass(fixedYear) {
  const RealDate = Date;
  class FakeDate extends RealDate {
    constructor(...args) {
      if (args.length > 0) {
        super(...args);
      } else {
        super(`${fixedYear}-01-01T00:00:00Z`);
      }
    }
    static now() {
      return new RealDate(`${fixedYear}-01-01T00:00:00Z`).getTime();
    }
  }
  FakeDate.UTC = RealDate.UTC;
  FakeDate.parse = RealDate.parse;
  return FakeDate;
}

function runStudentFunction(
  studentSource,
  functionName,
  inputs,
  fixedYear = 2026,
) {
  const promptCalls = [];
  const consoleLogs = [];
  const alertLogs = [];
  let i = 0;

  const context = {
    console: {
      log: (...args) => consoleLogs.push(args.map(String).join(" ")),
    },
    prompt: (message = "") => {
      promptCalls.push(String(message));
      const value = i < inputs.length ? inputs[i] : "";
      i += 1;
      return String(value);
    },
    alert: (message = "") => {
      alertLogs.push(String(message));
    },
    Date: makeFakeDateClass(fixedYear),
  };

  vm.createContext(context);

  try {
    vm.runInContext(studentSource, context, { filename: "JS1_student.js" });
  } catch (error) {
    return {
      runtimeError: `Failed loading student file: ${error.message}`,
      promptCalls,
      consoleLogs,
      alertLogs,
    };
  }

  if (typeof context[functionName] !== "function") {
    return {
      runtimeError: `${functionName} is not defined.`,
      promptCalls,
      consoleLogs,
      alertLogs,
    };
  }

  try {
    context[functionName]();
    return { promptCalls, consoleLogs, alertLogs, runtimeError: null };
  } catch (error) {
    return {
      promptCalls,
      consoleLogs,
      alertLogs,
      runtimeError: `${functionName} crashed: ${error.message}`,
    };
  }
}

function markCriterion(passed, label, details = "") {
  return {
    label,
    passed,
    score: passed ? 1 : 0,
    details,
  };
}

function gradeQ1(studentSource) {
  const runA = runStudentFunction(studentSource, "q1", ["12", "8"]);
  const runB = runStudentFunction(studentSource, "q1", ["5.5", "2.2"]);
  const outA = runA.consoleLogs;
  const outB = runB.consoleLogs;
  const joinedA = outA.join(" ").toLowerCase();

  const criteria = [
    markCriterion(
      runA.promptCalls.length === 2,
      "Prompt for two numbers",
      `Prompt count: ${runA.promptCalls.length}`,
    ),
    markCriterion(
      outputContainsApprox(outB, 7.7),
      "Convert to number type",
      "Checks decimal addition (5.5 + 2.2 = 7.7).",
    ),
    markCriterion(
      outputContainsApprox(outA, 20),
      "Sum of two numbers",
      "Checks integer sum (12 + 8 = 20).",
    ),
    markCriterion(
      /[a-z]/i.test(joinedA) &&
        joinedA.includes("12") &&
        joinedA.includes("8") &&
        joinedA.includes("20"),
      "Display 2 numbers and sum in sentence",
      "Requires sentence-style console output that includes both numbers and their sum.",
    ),
  ];

  return { run: runA, criteria };
}

function gradeQ2(studentSource) {
  const run = runStudentFunction(
    studentSource,
    "q2",
    ["Jane", "Doe", "2000"],
    2026,
  );
  const out = run.consoleLogs;
  const joined = out.join(" ");
  const q2Source = extractFunctionSource(studentSource, "q2");

  const criteria = [
    markCriterion(
      run.promptCalls.length === 3,
      "Prompt for first name, last name, and year",
      `Prompt count: ${run.promptCalls.length}`,
    ),
    markCriterion(
      sourceShowsNumberConversion(q2Source),
      "Convert to number",
      "Looks for explicit numeric conversion in code.",
    ),
    markCriterion(
      outputContainsApprox(out, 26),
      "Calculate age",
      "Uses fixed current year 2026 for deterministic test.",
    ),
    markCriterion(
      /Jane\s+Doe/.test(joined) && /[A-Za-z]/.test(joined) && /26/.test(joined),
      "Display Full Name and Age in sentence",
      "Requires output containing full name and age.",
    ),
  ];

  return { run, criteria };
}

function gradeQ3(studentSource) {
  const run = runStudentFunction(studentSource, "q3", ["5"]);
  const out = run.consoleLogs;
  const joined = out.join(" ");
  const q3Source = extractFunctionSource(studentSource, "q3");
  const expectedCirc = 2 * Math.PI * 5;
  const expectedArea = Math.PI * 5 * 5;

  const criteria = [
    markCriterion(
      run.promptCalls.length === 1,
      "Prompt for radius",
      `Prompt count: ${run.promptCalls.length}`,
    ),
    markCriterion(
      sourceShowsNumberConversion(q3Source),
      "Convert to Number type",
      "Looks for explicit numeric conversion in code.",
    ),
    markCriterion(
      outputContainsApprox(out, expectedCirc),
      "Calculate and display Circumference",
      "Requires circumference value in console output.",
    ),
    markCriterion(
      outputContainsApprox(out, expectedArea) && /[a-z]/i.test(joined),
      "Calculate and display Area in sentence",
      "Requires area value in sentence-style console output.",
    ),
  ];

  return { run, criteria };
}

function gradeQ4(studentSource) {
  const run = runStudentFunction(studentSource, "q4", ["2", "3"]);
  const out = run.consoleLogs;
  const joined = out.join(" ").toLowerCase();
  const q4Source = extractFunctionSource(studentSource, "q4");
  const expectedTotalWithTax = (2 * 4 + 3 * 2) * 1.15;

  const criteria = [
    markCriterion(
      run.promptCalls.length === 2,
      "Prompt for Number of fries and drinks",
      `Prompt count: ${run.promptCalls.length}`,
    ),
    markCriterion(
      sourceShowsNumberConversion(q4Source),
      "Convert to number type",
      "Looks for explicit numeric conversion in code.",
    ),
    markCriterion(
      joined.includes("2") &&
        joined.includes("3") &&
        /fries|drinks/.test(joined),
      "Display food ordered",
      "Requires ordered item counts in output.",
    ),
    markCriterion(
      outputContainsApprox(out, expectedTotalWithTax),
      "Display total price with tax in sentence",
      "Checks total including 15% tax with prices fries=$4, drink=$2.",
    ),
  ];

  return { run, criteria };
}

function questionScore(criteria) {
  return criteria.reduce((sum, item) => sum + item.score, 0);
}

function printReport(report) {
  console.log("JS1 Assignment 1 - Automated Marking Report");
  console.log("=".repeat(50));

  ["q1", "q2", "q3", "q4"].forEach((qName) => {
    const q = report.questions[qName];
    console.log(`${qName.toUpperCase()}: ${q.score}/4`);
    q.criteria.forEach((criterion) => {
      const check = criterion.passed ? "[1/1]" : "[0/1]";
      console.log(`  ${check} ${criterion.label}`);
      if (!criterion.passed && criterion.details) {
        console.log(`       -> ${criterion.details}`);
      }
    });
    if (q.runtimeError) {
      console.log(`  Runtime issue: ${q.runtimeError}`);
    }
    console.log("-");
  });

  console.log(`TOTAL: ${report.total}/16`);
}

function gradeJS1Student() {
  const studentSource = fs.readFileSync(STUDENT_FILE, "utf8");

  const q1 = gradeQ1(studentSource);
  const q2 = gradeQ2(studentSource);
  const q3 = gradeQ3(studentSource);
  const q4 = gradeQ4(studentSource);

  const questions = {
    q1: {
      score: questionScore(q1.criteria),
      criteria: q1.criteria,
      runtimeError: q1.run.runtimeError,
    },
    q2: {
      score: questionScore(q2.criteria),
      criteria: q2.criteria,
      runtimeError: q2.run.runtimeError,
    },
    q3: {
      score: questionScore(q3.criteria),
      criteria: q3.criteria,
      runtimeError: q3.run.runtimeError,
    },
    q4: {
      score: questionScore(q4.criteria),
      criteria: q4.criteria,
      runtimeError: q4.run.runtimeError,
    },
  };

  const total =
    questions.q1.score +
    questions.q2.score +
    questions.q3.score +
    questions.q4.score;

  const report = { total, questions };
  printReport(report);
  return report;
}

if (require.main === module) {
  gradeJS1Student();
}

module.exports = {
  gradeJS1Student,
};
