# SkyBetTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1.

## Spin it up

In the deployment folder (top level) you will find a docker compose file. <br>
Running 'docker compose up' (you will need docker for this to work) will build and spin up the UI on a nginx server, alongside the pre-built API. <br>
Once this is done, you can visit localhost:4200 to access the application. <br>

## Running unit tests

There are unit tests within this project that run automatically during the build of the docker image. <br>
Alternatively, you can use the Angular CLI (again this will need to be downloaded) and run 'ng test' to run all the tests. <br>
You could also shell into the UI container using docker desktop and run 'ng test' (where the angular CLI is already installed). <br>
 
