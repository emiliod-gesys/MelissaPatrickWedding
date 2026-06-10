export function getMaxAttendees(extraGuests: number, isConyugal = false): number {
  if (isConyugal) return 2;
  return 1 + extraGuests;
}

export function getExtrasFromConfirmed(
  confirmedCount: number,
): number {
  return Math.max(0, confirmedCount - 1);
}
