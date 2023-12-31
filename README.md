# TAVR Media Radio Library
![npm](https://img.shields.io/npm/v/%40prevter%2Ftavr-media-radio)
![npm type definitions](https://img.shields.io/npm/types/%40prevter%2Ftavr-media-radio)
![GitHub](https://img.shields.io/github/license/prevter/tavr-media-radio)  

Library for fetching radio stations' playlists and metadata.

## Disclaimer

This library is not affiliated with TAVR Media in any way. It is a third-party library that uses the TAVR Media API to fetch radio stations' playlists and metadata just like it works on the official website.

## Installation

```bash
npm install @prevter/tavr-media-radio
```

## Usage

```js
// Typescript:
import { RadioPlayer, RadioStation, RadioPlayerEvent } from '@prevter/tavr-media-radio'
// Javascript:
// const { RadioPlayer, RadioStation, RadioPlayerEvent } = require('@prevter/tavr-media-radio')

// Initialize the radio player
const radioPlayer = new RadioPlayer({
    station: RadioStation.HitFM // Scroll down for a list of all stations
});

// Get an audio/mpeg audio stream URL
console.log("SD Radio player URL:", radioPlayer.getPlayerURL());
console.log("HD Radio player URL:", radioPlayer.getPlayerURL(true));

// Event on song change
radioPlayer.on(RadioPlayerEvent.Song, (song) => {
    console.log("New song playing:", song);
    /*
    {
        start_time: '15:32',
        start_time_full: '15:32:28',
        singer: 'СКАЙ',
        song: 'Легковажна',
        image: 'https://static.hitfm.ua/hitfm/img/cover/716/500x500.jpg',
        url: 'https://www.youtube.com/watch?v=vvcmuEumLlA'
    }
    */
});

// Event on DJ change (works only for RadioStation.HitFM)
radioPlayer.on(RadioPlayerEvent.DJ, (dj) => {
    console.log("New DJ:", dj);
    /*
    {
        djType: 'dj',
        img: 'https://static.hitfm.ua/hitfm/img/header_dj/0/29/85x85.jpg',
        absnum: '29',
        title: 'Оля Громова',
        cur_time: '11:00 - 18:00',
        end_time: '18:00',
        link: '/dj/29-olia-gromova.html',
    }
    */
});

// Event on error
radioPlayer.on(RadioPlayerEvent.Error, (error) => {
    console.log("Error:", error);
});

// Start listening for events
radioPlayer.start();
```

## Stations

```js
enum RadioStation {
  HitFM = "hit",
  HitFMUkraine = "hitu",
  HitFMBest = "hitb",
  HitFMTop = "hitt",
  Bayraktar = "radio3bayraktar",
  Roks = "roks",
  RoksUkraine = "roksukr",
  RoksNew = "roksnew",
  RoksClassic = "rokscla",
  RoksHardnHeavy = "rokshar",
  RoksBallads = "roksbal",
  KissFM = "kiss",
  KissFMUkraine = "kissukr",
  KissFMDeep = "kissdeep",
  KissFMDigital = "kissdigital",
  Relax = "relax",
  RelaxUkraine = "relaxukr",
  RelaxInternational = "relaxint",
  RelaxCafe = "relaxcafe",
  RelaxInstrumental = "relaxinstrumental",
  MelodiaFM = "melodia",
  MelodiaFMInternational = "melodiaint",
  MelodiaFMDisco = "melodiad",
  MelodiaFMRomantic = "melodiar",
  NasheRadio = "nasheradio",
  NasheRadioUkraine = "nasheradio3ukr",
  RadioJazz = "jazz",
  RadioJazzUkraine = "jazz3ukr",
  RadioJazzGold = "jazz3gold",
  RadioJazzLight = "jazz3light",
  RadioJazzCover = "jazz3cover",
  RadioJazzGroove = "jazz3groove",
  ClassicRadio = "radio3classic",
  GuliayRadio = "radio3guliay",
  RadioGold = "radio3gold",
  FlashRadio = "radio3flash",
  IndieUARadio = "radio3indieua",
  RadioRitmoLatino = "radio3ritmo_latino",
  UnitedNews = "news",
}
```

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for more information.

## Building/Testing

You can build TypeScript files using:
```bash
npm run build
```

Then run test script using:
```bash
npm run test
```

You can also run shortcut command to build and test:
```bash
npm run build:test
```
