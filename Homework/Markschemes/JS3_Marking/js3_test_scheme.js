// Run with: node js3_test_scheme.js
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const STUDENT_FILE = path.join(__dirname, "js3_student.js");

function extractFunctionSource(fileSource, functionName) {
  const pattern = new RegExp(
    `function\\s+${functionName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\}`,
    "m",
  );
  const match = fileSource.match(pattern);
  return match ? match[0] : "";
}

function getParameterCount(fileSource, functionName) {
  const match = fileSource.match(
    new RegExp(`function\\s+${functionName}\\s*\\(([^)]*)\\)`),
  );
  if (!match) {
    return 0;
  }

  const raw = match[1].trim();
  if (!raw) {
    return 0;
  }

  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean).length;
}

function isSameStringArray(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => String(item) === String(b[index]));
}

function outputContainsDayTemp(outputLines, day, temp) {
  const dayPattern = new RegExp(`\\b${day}\\s*-{1,2}>\\s*${temp}\\b`);
  return outputLines.some((line) => dayPattern.test(String(line)));
}

function runStudentFunction(studentSource, functionName, options = {}) {
  const { inputs = [], args = [] } = options;
  const promptCalls = [];
  const consoleLogs = [];
  const alertLogs = [];
  let inputIndex = 0;

  const context = {
    console: {
      log: (...vals) => consoleLogs.push(vals.map(String).join(" ")),
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
    vm.runInContext(studentSource, context, { filename: "js3_student.js" });
  } catch (error) {
    return {
      runtimeError: `Failed loading student file: ${error.message}`,
      promptCalls,
      consoleLogs,
      alertLogs,
      returnValue: undefined,
    };
  }

  if (typeof context[functionName] !== "function") {
    return {
      runtimeError: `${functionName} is not defined.`,
      promptCalls,
      consoleLogs,
      alertLogs,
      returnValue: undefined,
    };
  }

  try {
    const returnValue = context[functionName](...args);
    return {
      runtimeError: null,
      promptCalls,
      consoleLogs,
      alertLogs,
      returnValue,
    };
  } catch (error) {
    return {
      runtimeError: `${functionName} crashed: ${error.message}`,
      promptCalls,
      consoleLogs,
      alertLogs,
      returnValue: undefined,
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
  const q1Source = extractFunctionSource(studentSource, "q1");
  const testInputs = ["Zoe", "Amy", "Mina", "Bob", "Carl"];
  const expectedSorted = [...testInputs].sort();

  const run = runStudentFunction(studentSource, "q1", { inputs: testInputs });

  const hasEmptyArrayInit =
    /\[\s*\]/.test(q1Source) || /new\s+Array\s*\(/.test(q1Source);
  const hasPromptUse =
    /prompt\s*\(/.test(q1Source) && run.promptCalls.length === 5;
  const hasPush = /\.push\s*\(/.test(q1Source);
  const hasLoop =
    /(for\s*\(|while\s*\(|for\s*\w+\s+of\s+)/.test(q1Source) &&
    run.promptCalls.length === 5;
  const hasSort = /\.sort\s*\(/.test(q1Source);
  const returnsSortedArray =
    Array.isArray(run.returnValue) &&
    isSameStringArray(run.returnValue, expectedSorted);

  const criteria = [
    markCriterion(hasEmptyArrayInit, "Empty array initialized"),
    markCriterion(
      hasPromptUse,
      "Prompt for name",
      `Prompt count captured: ${run.promptCalls.length}`,
    ),
    markCriterion(hasPush, "Array Push"),
    markCriterion(
      hasLoop,
      "Use of loop (repeat 5)",
      `Prompt count captured: ${run.promptCalls.length}`,
    ),
    markCriterion(hasSort, "Sort Array"),
    markCriterion(
      returnsSortedArray,
      "Return Array",
      "Expected returned array sorted alphabetically.",
    ),
  ];

  return { run, criteria };
}

function gradeQ2(studentSource) {
  const q2Source = extractFunctionSource(studentSource, "q2");
  const runA = runStudentFunction(studentSource, "q2", {
    args: [[80, 85, 87, 86, 88, 90]],
  });
  const runB = runStudentFunction(studentSource, "q2", { args: [[100]] });
  const runC = runStudentFunction(studentSource, "q2", {
    args: [[10, 20, 30, 40]],
  });

  const hasOneParam = getParameterCount(studentSource, "q2") === 1;
  const accumulatorInitZero = /\b(?:let|var|const)\s+\w+\s*=\s*0\b/.test(
    q2Source,
  );
  const loopsThroughArray = /(for\s*\(|for\s+\w+\s+of\s+\w+|forEach\s*\()/.test(
    q2Source,
  );
  const addsEachMark =
    /\b\w+\s*\+=\s*\w+/.test(q2Source) ||
    /\b\w+\s*=\s*\w+\s*\+\s*\w+/.test(q2Source);
  const calculatesAverage =
    /\/\s*\w+\.length/.test(q2Source) ||
    /\.reduce\s*\([\s\S]*\)\s*\/\s*\w+\.length/.test(q2Source);
  const returnsAverage =
    runA.runtimeError === null &&
    runB.runtimeError === null &&
    runC.runtimeError === null &&
    typeof runA.returnValue === "number" &&
    typeof runB.returnValue === "number" &&
    typeof runC.returnValue === "number" &&
    Math.abs(runA.returnValue - 86) <= 0.02 &&
    Math.abs(runB.returnValue - 100) <= 0.02 &&
    Math.abs(runC.returnValue - 25) <= 0.02;

  const criteria = [
    markCriterion(hasOneParam, "Parameter: one array"),
    markCriterion(accumulatorInitZero, "Total initialized at 0"),
    markCriterion(loopsThroughArray, "Loop through each mark in array"),
    markCriterion(addsEachMark, "Each mark added to total"),
    markCriterion(calculatesAverage, "Average calculation"),
    markCriterion(
      returnsAverage,
      "Return average",
      "Expected returns: 86, 100, and 25 for three test arrays.",
    ),
  ];

  return { run: runA, criteria };
}

function gradeQ3(studentSource) {
  const q3Source = extractFunctionSource(studentSource, "q3");
  const runA = runStudentFunction(studentSource, "q3", {
    args: [[13, 15, 13, 18, 20, 18, 22], 20],
  });
  const runB = runStudentFunction(studentSource, "q3", {
    args: [[14, 11, 18, 19, 20], 15],
  });
  const runC = runStudentFunction(studentSource, "q3", {
    args: [[-5, -2, 0, 4, 5, 12, 6], 10],
  });

  const run = runA;
  const allOutput = [...run.consoleLogs, ...run.alertLogs];
  const outputText = allOutput.join("\n");

  const hasTwoParams = getParameterCount(studentSource, "q3") === 2;
  const loopsThroughTemps = /(for\s*\(|for\s+\w+\s+of\s+\w+|while\s*\()/.test(
    q3Source,
  );
  const dayCalculated =
    /\+\+/.test(q3Source) ||
    /\+=\s*1/.test(q3Source) ||
    (/\breturn\b/.test(q3Source) && /\bif\b/.test(q3Source));

  const printsDayAndTemp =
    outputContainsDayTemp(allOutput, 1, 13) &&
    outputContainsDayTemp(allOutput, 2, 15) &&
    outputContainsDayTemp(allOutput, 5, 20);

  const stopsAtGoal =
    runA.runtimeError === null &&
    runB.runtimeError === null &&
    runC.runtimeError === null &&
    typeof runA.returnValue === "number" &&
    typeof runB.returnValue === "number" &&
    typeof runC.returnValue === "number" &&
    Math.abs(runA.returnValue - 5) <= 0.02 &&
    Math.abs(runB.returnValue - 3) <= 0.02 &&
    Math.abs(runC.returnValue - 6) <= 0.02 &&
    !/\b6\s*-{1,2}>\s*18\b/.test(outputText) &&
    !/\b7\s*-{1,2}>\s*22\b/.test(outputText);

  const returnsDay =
    typeof run.returnValue === "number" &&
    Math.abs(run.returnValue - 5) <= 0.02;

  const criteria = [
    markCriterion(hasTwoParams, "Parameter: one array and one number"),
    markCriterion(loopsThroughTemps, "Loop through each temperature in array"),
    markCriterion(dayCalculated, "Day calculated"),
    markCriterion(
      printsDayAndTemp,
      "Print to screen the day and temperature",
      "Expected output like: 1 --> 13 ... 5 --> 20",
    ),
    markCriterion(
      stopsAtGoal,
      "Stop when goal temperature is reached",
      "Should stop printing after first day meeting or exceeding goal.",
    ),
    markCriterion(
      returnsDay,
      "Return day",
      "Expected return value: 5 for [13,15,13,18,20,18,22] with goal 20.",
    ),
  ];

  return { run, criteria };
}

function questionScore(criteria) {
  return criteria.reduce((sum, item) => sum + item.score, 0);
}

function printReport(report) {
  console.log("JS3 Assignment - Automated Marking Report");
  console.log("=".repeat(50));

  ["q1", "q2", "q3"].forEach((qName) => {
    const q = report.questions[qName];
    console.log(`${qName.toUpperCase()}: ${q.score}/6`);
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

  console.log(`TOTAL: ${report.total}/18`);
}

function gradeJS3Student() {
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
  gradeJS3Student();
}

module.exports = {
  gradeJS3Student,
};
