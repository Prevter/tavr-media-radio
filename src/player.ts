import { RadioStation, RadioPlayerURL, RadioCoverURL } from "./stations";
import { EventEmitter } from "events";
import https from "https";

export class RadioPlayer {
  station: RadioStation;
  coverURL: string;
  protected refreshTime: number;
  playlist?: RadioSong[];
  currentSong?: RadioSong;
  currentDJ?: RadioDJ;
  private _isPlaying: boolean = false;
  private _updateInterval?: number | NodeJS.Timer;
  private _eventManager: EventEmitter;
  private _setSongEvent: boolean = false;

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  constructor(options: RadioPlayerOptions) {
    if (!options.station) throw new Error("No radio station provided");
    if (!Object.values(RadioStation).includes(options.station))
      throw new Error("Invalid radio station");
    this.station = options.station;
    this.coverURL = RadioCoverURL[this.station];

    this.refreshTime = options.refreshTime || 10000;
    if (isNaN(this.refreshTime) || this.refreshTime < 1000)
      throw new Error("Invalid refresh interval");

    this._eventManager = new EventEmitter();
  }

  /** Start updating the playlist data */
  start(): void {
    if (this._isPlaying) return;

    this._isPlaying = true;
    this._updateInterval = setInterval(() => {
      this.update();
    }, this.refreshTime);
    this.update();
  }

  /** Stop updating the playlist data */
  stop(): void {
    if (!this._isPlaying) return;
    clearInterval(this._updateInterval);
    this._isPlaying = false;
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
        if (!this.currentSong && this._setSongEvent) {
          this.currentSong = {
            start_time: "24/02/2022",
            start_time_full: "24/02/2022",
            singer: "Єдині Новини",
            song: "Інформаціний марафон 24/7",
            image: RadioCoverURL.news,
            url: null,
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

    const playlist: RadioSong[] = json
      .slice(0, 4)
      .map((s) => this._parseSong(s));
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

    if (!this.currentSong || song.song !== this.currentSong.song) {
      this.currentSong = song;
      this._eventManager.emit(RadioPlayerEvent.Song, song);
    }

    this.playlist = playlist;
  }

  private _parseSong(song: any): RadioSong {
    const mapped_keys: any = {
      start_time: { type: "direct", keys: ["time"] },
      start_time_full: { type: "direct", keys: ["stime", "time"] },
      singer: { type: "direct", keys: ["singer"] },
      song: { type: "direct", keys: ["song"] },
      image: { type: "direct", keys: ["cover", "img"], default: this.coverURL },
      url: {
        type: "parse",
        keys: [
          {
            name: "video",
            parse: (value: string) => {
              if (!value) return null;
              return `https://www.youtube.com/watch?v=${value}`;
            },
          },
          "song_url",
        ],
        default: null,
      },
    };

    const result: any = { player: this };

    for (const key in mapped_keys) {
      const keyData = mapped_keys[key];
      if (keyData.type === "direct") {
        for (const k of keyData.keys) {
          if (song[k]) {
            result[key] = song[k];
            break;
          }
        }
      } else if (keyData.type === "parse") {
        for (const k of keyData.keys) {
          if (typeof k === "string") {
            if (song[k]) {
              result[key] = song[k];
              break;
            }
          } else if (typeof k === "object") {
            if (song[k.name]) {
              result[key] = k.parse(song[k.name]);
              break;
            }
          }
        }
      }
      if (!result[key] && keyData.default) result[key] = keyData.default;
    }

    return result;
  }

  /**
   * @param event Event name ({@link RadioPlayerEvent})
   * @param callback Function with any of the following arguments: {@link RadioSong}, {@link RadioDJ}, {@link Error}
   */
  on(event: RadioPlayerEvent, callback: (...args: any[]) => void): void {
    if (event === RadioPlayerEvent.Song) this._setSongEvent = true;
    this._eventManager.on(event, callback);
  }

  /**
   * Get the radio stream URL which can be used in external players
   * @param hd Whether to get the HD stream URL
   * @returns {string} Radio stream URL
   */
  getPlayerURL(hd?: boolean): string {
    const url = RadioPlayerURL[this.station];
    if (!url) throw new Error("Invalid radio station");

    // If HD is requested, append "_HD" to the URL
    // (except for UnitedNews, which doesn't have an HD stream)
    if (hd && this.station !== RadioStation.UnitedNews) return url + "_HD";
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
  /** Radio station */
  station: RadioStation;
  /** Playlist data refresh interval in milliseconds (minimum 1000) */
  refreshTime?: number;
}

export enum RadioPlayerEvent {
  /** Called when the current song changes */
  Song = "song",
  /** Called when the current DJ changes */
  DJ = "dj",
  /** Called when an error occurs */
  Error = "error",
}

interface RadioSong {
  /** Time, when song started playing (e.g. "14:45") */
  start_time: string;
  /** Same as {@link start_time}, but also have seconds (there are exceptions) */
  start_time_full: string;
  /** Author/Singer name */
  singer: string;
  /** Song name */
  song: string;

  /** Image URL. If no provided, contains default radio cover URL */
  image: string;
  /** Song URL if provided. Can be a YouTube link or direct link to radio website */
  url: string | null;

  /** RadioPlayer instance */
  player?: RadioPlayer;
}

/** DJ is only available on HitFM radio station */
interface RadioDJ {
  /** DJ ID */
  absnum: string;
  /** DJ hours (e.g. "11:00 - 18:00") */
  cur_time: string;
  /** DJ type ("dj") */
  djType: string;
  /** DJ end hour (e.g. "18:00") */
  end_time: string;
  /** DJ image URL */
  img: string;
  /** DJ profile URL (unused on official website) */
  link: string;
  /** DJ name */
  title: string;

  /** RadioPlayer instance */
  player?: RadioPlayer;
}
