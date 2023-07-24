import { RadioStation, RadioPlayerURL } from "./stations";
import { EventEmitter } from "events";
import https from "https";

export class RadioPlayer {
  station: RadioStation;
  protected refreshTime: number;
  playlist?: RadioSong[];
  currentSong?: RadioSong;
  currentDJ?: RadioDJ;
  private _updateInterval?: number | NodeJS.Timer;
  private _eventManager: EventEmitter;
  private _setDJEvent: boolean = false;
  private _setSongEvent: boolean = false;

  constructor(options: RadioPlayerOptions) {
    if (!options.station) throw new Error("No radio station provided");
    if (!Object.values(RadioStation).includes(options.station))
      throw new Error("Invalid radio station");
    this.station = options.station;

    this.refreshTime = options.refreshTime || 10000;
    if (isNaN(this.refreshTime) || this.refreshTime < 1000)
      throw new Error("Invalid refresh interval");

    this._eventManager = new EventEmitter();
  }

  /**
   * Start updating the playlist data
   */
  start(): void {
    this._updateInterval = setInterval(() => {
      this.update();
    }, this.refreshTime);
    this.update();
  }

  /**
   * Stop updating the playlist data
   */
  stop(): void {
    if (!this._updateInterval) return;
    clearInterval(this._updateInterval);
  }

  /**
   * Fetch the playlist data
   *
   * Calls appropriate events if the data has changed
   * @returns {Promise<void>}
   */
  async update(): Promise<void> {
    return new Promise((resolve, reject) => {
      // UnitedNews is a special case
      // It doesn't have a playlist, so we have to create a fake one
      if (this.station === RadioStation.UnitedNews) {
        if (!this.currentDJ && this._setDJEvent) {
          this.currentDJ = {
            absnum: "0",
            cur_time: "24/02/2022",
            djType: "news",
            end_time: "",
            img: "https://play.tavr.media/static/image/united_news.jpg",
            link: "",
            title: "Єдині Новини",
            player: this,
          };
          this._eventManager.emit(RadioPlayerEvent.DJ, this.currentDJ);
        }
        if (!this.currentSong && this._setSongEvent) {
          this.currentSong = {
            cover: "https://play.tavr.media/static/image/united_news.jpg",
            singer: "Єдині Новини",
            singer_id: "",
            singer_img: "https://play.tavr.media/static/image/united_news.jpg",
            singer_url: "",
            song: "Інформаціний марафон 24/7",
            song_id: "",
            stime: "24/02/2022",
            time: "24/02/2022",
            type: "",
            video: "",
            player: this,
          };
          this.playlist = [this.currentSong];
          this._eventManager.emit(RadioPlayerEvent.Song, this.currentSong);
        }
        return resolve();
      }

      const url = `https://o.tavrmedia.ua/${this.station}`;
      https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            this._parse(json);
          } catch (err) {
            this._eventManager.emit(RadioPlayerEvent.Error, err);
          }
          resolve();
        });
      });
    });
  }

  /**
   * Parse the playlist data
   * @param json JSON response from the server
   */
  private _parse(json: JSON): void {
    if (!Array.isArray(json)) throw new Error("Invalid response JSON");

    const playlist: RadioSong[] = json.slice(0, 4);
    const song = playlist[0];
    if (json[4]) {
      const dj: RadioDJ = json[4];
      dj.player = this;
      if (!this.currentDJ || dj.absnum !== this.currentDJ.absnum) {
        this.currentDJ = dj;
        this._eventManager.emit(RadioPlayerEvent.DJ, dj);
      }
    } else if (this.currentDJ) {
      this.currentDJ = undefined;
      this._eventManager.emit(RadioPlayerEvent.DJ, null);
    }

    for (const song of playlist) {
      song.player = this;
    }

    if (!this.currentSong || song.song_id !== this.currentSong.song_id) {
      this.currentSong = song;
      this._eventManager.emit(RadioPlayerEvent.Song, song);
    }

    this.playlist = playlist;
  }

  /**
   *
   * @param event Event name ({@link RadioPlayerEvent})
   * @param callback Function with any of the following arguments: {@link RadioSong}, {@link RadioDJ}, {@link Error}
   */
  on(event: RadioPlayerEvent, callback: (...args: any[]) => void): void {
    if (event === RadioPlayerEvent.DJ) this._setDJEvent = true;
    if (event === RadioPlayerEvent.Song) this._setSongEvent = true;
    this._eventManager.on(event, callback);
  }

  /**
   * Get the radio stream URL which can be used in external players
   * @param hd Whether to get the HD stream URL
   * @returns {string} Radio stream URL
   */
  getPlayerURL(hd?: boolean): string {
    const stationKey = Object.keys(RadioStation).find(
      (key) => (RadioStation as any)[key] === this.station
    );

    if (!stationKey) throw new Error("Invalid radio station");

    const url = (RadioPlayerURL as any)[stationKey];
    if (!url) throw new Error("Invalid radio station");

    if (hd) return url + "_HD";
    return url;
  }

  /**
   * Set the refresh interval for the playlist data
   * @param interval Refresh interval in milliseconds (minimum 1000)
   */
  setUpdateInterval(interval: number): void {
    if (isNaN(interval) || interval < 1000)
      throw new Error("Invalid refresh interval");
    this.refreshTime = interval;
    this.stop();
    this.start();
  }
}

interface RadioPlayerOptions {
  /**
   * Radio station
   */
  station: RadioStation;
  /**
   * Playlist data refresh interval in milliseconds (minimum 1000)
   */
  refreshTime?: number;
}

export enum RadioPlayerEvent {
  /**
   * Called when the current song changes
   */
  Song = "song",
  /**
   * Called when the current DJ changes
   */
  DJ = "dj",
  /**
   * Called when an error occurs
   */
  Error = "error",
}

interface RadioSong {
  /**
   * Song cover image URL
   */
  cover: string;
  /**
   * Singer name
   */
  singer: string;
  /**
   * Singer ID
   */
  singer_id: string;
  /**
   * Singer image URL
   */
  singer_img: string;
  /**
   * Singer URL
   */
  singer_url: string;
  /**
   * Song name
   */
  song: string;
  /**
   * Song ID
   */
  song_id: string;
  /**
   * Song start time (e.g. "13:45:00")
   */
  stime: string;
  /**
   * Song time (e.g. "13:45")
   */
  time: string;
  /**
   * Song type (usually empty)
   */
  type: string;
  /**
   * YouTube video ID
   */
  video: string;

  /**
   * RadioPlayer instance
   */
  player?: RadioPlayer;
}

interface RadioDJ {
  /**
   * DJ ID
   */
  absnum: string;
  /**
   * DJ hours (e.g. "11:00 - 18:00")
   */
  cur_time: string;
  /**
   * DJ type ("dj")
   */
  djType: string;
  /**
   * DJ end hour (e.g. "18:00")
   */
  end_time: string;
  /**
   * DJ image URL
   */
  img: string;
  /**
   * DJ profile URL (unused on official website)
   */
  link: string;
  /**
   * DJ name
   */
  title: string;

  /**
   * RadioPlayer instance
   */
  player?: RadioPlayer;
}
