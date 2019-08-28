
export const setToken = (tokenpassed) => {
  window.localStorage.setItem('assignment-tracker-storage', tokenpassed);
  // console.log(`Local Storage Set`)
}


export const getToken = () => {
  // console.log(`Token Was Pulled from Local Storage`)
  return window.localStorage.getItem('assignment-tracker-storage');
}


export const removeToken = () => {
  window.localStorage.removeItem('assignment-tracker-storage')
}
