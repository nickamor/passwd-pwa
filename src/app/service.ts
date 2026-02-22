export const registerServiceWorker = () => {
  if (!navigator.serviceWorker) {
    console.warn("Service Workers unsupported");
    return Promise.reject("Service Workers unsupported");
  }

  return navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Service Worker registered", reg))
    .catch((err) => console.error("Unable to register Service Worker", err));
};
