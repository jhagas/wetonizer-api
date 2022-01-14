<!--
 Copyright (c) 2022 jhagas
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Javanese Calendar API
Public API build in nodejs (express) that takes gregorian calendar input `yyyy-mm-dd` and return various javanese calendar value corresponding to the input value it gets.

I hardcode (as variable) the kurup (120 years cycle) to 24 March 1936, which the day when kurup Asapon began. Often time, the kurup cycle is determined by kasultanan yogya or mataram, so i think hardcoding should be the best option. The next kurup will happen in year 1986 Javanese (or maybe sooner). 

More info about javanese calendar:
1. [Wikipedia Bahasa Indonesia, kalender jawa](https://id.wikipedia.org/wiki/Kalender_Jawa)
2. [Basic algorithm kalender jawa](http://kalenderimlek.blogspot.com/2017/11/warsa-lambang-dan-windu-dalam-kalender.html)

## About Algorithm
Although javanese calendar is hardly based on hijri (islamic) calendar. It's not really the same. So taking gregorian to hijri algorithm and rename the name of month to javanese one often time get a pretty bad result.

Everything is calculated from the days from epoch time to input date. Using some declarations (or definitions) taken from Wikipedia article above, i can calculate any value in javanese calendar (except Kurup).

In the code I use the term 'biasa' and 'kabisat'. Biasa (Javanese:wastu) is an usual year, and kabisat (Javanese:wuntu) is a leap year

## About `hariid/idHari` and `pasaranid/idPasaran`
I suppose you know a little bit about javanese calendar from articles above. I take idPasaran and idHari from UNIX Epoch time (1 Jan 1970), not from Kurup Asapon Epoch.

| ID | Hari | Pasaran |
|---|---|---|
| 0 | Selasa | Pon |
| 1 | Rabu | Wage |
| 2 | Kamis | Kliwon |
| 3 | Jum'at | Legi |
| 4 | Sabtu | Pahing |
| 5 | Minggu | - |
| 6 | Senin | - |

## URL (Input)
```
https://domain/yyyy-mm-dd
```

use GET request, CORS enabled by default. You can use in your project, whatever you want.
Just deploy in your own server to make sure everything run smoothly.

IMPORTANT : All date since 1936-03-24 is valid, and if you input a date before it, it returns an error due to the Epoch (beginning of kurup) being referenced.

## Output (JSON Schema)


## Deployment
I will be using Vercel as demonstration for this API. I predict this express server will be resource intensive (on large scale) because the number calculations it makes.