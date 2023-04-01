export function addCashing(loadFunc, storageKey) {
  if (!localStorage) {
    console.error('LocalStorage is not available for cashing');
    return loadFunc;
  }
  return async function (...args) {
    const dataString = localStorage.getItem(storageKey);
    let cashedData;
    // Extract cash from storage
    if (dataString) {
      try {
        const dataObj = JSON.parse(dataString);
        if (
          'nextUpdate' in dataObj.data &&
          dataObj.data.nextUpdate >= Date.now()
        ) {
          cashedData = dataObj;
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Get request and cash data
    if (!cashedData) {
      const newData = await loadFunc(...args);
      // Cash data if it is valid
      if (!newData.error) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(newData));
        } catch (error) {
          console.error(error);
        }
      }
      return newData;
    } else {
      return cashedData;
    }
  };
}
