export const saveContactData = (contactData) => {
  try {
    const serializedState = JSON.stringify(contactData);
    localStorage.setItem('ContactBook', serializedState);
  } catch (e) {
    console.error('Error: ', e);
  }
};

export const loadContactData = () => {
  try {
    const localStorageDate = localStorage.getItem('ContactBook');
    if (localStorageDate === null) return undefined;
    return JSON.parse(localStorageDate);
  } catch (e) {
    return undefined;
  }
};
