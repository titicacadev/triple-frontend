export function deriveCurrentStateAndCount({
  initialState,
  initialCount,
  currentState,
}: {
  initialState?: boolean | unknown
  initialCount?: number
  currentState?: boolean | unknown
}) {
  if (typeof initialState !== 'boolean' || typeof currentState !== 'boolean') {
    /* At least one of the status are unknown: Reduces to a bitwise OR operation */
    return {
      state: !!initialState || !!currentState,
      count: Number(initialCount || 0),
    }
  }

  return {
    state: currentState,
    count:
      initialState === currentState
        ? initialCount
        : currentState
        ? Number(initialCount || 0) + 1
        : Number(initialCount || 0) - 1,
  }
}
