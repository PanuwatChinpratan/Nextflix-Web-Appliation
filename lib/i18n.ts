import i18next from "i18next";
import { useCallback, useEffect, useState } from "react";

type TranslationKeys =
  | "brand"
  | "nav.home"
  | "nav.tvShows"
  | "nav.movies"
  | "nav.newPopular"
  | "nav.myList"
  | "nav.languages"
  | "hero.play"
  | "hero.moreInfo"
  | "hero.newBadge"
  | "search.placeholder"
  | "search.action"
  | "search.tip"
  | "search.results"
  | "rows.popular"
  | "rows.trending"
  | "browse.badge"
  | "browse.title"
  | "myList.title"
  | "myList.empty"
  | "myList.hint";

const resources = {
  en: {
    translation: {
      brand: "Netflix",
      "nav.home": "Home",
      "nav.tvShows": "TV Shows",
      "nav.movies": "Movies",
      "nav.newPopular": "New & Popular",
      "nav.myList": "My List",
      "nav.languages": "Browse by Languages",
      "hero.play": "Play",
      "hero.moreInfo": "More Info",
      "hero.newBadge": "N Series",
      "search.placeholder": "Search for a movie...",
      "search.action": "Search",
      "search.tip": "Pro tip: start typing to quickly jump to a title.",
      "search.results": 'Results for "{{query}}"',
      "rows.popular": "Popular on Netflix",
      "rows.trending": "Trending Today",
      "browse.badge": "Explore",
      "browse.title": "Browse the catalog",
      "myList.title": "My List",
      "myList.empty": "No saved titles yet.",
      "myList.hint": "Tap the plus icon on any card to keep it here.",
    },
  },
  th: {
    translation: {
      brand: "Netflix",
      "nav.home": "หน้าแรก",
      "nav.tvShows": "ซีรีส์",
      "nav.movies": "ภาพยนตร์",
      "nav.newPopular": "มาใหม่และฮิต",
      "nav.myList": "รายการของฉัน",
      "nav.languages": "เลือกภาษา",
      "hero.play": "เล่น",
      "hero.moreInfo": "ข้อมูลเพิ่มเติม",
      "hero.newBadge": "ซีรีส์ N",
      "search.placeholder": "ค้นหาภาพยนตร์...",
      "search.action": "ค้นหา",
      "search.tip": "พิมพ์เพื่อค้นหาชื่อเรื่องได้ทันที",
      "search.results": 'ผลลัพธ์สำหรับ "{{query}}"',
      "rows.popular": "กำลังฮิตบน Netflix",
      "rows.trending": "กำลังมาแรงวันนี้",
      "browse.badge": "สำรวจ",
      "browse.title": "เลือกชมคอนเทนต์",
      "myList.title": "รายการของฉัน",
      "myList.empty": "ยังไม่มีรายการที่บันทึก",
      "myList.hint": "กดปุ่มบวกบนการ์ดเพื่อบันทึกไว้ที่นี่",
    },
  },
};

let initialized = false;

function ensureI18n() {
  if (initialized) return;
  i18next.init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
  initialized = true;
}

export function useI18n() {
  ensureI18n();
  const [language, setLanguage] = useState(i18next.language);

  useEffect(() => {
    const handler = (lng: string) => setLanguage(lng);
    i18next.on("languageChanged", handler);
    return () => {
      i18next.off("languageChanged", handler);
    };
  }, []);

  const t = useCallback(
    (key: TranslationKeys, options?: Record<string, string | number>) =>
      i18next.t(key, options),
    [],
  );

  const changeLanguage = useCallback((lng: "en" | "th") => {
    i18next.changeLanguage(lng);
  }, []);

  return { t, language, changeLanguage };
}
