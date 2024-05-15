import { constant } from "@/utils/constant";

interface IFetchOptions {
  endpoint: string;
  body?: any;
  method?: string;
  authorization?: string;
  apiType?: boolean; // 0이면 http 1이면 소켓
}

interface IGetOptions {
  endpoint: string;
  authorization?: string;
  apiType?: boolean;
}

interface IPostOptions {
  endpoint: string;
  body?: any;
  authorization: string;
  apiType?: boolean;
}

const _fetch = async ({ method, endpoint, body, authorization, apiType }: IFetchOptions) => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authorization) {
    headers.Authorization = "Bearer " + authorization;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(!apiType ? constant.apiUrl + endpoint : constant.chatUrl + endpoint, requestOptions);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

const _get = async ({ endpoint, authorization, apiType }: IGetOptions) => {
  return _fetch({ method: "GET", endpoint, authorization, apiType });
};

const _post = async ({ endpoint, body, authorization, apiType }: IPostOptions) => {
  return _fetch({ method: "POST", endpoint, body, authorization, apiType });
};

const _patch = async ({ endpoint, body, authorization }: IPostOptions) => {
  return _fetch({ method: "PATCH", endpoint, body, authorization });
};

const api = {
  get: _get,
  post: _post,
  patch: _patch,
};

export default api;
