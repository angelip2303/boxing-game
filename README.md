# boxing-game

## 📚 TL;DR

This project was created for the _Informática Audiovisual_ course of the _Software Engineering_ degree at Uniovi. It consists of a simple game where you fight against an AI by interacting with the application through a camera connected to the client system. When the game is over, that is, any of the players' health gets to 0: the user is prompted with a black screen indacting the state of the game. If you want to play another game, just reload the page.

## ⚠️ Enable hardware acceleration

This is required for an optimal performance of the application; as we are using ml5.js the support of the computer's hardware is advisable. This way, we are allowing the use of the GPU for machine learning purposes. The steps for enabling it are the following:

1. Go to the settings of your browser
2. Search for **Use hardware acceleration when available**
3. Enable it

## Usage

## Setup

Install dependencies

```sh
$ npm install
```

## Development

Run the local webpack-dev-server with livereload and autocompile on [http://localhost:4000/](http://localhost:4000/)

```sh
$ npm run start
```

## Deployment

Build the current application

```sh
$ npm run build
```
