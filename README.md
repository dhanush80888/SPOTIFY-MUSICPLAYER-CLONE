# 🎵 Music Player

A simple **Music Player Web App** built using **HTML**, **CSS**, and **JavaScript**.  
It allows users to play songs stored locally in a structured folder format, with album covers and song metadata.

---

## 🖼️ Project Overview

This project is a lightweight, front-end based music player that lets you listen to songs organized in albums.  
Each album contains its own songs and album image, and you can easily extend the collection by adding more folders or songs.

---

## 📁 Folder Structure

```
music-player/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── songs/
│   └── album/
│       ├── album.jpg
│       ├── song1.mp3
│       ├── song2.mp3
│       ├── song3.mp3
│       └── info.json
│
└── assets/
    └── icons/ (optional for play/pause icons)
```

---

## 🧠 JSON File Structure (`info.json`)

Each album folder contains a JSON file that describes the album and its songs.  
Example:

```json
{
    "title": "Dhanush_songs",
    "description": "lofi songs for you!"
}
```

---

## 🎧 Features

- Play, pause, and switch between songs  
- Display album image and details  
- Load song metadata dynamically from JSON file  
- Responsive and minimalist design  
- Easy to add new songs and albums

---

## 🚀 How to Run

1. Clone or download the project:
   ```bash
   git clone https://github.com/yourusername/music-player.git
   ```
2. Open the project folder.
3. Make sure your folder structure matches the one above.
4. Open **index.html** in your browser.
5. Enjoy your music 🎶

---

## 🧩 Technologies Used

- **HTML5** – for structure  
- **CSS3** – for styling and responsive design  
- **JavaScript (ES6)** – for dynamic functionality  

---

## 🖋️ Author

**Dhanush K**  
*“Lofi songs for peaceful vibes ✨”*

---

## 🪄 Future Improvements

- Add playlist support  
- Volume control and seek bar  
- Dark/light mode toggle  
- Fetch album data dynamically from a server

---

## 📸 Example Album

| Album Cover | Title | Description |
|--------------|--------|-------------|
| ![Album Cover](songs/album/album.jpg) | Dhanush_songs | lofi songs for you! |

---

⭐ *If you like this project, don’t forget to star the repo!*
