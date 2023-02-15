export const sortArrayOfObjects = (arr: any, key: any) => {
  return arr.sort((a: any, b: any) => {
    return a[key] - b[key];
  });
};
