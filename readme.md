# `react-pro-starter`

A command-line interface (CLI) for rapidly scaffolding a modern, professional React project. `react-pro-starter` automates the tedious setup process, allowing you to start coding with your favorite libraries instantly.

Stop wasting time on repetitive installations and configurations. Get straight to building\!

## Features

  - **Zero-Configuration Setup:** Builds a robust project with a single command.
  - **Vite Integration:** Uses Vite for a lightning-fast development experience.
  - **Modular Folder Structure:** Automatically creates a clean and scalable project structure with folders like `components`, `pages`, `hooks`, and `services`.
  - **Conditional Installation:** You choose the libraries you need, and `react-pro-starter` installs and configures them for you.

### Supported Libraries & Tools

  - **UI Libraries:**
      - [Tailwind CSS](https://tailwindcss.com/) (latest v4.1)
      - [Material UI (MUI)](https://mui.com/)
      - [Shadcn UI](https://ui.shadcn.com/)
  - **Routing:**
      - [React Router](https://reactrouter.com/)
  - **State Management:**
      - [Zustand](https://zustand-demo.pmnd.rs/)
      - [Redux Toolkit](https://redux-toolkit.js.org/)
  - **Data Fetching:**
      - [Axios](https://axios-http.com/)
      - [React Query](https://tanstack.com/query/latest)
  - **Form Handling:**
      - [React Hook Form](https://react-hook-form.com/)
      - [Formik](https://formik.org/)

## Getting Started

To get started, simply run the following command in your terminal. `npx` will download and execute the latest version of the CLI, so you don't need to install it globally.

```bash
npx react-pro-starter my-new-project
```

The CLI will guide you through a series of questions to customize your project.

### Example Walkthrough

```bash
$ npx react-pro-starter my-new-project

✔ Choose a UI Library: · Tailwind CSS
✔ Do you want to install React Router? · Yes
✔ Choose a State Management library: · Zustand
✔ Choose a Data Fetching library: · Axios
✔ Choose a Form Handling library: · None

🏗️  Creating a new React project using Vite...
📦 Installing all selected dependencies...
⚙️  Configuring Tailwind CSS for Vite...
📁 Creating common folder structure and files...

✅ Project "my-new-project" has been successfully created!

To get started, run the following commands:
  cd my-new-project
  npm run dev
```

## Contribution

Contributions are welcome\! If you have ideas for new features, improvements, or bug fixes, please feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Clone the repository to your local machine.
3.  Create a new branch (`git checkout -b feature/your-feature-name`).
4.  Make your changes.
5.  Commit your changes (`git commit -m 'feat: Add new feature'`).
6.  Push to the branch (`git push origin feature/your-feature-name`).
7.  Open a pull request.

## License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).