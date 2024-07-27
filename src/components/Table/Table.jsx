// @ts-nocheck
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../components/Modal/Modal";
import { createHeaders } from "../../helpers/createHeaders";
import { getFullAddress } from "../../helpers/getFullAddress";
import { getFullNameUser } from "../../helpers/getFullNameUser";
import useResizableTable from "../../hooks//useResizableTable";
import useModal from "../../hooks/useModal";
import useTableHeight from "../../hooks/useTableHeight";
import {
  fetchUsers,
  fetchUserById,
} from "../../store/users/usersActionCreator";
import { setSortingConfig } from "../../store/users/usersSlice";
import { headers } from "../../utils/headers";
import styles from "../Table/Table.module.scss";

function Table() {
  const dispatch = useDispatch();
  // Получение состояния пользователей и других данных из Redux store
  const { users, selectedUser, isLoading, error, sortingConfig } = useSelector(
    (state) => state.users
  );

  const tableElement = useRef(null); // Ссылка на таблицу
  const tableHeight = useTableHeight(tableElement, users.length); // Хук для обновления высоты таблицы
  const columns = createHeaders(headers); // Создание заголовков таблицы
  const { mouseDown, activeIndex } = useResizableTable(columns, tableElement); // Хук для изменения ширины столбцов
  const { isOpen, toggle } = useModal(); // Хук для управления модальным окном

  // Получение пользователей
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Обработка ошибок
  useEffect(() => {
    if (error) alert(`Произошла ошибка: ${error}`);
  }, [error]);

  // Изменение конфигурации сортировки, при клике на соответствующий заголовок
  const handleChangeSort = useCallback(
    (columnName) => {
      if (columnName === "phone") return;
      const activeSortConfig = sortingConfig.find(
        (config) => config.column === columnName
      );
      // Определение нового направления сортировки
      const newDirection =
        activeSortConfig?.sortDirection === "default"
          ? "asc"
          : activeSortConfig?.sortDirection === "asc"
          ? "desc"
          : "default";
      console.log(newDirection);
      dispatch(
        setSortingConfig({ column: columnName, sortDirection: newDirection })
      );
    },
    [dispatch, sortingConfig]
  );

  // Функция для открытия модального окна и получения данных о пользователе по его ID
  const handleOpenModal = (userId) => {
    toggle();
    dispatch(fetchUserById(userId));
  };

  // Функция для получения символа сортировки
  const getSorting = (columnName) => {
    const directionMap = {
      default: "↕",
      desc: "↑",
      asc: "↓",
    };

    const columnConfig = sortingConfig.find(
      (config) => config.column === columnName
    );

    return directionMap[columnConfig?.sortDirection] || "↕";
  };

  // Отображение индикатора загрузки, если данные еще загружаются
  if (isLoading)
    return (
      <div className={styles.table_container}>
        <span className={styles.table_loader}></span>
      </div>
    );

  return (
    <div className={styles.table_container}>
      <table ref={tableElement}>
        <thead>
          <tr>
            {columns.map(({ ref, text }, index) => (
              <th
                ref={ref}
                key={text.name}
                onClick={() => handleChangeSort(text.column)}
              >
                {text.column !== "phone" ? (
                  <span>{text && text.name}</span>
                ) : (
                  <span>{text && text.name}</span>
                )}
                {text.column !== "phone" && getSorting(text.column)}
                <div
                  style={{ height: tableHeight }}
                  onMouseDown={(e) => mouseDown(index, e)}
                  className={`${styles.resizeHandle} ${
                    activeIndex === index ? styles.active : ""
                  }`}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr
                key={user.id}
                onClick={() => {
                  handleOpenModal(user.id);
                }}
              >
                <td>
                  <span>
                    {getFullNameUser(
                      user.firstName,
                      user.lastName,
                      user.maidenName
                    )}
                  </span>
                </td>
                <td>
                  <span>{user.age}</span>
                </td>
                <td>
                  <span>{user.gender}</span>
                </td>
                <td>
                  <span>{user.phone}</span>
                </td>
                <td>
                  <span>{getFullAddress(user.address)}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!isLoading &&
        !error &&
        users.length === 0 && ( // Если массив пользователей пуст, то выводим сообщение
          <span>Нет совпадений</span>
        )}
      <Modal isOpen={isOpen} toggle={toggle} user={selectedUser} />
    </div>
  );
}

export default Table;
