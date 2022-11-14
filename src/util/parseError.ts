export const parseError = (e: any) => {
  const msg = parseErrorMessage(e);
  return {
    message: msg,
    data: e as any,
  };
};

export const parseErrorMessage = (e: any) => {
  let errMessage = "Failed to fetch, unknown error";

  if (e instanceof Error) {
    errMessage = `Failed to fetch: ${getErrorMessage(e)}`;
  }
  return errMessage;
};

export const getErrorMessage = (e: any) => {
  let errMessage = "unknown error";

  if (e instanceof Error) {
    errMessage = `${e.message}`;
  }
  return errMessage;
};
