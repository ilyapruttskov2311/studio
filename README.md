# TikTok Arbitrage Automator

This is a Next.js application designed to automate interactions on TikTok. It allows users to manage multiple accounts, search for videos based on specific criteria (tags, views, likes, comments), and automatically post comments.

**Disclaimer:** This tool is for educational and proof-of-concept purposes only. Automating interactions on TikTok may violate their Terms of Service. Use this application at your own risk. The developers are not responsible for any account suspension or other consequences.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and npm (or yarn) installed on your system.

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    First, clone the project from the repository to your local machine.

    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    Navigate to the project directory and run the following command to install all the necessary packages.

    Using npm:
    ```bash
    npm install
    ```

    Using yarn:
    ```bash
    yarn install
    ```

## Running the Application

Once the installation is complete, you can run the application in development mode.

1.  **Start the development server:**

    Using npm:
    ```bash
    npm run dev
    ```

    Using yarn:
    ```bash
    yarn dev
    ```

2.  **Open the application:**
    Open your web browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

## How to Use

1.  **Add an Account:** The first time you open the app, you'll be on the login page. Enter your TikTok account credentials (email/phone and password) to add it to the automator.
2.  **Dashboard Overview:** After adding an account, you'll be redirected to the main dashboard.
3.  **Manage Accounts:** Use the user dropdown menu in the top-right corner to switch between different TikTok accounts or to add a new one.
4.  **Configure Settings:**
    - Navigate to the **Settings** tab.
    - Here you can set the comment text, configure video search parameters (min/max views, likes, comments), set a specific tag to search for, and adjust various delays and intervals for the bot's actions.
5.  **Run the Bot:**
    - Go to the **Bot** tab.
    - Click the "Start Bot" button to begin the automation process.
    - You can monitor all actions in the "Activity Log".
    - Click "Stop Bot" to pause the process at any time.
6.  **View Account Data:** The **Account** tab displays statistics for the currently selected TikTok account.
