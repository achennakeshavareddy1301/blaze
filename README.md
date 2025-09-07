# Blaze 🔥

Blaze is an AI-powered code generation platform built with Next.js, Shadcn UI, and Prisma. It enables users to instantly transform creative ideas into production-ready code, featuring a modern dashboard, project management, and real-time code preview.

---

## Screenshots

| Dashboard | Project View |
| :---: | :---: |
| <img width="1900" alt="Dashboard" src="https://github.com/user-attachments/assets/a299e86c-bec9-47b2-bc8f-f1cd49c835f3" /> | <img width="1900" alt="Project View" src="https://github.com/user-attachments/assets/3724780f-9c71-4740-b9ed-562e01f332a6" /> |
<img width="1498" height="929" alt="Screenshot 2025-09-07 230810" src="https://github.com/user-attachments/assets/151ec1b4-c3eb-4c4e-8c28-ceabed755e70" />

<img width="1592" height="709" alt="Screenshot 2025-09-07 230410" src="https://github.com/user-attachments/assets/5515dd74-7b30-4c04-aaef-1671fa2c6a79" />

---

## Features

-   **AI Code Generator**: Instantly generates production-ready code from user prompts.
-   **Project Management**: Organize, create, and edit multiple projects with intuitive controls.
-   **Real-Time Code Preview**: View live updates of generated code and UI components.
-   **Authentication & User Profiles**: Secure login and personalized user profiles powered by Clerk.
-   **Modular Architecture**: Code is organized into feature modules for scalability and maintainability.
-   **Type-Safe API**: End-to-end typesafe APIs with tRPC.

---

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **Database**: [Prisma](https://www.prisma.io/) ORM with PostgreSQL
-   **API**: [tRPC](https://trpc.io/)
-   **Authentication**: [Clerk](https://clerk.com/)
-   **Background Jobs**: [Inngest](https://www.inngest.com/)
-   **Code Execution Sandbox**: [E2B](https://e2b.dev/)

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v18 or newer)
-   npm
-   A PostgreSQL database

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/blaze.git
    cd blaze
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables. You can get the Clerk keys from your Clerk dashboard.

    ```env
    # Prisma
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    ```

4.  **Push the database schema:**
    This command will sync your Prisma schema with your database.
    ```sh
    npx prisma db push
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

---

## Folder Structure

The project follows a modular architecture, with key directories organized as follows:

-   `src/app/`: Contains all routes, pages, and layouts for the Next.js App Router.
-   `src/components/`: Shared, reusable components, including UI primitives from Shadcn.
-   `src/modules/`: Feature-based modules, each containing its own UI, components, and logic (e.g., `home`, `projects`).
-   `src/trpc/`: tRPC server setup, routers, and client configuration.
-   `src/lib/`: Utility functions and shared library code.
-   `prisma/`: Prisma schema definition ([`schema.prisma`](prisma/schema.prisma)), migrations, and seed scripts.
-   `public/`: Static assets like images and SVGs.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name


📝 TODOs & Improvements
 Add more code generation templates in sandbox-templates/
 Expand documentation for API endpoints in src/app/api/
 Improve test coverage
 Add more screenshots and usage examples
 Integrate more external tools and repositories
