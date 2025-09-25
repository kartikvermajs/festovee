// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
//   withCredentials: true,
// });

// let isRefreshing = false;
// let refreshSubscribers: (() => void)[] = [];

// const handleLogout = () => {
//   if (window.location.pathname !== "/login") {
//     window.location.href = "/login";
//   }
// };

// //Handle adding a new access token to queued requests
// const subscribeTokenRefresh = (callback: () => void) => {
//   refreshSubscribers.push(callback);
// };

// //Execute queued requests after refresh
// const onRefreshSuccess = () => {
//   refreshSubscribers.forEach((callback) => callback());
//   refreshSubscribers = [];
// };

// //handeling api requests
// axiosInstance.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );

// //Handle expired tokens and refresh logic
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     //prevent infinite retry loop
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           subscribeTokenRefresh(() => resolve(axiosInstance(originalRequest)));
//         });
//       }

//       (originalRequest._retry = true), (isRefreshing = true);
//       try {
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_SERVER_URI}/api/refresh-token`,
//           {},
//           { withCredentials: true }
//         );

//         isRefreshing = false;
//         onRefreshSuccess();

//         return axiosInstance(originalRequest);
//       } catch (error) {
//         isRefreshing = false;
//         refreshSubscribers = [];
//         handleLogout();
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// apps/seller-ui/src/utils/sellerAxiosInstance.ts
import axios from "axios";

const sellerAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
  withCredentials: true, // send cookies automatically
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

// Redirect to login on logout
const handleLogout = () => {
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

// Queue requests while token is refreshing
const subscribeTokenRefresh = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

// Execute queued requests after refresh
const onRefreshSuccess = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

// Request interceptor (optional, can set headers dynamically)
sellerAxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 / token refresh
sellerAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once to prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() =>
            resolve(sellerAxiosInstance(originalRequest))
          );
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call seller refresh token endpoint
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/refresh-token`,
          {},
          { withCredentials: true } // important to send seller-refresh-token cookie
        );

        isRefreshing = false;
        onRefreshSuccess();

        return sellerAxiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default sellerAxiosInstance;
