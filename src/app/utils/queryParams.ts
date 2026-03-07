const queryParams = new URLSearchParams(window.location.search);

export const getQueryParam = (key: string) => {
  return queryParams.get(key);
};

export const setQueryParam = (key: string, value: string) => {
  queryParams.set(key, value);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${queryParams}`,
  );
};
