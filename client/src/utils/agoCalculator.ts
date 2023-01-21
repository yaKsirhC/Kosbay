export default function agoCalculator(dt: number): string {
  let periodTime: number | string = dt / 1000;
  if (periodTime >= 3600 * 24) {
    periodTime = Math.floor(periodTime / (3600 * 24)) + "d";
  }
  if (periodTime >= 3600) {
    periodTime = Math.floor((periodTime as number) / 3600) + "hr";
  }
  if (periodTime >= 60) {
    periodTime = Math.floor((periodTime as number) / 60) + "min";
  }
  if (periodTime < 60) {
    periodTime = Math.floor(periodTime as number) + "s";
  }

  return periodTime as string;
}
