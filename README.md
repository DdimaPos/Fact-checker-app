# Team 8 - Challenge 2 frontend Fact checker

This is the frontend app for the Fact Checker project. It provides a user-friendly interface 
to verify the validity of the news or affirmations in internet.

## Screenshots

![image](https://github.com/user-attachments/assets/1a4a1403-603d-4602-a9c7-f2f546d19d7e)
*Uses mock data*

## Installation and run

In order to run the app
```bash
git clone https://github.com/DdimaPos/XmasHackathonFront2024.git
cd XmasHackathonFront2024
npm i
npm run dev
```
Access on displayed localhost

1. To run the browser extension run
```bash
npm run build
```
2. Go to "manage extensions" tab in your chromium-based browser
3. Press `Load unpacted`
4. Select the `dist` folder of the project

## Usage

### WebSite

1. Introduce the paragraph of text or link to news in input field
2. Press `Check` button and wait
3. Be proud that you know the truth

### Browser extension

Also to reduce the number of clicks for the user, we integrated the app as a chromium extension
that can fact-check selected text from context-menu (right click)

1. Select the text on any website
2. Click the right button on mouse
3. Select `Fact check`
   
![image](https://github.com/user-attachments/assets/2c18413b-22ac-417a-bd04-8cf9bf507a0d)

## Stack

- React
- TypeScript
- Shadcn/UI library

