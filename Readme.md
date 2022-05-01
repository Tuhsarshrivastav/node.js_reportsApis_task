## Problem Statement:

You are required to build an express JS API web-service which captures user contributed reports and returns an aggregate report in response.

Each report consists of a market-commodity combination for which prices in the Mandi(Market) are provided in a certain unit (along with their conversion factor to base unit - Kg).
You need to combine the reports per market-commodity by calculating the average of the report prices.

The algorithm to generate the aggregate report is as below:

1. Look for an existing report with marketID-cmdtyID in the DB [1].
2. Convert the prices into base price based on the base unit [2]
3. Calculate the mean of prices.
4. Save the aggregated report with price per Kg.
5. Return the reportID of the generated report.

## To run the API:

1. You need to install POSTMAN to test api requests.
2. Need to install mongodbcompass to see the datas stored in mongodb.

**Make Sure Postman's Content-Type:application/json**
<image src="./images/postman.PNG"  >

## Considered Test Case:-

```
Request-1:
POST /reports
{
  "reportDetails": {
    "userID": "user-x",
    "marketID": "market-5",
    "marketName": "Vashi Navi Mumbai",
    "cmdtyID": "cmdty-5",
    "marketType": "Mandi",
    "cmdtyName": "Potato",
    "priceUnit": "Pack",
    "convFctr": 50,
    "price": 800
  }
}

Response-1:
{
	status: "success",
	reportID: "949832f8-48c7-4cb2-8dcd-98f046a9a2e3"
}
```

<image src="./images/post1.PNG"  >
<image src="./images/res1.PNG"  >

```
Request-2:
POST /reports
{
    "reportDetails": {
      "userID": "user-2",
      "marketID": "market-5",
      "marketName": "Vashi Navi Mumbai",
      "cmdtyID": "cmdty-5",
      "cmdtyName": "Potato",
      "priceUnit": "Quintal",
      "convFctr": 100,
      "price": 1800
    }
}

	Response-2:
{
	status: "success",
	reportID: "949832f8-48c7-4cb2-8dcd-98f046a9a2e3"
}
```

<image src="./images/post2.PNG">
<image src="./images/res2.PNG"  >

## Get request:

`http://localhost:5000/reports?reportID=04c1e1fd-1578-48e7-b98e-1e824820908d`

```
response:-
{
   "_id": "0ebf5bcc-5559-43fd-9277-f5100854e912",
   "cmdtyName": "Potato",
   "cmdtyID": "cmdty-5",
   "marketID": "market-5",
   "marketName": "Vashi Navi Mumbai",
   "users": [
       "user-x",
       "user-2"
   ],
   "timestamp": "2022-04-28T16:21:46.949Z",
   "priceUnit": "Kg",
   "price": 17
}
```

<image src="./images/getHead.PNG">
<image src="./images/getres.PNG">
