# Project - Support Ticket API

## Prerequisites

- Node.js 22+
- npm 

## Setup

```bash
git clone <repo> "./ticket_management_system"

cd ticket_management_system/day19

cp .env.example .env

npm i

npm run setup:db

npm run dev
```

The API starts on `http://localhost:3000`.

Swagger documentation is available at `http://localhost:3000/api/docs`.

### Testing

```bash
# Set DATABASE_URL in .env to TEST DATABASE 
npm run test
```

## Endpoints

### Health Check

- **Method** : `GET`
- **Path** : `/health`
- **Description** : Checks health of server
- **Response Body**
```json
{
    "status": "up"
}
```

### Create User

- **Method** : `POST`
- **Path** : `/api/auth/user`
- **Description** : Creates User
- **Auth Token**: 
```txt
Bearer : 'Token'
```
- **Request Body** 
```json
{
    "name": "vaisakh",
    "email": "vaisakh@example.com",
    "password": "*********",
    "role": "user"
}
```
- **Response Body**
```json
{
    "user_id": "85abf173-1f5f-4c72-ae83-397948089243",
    "role": "user"
}
```

### Login User

- **Method** : `POST`
- **Path** : `/api/auth/login`
- **Description** : logins User
- **Request Body** 
```json
{
    "email": "vaisakh@example.com",
    "password": "*********",
}
```
- **Response Body**
```json
{
    "payload": {
        "user_id": "85abf173-1f5f-4c72-ae83-397948089243",
        "role": "user"
    },
    "token": "1c8de132-09c2-429f-85c8-dfc8249faed3.2d862d6a-0de1-4a48-80b1-555c42491325.fbe32a06-f002-4eb7-8a32-462f17c94ac5"
}
```

### Get User

- **Method** : `GET`
- **Path** : `/api/auth/me`
- **Description** : logins User
- **Auth Token**: 
```txt
Bearer : 'Token'
```
- **Response Body**
```json
{
    "user": {
        "user_id": "85abf173-1f5f-4c72-ae83-397948089243",
        "role": "user"
    }
}
```

### Get all tickets

- **Method** : `GET`
- **Path** : `/api/tickets`
- **Description** : Get all tickets
- **Auth Token**: 
```txt
Bearer : 'Token'
```
- **Response Body**
```json
{
    "payload": [
        {
            "id": "9dfc44a7-ba97-4b31-a338-ba69146c41c6",
            "title": "some title",
            "description": "some description",
            "priority": "low",
            "status": "pending",
            "assignee": "vaisakh"
        }
    ]
}
```

### Add ticket

- **Method** : `POST`
- **Path** : `/api/tickets`
- **Description** : Creates ticket
- **Auth Token**: 
```txt
Bearer : 'Token'
```
- **Request Body**
```json
{
    "title": "some title",
    "description": "some description",
    "priority": "low",
    "category_id": 1
}
```
- **Response Body**
```json
{
    "id": "9dfc44a7-ba97-4b31-a338-ba69146c41c6",
    "title": "some title",
    "description": "some description",
    "priority": "low",
    "status": "pending",
    "assignee": "vaisakh"
}
```

### Get ticket

- **Method** : `GET`
- **Path** : `/api/tickets/:id`
- **Description** : get ticket of id
- **Auth Token**: 
```txt
Bearer : 'Token'
```
- **Response Body**
```json
{
    "id": "9dfc44a7-ba97-4b31-a338-ba69146c41c6",
    "title": "some title",
    "description": "some description",
    "priority": "low",
    "status": "pending",
    "assignee": "vaisakh"
}
```

### Update ticket status

- **Method** : `PATCH`
- **Path** : `/api/tickets/:id/status`
- **Description** : Update status of ticket of id
- **Auth Token**: 
```txt
Bearer : 'Token'
```
- **Request Body**
```json
{
    "status": "complete"
}
```
- **Response Body**
```json
{
    "message": "Ticket of id: 9dfc44a7-ba97-4b31-a338-ba69146c41c6 was updated"
}
```

### Update ticket assignee

- **Method** : `PATCH`
- **Path** : `/api/tickets/:id/assignee`
- **Description** : Update assignee of ticket of id
- **Auth Token**: 
```txt
Bearer : 'Token'
```
- **Request Body**
```json
{
    "assignee": "vaisakh"
}
```
- **Response Body**
```json
{
    "message": "Ticket of id: 9dfc44a7-ba97-4b31-a338-ba69146c41c6 was updated"
}
```

### delete ticket

- **Method** : `DELETE`
- **Path** : `/api/tickets/:id`
- **Description** : delete ticket of id
- **Auth Token**: 
```txt
Bearer : 'Token'
```
- **Response Body**
```json
{
    "message": "Ticket of id: 9dfc44a7-ba97-4b31-a338-ba69146c41c6 was deleted"
}
```