export const profiles: Record<string, { [k: number]: { [k: number]: { aw: number, percent: number } } }> = {
  medium: {
    0.5: {
      0.5: { aw: 0.048, percent: 50.63 },
      1: { aw: 0.052, percent: 62.89 },
      2: { aw: 0.074, percent: 133.33 },
      4: { aw: 0.102, percent: 220.13 },
    },
    1: {
      0.5: { aw: 0.043, percent: 33.96 },
      1: { aw: 0.047, percent: 48.11 },
      2: { aw: 0.053, percent: 67.30 },
      4: { aw: 0.064, percent: 100.94 },
    },
    2: {
      0.5: { aw: 0.046, percent: 43.08 },
      1: { aw: 0.045, percent: 40.25 },
      2: { aw: 0.044, percent: 39.31 },
      4: { aw: 0.059, percent: 84.28 },
    }
  }
}