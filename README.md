# Тестовое задание на вакансию NodeJS backend dev в [EffectiveMobile](https://effective-mobile.ru/)

## Описание задания
2 сервиса на Express.js: **Users** и **History**.

В сервисе **Users** 3 endpoint'а:
1. **POST /api** - создание пользователя (в теле запроса должны быть {email, username, password})
1. **PUT /api** - изменение пользователя (в теле запросы должны быть {email, username, password} и хотя бы одно из {new_username, new_password})
1. **GET /api** - получение списка пользователей

В сервис **History** 2 endpoint'а:
1. POST /api - создание новой записи (в теле запроса должны быть {userId, action, old_value, new_value, time_stamp})
1. GET /api - получение записей (query-строка \[!не body\] может содержать ключи userId, page и pageSize)


Общение сервисов происходит через http запросы.
Для доступа к сервису истории действий в заголовке запроса должен находиться хэдер: Token: 'access token'.
Проверку этой "авторизации" можно убрать в файле "History/middlewares/authMiddleware.js"

СУБД - postgresql.

## Про БД
sql-запросы для создания таблиц лежат в /Users/database/database.sql и /History/database/database.sql

Таблица Users:
{id, email, username, password}

Таблица Events:
{id, user_id, action, old_value, new_value, time_stamp}

## Запуск
Для запуска нужно:
1. клонировать репозиторий
1. создать БД (или две) с таблицами Users и Events и обновить файл config.js
1. выполнить из Users последовательно `npm install` и `npm start`
1. выполнить из History последовательно `npm install` и `npm start`

Для создания БД и таблиц в консоли psql:
1. `create database users_service; create database history_service;`
2. `\connect users_service;`
3. `CREATE TABLE users (id SERIAL, email VARCHAR(64) PRIMARY KEY NOT NULL, username VARCHAR(32) NOT NULL, password VARCHAR(32) NOT NULL, UNIQUE(email));`
4. `\connect history_service`
5. `CREATE TABLE events (id SERIAL PRIMARY KEY, user_id INTEGER, action VARCHAR(32), old_value VARCHAR(32), new_value VARCHAR(32), time_stamp TIMESTAMP);`

## Заметки
Тестировал через Postman.
На выполнение потрачено шесть часов.
