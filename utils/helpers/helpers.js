import { expect } from '@playwright/test';

//авторизация по токену

export async function setAuthTokenV1(page, token) {
  await page.addInitScript((token) => {
    // eslint-disable-next-line no-undef
    localStorage.setItem('tokenJwt', token);
  }, token);
}
//авторизация по токену   изменение в названии переменной токена
export async function setAuthTokenV2(page, token) {
  await page.addInitScript((token) => {
    // eslint-disable-next-line no-undef
    localStorage.setItem('token', token);
  }, token);
}

export function getAuthBundle() {
  const inlineJson = (process.env.AUTH_BUNDLE_JSON || '').trim();
  if (inlineJson) {
    return JSON.parse(inlineJson);
  }

  const bundleBase64 = (process.env.AUTH_BUNDLE_JSON_B64 || '').trim();
  if (bundleBase64) {
    return JSON.parse(Buffer.from(bundleBase64, 'base64').toString('utf-8'));
  }

  return {};
}

export function getAuthTokenByProfile(profileKey = 'default') {
  const bundle = getAuthBundle();
  return bundle[profileKey] || bundle.default || '';
}

/** userId / realUserId from AUTH_BUNDLE JWT for PROFILE_KEY (packaging userCreatorId). */
export function getProfileUserId(profileKey = process.env.PROFILE_KEY || 'default') {
  const token = getAuthTokenByProfile(profileKey);

  if (!token) {
    throw new Error(`No auth token for profile "${profileKey}"`);
  }

  const [, payloadPart] = token.split('.');

  if (!payloadPart) {
    throw new Error(`Invalid JWT for profile "${profileKey}"`);
  }

  const payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8'));
  const userId = Number(payload.realUserId ?? payload.userId);

  if (!Number.isFinite(userId)) {
    throw new Error(`JWT for profile "${profileKey}" has no userId`);
  }

  return userId;
}

// Удаление лишних пробелов. работает стабильно
export async function containTextByIdSpace2(page, elementId, expectText) {
  // Создаём локатор для элемента по ID
  const locator = page.locator(`#${elementId}`);

  // Получаем текст элемента и обрабатываем его
  const actualText = await locator.textContent();
  const cleanedText = actualText.trim().replace(/\s+/g, ' '); // Удаляем лишние пробелы и переносы строк

  // Сравниваем с ожидаемым текстом
  expect(cleanedText).toBe(expectText);
}

// Проверяем значение в таблицах по константе таблицы и адресе ячейки (строка столбец)

export async function checkCellTextInTable(page, tableSelector, row, column, expectedText) {
  // Локатор карточки с таблицей
  const tableCard = tableSelector;

  // Локатор нужной ячейки таблицы
  const cell = tableCard.locator(`table tbody tr:nth-child(${row}) td:nth-child(${column})`);

  // Проверка текста
  await expect(cell).toHaveText(expectedText);
}

// Функция чистит просто строку (для JSON, констант и т.д.)
export function cleanString(text) {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
}

// Функция обращается к локатору и использует cleanString (очистку строки) внутри
export async function getCleanedText(locator) {
  const actualText = await locator.textContent();

  if (!actualText || actualText.trim().length === 0) {
    console.error(`Ошибка: Не удалось получить текст из локатора: ${locator}`);
    return 'ДАННЫЕ В ПОЛЕ ОТСУТСТВУЮТ';
  }

  // Вызываем общую логику очистки
  return cleanString(actualText);
}

//Функция осуществляет drag-and-drop элемента
export async function dragAndDrop(page, sourceElement, targetElement) {
  await sourceElement.waitFor({ state: 'visible' });
  await sourceElement.scrollIntoViewIfNeeded();

  const sourceBox = await sourceElement.boundingBox();
  const targetBox = await targetElement.boundingBox();

  if (!sourceBox || !targetBox) {
    throw new Error('Element not visible');
  }
  //Точка захвата: центр исходного элемента (отсюда начинаем drag)
  const startX = sourceBox.x + sourceBox.width / 2;
  const startY = sourceBox.y + sourceBox.height / 2;

  //Точка назначения: центр целевого элемента (сюда тянем элемент)
  const targetX = targetBox.x + targetBox.width / 2;
  const targetY = targetBox.y + targetBox.height / 2;

  //Реальный hover
  await page.mouse.move(startX, startY, { steps: 10 });

  //Зажимаем ЛКМ
  await page.mouse.down();
  await page.mouse.move(startX + 2, startY + 2, { steps: 2 });

  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(450); //Таймаут активации drag/resize в vis.js

  //Уже зажатой мышью тащим
  await page.mouse.move(targetX, targetY, { steps: 30 });

  //Отпускаем
  await page.mouse.up();
}

