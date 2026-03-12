export const registerServiceWorker = () => {
  if (!navigator.serviceWorker) {
    console.warn("Service Workers unsupported");
    return Promise.reject("Service Workers unsupported");
  }

  // If a service worker already controls this page, resolve immediately
  if (navigator.serviceWorker.controller) {
    console.log("Service Worker already active");
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        console.log("Service Worker registered", reg);

        const sw = reg.installing || reg.waiting || reg.active;
        if (!sw) return reject("No service worker found after registration");

        if (sw.state === "activated") {
          resolve();
          return;
        }

        sw.addEventListener("statechange", () => {
          if (sw.state === "activated") {
            resolve();
          }
        });
      })
      .catch((err) => {
        console.error("Unable to register Service Worker", err);
        reject(err);
      });
  });
};
