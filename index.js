#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer').default;
const { execa } = require('execa');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

program
  .name('react-pro-cli')
  .version('1.0.0')
  .description('A CLI for creating a professional React project with common libraries.')
  .argument('<project-name>', 'The name of your new React project')
  .action(async (projectName) => {
    try {
      console.log(`\nSetting up new React project: ${projectName}`);

      // Step 1: Prompt for user choices
      const choices = await promptUser();

      // Step 2: Create a basic React project using Vite
      await createReactProject(projectName);

      // Step 3: Change to the project directory
      console.log(`Changing to project directory: ${path.resolve(projectName)}`);
      process.chdir(projectName);
      console.log(`Current working directory: ${process.cwd()}`);

      // Step 4: Install and configure packages based on user choices
      await installAndConfigurePackages(choices);

      // Step 5: Create a common folder structure and replace boilerplate
      await createAndConfigureFiles(choices);

      console.log(`\n✅ Project "${projectName}" has been successfully created!`);
      console.log(`\nTo get started, run the following commands:`);
      console.log(`  cd ${projectName}`);
      console.log(`  npm run dev`);
      
    } catch (error) {
      console.error(`\n❌ An error occurred during the setup process:`, error);
    }
  });

program.parse(process.argv);

// --- Functions for each step ---

async function promptUser() {
  const questions = [
    {
      type: 'list',
      name: 'uiLibrary',
      message: 'Choose a UI Library:',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'Tailwind CSS', value: 'tailwindcss' },
        { name: 'MUI (Material UI)', value: 'mui' },
        { name: 'Shadcn UI', value: 'shadcn' },
      ],
      default: 'none',
    },
    {
      type: 'confirm',
      name: 'router',
      message: 'Do you want to install React Router?',
      default: true,
    },
    {
      type: 'list',
      name: 'stateManagement',
      message: 'Choose a State Management library:',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'Zustand', value: 'zustand' },
        { name: 'Redux Toolkit', value: 'redux-toolkit' },
      ],
      default: 'none',
    },
    {
      type: 'list',
      name: 'dataFetching',
      message: 'Choose a Data Fetching library:',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'Axios', value: 'axios' },
        { name: 'React Query', value: 'react-query' },
      ],
      default: 'none',
    },
    {
      type: 'list',
      name: 'formHandling',
      message: 'Choose a Form Handling library:',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'React Hook Form', value: 'react-hook-form' },
        { name: 'Formik', value: 'formik' },
      ],
      default: 'none',
    },
  ];

  return inquirer.prompt(questions);
}

async function createReactProject(projectName) {
  console.log(`\n🏗️  Creating a new React project using Vite...`);
  await execa('npm', ['create', 'vite@latest', projectName, '--', '--template', 'react'], { stdio: 'inherit' });
}

async function installAndConfigurePackages(choices) {
    const depsToInstall = [];
    const devDepsToInstall = [];

    // All dependencies to install
    if (choices.uiLibrary === 'tailwindcss') {
        depsToInstall.push('tailwindcss', '@tailwindcss/vite');
    } else if (choices.uiLibrary === 'mui') {
        depsToInstall.push('@mui/material', '@emotion/react', '@emotion/styled');
    }
    
    if (choices.router) {
        depsToInstall.push('react-router-dom');
    }

    if (choices.stateManagement === 'zustand') {
        depsToInstall.push('zustand');
    } else if (choices.stateManagement === 'redux-toolkit') {
        depsToInstall.push('@reduxjs/toolkit', 'react-redux');
    }

    if (choices.dataFetching === 'axios') {
        depsToInstall.push('axios');
    } else if (choices.dataFetching === 'react-query') {
        depsToInstall.push('@tanstack/react-query');
    }

    if (choices.formHandling === 'react-hook-form') {
        depsToInstall.push('react-hook-form');
    } else if (choices.formHandling === 'formik') {
        depsToInstall.push('formik');
    }

    // Install all dependencies at once
    console.log('\n📦 Installing all selected dependencies...');
    if (depsToInstall.length > 0) {
        await execa('npm', ['install', ...depsToInstall], { stdio: 'inherit', cwd: process.cwd() });
    }
    if (devDepsToInstall.length > 0) {
        await execa('npm', ['install', '--save-dev', ...devDepsToInstall], { stdio: 'inherit', cwd: process.cwd() });
    }

    // Now, run configuration steps that rely on the installed packages
    if (choices.uiLibrary === 'tailwindcss') {
        console.log('\n⚙️ Configuring Tailwind CSS for Vite...');
        try {
            // Update vite.config.js to include the Tailwind plugin
            const viteConfigPath = path.join(process.cwd(), 'vite.config.js');
            let viteConfigContent = fs.readFileSync(viteConfigPath, 'utf8');

            // Add the import statement
            viteConfigContent = `import tailwindcss from '@tailwindcss/vite';\n` + viteConfigContent;

            // Add the plugin to the plugins array
            viteConfigContent = viteConfigContent.replace('plugins: [', 'plugins: [\n    tailwindcss(),');

            fs.writeFileSync(viteConfigPath, viteConfigContent);

        } catch (error) {
            console.error('Failed to configure Tailwind CSS:', error);
            throw error;
        }
    } else if (choices.uiLibrary === 'shadcn') {
        console.log('\n⚙️ Setting up Shadcn UI...');
        console.log('Shadcn UI requires an interactive setup. Please run the following command inside your project:');
        console.log('  npx shadcn-ui@latest init');
    }
}

async function createAndConfigureFiles(choices) {
    console.log('\n📁 Creating common folder structure and files...');
    const baseDir = process.cwd();

    // Create the standard folder structure first
    const directories = [
        'src/components',
        'src/pages',
        'src/assets',
        'src/hooks',
        'src/utils',
        'src/services',
    ];
    for (const dir of directories) {
        await fs.ensureDir(path.join(baseDir, dir));
    }

    // Remove default Vite boilerplate files
    fs.rmSync(path.join(baseDir, 'src/App.css'));
    fs.rmSync(path.join(baseDir, 'src/assets/react.svg'));
    fs.rmSync(path.join(baseDir, 'src/App.jsx'));
    
    // Create a new, clean App.jsx with the desired content
    const appJsxContent = `import React from 'react'

const App = () => {
  return (
    <div >App</div>
  )
}

export default App`;
    fs.writeFileSync(path.join(baseDir, 'src/App.jsx'), appJsxContent);

    // Conditionally create the index.css file content
    const cssPath = path.join(baseDir, 'src', 'index.css');
    let indexCssContent = '';
    if (choices.uiLibrary === 'tailwindcss') {
        indexCssContent = `@import "tailwindcss";\n\n`;
    } else {
        // Default CSS content if no specific UI library is chosen
        indexCssContent = `body { font-family: sans-serif; }`;
    }
    fs.writeFileSync(cssPath, indexCssContent);
    
    // Create a placeholder `pages` file
    const pagesPlaceholder = `import React from 'react';\n\nconst HomePage = () => {\n  return <div>Welcome to the Home Page!</div>;\n};\n\nexport default HomePage;`;
    fs.writeFileSync(path.join(baseDir, 'src/pages/HomePage.jsx'), pagesPlaceholder);
}