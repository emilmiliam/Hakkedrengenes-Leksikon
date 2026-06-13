# 🎬 Hakkedrengenes Leksikon

A web application for rating action movies built with **Next.js**, **SQLite (better-sqlite3)**, **Tailwind CSS**, and the **TMDB API**. The app lets you search for movies via TMDB, save them to a local database, and rate them across custom action-movie criteria.

***

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix UI, HugeIcons |
| Backend | Next.js API Routes |
| Database | SQLite via `better-sqlite3` |
| External API | [TMDB (The Movie Database)](https://www.themoviedb.org/) |

***

## 📦 Prerequisites

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

***

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://codeberg.org/emilmiliam/hakkedrengenes-leksikon.git
cd hakkedrengenes-leksikon
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

The project requires a TMDB API key to search for and fetch movie data.

> **⚠️ Note on the `.env` file:**
> A `env.txt` file has been included in the project as a convenience so you can see the required format and a working API key. However, **it is strongly recommended that you create your own API key** — it's completely free through TMDB. The included key has already expired once since the project was first created, so there is a real chance it may have changed again by the time you read this.

**To get your own free TMDB API key:**

1. Go to [https://www.themoviedb.org/](https://www.themoviedb.org/) and create a free account
2. Navigate to **Settings → API** and request an API key (choose "Developer")
3. Copy your API key

**Then create your `.env` file:**

```bash
# Either rename .env.txt to .env and update the key:
cp env.txt .env

# Or create a new .env manually:
echo "TMDB_API_KEY=your_api_key_here" > .env
```

Your `.env` should contain:

```env
TMDB_API_KEY=your_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

***

## 📁 Project Structure

Below is a simplified overview of the most important files and folders in the project:

```text
hakkedrengenes-leksikon/
├── data/
│   └── hakkedrengene.db
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.js
│   │   ├── api/
│   │   │   ├── movies/
│   │   │   │   └── route.js
│   │   │   ├── seed/
│   │   │   │   └── route.js
│   │   │   └── tmdb/
│   │   │       └── route.js
│   │   ├── movies/
│   │   │   ├── [id]/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── ui/
│   │   ├── FilterPanel.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Navbar.jsx
│   │   ├── RatingBreakdown.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ThemeProvider.jsx
│   │   └── ThemeToggle.jsx
│   └── lib/
│       ├── categories.js
│       ├── db.js
│       └── utils.js
├── .env
├── .gitignore
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md
```

***

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server at `localhost:3000` |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server (requires `npm run build` first) |
| `npm run lint` | Run ESLint |

***

## 🌐 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `TMDB_API_KEY` | Your TMDB API key for fetching movie data | ✅ Yes |