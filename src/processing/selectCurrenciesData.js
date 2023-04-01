export function selectCurrenciesData(data) {
  const { time_last_update_unix, time_next_update_unix, rates } =
    data;
  return {
    updated: time_last_update_unix * 1000,
    nextUpdate: time_next_update_unix * 1000,
    rates,
  };
}
