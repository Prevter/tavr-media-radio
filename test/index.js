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
        stime: '18:07:23',
        time: '18:07',
        singer: 'Metro Boomin',
        song: "Creepin' (feat. The Weeknd & 21 Savage)",
        song_id: '3183',
        singer_id: '1397',
        song_url: 'https://www.hitfm.ua/music/1397-metro-boomin/3183-creepin-feat-the-weeknd-and-21-savage/',
        singer_url: 'https://www.hitfm.ua/music/1397-metro-boomin/',
        type: '',
        video: '61ymOWwOwuk',
        singer_img: 'https://www.hitfm.ua/static/img/content/music/1397/400x210.jpg',      
        cover: 'https://www.hitfm.ua/static/img/content/cover/1397/500x500.jpg',
    }
    */
});

// Event on DJ change
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