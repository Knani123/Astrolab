//function to convert
export const convert = (toConvert, converted) => {
  let cur = 1;
  if (toConvert == converted) {
    cur = 1;
  } else if (toConvert == "EUR" && converted == "TND") {
    cur = 0.3;
  } else if (toConvert == "TND" && converted == "EUR") {
    cur = 3;
  } else if (toConvert == "TND" && converted == "USD") {
    cur = 2.7;
  } else if (toConvert == "USD" && converted == "TND") {
    cur = 0.35;
  } else if (toConvert == "EUR" && converted == "USD") {
    cur = 0.8;
  } else if (toConvert == "USD" && converted == "EUR") {
    cur = 1.2;
  }
  return cur;
};
// function to return currency Symbole

export const currencySymbole = (C) => {
  if (C == "USD") {
    return " $";
  }
  if (C == "EUR") {
    return "€";
  }
  if (C == "TND") {
    return "DT";
  }
};
