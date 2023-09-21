import Translations from "@models/Translations";
import fs from "fs";

interface ITranslations {
  [key: string]: any;
}
class LanguageManager {
  translations: { [lang: string]: ITranslations } = {};

  constructor() {
    const langFiles = fs.readdirSync("src/lang");

    langFiles.forEach((file) => {
      if (file.endsWith(".json")) {
        const lang = file.split(".")[0];
        const fileContent = fs.readFileSync(`src/lang/${file}`, "utf-8");
        const translations = JSON.parse(fileContent);

        this.translations[lang] = translations;
      }
    });
  }

  getTranslation(key: string, lang: string): string {
    return this.translations[lang]?.[key] ?? this.translations["en"]?.[key];
  }

  getCommandTranslation(lang: string): Translations["commands"] {
    return (
      this.translations[lang]?.["commands"] ??
      this.translations["en"]?.["commands"]
    );
  }

  getInterractionTranslation(lang: string): Translations["interactions"] {
    return (
      this.translations[lang]?.["interactions"] ??
      this.translations["en"]?.["interactions"]
    );
  }

  getEventTranslation(lang: string): Translations["events"] {
    return (
      this.translations[lang]?.["events"] ?? this.translations["en"]?.["events"]
    );
  }

  getUtilsTranslation(lang: string): Translations["utils"] {
    return (
      this.translations[lang]?.["utils"] ?? this.translations["en"]?.["utils"]
    );
  }

  getAllTranslations(lang: string): ITranslations {
    return this.translations[lang];
  }
}

export default LanguageManager;
