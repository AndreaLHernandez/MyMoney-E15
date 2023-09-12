## Generar listado de movimientos
[Regresar](.)

- Query
```
-typeMov: Puede ser ingreso o egreso

-filter: Puede ser day, week, month, year o tag

-iDate:Solo aplica para day, week, month, year

-fDate:Solo aplica para day, week, month, year

-tTag: Solo aplica para tag, de la lista de conceptos guardados
```

- Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3NiwiZW1haWwiOiJsdWN5X2lrYXRAaG90bWFpbC5jb20iLCJzdGF0dXNEZWxldGUiOmZhbHNlLCJzdGF0dXNBY3QiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjItMDUtMDVUMDI6NDQ6NDYuMTc3WiIsInVwZGF0ZWRBdCI6IjIwMjItMDUtMDVUMDI6NDU6MDQuODU3WiJ9LCJpYXQiOjE2NTQ2NDM3MDIsImV4cCI6MTY1NDY0NDMwMn0.l8RS2Pchk6LfWYl-4FvU6sjYSWr5g-icQw35dWpXxyE
```
- Salida
```
Status code 404 No moves found

Status code 200 ok
[
    {
        "id": 1,
        "description": "Comida kfc",
        "movementDate": "2022-06-06T00:00:00.000Z",
        "amount": 200,
        "conceptId": 2,
        "accountId": 1,
        "image": "/profiles/1654661403857.jpeg",
        "typeMov": "egreso",
        "statusDelete": false,
        "createdAt": "2022-06-08T04:10:03.857Z",
        "updatedAt": "2022-06-08T04:10:03.857Z",
        "accounts": {
            "id": 1,
            "name": "Santander1",
            "numberAccount": "1211277676",
            "publicKey": null,
            "typeAccount": "credito",
            "CVE": null,
            "balance": 1455,
            "cutoffDate": "2022-07-13T00:00:00.000Z",
            "statusDelete": false,
            "userId": 1,
            "createdAt": "2022-06-08T03:31:34.007Z",
            "updatedAt": "2022-06-08T03:31:34.007Z"
        }
    }
]


```
