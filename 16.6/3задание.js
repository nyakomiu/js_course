function globalError() {
  const error = Error('Глобальная ошибка');
  error.name = 'GlobalError';
  throw error;
}

function localError() {
  const error = Error('Локальная ошибка');
  error.name = 'LocalError';
  throw error;
}

function testErrorScope(fn) {
  try {
    try {
      fn();
    } catch (error) {
      console.log('Обнаружена локальная ошибка');
      console.error(error);
      // Если это глобальная ошибка, перебрасываем её во внешний блок catch
      if (error.name === 'GlobalError') {
        throw error;
      }
    }
  } catch (error) {
    console.log('Обнаружена глобальная ошибка');
    console.error(error);
  }
}

testErrorScope(localError);
testErrorScope(globalError);