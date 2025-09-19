# Project Saaransh - Frontend

This directory contains the source code for the user interface (UI) of **Project Saaransh**. This client-side application serves as an interactive dashboard for Ministry of Corporate Affairs (MoCA) officials to view, filter, and understand the analysis of public feedback from the eConsultation module.

##  Overview

The frontend is responsible for:
* Communicating with the backend API to fetch analysis data.
* Displaying individual comments with their predicted sentiment and generated summary.
* Presenting aggregate statistics, such as the overall sentiment distribution (positive, negative, neutral).
* Visualizing the most frequently used keywords in a dynamic word cloud.
* Providing filtering and search capabilities to navigate the feedback efficiently.

##  Technology Stack

* **Framework:** [React.js](https://reactjs.org/)
* **Styling:** [Material-UI (MUI)](https://mui.com/) for a professional and accessible component library.
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) for managing complex application state.
* **Data Fetching:** [Axios](https://axios-http.com/) for making HTTP requests to the backend API.
* **Data Visualization:** [Chart.js](https://www.chartjs.org/) for sentiment graphs and [react-wordcloud](https://www.npmjs.com/package/react-wordcloud) for the word cloud component.
* **Package Manager:** [npm](https://www.npmjs.com/)

##  Getting Started

Follow these instructions to set up and run the frontend application on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18.x or later recommended)
* [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)

### Installation & Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    This command will install all the necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `frontend` directory by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and set the URL for the backend API. For local development, this will typically be:
    ```
    REACT_APP_API_BASE_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
    ```

##  Available Scripts

In the project directory, you can run the following commands:

* **`npm start`**
    Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload if you make edits.

* **`npm test`**
    Launches the test runner in interactive watch mode.

* **`npm run build`**
    Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

