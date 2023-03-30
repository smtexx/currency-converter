export function createStateCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
