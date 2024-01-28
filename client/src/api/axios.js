import axios from "axios";
import LocalStorageService from "./localStorage";
const isLocal = process.env.NODE_ENV === "development";
const isBrowser = typeof window !== "undefined";

const axiosInstance = (port) => {
  return axios.create({
    baseURL: isLocal
      ? `http://localhost:${port}/api/`
      : `https://myntra-clone-a6xl.onrender.com/api/`,
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
          : `https://myntra-clone-a6xl.onrender.com/api/`),
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
      const { data } = await domainsAxiosInstances.post(
        "/auth/refresh-tokens",
        {
          refreshToken: LocalStorageService.getRefreshToken(),
        }
      );
      if (data.AccessToken) {
        window.localStorage.setItem("AccessToken", data.AccessToken);
        // authStore.setToken(data)
        const request = {
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${data.AccessToken}`,
          },
        };
        return domainsAxiosInstances.request(request);
      } else {
        return Promise.reject(error);
      }
    } catch (e) {
      const authUrl = isLocal
        ? "http://localhost:3000/login"
        : `https://myntra-clone-a6xl.onrender.com/api/login`;

      // : `${window.location.origin}/login`;
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
