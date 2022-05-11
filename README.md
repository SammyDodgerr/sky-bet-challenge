# SkyBetTest

##Tech
The project was build using Angular 12.<br>
It has incorporated Angular Material Components library, for quick pre built components that help improve UI/UX.
Any HTML element that starts with '<mat...' is part of this library.<br>
It takes advantage of lodash and Fraction libraries to help manipulate the data with ease and consistency.

## Spin it up

<b>System Requirements: </b> Docker

In the deployment folder (top level) you will find a docker compose file. <br>
Running 'docker compose up' will build and spin up the UI on a nginx server, alongside the pre-built API. <br>
Once this is done (UI may take a couple of minutes to build), you can visit localhost:3000 to access the application. <br>

## Running unit tests

There are unit tests within this project that run automatically during the build of the docker image. <br>
Alternatively, you can use the Angular CLI (this would need to be downloaded) and run 'ng test' to run all the tests. <br>
You could also shell into the UI container using docker desktop and run 'ng test' (where the angular CLI is already installed). <br>
The tests that felt most helpful were testing the functionality of my pipes (src/app/shared/pipes) and testing my fractional unit conversion was functional (src/app/primary-market/primary-market.component.spec.ts)

## Usage / Architecture
Note: this site has been optimized for desktop and is recommended to use it on bigger screens.<br>
Given more time a mobile friendly view could be optimized.

I have tried to use reusable components out to keep the solution lean and services to help manage data retrieval and storage across multiple components.

<b>Home Overview</b><br>
This is where the user lands on start up. It has the main groups organised into tabs and has the option to toggle the primary markets via the toolbar in the top right.
You can go to a match detail view be clicking on the button at the top right of a match.

<b>Match Detail</b><br>
This view shows you all the markets for a match organised into expandable accordions. There is a metadata overview in the top left of the screen, and you can return to the home overview via the home button in the top right of the UI.

<b>Market View</b><br>
This component is used both home overview to show primary markets and match detail to show expanded accordions.

The bell with the plus icon is which enables live updates on the market.
These outcomes should flash green when updated.
The '+' icon allows users to add outcomes to betslips, unless the market is suspended in which case this button is hidden, and the styling is more muted.

<b>Betslip</b><br>
There is a betslip which is maintained as you navigate through the UI. Bets should in there when they are added, and changes dynamically for any updates received from the API (should also flash green). <br>You can clear the betslip at any time with the button at the bottom.

<b>Toolbar</b><br>
There is a dynamic toolbar at the top right of the UI that is maintained throughout navigation, this shows toggles for displays.
