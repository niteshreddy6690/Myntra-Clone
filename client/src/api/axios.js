// const BASE_URL = "http://localhost:8080/api/";
// const Token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjM2MzJkOTI5NzlmMjZmZTU1YTMwZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTk4OTQ4OSwiZXhwIjoxNjU2NTk0Mjg5fQ.kwhatquK5iOrlFBSqyDM2ct36PntiJpVJJ_abBgw7os";

// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   header: { token: `Bearer ${Token}` },
// });

// import * as axios from "axios";
// import * as axios from "axios";
import axios from "axios";
import LocalStorageService from "./localStorage";

const isLocal = process.env.NODE_ENV === "development";
const isBrowser = typeof window !== "undefined";

const axiosInstance = (port) => {
  return axios.create({
    baseURL: isLocal
      ? `http://localhost:${port}/api/`
      : `${window.location.origin}/api/`,
    responseType: "json",
  });
};

const domainsAxiosInstances = axiosInstance("8080");

const interceptorsRequest = (domainInstance, port) => {
  domainInstance.interceptors.request.use(
    function (config) {
      const accessToken = isBrowser ? LocalStorageService.getAccessToken() : "";
      if (accessToken) {
        /* eslint-disable no-unused-expressions */
        (config.baseURL = isLocal
          ? `http://localhost:${port}/api/`
          : `${window.location.origin}/api/`),
          (config.headers.Authorization = `Bearer ${accessToken}`);
        return config;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

const domainResponse = (response) => {
  return response;
};

const ErrorResponse = async (error) => {
  if (error && error.response && error.response.status === 403) {
    try {
      const res = await domainsAxiosInstances.post("/auth/token", {
        refreshToken: LocalStorageService.getRefreshToken(),
      });
      if (res.data.AccessToken) {
        window.localStorage.setItem("AccessToken", res.data.AccessToken);
        // const { access } = data;
        // LocalStorageService.setToken(data);
        // authStore.setToken(data)
        const request = {
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${res.data.AccessToken}`,
          },
        };
        return domainsAxiosInstances.request(request);
      } else {
        return Promise.reject(error);
      }
    } catch (e) {
      const authUrl = isLocal
        ? "http://localhost:3000/login"
        : `${window.location.origin}/login`;
      window.location.href = authUrl;
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

const interceptorsResponse = (
  domainInstance,
  domainResponse,
  ErrorResponse
) => {
  domainInstance.interceptors.response.use(
    (response) => domainResponse(response),
    (error) => ErrorResponse(error)
  );
};

interceptorsRequest(domainsAxiosInstances, "8080");

interceptorsResponse(domainsAxiosInstances, domainResponse, ErrorResponse);

export { domainsAxiosInstances as request };
