# rumi-chat

## Prerequisites
Before you can start working on this project, make sure you have the following software installed on your system:

 - Node.js (version 17.0 or higher)
 - npm or yarn package manager


## Project Structure
Here is an overview of the project structure, along with a brief description of each folder:

rumi-chat
```
├─ src/
│   ├─ components/     # Contains reusable UI components
│   ├─ pages/          # Contains individual page components
│   ├─ layouts/        # Contains layout components for structuring pages
│   ├─ app.jsx         # Main app component that wraps routes and layout
│   ├─ routes.jsx      # Defines application routes and their corresponding components
│   └─ main.jsx        # Entry point of the application, where the app is rendered
├─ public/             # Contains public assets like index.html and favicon
├─ tests/              # Contains test files for the application
├─ .gitignore          # Specifies files and folders to be ignored by Git
├─ LICENSE             # License information for the project
├─ package.json        # Project dependencies and scripts
├─ README.md           # Project documentation
├─ vercel.json         # vercel config for prod
└─ vite.config.js      # Configuration for Vite build and dev server
```

```
src/components/: This folder contains reusable UI components, such as buttons, cards, or forms, that can be imported and used throughout the project.

src/pages/: This folder contains individual page components that represent different views of the application, such as dashboard, chat, upload or auth pages

src/layouts/: This folder contains layout components that provide a consistent structure for the application's pages, such as headers, footers, or sidebars.

src/app.jsx: This is the main app component that wraps the routes and layout components. It is responsible for setting up the application's structure and rendering the appropriate content based on the current route.

src/routes.jsx: This file defines the application's routes and their corresponding components. It is responsible for mapping URLs to the appropriate page components and rendering them.

src/main.jsx: This is the entry point of the application, where the app component is rendered to the DOM using ReactDOM. It also imports global CSS and sets up any required dependencies or configurations.
```

# Installation

To install the project dependencies, follow these steps:

```
cd rumi-chat
npm install
```


Open your browser and navigate to http://localhost:5173. You should see the app running. Any changes you make to the source files will automatically be reflected in the browser.


## Frontend Development Task

### Context
Rumi is an AI-powered chatbot interface that currently supports basic text-based conversations. As we expand its capabilities, we need to enhance the user experience by enabling the chatbot to display various types of data visualizations and rich media content in its responses. This will allow Rumi to better present statistical data, trends, and visual information to users in an interactive and engaging way.

For example, when a user asks about "sales trends over the last 6 months", instead of just providing numbers in text, Rumi should be able to display this information as an interactive line chart. Similarly, when discussing "market share", it should be able to show a pie chart, or when comparing data, present it in a sortable table format.

### Required Features

1. **Rich Text Formatting**
   - Support for markdown-style text formatting
   - Code blocks with syntax highlighting
   - Bulleted and numbered lists
   - Links and quotes

2. **Data Visualization Components**
   - Tables
     - Responsive design
     - Optional: pagination for large datasets
   - Charts
     - Pie charts for displaying proportional data
     - Line charts for temporal data
     - Bar charts for comparative data
   
3. **Media Support**
   - Image display with lazy loading
   - Optional: basic image carousel for multiple images

### Technical Requirements

- Use React and TypeScript
- Implement responsive design principles
- Use a charting library of your choice (e.g., Chart.js, D3.js, or Recharts)
- Handle loading and error states appropriately

### Evaluation Criteria

- Feature completeness
- Code organization and architecture
- Component reusability
- UI/UX design choices
- Error handling
- Code quality and documentation

### Bonus Points

- Animations for transitions between different data formats
- Export functionality for charts and tables
- Unit tests for components

## IMPORTANT NOTE
- Make sure that you understand the existing code and the code that YOU write.
- Next round will involve further coding on this assignment, so make sure you fully understand what you have submitted.
- This is a front end task, so the UI should look good without errors. Quality over quantity(of features)
