export function vesselPosition(index: number, time: number) {
  const phase = (time / 100) * Math.PI * 2;
  return {
    x: [215, 365, 465][index] + Math.sin(phase + index) * [65, 50, 38][index],
    y: [180, 255, 145][index] + Math.cos(phase + index) * [40, 48, 35][index],
  };
}

export type WorkflowStep =
  "prepare" | "execute" | "verify" | "finding" | "fix" | "reverify" | "accept";
export function workflowSteps(withFinding: boolean): WorkflowStep[] {
  return withFinding
    ? ["prepare", "execute", "verify", "finding", "fix", "reverify", "accept"]
    : ["prepare", "execute", "verify", "accept"];
}
