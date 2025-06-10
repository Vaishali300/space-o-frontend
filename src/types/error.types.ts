export interface IAxiosError {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
}
