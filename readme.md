<!--
 Copyright (c) 2022 jhagas
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Javanese Calendar API
Public API build in nodejs (express) that takes gregorian calendar input `yyyy-mm-dd` and return various javanese calendar value in input date.

I hardcode (as variable) the kurup (120 years cycle) to 24 March 1936, which the day when kurup Asapon began. Often time, the kurup cycle is determined by kasultanan yogya or mataram, so i think hardcoding it will be the best options.

More info about javanese calendar:
1. [Wikipedia Bahasa Indonesia, kalender jawa](https://id.wikipedia.org/wiki/Kalender_Jawa)
2. [Basic algorithm kalender jawa](http://kalenderimlek.blogspot.com/2017/11/warsa-lambang-dan-windu-dalam-kalender.html)

## Algorithm
Everything is calculated from the days from epoch time to input date. Using some declaration taken from Wikipedia article above, i can calculate any value in javanese calendar (except Kurup).

## About `hariid/idHari` and `pasaranid/idPasaran`
I suppose you know a little bit about javanese calendar from articles above. I take idPasaran and idHari from UNIX Epoch time (1 Jan 1970), not from Kurup Asapon Epoch.

| ID | Hari | Pasaran |
|---|---|---|
| 0 | Kamis | Wage |
| 1 | Jum'at | Kliwon |
| 2 | Sabtu | Legi |
| 3 | Minggu | Pahing |
| 4 | Senin | Pon |
| 5 | Selasa | - |
| 6 | Rabu | - |

## URL (Input)
```
https://domain/yyyy-mm-dd
```

use GET request, CORS enabled. You can use in your project, whatever you want.
Just deploy in your own server to make sure everything run smoothly.

## Output (JSON Schema)

## Deployment