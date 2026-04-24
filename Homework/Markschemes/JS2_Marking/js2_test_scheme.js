// Run with: node js2_test_scheme.js
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const STUDENT_FILE = path.join(__dirname, "js2_student.js");

function extractNumbers(text) {
  const matches = String(text).match(/-?\d+(?:\.\d+)?/g) || [];
  return matches.map((n) => Number(n));
}

function outputContainsText(outputLines, expectedText) {
  const lowerExpected = String(expectedText).toLowerCase();
  return outputLines.some((line) =>
    String(line).toLowerCase().includes(lowerExpected),
  );
}

function outputContainsApprox(outputLines, expected, tolerance = 0.02) {
  return outputLines.some((line) =>
    extractNumbers(line).some((num) => Math.abs(num - expected) <= tolerance),
  );
}

function runStudentFunction(studentSource, functionName, inputs) {
  const promptCalls = [];
  const consoleLogs = [];
  const alertLogs = [];
  let inputIndex = 0;

  const context = {
    console: {
      log: (...args) => consoleLogs.push(args.map(String).join(" ")),
    },
    prompt: (message = "") => {
      promptCalls.push(String(message));
      const value = inputIndex < inputs.length ? inputs[inputIndex] : "";
      inputIndex += 1;
      return String(value);
    },
    alert: (message = "") => {
      alertLogs.push(String(message));
    },
  };

  vm.createContext(context);

  try {
    vm.runInContext(studentSource, context, { filename: "js2_student.js" });
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
    return { runtimeError: null, promptCalls, consoleLogs, alertLogs };
  } catch (error) {
    return {
      runtimeError: `${functionName} crashed: ${error.message}`,
      promptCalls,
      consoleLogs,
      alertLogs,
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
  const promptRun = runStudentFunction(studentSource, "q1", ["85"]);

  const boundaryTests = [
    { input: "95", expected: "Excellent" },
    { input: "85", expected: "Great work" },
    { input: "75", expected: "Well Done" },
    { input: "65", expected: "Pass" },
    { input: "55", expected: "Fail" },
  ];

  const boundaryResults = boundaryTests.map((test) => ({
    ...test,
    run: runStudentFunction(studentSource, "q1", [test.input]),
  }));

  const conditionsPass = boundaryResults.every((result) =>
    outputContainsText(result.run.alertLogs, result.expected),
  );

  const outputsPass = boundaryResults.every(
    (result) =>
      result.run.alertLogs.length === 1 &&
      result.run.consoleLogs.length === 0 &&
      String(result.run.alertLogs[0]).trim().length > 0,
  );

  const noErrorsPass =
    promptRun.runtimeError === null &&
    boundaryResults.every((result) => result.run.runtimeError === null);

  const criteria = [
    markCriterion(
      promptRun.promptCalls.length === 1,
      "Prompt for student grade",
      `Prompt count: ${promptRun.promptCalls.length}`,
    ),
    markCriterion(
      conditionsPass,
      "Correct Use of Conditions",
      "Checks grade boundaries for 95, 85, 75, 65, and 55.",
    ),
    markCriterion(
      outputsPass,
      "Correct Outputs",
      "Checks that output is sent through alert exactly once per test case.",
    ),
    markCriterion(
      noErrorsPass,
      "No errors",
      noErrorsPass ? "" : "One or more q1 runs crashed.",
    ),
  ];

  return { run: promptRun, criteria };
}

function gradeQ2(studentSource) {
  const promptRun = runStudentFunction(studentSource, "q2", ["190"]);

  const conditionTests = [
    { input: "119", expected: "Recalled" },
    { input: "179", expected: "Recalled" },
    { input: "190", expected: "Recalled" },
    { input: "240", expected: "Recalled" },
    { input: "188", expected: "Not recalled" },
    { input: "204", expected: "Not recalled" },
  ];

  const results = conditionTests.map((test) => ({
    ...test,
    run: runStudentFunction(studentSource, "q2", [test.input]),
  }));

  const conditionsPass = results.every((result) =>
    outputContainsText(result.run.alertLogs, result.expected),
  );

  const outputsPass = results.every((result) => {
    if (result.run.alertLogs.length !== 1) {
      return false;
    }
    const alertText = String(result.run.alertLogs[0]).toLowerCase();
    return alertText.includes("recalled") || alertText.includes("not recalled");
  });

  const noErrorsPass =
    promptRun.runtimeError === null &&
    results.every((result) => result.run.runtimeError === null);

  const criteria = [
    markCriterion(
      promptRun.promptCalls.length === 1,
      "Prompt for car model number",
      `Prompt count: ${promptRun.promptCalls.length}`,
    ),
    markCriterion(
      conditionsPass,
      "Correct Use of Conditions",
      "Checks recalled models (119, 179, range checks) and non-recalled values.",
    ),
    markCriterion(
      outputsPass,
      "Correct Outputs",
      "Checks that the message clearly states recalled vs not recalled.",
    ),
    markCriterion(
      noErrorsPass,
      "No errors",
      noErrorsPass ? "" : "One or more q2 runs crashed.",
    ),
  ];

  return { run: promptRun, criteria };
}

function gradeQ3(studentSource) {
  const promptRun = runStudentFunction(studentSource, "q3", [
    "Alex",
    "20",
    "35",
  ]);
  const overtimeRun = runStudentFunction(studentSource, "q3", [
    "Alex",
    "20",
    "50",
  ]);
  const regularRun = runStudentFunction(studentSource, "q3", [
    "Sam",
    "20",
    "35",
  ]);

  const overtimeExpected = 40 * 20 + (50 - 40) * (20 * 1.5);
  const regularExpected = 35 * 20;

  const displayPass =
    overtimeRun.alertLogs.length >= 1 &&
    outputContainsText(overtimeRun.alertLogs, "Alex") &&
    outputContainsApprox(overtimeRun.alertLogs, overtimeExpected);

  const noErrorsPass =
    promptRun.runtimeError === null &&
    overtimeRun.runtimeError === null &&
    regularRun.runtimeError === null;

  const criteria = [
    markCriterion(
      promptRun.promptCalls.length === 3,
      "Prompt for employee name, rate of pay, and hours",
      `Prompt count: ${promptRun.promptCalls.length}`,
    ),
    markCriterion(
      outputContainsApprox(overtimeRun.alertLogs, overtimeExpected),
      "If hours exceeds 40, pay overtime for excess hours",
      "Checks overtime case: rate 20, hours 50 should give 1100.",
    ),
    markCriterion(
      outputContainsApprox(regularRun.alertLogs, regularExpected),
      "Calculate pay for regular hours",
      "Checks regular case: rate 20, hours 35 should give 700.",
    ),
    markCriterion(
      displayPass && noErrorsPass,
      "Display total pay in sentence",
      "Checks for employee name plus computed pay in alert output.",
    ),
  ];

  return { run: promptRun, criteria };
}

function questionScore(criteria) {
  return criteria.reduce((sum, item) => sum + item.score, 0);
}

function printReport(report) {
  console.log("JS2 Assignment - Automated Marking Report");
  console.log("=".repeat(50));

  ["q1", "q2", "q3"].forEach((qName) => {
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

  console.log(`TOTAL: ${report.total}/12`);
}

function gradeJS2Student() {
  const studentSource = fs.readFileSync(STUDENT_FILE, "utf8");

  const q1 = gradeQ1(studentSource);
  const q2 = gradeQ2(studentSource);
  const q3 = gradeQ3(studentSource);

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
  };

  const total = questions.q1.score + questions.q2.score + questions.q3.score;

  const report = { total, questions };
  printReport(report);
  return report;
}

if (require.main === module) {
  gradeJS2Student();
}

module.exports = {
  gradeJS2Student,
};
