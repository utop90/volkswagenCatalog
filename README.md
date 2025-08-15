
# **Volkswagen Catalog React App**
  
Welcome to the ultimate Volkswagen catalog – your one-stop place to browse, manage, and customize your favorite VW models. This web app is built with usability, performance, and accessibility in mind, allowing you to navigate comfortably through the entire car portfolio of the company.

[![Icono de link](https://img.icons8.com/ios-filled/24/000000/link.png)](https://tusitio.com) Link to the Volkswagen App.
  
**Author** : Sara Bengoa Rocandio.
  

# :notebook_with_decorative_cover: **Table of Contents**

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
  - [Color Reference](#art-color-reference)  
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Installation](#gear-installation)
  - [Running Tests](#test_tube-running-tests)
  - [Run Locally](#running-run-locally)  
- [Usage](#eyes-usage)
- [AI Usage Discussion](#compass-ai-usage-discussion)
- [Responsive Solutions](#compass-responsive-solutions)
- [Design Decisions](#compass-design-decisions)
- [Performance Optimizations](#compass-performance-optimizations)
- [Accessibility Standards](#compass-accessibility-standards)
- [CI/CD Setup Discussion](#compass-cicd-setup-discussion)
- [License](#warning-license)
- [Contact](#handshake-contact)

***

## :star2: **About the Project**

### :camera: **Screenshots**


  


***

### :space_invader: **Tech Stack**


  Client
  
    TypeScript
    React.js
    Material UI (MUI)
  



  CI/CD
  
    GitHub Actions
  


***

### :dart: **Features**

- **Responsive Design**  
- **Accessibility**  
- **Fast Performance**

***

### :art: **Color Reference**

| Color           | Hex                                      |
| --------------- | ---------------------------------------- |
| Primary Color   | ![#222831](https://via.placeholder.com/10/222831? Color | ![#393E46](https://via.placeholder.com/10/393E46 |

***

## :toolbox: **Getting Started**

### :bangbang: **Prerequisites**

This React project requires **Node.js** and **npm** installed on your machine.

To install npm (which comes with Node.js), visit the official website or use a package manager.

To check if you have npm installed, run:

```bash
npm --version
```

***

### :gear: **Installation**

Install the project with npm:

```bash
npm install
cd cars-api-project
npm start
```

***

### :test_tube: **Running Tests**

To run tests, execute the following command:

```bash
npm test
```

***

### :running: **Run Locally**

Clone the project:

```bash
git clone https://github.com/utop90/volkswagenCatalog.git
```

Go to the project directory:

```bash
cd cars-api-project
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

***

## :eyes: **Usage**

In the Volkswagen catalog app, you can easily manage the car listings:

- **Add a Car:** Click the "Add Car" button and fill out all the required details. The new car will be added to the end of the catalog.  
- **Edit a Car:** Click the pencil icon on any car’s card to edit its details. Update the information as needed and save your changes.  
- **Remove a Car:** Simply click the remove icon on a car’s card to delete it from the catalog.

You can also organize the catalog to find cars faster:  

- **Sort:** Sort the cars either by year or alphabetically.  
- **Filter:** Filter the results based on specific criteria, such as a range of years or whether the car runs on diesel or not.

This functionality makes browsing and managing the Volkswagen catalog simple and efficient.

***

## :compass: **AI Usage Discussion**

- **AI Tool Used:** Perplexity.ai  

- **Why I Use It:** Perplexity.ai is an up-to-date AI tool that provides highly accurate answers by combining advanced language models with real-time web data. Its ability to deliver reliable, current information makes it invaluable.

- **How I’ve Used It:**  
  - To generate ideas for improving accessibility and performance metrics in the app.  
  - To assist in creating a CI/CD workflow using GitHub Actions, including crafting the required YAML configuration file.  
  - For troubleshooting development and implementation challenges.  
  - To generate the necessary API for the car catalog, facilitating data management and integration.  
  - To conduct in-depth research and gather precise, actionable information quickly, saving significant time during development and planning stages.

***

## :compass: **Responsive Solutions**

For achieving responsiveness, I knew from the start that I wanted to leverage the MUI library. This library, which integrates seamlessly with React, provides a powerful grid system that makes creating a responsive layout quick and straightforward—perfect for displaying my car catalog. Additionally, many of MUI’s components come with built-in props to control sizing. For example, by simply adding an "isFullScreen" prop, I was able to make modals span the full width on mobile devices. MUI also offers a default responsive typography system, which is a great advantage for maintaining readability across different screen sizes.

Overall, given the project’s time constraints, MUI was the best choice to efficiently achieve a polished, responsive design. For projects without such restrictions, I might consider integrating React with a library like styled-components, which allows for fully customized CSS and results in a lighter application footprint.

***

## :compass: **Design Decisions**

All components were developed with **reusability** and **maintainability** in mind, breaking them down into the smallest possible units, following React best practices and principles.

Some examples of reusable components included in the app are:

- **Reusable Modal:** CarReusableModal. This modal serves as the base for all other modals in the application, such as those for editing and adding cars.  
- **PaginationButton:** This component is used to create both pagination buttons in the app, for navigating forward and backward.  
- **CarCard:** A flexible component customizable via props to display different types of information depending on the context.

The project is structured by **functionality** to maintain clarity and scalability:

- **components:** Contains all reusable components used in the views, grouped by functionality (modals, buttons, dashboard, etc.).  
- **pages:** Houses the main views of the app, such as the home page.  
- **api:** Includes the API client used for making requests like adding, editing, deleting, and fetching cars.  
- **reduxStore:** Contains all Redux-related files including the store and slices for state management.  
- **assets:** Stores various resources like images used throughout the application.  
- **theme:** Defines the app’s main theme, including color variables and typography settings.  
- **types:** Contains all TypeScript typings used across components for type safety and consistency.

This approach ensures a clean, maintainable codebase where components and logic are well organized and easy to understand.

***

## :compass: **Performance Optimizations**

The optimization of this project was carried out by following the recommendations from Google Lighthouse:  
[https://developer.chrome.com/docs/lighthouse/overview?hl=es-419](https://developer.chrome.com/docs/lighthouse/overview?hl=es-419)

Some of the key strategies and resources I used include:

- **Lazy Loading Images:** I implemented lazy loading for images that are initially off-screen (starting from the 8th car in the catalog) to defer their loading and reduce initial load times. For images visible on first render, I used eager loading with the `fetchPriority` attribute set accordingly to speed up their loading.

- **Optimized Image Formats and Sizes:** Whenever possible, I used smaller image sizes and modern formats like WebP to improve loading speed without sacrificing quality.

- **React Suspense:** I utilized React's Suspense component to manage asynchronous loading of components and data. Suspense allows rendering fallback UI (like spinners) while waiting for content or components to load, improving perceived performance and user experience.

- **Image Caching:** A caching system was implemented to avoid re-downloading images already viewed, reducing redundant network requests and speeding up navigation.

- **State Management with Redux:** The app stores car data in Redux to prevent unnecessary repeated API calls, improving data retrieval speed and responsiveness.

- **Prioritized Largest Contentful Paint (LCP) Loading:** Following Google's LCP guidelines, I prioritized loading the most important content first to improve this critical performance metric.

Thanks to these optimizations, the app achieves impressive Lighthouse performance scores, resulting in a faster, smoother, and more enjoyable user experience.

 
  


***

## :compass: **Accessibility Standards**

I have implemented several key features to ensure the Volkswagen catalog app is accessible to all users:

- **Use of ARIA Labels:** All interactive elements, such as buttons and icons, include meaningful `aria-label` attributes to clearly describe their purpose to screen readers.

- **Alt Text for Images:** Every image in the app has descriptive `alt` text, making visual content understandable to users relying on assistive technologies.

- **Focus Management:** Focus is properly managed when modals open or close, ensuring keyboard users are not lost and can easily navigate back to the main content.

- **Accessible Forms:** Form elements have associated labels and clear error messages, improving usability and clarity for screen reader users.

- **Color Contrast:** The app’s color palette was chosen to meet or exceed recommended contrast ratios for text and UI components, ensuring readability for users with visual impairments.

- **Responsive and Scalable Typography:** Using MUI’s responsive typography system allows text to adjust properly on different screen sizes while remaining legible.

- **Enhanced Pagination Controls:** Pagination buttons respond both to mouse clicks and keyboard arrow keys for easier navigation, improving UX for keyboard users.

***

## :compass: **CI/CD Setup Discussion**

Implementing a CI/CD pipeline was a challenge since this was my first time setting up such a workflow. I initially chose to use GitHub Actions with the Deno preset, but encountered several issues because the preset did not fully align with the specific requirements of my application.

To address this, I decided to create a custom YAML configuration file for GitHub Actions. With the assistance of AI, I was able to craft a workflow file that reliably runs ESLint, executes tests, and verifies that all parts of the application work correctly at each stage of the pipeline.

This custom approach not only ensured smooth integration and delivery but also helped me better understand the CI/CD process and tailor it to the specific needs of the project.

***

## :warning: **License**

Distributed under no License. See LICENSE.txt for more information.

***

## :handshake: **Contact**

Sara Bengoa – [sarabengoar@gmail.com](mailto:sarabengoar@gmail.com)

Project Link: [https://github.com/utop90/volkswagenCatalog.git](https://github.com/utop90/volkswagenCatalog.git)
