export interface CoachInput {
  pnl: number;
  riskPct: number;
  plannedRiskPct: number;
  stopUsed: boolean;
  targetUsed: boolean;
  followedPlan: boolean;
  revengeTrade: boolean;
  overtraded: boolean;
  drawdownPct: number;
}

export interface CoachAssessment {
  processScore: number;
  riskScore: number;
  disciplineScore: number;
  totalScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  lessons: string[];
  nextAction: string;
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function assessTrade(input: CoachInput): CoachAssessment {
  let riskScore = 100;
  let disciplineScore = 100;
  let processScore = 100;
  const lessons: string[] = [];

  const riskDeviation = Math.abs(input.riskPct - input.plannedRiskPct);
  riskScore -= Math.min(60, riskDeviation * 40);
  if (input.riskPct > input.plannedRiskPct) lessons.push('You exceeded planned risk. Reduce position size before the next trade.');
  if (input.drawdownPct > 5) lessons.push('Drawdown is elevated. Protect capital and reduce exposure.');
  if (!input.stopUsed) {
    riskScore -= 30;
    lessons.push('A protective stop was not used. Define invalidation before entering.');
  }
  if (!input.targetUsed) lessons.push('Define an exit target or explicit management rule before entering.');

  if (!input.followedPlan) {
    disciplineScore -= 35;
    processScore -= 25;
    lessons.push('The trade diverged from the written plan. Record why before repeating the setup.');
  }
  if (input.revengeTrade) {
    disciplineScore -= 40;
    processScore -= 20;
    lessons.push('Possible revenge trading detected. Pause and reset rather than chasing losses.');
  }
  if (input.overtraded) {
    disciplineScore -= 30;
    lessons.push('Overtrading detected. Wait for qualified setups.');
  }

  if (input.pnl > 0 && input.followedPlan) lessons.push('Positive outcome with process discipline. Keep the process repeatable rather than increasing risk.');
  if (input.pnl < 0 && input.followedPlan) lessons.push('A losing trade can still be a good trade when risk and process were respected.');

  riskScore = clamp(riskScore);
  disciplineScore = clamp(disciplineScore);
  processScore = clamp(processScore);
  const totalScore = Math.round(riskScore * 0.4 + disciplineScore * 0.35 + processScore * 0.25);
  const grade = totalScore >= 90 ? 'A' : totalScore >= 80 ? 'B' : totalScore >= 70 ? 'C' : totalScore >= 60 ? 'D' : 'F';

  return {
    processScore,
    riskScore,
    disciplineScore,
    totalScore,
    grade,
    lessons,
    nextAction: totalScore >= 80
      ? 'Continue simulation and build a larger sample without increasing risk.'
      : 'Stay in training. Fix the identified process issue before seeking funding.',
  };
}
