export function saveKitchen(store) {
  store.subscribe((mutation, store) => {
    console.log(store);
    localStorage.setItem("kitchen", JSON.stringify(store.appForm));
  });
}
