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
    cd saaransh-app
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


<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======

---
