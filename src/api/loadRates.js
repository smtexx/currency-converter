export async function loadRates(selectorFn) {
  const url = 'https://open.er-api.com/v6/latest/USD';
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return {
        data: selectorFn(data),
      };
    } else {
      throw new Error(`Server send code ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    return {
      error: 'Невозможно обновить данные с сервера',
    };
  }
}
