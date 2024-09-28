import { HTTP, HTTPS } from "@constants/api";

/**
 * Изменяем URL с HTTP на HTTPS
 * @param {String} url - url для изменения
 * @returns {String} - url с HTTPS
 */

export const changeHTTP = (url) => {
  const result = url ? url.replace(HTTP, HTTPS) : url;

  return result;
};

/**
 * Отправляет запрос Fetch
 * @param {String} url - url для запроса
 * @returns {Promise} - Promise с результатом запроса
 */
export const getApiResource = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error("Could not fetch.", res.status);
      return false;
    }

    return await res.json();
  } catch (error) {
    console.error("Could not fetch.", error.message);
    return false;
  }
};

// ? С помощью функции fetch() можно отправлять сетевые запросы на сервер — как получать, так и отправлять данные.  Метод возвращает промис с объектом ответа, где находится дополнительная информация (статус ответа, заголовки) и ответ на запрос.

// getApiResource(SWAPI_ROOT+SWAPI_PEOPLE)
//     .then(body => console.log(body))

// (async () => {
//   const body = await getApiResource(SWAPI_ROOT + SWAPI_PEOPLE);
//   console.log(body);
// })();

//  todo JSDoc (/** */) - это язык разметки, используемый для аннотирования исходного кода JavaScript с использованием комментариев. Аннотации обрабатывается различными инструментами для создания документации в доступных форматах, таких как HTML и Rich Text Format.

export const makeConcurrentRequest = async (urls) => {
  const res = await Promise.all(
    urls.map((res) => {
      return fetch(res).then((res) => res.json());
    })
  );

  return res;
};
