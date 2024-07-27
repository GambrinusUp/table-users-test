// Функция сортирует массив пользователей в соответствии с конфигурацией сортировки.
export function sortUsers(users, sortingConfig) {
  // Находим активную конфигурацию сортировки, которая не имеет направления "default"
  const activeSortConfig = sortingConfig.find(
    (config) => config.sortDirection !== "default"
  );

  // Определяем порядок сортировки
  const effectiveSortOrder = activeSortConfig
    ? activeSortConfig.sortDirection
    : "desc";

  // Определяем ключ для сортировки (по умолчанию "id" если нет активной конфигурации)
  const effectiveKey = activeSortConfig ? activeSortConfig.column : "id";

  // Создаем новый массив пользователей и сортируем его
  return [...users].sort((a, b) => {
    let aValue, bValue;

    // Определяем значения для сортировки в зависимости от ключа
    if (effectiveKey === "name") {
      aValue = `${a.firstName} ${a.lastName}`;
      bValue = `${b.firstName} ${b.lastName}`;
    } else if (effectiveKey === "address") {
      aValue = `${a.address.city}, ${a.address.address}`;
      bValue = `${b.address.city}, ${b.address.address}`;
    } else {
      aValue = a[effectiveKey];
      bValue = b[effectiveKey];
    }

    // Сравниваем значения и возвращаем результат в зависимости от порядка сортировки
    if (aValue > bValue) return effectiveSortOrder === "asc" ? -1 : 1;
    if (aValue < bValue) return effectiveSortOrder === "asc" ? 1 : -1;
    return 0;
  });
}
