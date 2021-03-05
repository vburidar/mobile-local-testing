import Client from "./client";

const accept = "application/json";

export interface MyHelloDto {
  hello: string;
}

class MyClient {
  client: Client;

  constructor() {
    this.client = new Client(process.env.REACT_APP_BACKEND_URL ?? "", accept);
  }

  getData = async (): Promise<MyHelloDto | undefined> => {
    try {
      const response = await this.client.get(`/`);
      return response;
    } catch (error) {
      return;
    }
  };
}

export default new MyClient();
