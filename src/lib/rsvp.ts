export function getMaxAttendees(extraGuests: number, isConyugal = false): number {
  if (isConyugal) return 2 + extraGuests;
  return 1 + extraGuests;
}

export function getBaseAttendees(isConyugal = false): number {
  return isConyugal ? 2 : 1;
}

export function getExtrasFromConfirmed(
  confirmedCount: number,
): number {
  return Math.max(0, confirmedCount - 1);
}
