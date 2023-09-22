<div align="center">

# DiscordJS V14 Sheweny Template

![image(3)](https://github.com/Pexilo/Template-DJS14-Sheweny/assets/67436391/ab6f4af6-d6c5-407d-b35e-8ec6085c170a)

![Version](https://img.shields.io/badge/version-1.0.0-green.svg?cacheSeconds=2592000&style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

</div>

## ⚡ About The Template

This is more than just a template. The DiscordJS V14 Sheweny Template aims to provide a strong foundation for Discord bot development. Built with Discord.js v14 and the Sheweny framework, it offers a scalable and feature-rich starting point for both beginners and experienced djs developers. The purpose of this model is to save initial steps time.

## 🛠 Installation

[Fork](https://github.com/Pexilo/Template-DJS14-Sheweny/fork) the project or click on 
<a href="https://github.com/new?template_name=Template-DJS14-Sheweny&template_owner=Pexilo">
<img src="https://github.com/Pexilo/Template-DJS14-Sheweny/assets/67436391/deaead1c-30a9-418f-be60-a2247c900322"   height="20">
</a>
button.



```bash
git clone your-repo
cd your-repo
npm install
```

## 🔧 Usage

1. Add your bot token and mongodb connection string in `.env`.
2. Run `npm start`.

## ✨ Features

- Command handling
- Event handling
- Scalable architecture
- Pre-configured

## 🌎 Integrated languages

#### • ☕ English᲼᲼᲼᲼᲼᲼᲼• 🥖 French

## 🧑‍💻 Technical stuff

### LanguageManager Technical Details

#### Structure

```bash
📦src
 ┣ 📂commands
 ┃ ┗ 📜language.command.ts
 ┣ 📂lang
 ┃ ┣ 📜en.json
 ┃ ┗ 📜fr.json
 ┣ 📂models
 ┃ ┗ 📜Translations.ts
 ┣ 📂utils
 ┗ ┗ 📜language-manager.ts
```

- **Translations Interface**: An interface `Translations` is defined to type the translations.
- **Reading JSON Files**: Language JSON files from `src/lang` are read and parsed during the object's construction.
- **Translation Retrieval**: Methods like `getTranslation`, `getCommandTranslation`, and others retrieve specific translations based on language and key. Located in `language-manager.ts`.

When a new `LanguageManager` object is instantiated, it reads all JSON files in `src/lang`, parsing them into its `translations` object.

#### Methods

- `getTranslation(key: string, lang: string)`: Retrieves a general translation.
- `getCommandTranslation(lang: string)`: Retrieves command-specific translations.
- `getInterractionTranslation(lang: string)`: Retrieves interaction-specific translations.
- `getEventTranslation(lang: string)`: Retrieves event-specific translations.
- `getUtilsTranslation(lang: string)`: Retrieves utility-specific translations.
- `getAllTranslations(lang: string)`: Retrieves all translations for a specific language.

#### Usage

> Suppose you need to get a translation for the ping command in French. You would do something like:

```javascript
const langManager = new LanguageManager();
const pingCommand = langManager.getCommandTranslation("fr").pingCommand;
```

---

### MongoDB and Mongoose Integration

#### Structure

```bash
📦src
 ┣ 📂db
 ┃ ┣ 📜guild.ts
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜user.ts
 ┣ 📂utils
 ┗ ┗ 📜shortcuts.ts
```

- **Database Models**: Stored under the `src/db` directory. There are two main models: `guild.ts` and `user.ts`.
- **Database Operations**: Methods for interacting with MongoDB are located in `shortcuts.ts`.

#### Mongoose Schemas

- **Guild Schema (`guild.ts`)**: Defines a guild with `id` and `language` fields.
- **User Schema (`user.ts`)**: Defines a user with `id` and `guilds` fields.

#### Database Operations (`shortcuts.ts`)

- **Creating Records**: `CreateGuild` and `CreateUser` methods are used to create new guild and user records.
- **Deleting Records**: `DeleteGuild` and `DeleteUser` remove records based on their `id`.
- **Fetching Records**: `FetchGuild`, `FetchUser`, and `FetchUsersFromGuild` retrieve records.
- **Updating Records**: `UpdateGuild` and `UpdateUser` modify existing records.

> These MongoDB schemas and operations are designed to be compatible with multiple guilds and users without any issues.

#### Usage

> Updating the above example of the language manager to use MongoDB would look like this:

```javascript
const { guild } = interaction;
const { guildData, lang } = await FetchAndGetLang(guild!);

const langManager = new LanguageManager();
const pingCommand = langManager.getCommandTranslation(lang).pingCommand;
```

Notice the use of `FetchAndGetLang` to retrieve the guild's language and the replacement of `getCommandTranslation("fr")` with `getCommandTranslation(lang)`.

To create a new translation you have to add it in the `en.json` and `fr.json` files in the `src/lang` folder. Then you have to add the key of the translation it in the `Translations` interface in the `src/models/Translations.ts` file. Use the key to retrieve the translation in your code.  
Don't forget to use the corresponding method to retrieve the translation (for commands use `getCommandTranslation`, for events use `getEventTranslation`, etc...)

⚠️ Important note, when containing code, make sure to enclose your translated variable within an 'eval' statement.   
For examples, see `clientMissingPermissions`, `userMissingPermissions` tranlations.

## 📝 License

[MIT License](https://github.com/Pexilo/Template-DJS14-Sheweny/blob/main/LICENSE)
Copyright (c) 2023 Pexilo

### 👏 Show your support

Simply give me a ⭐️ to support me! 😄

## ⚙️ Detailed installation steps

### Requirements

- 📃 Node.js 16.9 or higher

#### MongoDB:

1. Create an [account](https://account.mongodb.com/account/login)
2. Create a cluster
3. Connect it with _"connect your application"_
4. Copy your connection string
5. Replace `<password>` with your database access user password
6. Keep it for later use

#### Discord bot:

1. Log in to your Discord account on the [Discord Developer Portal](https://discord.com/developers/applications) website.
2. Click the "New Application" button to create a new application.
3. Give your application a name and click _"Create."_
4. In the left panel, click on _"Bot"_ in the menu.
5. Click the _"Add Bot"_ button.
6. Under the _"Token"_ section, click _"Copy"_ to copy the bot's token. Use _"Reset"_ if you can't copy it right away.
7. Keep your **token** and **client ID** for later use
8. Under the "Privileged Gateway Intents" section, enable _"Servers Members"_ & _"Message Content"_ intents.

### 💫 Quick start

- [Fork](https://github.com/Pexilo/Template-DJS14-Sheweny/fork) the repo.

```
git clone https://github.com/YOURNAME/Template-DJS14-Sheweny
```

##### 🧾 ENV FILE

1. Replace content of `example.env`

```sh
DISCORD_TOKEN=your-bot-token
MONGO_URI=your-mongo-db-connection-string
```

2. Rename the file `example.env` > `.env`

##### 🤖 BOT INVITE

1. Finish the above steps.
2. Go to the URL Generator option on the [Discord Developer Portal](https://discord.com/developers/applications).
3. Check `bot` and `applications.commands` options then `Administrator` permission for developing purposes.
4. Paste the link in your browser and add the bot to your server

#### 🚀 START BOT

1. Install dependencies

```
npm i
```

2. Start the bot

```
npm start
```

## 🦾 Powered by

<div align="center" style="display:flex;">
    <a href="https://discord.js.org/" target="_blank">
        <img alt="DiscordJs" src="https://user-images.githubusercontent.com/67436391/179405418-a3dd9886-725b-4ed3-9ca6-d1eb73e4a67d.png" />
    </a>
    <a href="https://sheweny.js.org/" target="_blank">
        <img alt="Sheweny" src="https://user-images.githubusercontent.com/67436391/179405417-eb4c8938-5abd-4a7c-a978-cac58a06707f.png" />
    </a>
    <a href="https://www.mongodb.com/" target="_blank">
        <img alt="MongoDB" src="https://user-images.githubusercontent.com/67436391/179426484-d3fb357a-4702-4785-b0e1-7dc443923dab.jpeg" />
    </a>
</div>

---

Made with ❤️ by Pexilo
