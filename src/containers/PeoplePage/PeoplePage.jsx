import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withErrorApi } from "@hoc-helpers/withErrorApi";
import PeopleList from "@components/PeoplePage/PeopleList";
import PeopleNavigation from "@components/PeoplePage/PeopleNavigation";
import { getApiResource, changeHTTP } from "@utils/network";
import {
  getPeopleId,
  getPeopleImage,
  getPeoplePageId,
} from "@services/getPeopleData";
import { API_PEOPLE } from "@constants/api";
import { useQueryParams } from "@hooks/useQueryParams";

import styles from "./PeoplePage.module.css";

const PeoplePage = ({ setErrorApi }) => {
  const [people, setPeople] = useState(null);
  // ?   Хук useState - это один из основных хуков react,который позволяет функциональным компонентам иметь состояние.
  // todo  useState - принимает начальное состояние(массив,обьект,переменную что угодно),возврашает состояние и функцию,которая обновляет состояние.

  // const [errorApi, setErrorApi] = useState(false); // ?  false - означает все хорошо, данные пришли корректно, true - ошибка при запросе
  // аналогична этой записи
  //   const arr = useState(null);
  //   const people = arr[0];
  //   const setPeople = arr[1];

  const [prevPage, setPrevPage] = useState(null);
  const [nexPage, setNexPage] = useState(null);
  const [counterPage, setCounterPage] = useState(1);

  const query = useQueryParams();
  const queryPage = query.get("page");

  // console.log(prevPage, nexPage);

  const getResource = async (url) => {
    const res = await getApiResource(url);

    if (res) {
      const peopleList = res.results.map(({ name, url }) => {
        const id = getPeopleId(url);
        const img = getPeopleImage(id);

        return {
          id,
          name,
          img,
        };
      });

      setPeople(peopleList);
      setPrevPage(changeHTTP(res.previous));
      setNexPage(changeHTTP(res.next));
      setCounterPage(getPeoplePageId(url));
      setErrorApi(false);
    } else {
      setErrorApi(true);
    }
  };

  // todo Хук useEffect() заменяет три колбека жизненного цикла:
  // ? 1) componentDidMount() - вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам

  // ? 2) componentDidUpdate() - Метод позволяет работать с DOM при обновлении компонента.

  // ? 3) componentWillUnmount() - вызывается перед удалением компонента из DOM

  useEffect(() => {
    getResource(API_PEOPLE + queryPage);
  }, [queryPage]);

  return (
    <>
      <PeopleNavigation
        getResource={getResource}
        prevPage={prevPage}
        nextPage={nexPage}
        counterPage={counterPage}
      />
      {people && <PeopleList people={people} />}
    </>
  );
};

export default withErrorApi(PeoplePage);

// const names = ["Tony", "Jack", "Kate"];

// const names = ["Mark", "Tony", "Jack", "Kate"];
//               0        1       2       3
// ? Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива.

// todo Higher-Order component - это компонент, который принимает в себя другой компонент, навешивает на него определенные данные и возвращает этот же компонент обратно.
// Higher Order Components (HOC) — это функции, которые принимают компонент и возвращают новый компонент с дополнительным функционалом или измененными свойствами.
