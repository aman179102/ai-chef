# AI Chef

AI Chef is a web application that helps you discover new recipes based on the ingredients you already have. It uses generative AI to create unique recipes and suggest additional ingredients to enhance your meals.

## Features

- **Recipe Generation**: Enter a list of ingredients, and AI Chef will generate a custom recipe for you.
- **Ingredient Suggestions**: Get smart suggestions for additional ingredients that pair well with what you have.
- **Interactive UI**: A modern and responsive interface built with Next.js and shadcn/ui.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **AI**: [Google AI (Gemini)](https://ai.google/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or later)
- npm

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/aman179102/ai-chef.git
   cd ai-chef
   ```

2. **Install NPM packages**
   ```sh
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root of your project and add your Google AI API key:
   ```env
   GOOGLE_API_KEY=your_google_api_key
   ```

### Running the Application

- **Run the development server**:
  ```sh
  npm run dev
  ```
  Open [http://localhost:9002](http://localhost:9002) to view it in the browser.

- **Run Genkit in watch mode**:
  ```sh
  npm run genkit:watch
  ```

## Available Scripts

- `dev`: Starts the Next.js development server with Turbopack.
- `genkit:dev`: Starts the Genkit development server.
- `genkit:watch`: Starts the Genkit development server in watch mode.
- `build`: Builds the application for production.
- `start`: Starts a production server.
- `lint`: Runs the linter.
- `typecheck`: Runs the TypeScript compiler to check for type errors.
