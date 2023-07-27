const { RadioPlayer, RadioStation, RadioPlayerEvent } = require('../lib')

// Initialize the radio player
const radioPlayer = new RadioPlayer({
    station: RadioStation.HitFM
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