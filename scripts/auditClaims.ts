import { domains } from "../data/domains";
import { sections } from "../data/sections";

const FORBIDDEN_TERMS = [
  "diagnosis",
  "disease",
  "abnormal",
  "dangerous",
  "damaged",
  "risk score",
  "treatment",
  "clearance",
  "safe",
  "unsafe",
  "healthy",
  "unhealthy",
  "predicts",
  "clinically significant",
  "pathology",
];

const NEGATION_PATTERNS = [
  "not a",
  "not",
  "no",
  "do not",
  "does not",
  "cannot",
  "never",
  "avoid",
];

interface Violation {
  location: string;
  term: string;
  context: string;
}

function isNegationContext(text: string, termIndex: number): boolean {
  const beforeText = text.substring(Math.max(0, termIndex - 50), termIndex).toLowerCase();
  return NEGATION_PATTERNS.some((pattern) => beforeText.includes(pattern));
}

function scanText(text: string, location: string): Violation[] {
  const violations: Violation[] = [];
  const lowerText = text.toLowerCase();

  for (const term of FORBIDDEN_TERMS) {
    let index = lowerText.indexOf(term);
    while (index !== -1) {
      if (!isNegationContext(text, index)) {
        const contextStart = Math.max(0, index - 30);
        const contextEnd = Math.min(text.length, index + term.length + 30);
        const context = text.substring(contextStart, contextEnd);

        violations.push({
          location,
          term,
          context: `...${context}...`,
        });
      }
      index = lowerText.indexOf(term, index + 1);
    }
  }

  return violations;
}

function scanObject(obj: any, path: string): Violation[] {
  let violations: Violation[] = [];

  if (typeof obj === "string") {
    violations = violations.concat(scanText(obj, path));
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      violations = violations.concat(scanObject(item, `${path}[${index}]`));
    });
  } else if (typeof obj === "object" && obj !== null) {
    Object.entries(obj).forEach(([key, value]) => {
      violations = violations.concat(scanObject(value, `${path}.${key}`));
    });
  }

  return violations;
}

function validateDomainCompleteness(): string[] {
  const issues: string[] = [];

  Object.entries(domains).forEach(([id, domain]) => {
    if (!domain.sourceIds || domain.sourceIds.length === 0) {
      issues.push(`Domain ${id}: missing sourceIds`);
    }
    if (!domain.evidence?.assays || domain.evidence.assays.length === 0) {
      issues.push(`Domain ${id}: missing evidence.assays`);
    }
    if (!domain.observedTimepoints || domain.observedTimepoints.length === 0) {
      issues.push(`Domain ${id}: missing observedTimepoints`);
    }
    if (!domain.confidence) {
      issues.push(`Domain ${id}: missing confidence`);
    }
    if (!domain.caution || domain.caution.trim() === "") {
      issues.push(`Domain ${id}: missing caution`);
    }
    if (!domain.notClaiming || domain.notClaiming.length === 0) {
      issues.push(`Domain ${id}: missing notClaiming`);
    }
    if (!domain.missionPlanningRelevance || domain.missionPlanningRelevance.trim() === "") {
      issues.push(`Domain ${id}: missing missionPlanningRelevance`);
    }
  });

  return issues;
}

function main() {
  console.log("🔍 Auditing claim language safety...\n");

  let allViolations: Violation[] = [];

  // Scan domains
  console.log("Scanning domains.ts...");
  const domainViolations = scanObject(domains, "domains");
  allViolations = allViolations.concat(domainViolations);

  // Scan sections
  console.log("Scanning sections.ts...");
  const sectionViolations = scanObject(sections, "sections");
  allViolations = allViolations.concat(sectionViolations);

  // Check domain completeness
  console.log("\nValidating domain data completeness...");
  const completenessIssues = validateDomainCompleteness();

  // Report results
  console.log("\n" + "=".repeat(60));
  console.log("AUDIT RESULTS");
  console.log("=".repeat(60) + "\n");

  if (allViolations.length > 0) {
    console.log(`❌ Found ${allViolations.length} forbidden term violation(s):\n`);
    allViolations.forEach((v, index) => {
      console.log(`${index + 1}. Location: ${v.location}`);
      console.log(`   Term: "${v.term}"`);
      console.log(`   Context: ${v.context}`);
      console.log();
    });
  } else {
    console.log("✅ No forbidden term violations found\n");
  }

  if (completenessIssues.length > 0) {
    console.log(`⚠️  Found ${completenessIssues.length} data completeness issue(s):\n`);
    completenessIssues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
    console.log();
  } else {
    console.log("✅ All domain data complete\n");
  }

  const hasErrors = allViolations.length > 0 || completenessIssues.length > 0;

  if (hasErrors) {
    console.log("=".repeat(60));
    console.log("AUDIT FAILED");
    console.log("=".repeat(60));
    process.exit(1);
  } else {
    console.log("=".repeat(60));
    console.log("AUDIT PASSED");
    console.log("=".repeat(60));
    process.exit(0);
  }
}

main();
