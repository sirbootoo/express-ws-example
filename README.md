# Express Websocket and fetching unique elements in an array


## Rest Side
This helps find unique elements in an array in the **Unique Elements route**

```
    /uniqueElements
```

This route accepts an array and returns an array of unique elements.


## Websocket Side
This websocket route helps fetch list of cryptocurrencies from **Coin Gecko** and emits an event every 3 seconds.

```
    /coins
```