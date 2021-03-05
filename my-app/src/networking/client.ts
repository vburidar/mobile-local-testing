import request from "superagent";

type Method = "get" | "post" | "put" | "patch" | "delete";

class Client {
  baseUrl: string;
  accept: string;
  agent: request.SuperAgentStatic & request.Request;

  constructor(baseUrl: string, accept = "application/json") {
    this.baseUrl = baseUrl;
    this.accept = accept;
    this.agent = request.agent();
    this.agent.accept(this.accept).set('Bypass-Tunnel-Reminder', 'true');
  }

  async request(method: Method, endpoint: string, data: object | null = null) {
    const url = /^http?:\/\//.test(endpoint)
      ? endpoint
      : `${this.baseUrl}${endpoint}`;
    let promise = this.agent[method](url);

    if (["post", "put", "patch"].includes(method) && data) {
      promise = promise.send(data);
    }

    if (this.accept === "text/html") {
      const response = await promise;
      return response.text;
    }

    const { body } = await promise;
    return body;
  }

  get(endpoint: string) {
    return this.request('get', endpoint);
  }
}

export default Client;
