# PolarisJS
Polaris Web Application in Javascript

Polaris is the go-to web application for San Juan County WA citizens and employees to get information on property, critical areas, and other maps.

## Features
- Search by parcel number, address, road or island name
- Use the identify button and click on the map to receive information about property
- Toggle map layers on or off in the Map Contents window
- Create PDF or images of the map in the Print window
- Make annotations and draw on the map using the Draw window

## Installation
Polaris requires [Node.js](http://nodejs.org) to be installed.

Run the following commands:

``` shell
git clone https://github.com/SJCGIS/PolarisJS.git
npm install
npm run build
```
This creates the necessary files in the `dist` folder. Copy and paste the contents of the `dist` folder to a web enabled location on a web server i.e. ` C:\inetpub\wwwroot\polaris`.

## Service Workers

Starting in Polaris version 2.0 Service Workers will install JavaScript, CSS, and other application shell assets onto the client's web browser. This means subsequent loads of Polaris will load the application files directly from the web browser rather than downloading from the network even after closing and reopening the browser! Only the map images need to be downloaded which reduces the load time significantly for slower connections.

For example, on a slow 2G network (250kb/s down), it takes 42 seconds for Polaris to load all the logic, styles, and map images. With the logic and styles automatically installed in the browser by the service worker, subsequent refreshes take only 15 seconds for downloading the map images! When we factor in the browser cache for map images Polaris refreshes in only 7 seconds.

__Note:__ Service workers only work when the page is served by HTTPS. Service workers are [not available in IE, Safari, and Edge browsers](http://caniuse.com/#feat=serviceworkers). Pages loaded with HTTP or in an unsupported browser will fall back to using browser caches.

[More on Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## Contribute
Everyone is welcome to contribute. Submit enhancement requests, bugs or comments on the [Issues](https://github.com/SJCGIS/PolarisJS/issues) page.

Want to modify the code yourself? [Fork the repository](https://github.com/SJCGIS/PolarisJS/fork) and start working on your own copy. You are encouraged to submit your changes as a pull request for inclusion in the main software.

## Questions
[Submit an issue](https://github.com/SJCGIS/PolarisJS/issues) or email us at [sjcgis@sanjuanco.com](mailto:sjcgis@sanjuanco.com).
