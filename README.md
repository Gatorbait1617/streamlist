# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# StreamList PWA Design

## Purpose

StreamList is an EZTechMovie customer-event application. Users can record and view movie-related events, including movies added to a watchlist and movies marked as watched.

## Progressive Web App Features

The application was enhanced as a Progressive Web App (PWA) so it can be installed and used like a desktop application.

### Web App Manifest

The `manifest.webmanifest` file provides application metadata, including:

- Application name: StreamList
- Short name for the installed application
- Theme and background colors
- Standalone display mode
- Application icons in 192px and 512px sizes
- Start URL and application scope

The standalone display mode allows StreamList to open in its own application window after installation.

### Service Worker

The `sw.js` service worker supports offline behavior and improves application performance.

It performs the following tasks:

- Caches the StreamList application shell.
- Serves cached files when the user has no internet connection.
- Retrieves current files from the network when they are not cached.
- Removes older caches when the cache version changes.
- Attempts API requests through the network.
- Returns a clear offline error response if customer event data cannot be reached.

### Desktop Installation

To install StreamList on a desktop device:

1. Run the production build of the React application.
2. Open the application in a modern browser such as Chrome or Edge.
3. Select the install icon in the browser address bar, or open the browser menu.
4. Choose **Install StreamList**.
5. Open StreamList from the desktop or applications menu.

The application will open in a standalone window and can load previously cached application files without an internet connection.