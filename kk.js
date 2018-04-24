// Keynote Karaoke - a game
// ────────────────────────────────────────────────────────────
// Copyright © 2018 Keiran King (http://keiranking.com)
// Licensed under the Apache License, Version 2.0.
// (https://github.com/keiranking/Anna/blob/master/LICENSE.txt)
// ────────────────────────────────────────────────────────────

// GLOBAL CONSTANTS -----------------------------------------------------------
const ROUND_DURATION = 180;

// GLOBAL DOM VARIABLES -------------------------------------------------------
let card = document.getElementById("card");
let note = null;

// DATA TYPE FUNCTIONS --------------------------------------------------------
Number.prototype.toTimeString = function() { // convert seconds to MM:SS string
  let time = parseInt(this, 10);
  let m = Math.floor(time / 60);
  let ss = time - (m * 60);
  ss = ss < 10 ? "0" + ss : ss;
  return m + ":" + ss;
}

Number.prototype.random = function() { // return random number between 0 and the number (exclusive)
  return Math.floor(Math.random() * this);
}

String.prototype.random = function() { // return random character from string
  return this[this.length.random()];
}

Array.prototype.pluck = function(n = 1) { // return random item, which is deleted from array
  let list = [];
  for (let i = 0; i < n; i++) {
    const index = this.length.random();
    list.push(this[index]);
    this.splice(index, 1);
  }
  return list.length == 1 ? list[0] : list;
}

Array.prototype.random = function() { // return random item from array
  return this[this.length.random()];
}

Object.prototype.randomKey = function() { // return random key from dictionary
  return Object.keys(this).random();
}

Object.prototype.flatten = function() { // return flattened array of all nested items in dictionary
  let array = [];
  let keys = Object.keys(this);
  for (i = 0; i < keys.length; i++) {
    array = array.concat(this[keys[i]]);
  }
  return array;
}

// CLASSES --------------------------------------------------------------------
class Player {
  constructor() {
    this.name = null;
    this.score = 0;
    console.log("New player.");
  }
}

class Presentation {
  constructor() {
    this.slides = [];
    console.log("New presentation.");
  }
}

class Clock {
  constructor(seconds = ROUND_DURATION) {
    this.secs = seconds;
    this.id = null;
    this.publish();
  }

  toggle() {
    clearInterval(this.id);
    if (this.id) {
      console.log("Timer paused.");
      this.id = null;
      return;
    }
    console.log("Timer on.");
    this.id = setInterval(this.tick.bind(this), 1000); // setInterval inside a class needs .bind(this) to work
  }

  reset() {
    clearInterval(this.id);
    this.id = null;
    this.secs = ROUND_DURATION;
    this.publish();
    console.log("Timer reset.");
  }

  tick() {
    this.secs--;
    if (this.secs < 0) {
      this.reset();
      return;
    }
    if (this.secs == 0) {
      audio.play();
    }
    this.publish();
  }

  publish() {
    if (this.secs <= WARNING_TIME) {
      timer.classList.add("warning");
    } else {
      timer.classList.remove("warning");
    }
    timer.innerHTML = this.secs.toTimeString();
  }
}

class Game {
  constructor() {
    this.players = []; // array of Players
    this.teams = []; // array of dictionaries? so you can lookup teams[i][player]
    this.presentations = []; // array of Presentations
    console.log("New game.");
  }
}

class PresentationUI {
  constructor() {
    console.log("New presentation user interface.");
  }
}

class ScoreboardUI {
  constructor() {
    console.log("New scoreboard user interface.");
  }
}

class NotificationUI {
  constructor(message, lifetime = undefined) {
    this.message = message;
    this.id = (100000).random().toString();
    this.post();
    if (lifetime) {
      this.dismiss(lifetime);
    }
  }

  post() {
    let div = document.createElement("DIV");
    div.setAttribute("id", this.id);
    div.setAttribute("class", "notification");
    div.innerHTML = this.message;
    div.addEventListener('click', this.dismiss);
    document.getElementById("notebar").appendChild(div);
  }

  update(message) {
    document.getElementById(this.id).innerHTML = message;
  }

  dismiss(seconds = 0) {
    let div = document.getElementById(this.id);
    setTimeout(function() { div.remove(); }, seconds * 1000);
  }
}

// FUNCTIONS ------------------------------------------------------------------


// MAIN -----------------------------------------------------------------------
