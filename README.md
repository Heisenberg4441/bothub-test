# Инструкция по запуску
### Примечание: 
#### Версия Node.js должна быть v16.20.0

1. Скачайте репозиторий в любое место на вашем компьютере
2. Выполните в папке с репозиторием ```npm install```
4. Замените значение 'OPENAI_KEY' в файле config.ts на ваш токен доступа
5. Выполните ```npm start``` в директории с проектом
6. Сервер будет доступен по адресу http://localhost:3000/
7. Спецификация Swagger будет доступна по адресу http://localhost:3000/api-docs
### Примечание 2:
#### Swagger не работает с SSE, отправка запроса может быть выполнена только через Postman или любое другое приложение с поддержкой SSE
#### Значение 'ADMIN_TOKEN' в config.ts может быть любым и должно быть указано при запросе на эндпоинты с меткой [ADMIN]