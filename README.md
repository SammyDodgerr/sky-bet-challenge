# SkyBetTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.
It has incorporated Angular Material Components library, for quick pre built components that I am not taking credit for:
- Tabs
- Slide Toggle
- Accordion (match-detail view)
- Buttons

## Spin it up

In the deployment folder (top level) you will find a docker compose file. <br>
Running 'docker compose up' (you will need docker for this to work) will build and spin up the UI on a nginx server, alongside the pre-built API. <br>
Once this is done, you can visit localhost:3000 to access the application. <br>

Note: depending on which version of docker you are running you may need to specify 'docker compose up --build' to ensure it builds the UI image.

## Running unit tests

There are unit tests within this project that run automatically during the build of the docker image. <br>
Alternatively, you can use the Angular CLI (again this will need to be downloaded) and run 'ng test' to run all the tests. <br>
You could also shell into the UI container using docker desktop and run 'ng test' (where the angular CLI is already installed). <br>
The tests that felt most helpful were testing the functionality of my pipes (src/app/shared/pipes) and testing my fractional unit conversion was functional (src/app/primary-market/primary-market.component.spec.ts)

## Usage
Note: this site has been optimized for desktop and is recommended to use it on bigger screens.<br>
Given more time a mobile friendly view could be optimized.

<b>Market View</b><br>
The bell with the plus icon is available on markets, which enables live updates on the event. 
These outcomes should flash green when updated.
The '+' icon allows users to add outcomes to betslips, which is maintained as you navigate through the UI. You can clear the betslip at any time with the button at the bottom.

<b>Toolbar</b><br>
There is a dynamic toolbar at the top right of the UI that is maintained throughout navigation, this shows toggles for displays.

<b>General</b><br>
If you ever want to go back to the main view from a match detail, there is a home icon in the top right of the match-detail view.

##Architecture
I have used reusable components throughout the UI to keep the solution lean, and services to maintain data retrieval and user preferences.
