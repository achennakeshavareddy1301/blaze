
# Blaze 🔥

> **AI-powered code generation platform** that transforms creative ideas into production-ready code instantly.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![tRPC](https://img.shields.io/badge/tRPC-type%20safe-2596be)](https://trpc.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Blaze is a modern full-stack app built with Next.js, Shadcn UI, and Prisma. Instantly turn natural language prompts into high-quality, production-ready code with a sleek dashboard, project management, and real-time code preview.

---

## ✨ Features

- 🤖 **AI Code Generator** — Generate production-ready code from prompts
- 📁 **Project Management** — Create, organize, and edit multiple projects
- 👀 **Real-Time Code Preview** — Live UI and code updates
- 🔐 **Authentication & Profiles** — Secure auth and profiles via Clerk
- 🏗️ **Modular Architecture** — Feature-based modules for scale
- 🛡️ **Type-Safe API** — End-to-end type safety with tRPC
- ⚙️ **Background Jobs** — Reliable async processing with Inngest
- 🪣 **Code Sandbox** — Secure execution via E2B

---

## 🖼️ Screenshots

| Dashboard | Project View |
|:---:|:---:|
| ![Dashboard](https://github.com/user-attachments/assets/a299e86c-bec9-47b2-bc8f-f1cd49c835f3) | ![Project View](https://github.com/user-attachments/assets/3724780f-9c71-4740-b9ed-562e01f332a6) |

**Code Generation Interface**  
![Code Generation](https://github.com/user-attachments/assets/151ec1b4-c3eb-4c4e-8c28-ceabed755e70)

**Real-time Preview**  
![Preview Mode](https://github.com/user-attachments/assets/5515dd74-7b30-4c04-aaef-1671fa2c6a79)



---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend:** tRPC, Prisma ORM, PostgreSQL
- **Authentication:** Clerk
- **Background Jobs:** Inngest
- **Code Execution:** E2B

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/your-username/blaze.git
    cd blaze
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Configure environment variables:**  
   Create a `.env` file in the root:
    ```
    # Database
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key

    # (Optional) AI & External Services
    OPENAI_API_KEY=your_openai_key
    E2B_API_KEY=your_e2b_key
    ```

4. **Initialize the database:**
    ```
    npx prisma db push
    ```

5. **Start the development server:**
    ```
    npm run dev
    ```
    Visit [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
blaze/
├─ src/
│  ├─ app/              # Next.js App Router routes & layouts
│  ├─ components/       # Shared UI components (Shadcn/ui)
│  ├─ modules/          # Feature modules (home, projects, dashboard, etc.)
│  ├─ trpc/             # tRPC routers, context, and client
│  └─ lib/              # Utilities and shared logic
├─ prisma/
│  └─ schema.prisma     # Prisma schema + migrations
├─ public/              # Static assets
└─ package.json         # Scripts and dependencies
```

---

## 🔧 Scripts

```
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checks
npx prisma studio    # Prisma DB browser
```

---

## 🗺️ Architecture Diagram



![architecture](https://github.com/user-attachments/assets/affdce86-4659-4b2f-b2a1-fd19718a58b5)


---

## 🗒️ Roadmap

- [ ] More code generation templates (`sandbox-templates/`)
- [ ] Expand API documentation (`src/app/api/`, `src/trpc/`)
- [ ] Improve test coverage
- [ ] More screenshots and usage examples
- [ ] Integrate external tools and repositories
- [ ] Support multiple AI providers and model selection
- [ ] Team collaboration and project sharing

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

See CONTRIBUTING.md for guidelines.

---

## 📄 License

MIT License — see [LICENSE](LICENSE).

---

## 🙏 Acknowledgments

- Shadcn/ui for elegant UI components
- Vercel for deployment
- All open-source contributors

---

<div align="center">
  <strong>Built with ❤️ by  chenna Keshava Reddy</strong><br/>
  <a href="#blaze-">⬆️ Back to Top</a>
</div>
```

***
