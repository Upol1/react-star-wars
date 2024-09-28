/*
Формат CSS-переменной:
--theme-default-УникальноеИмя # дефолтная переменная
--theme-light-УникальноеИмя   # для "light"
--theme-dark-УникальноеИмя    # для "dark"
--theme-neitral-УникальноеИмя # для "neitral"
*/

export const changeCssVariables = (theme) => {
  const root = document.querySelector(":root");

  const cssVariables = ["header", "bgimage"];

  cssVariables.forEach((element) => {
    root.style.setProperty(
      `--theme-default-${element}`,
      `var(--theme-${theme}-${element})`
    );
  });
};

// ? Метод setProperty() устанавливает стиль. Может быть применён как к DOM-элементу, так и конкретному CSS-правилу.

// todo В первом случае специфичность будет у атрибута style, т. к. стили будут записаны инлайново. Во втором случае специфичность не изменится.
