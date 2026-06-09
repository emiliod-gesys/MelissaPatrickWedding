export function getMaxAttendees(extraGuests: number): number {
  return 1 + extraGuests;
}

export function getExtrasFromConfirmed(
  confirmedCount: number,
): number {
  return Math.max(0, confirmedCount - 1);
}
