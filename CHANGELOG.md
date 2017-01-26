# Change Log

Notable changes to this project will be documented in this file, however changes to the map layers, data, etc may not be included here.

The format is based on [Keep a Changelog](http://keepachangelog.com) and this project adheres to [Semantic Versioning](http://semver.org)

## [2.3.0] - 2017-01-26
### Fixed
- Fix issue where info window was showing "No Information Available" on some map layers

### Added
- Add ability to change opacity of layers in Map Contents

### Changed
- Map contents widget uses the new Layer List dijit from ArcGIS JavaScript API
- Change Google Analytics code to use with Layer List dijit
- Update ArcGIS JavaScript API to v3.19.0
- Update dependencies

## [2.2.2] - 2016-10-16
### Fixed
- ServiceWorker errors were not being sent to Google Analytics

## [2.2.1] - 2016-10-11
### Changed
- Change URL pattern for cached basemap

## [2.2.0] - 2016-10-10
### Added
- Add google analytics for service worker events
- Add google analytics events to Polaris application

## [2.1.0] - 2016-10-06
### Added
- Add all json requests to service worker
- Add level 0 aerial basemap tiles to service worker


## [2.0.0] - 2016-09-28
### Added
- Add ability to create minimized builds using the Dojo build system
- Add service worker support for JavaScript, CSS, and image assets
- Add grunt and npm tools for installation
- Add license file

### Changed
- Move JavaScript from inline to separate file
- Upgrade to Esri JSAPI version 3.17
- Upgrade Intro.js to version 2.3.0
- JavaScript and CSS assets are served locally instead of using a CDN

### Removed
- Remove source code for Intro.js
- Remove CDN links from index.html (See installation instructions in README.md)


## [1.0.2] - 2016-04-18
### Fixed
- Fix bug where point measurement was clearing the result before the user could read it

## [1.0.1] - 2016-04-08
### Fixed
- Fix typo that was breaking application

## [1.0.0] - 2016-04-08 [YANKED]
### Added
- First final release
