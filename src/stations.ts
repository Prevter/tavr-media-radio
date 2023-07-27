/** Radio stations from TAVR Media */
export enum RadioStation {
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

/** Default radio stations URLs */
export const RadioPlayerURL = {
  [RadioStation.HitFM]: "https://online.hitfm.ua/HitFM",
  [RadioStation.HitFMUkraine]: "https://online.hitfm.ua/HitFM_Ukr",
  [RadioStation.HitFMBest]: "https://online.hitfm.ua/HitFM_Best",
  [RadioStation.HitFMTop]: "https://online.hitfm.ua/HitFM_Top",
  [RadioStation.Bayraktar]: "https://online.radiobayraktar.ua/RadioBayraktar",
  [RadioStation.Roks]: "https://online.radioroks.ua/RadioROKS",
  [RadioStation.RoksUkraine]: "https://online.radioroks.ua/RadioROKS_Ukr",
  [RadioStation.RoksNew]: "https://online.radioroks.ua/RadioROKS_NewRock",
  [RadioStation.RoksClassic]: "https://online.radioroks.ua/RadioROKS_ClassicRock",
  [RadioStation.RoksHardnHeavy]: "https://online.radioroks.ua/RadioROKS_HardnHeavy",
  [RadioStation.RoksBallads]: "https://online.radioroks.ua/RadioROKS_Ballads",
  [RadioStation.KissFM]: "https://online.kissfm.ua/KissFM",
  [RadioStation.KissFMUkraine]: "https://online.kissfm.ua/KissFM_Ukr",
  [RadioStation.KissFMDeep]: "https://online.kissfm.ua/KissFM_Deep",
  [RadioStation.KissFMDigital]: "https://online.kissfm.ua/KissFM_Digital",
  [RadioStation.Relax]: "https://online.radiorelax.ua/RadioRelax",
  [RadioStation.RelaxUkraine]: "https://online.radiorelax.ua/RadioRelax_Ukr",
  [RadioStation.RelaxInternational]: "https://online.radiorelax.ua/RadioRelax_Int",
  [RadioStation.RelaxCafe]: "https://online.radiorelax.ua/RadioRelax_Cafe",
  [RadioStation.RelaxInstrumental]: "https://online.radiorelax.ua/RadioRelax_Instrumental",
  [RadioStation.MelodiaFM]: "https://online.melodiafm.ua/MelodiaFM",
  [RadioStation.MelodiaFMInternational]: "https://online.melodiafm.ua/MelodiaFM_Int",
  [RadioStation.MelodiaFMDisco]: "https://online.melodiafm.ua/MelodiaFM_Disco",
  [RadioStation.MelodiaFMRomantic]: "https://online.melodiafm.ua/MelodiaFM_Romantic",
  [RadioStation.NasheRadio]: "https://online.nasheradio.ua/NasheRadio",
  [RadioStation.NasheRadioUkraine]: "https://online.nasheradio.ua/NasheRadio_Ukr",
  [RadioStation.RadioJazz]: "https://online.radiojazz.ua/RadioJazz",
  [RadioStation.RadioJazzUkraine]: "https://online.radiojazz.ua/RadioJazz_Ukr",
  [RadioStation.RadioJazzGold]: "https://online.radiojazz.ua/RadioJazz_Gold",
  [RadioStation.RadioJazzLight]: "https://online.radiojazz.ua/RadioJazz_Light",
  [RadioStation.RadioJazzCover]: "https://online.radiojazz.ua/RadioJazz_Cover",
  [RadioStation.RadioJazzGroove]: "https://online.radiojazz.ua/RadioJazz_Groove",
  [RadioStation.ClassicRadio]: "https://online.classicradio.com.ua/ClassicRadio",
  [RadioStation.GuliayRadio]: "https://online.radioplayer.ua/GuliayRadio",
  [RadioStation.RadioGold]: "https://online.radioplayer.ua/RadioGold",
  [RadioStation.FlashRadio]: "https://online.radioplayer.ua/FlashRadio",
  [RadioStation.IndieUARadio]: "https://online.radioplayer.ua/RadioIndieUA",
  [RadioStation.RadioRitmoLatino]: "https://online.radioplayer.ua/RadioRitmoLatino",
  [RadioStation.UnitedNews]: "https://online-news.radioplayer.ua/RadioNews",
};

/** Default radio cover image */
export const RadioCoverURL = {
  [RadioStation.HitFM]: "https://play.tavr.media/static/image/header_menu/hit_efir_210x210.png",
  [RadioStation.HitFMUkraine]: "https://play.tavr.media/static/image/header_menu/hit_uahits_210x210.png",
  [RadioStation.HitFMBest]: "https://play.tavr.media/static/image/header_menu/hit_biggesthits_210x210.png",
  [RadioStation.HitFMTop]: "https://play.tavr.media/static/image/header_menu/hit_modernhits_210x210.png",
  [RadioStation.Bayraktar]: "https://play.tavr.media/static/image/header_menu/RadioBayraktar_220x220.jpg",
  [RadioStation.Roks]: "https://play.tavr.media/static/image/header_menu/roks_efir_162x162.png",
  [RadioStation.RoksUkraine]: "https://play.tavr.media/static/image/header_menu/roks_ukrrock_162x16210.png",
  [RadioStation.RoksNew]: "https://play.tavr.media/static/image/header_menu/roks_newrock_162x162.png",
  [RadioStation.RoksClassic]: "https://play.tavr.media/static/image/header_menu/ROKS_ClassicRock_162x162.jpg",
  [RadioStation.RoksHardnHeavy]: "https://play.tavr.media/static/image/header_menu/roks_hardnheavy_162x162.png",
  [RadioStation.RoksBallads]: "https://play.tavr.media/static/image/header_menu/roks_ballads_162x162.png",
  [RadioStation.KissFM]: "https://play.tavr.media/static/image/header_menu/kiss_efir_210x210.png",
  [RadioStation.KissFMUkraine]: "https://play.tavr.media/static/image/header_menu/kiss_ukrainian_210x210.png",
  [RadioStation.KissFMDeep]: "https://play.tavr.media/static/image/header_menu/kiss_deep_210x210.png",
  [RadioStation.KissFMDigital]: "https://play.tavr.media/static/image/header_menu/kiss_digital_210x210.png",
  [RadioStation.Relax]: "https://play.tavr.media/static/image/header_menu/Relax_Efir_220x220.png",
  [RadioStation.RelaxUkraine]: "https://play.tavr.media/static/image/header_menu/Relax_Ukr_220x220.jpg",
  [RadioStation.RelaxInternational]: "https://play.tavr.media/static/image/header_menu/Relax_International_220x220.png",
  [RadioStation.RelaxCafe]: "https://play.tavr.media/static/image/header_menu/Relax_Cafe_220x220.png",
  [RadioStation.RelaxInstrumental]: "https://play.tavr.media/static/image/header_menu/Relax_Instrumental_220x220.png",
  [RadioStation.MelodiaFM]: "https://play.tavr.media/static/image/header_menu/MelodiaFM_Efir_new_228x228.png",
  [RadioStation.MelodiaFMInternational]: "https://play.tavr.media/static/image/header_menu/MelodiaFM_International_220x220.jpg",
  [RadioStation.MelodiaFMDisco]: "https://play.tavr.media/static/image/header_menu/MelodiaFM_Disco_220x220.png",
  [RadioStation.MelodiaFMRomantic]: "https://play.tavr.media/static/image/header_menu/MelodiaFM_Romantic_220x220.png",
  [RadioStation.NasheRadio]: "https://play.tavr.media/static/image/nashe/NasheRadio_NewLogo_228x228.png",
  [RadioStation.NasheRadioUkraine]: "https://play.tavr.media/static/image/nashe/NasheRadio_UkrTOP100_228x228.png",
  [RadioStation.RadioJazz]: "https://play.tavr.media/static/image/header_menu/RadioJAZZ_logo_228x228.png",
  [RadioStation.RadioJazzUkraine]: "https://play.tavr.media/static/image/header_menu/RadioJAZZ_FROMUA_228x228.jpg",
  [RadioStation.RadioJazzGold]: "https://play.tavr.media/static/image/header_menu/RadioJAZZ_GOLD_228x228.png",
  [RadioStation.RadioJazzLight]: "https://play.tavr.media/static/image/header_menu/RadioJAZZ_LIGHT_228x228.png",
  [RadioStation.RadioJazzCover]: "https://play.tavr.media/static/image/header_menu/RadioJAZZ_COVER_228x228.png",
  [RadioStation.RadioJazzGroove]: "https://play.tavr.media/static/image/header_menu/RadioJAZZ_GROOVE_228x228.png",
  [RadioStation.ClassicRadio]: "https://play.tavr.media/static/image/header_menu/Radio_Classik_logo_220x220.png",
  [RadioStation.GuliayRadio]: "https://play.tavr.media/static/image/header_menu/GuliayRadio_logo_220x220.png",
  [RadioStation.RadioGold]: "https://play.tavr.media/static/image/header_menu/RadioGold_logo_220x220.jpg",
  [RadioStation.FlashRadio]: "https://play.tavr.media/static/image/header_menu/flash_radio_220x220.jpg",
  [RadioStation.IndieUARadio]: "https://play.tavr.media/static/image/header_menu/Radio_IndieUA_logo_220x220.png",
  [RadioStation.RadioRitmoLatino]: "https://play.tavr.media/static/image/logo/Radio_RitmoLatino_220x220.jpg",
  [RadioStation.UnitedNews]: "https://play.tavr.media/static/image/united_news.jpg",
};