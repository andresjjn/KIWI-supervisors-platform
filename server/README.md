# API APPLICATION

## Routes

/api/v1/days/

- Get - Get all days
- Post - Create Day

/api/v1/days/:date

- Get - Get day
- Delete - Delete day

/api/v1/days/:date/hours

- Get - Get hours
- Post - Create hour

/api/v1/days/:date/hours/:hour

- Get - Get Hour
- Put - Modify Hour
- Delete - Delete a day

/api/v1/days/:date/hours/:hour/slots
Get - Get slots
Put - Modify slots

| HTTP METHOD | POST            | GET       | PUT                                 | DELETE          |
| ----------- | --------------- | --------- | ----------------------------------- | --------------- |
| CRUD OP     | CREATE          | READ      | UPDATE                              | DELETE          |
| /dogs       | Create new dogs | List dogs | Bulk update                         | Delete all dogs |
| /dogs/1234  | Error           | Show Bo   | If exists, update Bo; If not, error | Delete Bo       |