/**
 * Открывает новую вкладку через клик, внедряет токен и проверяет URL
 * @param {Object} page - текущая страница (this.page)
 * @param {Locator} clickLocator - локатор элемента, по которому кликаем
 * @param {string} token - токен авторизации
 * @param {RegExp|string} expectedUrl - ожидаемый URL (можно регулярку)
 * @returns {Promise<Object>} - возвращает объект новой страницы
 */
export async function openNewPageWithAuth(page, clickLocator, token = null, expectedUrl, skipWait = false) {
  // Ловим событие открытия новой вкладки
  const [newPage] = await Promise.all([page.context().waitForEvent('page'), clickLocator.click()]);

  // Внедряем токен только если он передан
  if (token) {
    await newPage.evaluate((t) => {
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', t);
    }, token);

    // Перезагружаем для применения токена
    await newPage.reload({ waitUntil: 'load' });
  } else if (!skipWait) {
    // Если токена нет (внешняя ссылка), просто ждем загрузки (если не просили пропустить)
    await newPage.waitForLoadState('load');
  }

  // Проверяем URL
  if (expectedUrl) {
    await expect(newPage).toHaveURL(expectedUrl);
  }

  return newPage;
}
/**
 * Принудительное закрытие всех вкладок, кроме основной
 * @param {Object} page - текущая страница (Playwright Page объект)
 */
export async function closeExtraTabs(page) {
  const pages = page.context().pages();
  for (const p of pages) {
    if (p !== page) {
      await p.close();
    }
  }
  await page.bringToFront();
}

/**
 * Проверяет текст тултипа при наведении на элемент
 * @param {Object} page - текущая страница (Playwright Page объект)
 * @param {Locator} targetLocator - локатор элемента, на который наводим
 * @param {string} expectedText - ожидаемый текст в подсказке
 */
export async function checkTooltip(page, targetLocator, expectedText) {
  await targetLocator.hover();

  const tooltip = page
    .locator('.v-tooltip__content:visible, .v-menu__content:visible, .v-overlay__content:visible')
    .filter({ hasText: expectedText })
    .first();

  await expect(
    tooltip,
    `Подсказка с текстом "${expectedText}" не появилась (искали в .v-tooltip__content и .v-menu__content)`
  ).toBeVisible();

  await page.mouse.move(0, 0);
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function isSorted(arr, order = 'asc') {
  const sorted = [...arr].sort((a, b) => (order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)));
  return JSON.stringify(arr) === JSON.stringify(sorted);
}

/**
 * Преобразует строку формата "24ч:00м" в общее количество минут (int)
 * @param {string} timeStr - Строка времени, например "15ч:31м" или "45м"
 * @returns {number} Общее количество минут в виде целого числа
 */
export function parseTimeToMinutes(timeStr) {
  if (!timeStr || timeStr.trim() === '-') return 0;

  // Ищем часы (перед "ч") и минуты (перед "м")
  const hoursMatch = timeStr.match(/(\d+)ч/);
  const minutesMatch = timeStr.match(/(\d+)м/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  return hours * 60 + minutes;
}

/**
 * Преобразует строку с процентами (например "83.09 %") в целое число (int),
 * удаляя дробную часть с помощью регулярного выражения.
 * @param {string} percentStr - Строка с процентом
 * @returns {number} Целое округленное число (int)
 */
export function parsePercentToInteger(percentStr) {
  if (!percentStr || percentStr.trim() === '-') return 0;

  // Регулярка \..* находит точку и отсекает всё, что идет после нее
  const cleanIntegerStr = percentStr.replace(/[^\d.]/g, '').replace(/\..*/, '');

  return parseInt(cleanIntegerStr, 10) || 0;
}
