# API Documentation

  * [API /auth](#auth)
  * [API /api/solar_panels](#api-solar-panels

## API /auth
### <a id=auth-index></a>index
#### Get a JSON Web Token for the currrent User
##### Request
* __Method:__ GET
* __Path:__ /auth
* __Request headers:__
```
accept: application/json
```
* __Request body:__
```json
{
  "email": "dummy@email.com",
  "password": "dummypasss"
}
```
##### Response
* __Status__: 200
* __Response headers:__
```
content-type: application/json; charset=utf-8
cache-control: max-age=0, private, must-revalidate
```
* __Response body:__
```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTU2Njg5NDA4NiwiZXhwIjoxNTY2OTgwNDg2fQ.EKvNMvYs-4BbhBi15u5oqnCHWZoYUkPozX7XLZPEWkE"
}
```

## API /api/solar_panels
### <a id=api-solar-panels-index></a>index
#### List all Solar Panels for the logged User (limit: 20, filtered by User state)
##### Request
* __Method:__ GET
* __Path:__ /api/solar_panels
* __Request headers:__
```
accept: application/json
```

##### Response
* __Status__: 200
* __Response headers:__
```
content-type: application/json; charset=utf-8
cache-control: max-age=0, private, must-revalidate
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTU2Njg5NDA4NiwiZXhwIjoxNTY2OTgwNDg2fQ.EKvNMvYs-4BbhBi15u5oqnCHWZoYUkPozX7XLZPEWkE
```
* __Response body:__
```json
{
  "solarPanels": [
    {
      "id": 1,
      "dataProvider": "California Public Utilities Commission (Currently Interconnected Dataset)",
      "installationDate": "2015-12-22T00:00:00.000Z",
      "systemSize": 4.725,
      "zipCode": "91913",
      "state": "CA",
      "cost": 494.3319052,
      "createdAt": "2019-08-27T07:43:30.258Z",
      "updatedAt": "2019-08-27T07:43:30.258Z"
    },
    {
      "id": 2,
      "dataProvider": "California Public Utilities Commission (Currently Interconnected Dataset) & California Public Utilities Commission (California Solar Initiative)",
      "installationDate": "2009-12-14T00:00:00.000Z",
      "systemSize": 1.505,
      "zipCode": "92113",
      "state": "CA",
      "cost": 609.2389144,
      "createdAt": "2019-08-27T07:43:30.258Z",
      "updatedAt": "2019-08-27T07:43:30.258Z"
    },
    {
      "id": 3,
      "dataProvider": "California Public Utilities Commission (Currently Interconnected Dataset)",
      "installationDate": "2015-12-16T00:00:00.000Z",
      "systemSize": 6.36,
      "zipCode": "92009",
      "state": "CA",
      "cost": 665.3864375,
      "createdAt": "2019-08-27T07:43:30.258Z",
      "updatedAt": "2019-08-27T07:43:30.258Z"
    },
  ]
}
```
#### Filter Options:

| field               | type   | function                             | Example                                                   |
|---------------------|--------|--------------------------------------|-----------------------------------------------------------|
| zipCode             | String | US Address Zip Code                  | ```{"zipCdde": "92024"}```                                |
| dataProvider        | String | Entry data provider (Can be partial) | ```{"dataProvider": "Commission"}```                      |
| minCost             | Number | Minimum cost desired                 | ```("minCost": 350)```                                    |
| maxCost             | Number | Maximum cost desired                 | ```{"maxCosta": 1000}```                                  |
| minInstallationDate | String | Minimum Date desired (JS ISO String) | ```{"minIstallationDate" : "2019-08-27T07:43:30.258Z"}``` |
| maxInstallationDate | String | Maximum Date desired (JS ISO String) | ```{"maxIstallationDate" : "2016-01-11T00:00:00.000Z"}``` |


*Note:* All fileds can be combined.
