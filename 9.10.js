const getCar = (carName) => {
  if (cars[carName]) {
    console.log(cars[carName]);
  } else {
    console.log("Авто не найдено");
  }
};