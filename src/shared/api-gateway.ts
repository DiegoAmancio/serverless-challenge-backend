export const formatJSONResponse = (response: any, statusCode = 200) => {
  return {
    statusCode: statusCode,
    body: response,
  };
};
export const createdResponse = () => ({
  statusCode: 201,
});

export const internalServerErrorResponse = () =>
  formatJSONResponse({ message: 'INTERNAL Server Error' }, 500);
