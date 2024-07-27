import styles from "./Modal.module.scss";

import { getFullNameUser } from "../..//helpers/getFullNameUser";
import { getFullAddress } from "../../helpers/getFullAddress";

function Modal({ user, isOpen, toggle }) {
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={toggle}>
          <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
            {user ? (
              <>
                <h4>Информация о пользователе:</h4>
                <span>
                  ФИО:{" "}
                  {getFullNameUser(
                    user.firstName,
                    user.lastName,
                    user.maidenName
                  )}
                </span>
                <span>Возраст: {user.age}</span>
                <span>Адрес: {getFullAddress(user.address)}</span>
                <span>Рост: {user.height}</span>
                <span>Вес: {user.weight}</span>
                <span>Номер телефона: {user.phone}</span>
                <span>Email-адрес: {user.email}</span>
                <span className={styles.link} onClick={toggle}>
                  Закрыть
                </span>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
