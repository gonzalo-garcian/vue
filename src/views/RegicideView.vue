<script setup>
import CardList from "@/components/cards/CardList.vue";
import Card from "@/components/cards/Card.vue";
import regicide from "@/db/regicide.json";
import { ref } from "vue";

let castle = ref(regicide.castle);
let actualEnemy = castle.value.pop();
let playedCards = ref([]);
let discardPile = ref([]);
let deck = ref(regicide.deck);
let hand = ref(regicide.hand);
let rcvDmg = false;
let playing = ref(false);

function shuffleDeck() {
  for (let i = deck.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck.value[i];
    deck.value[i] = deck.value[j];
    deck.value[j] = temp;
  }
}

function draw(n) {
  deck.value = hand.value.concat(deck.value);
  shuffleDeck(deck.value);
  hand.value = [];
  hand.value = deck.value.splice(-n, n);
  //playedCards.value = playedCards.value.concat(deck.value.pop());
}

function doDmg() {
  actualEnemy.hp -= lastCardPlayed().number;
}

function lastCardPlayed() {
  return playedCards.value.length > 0
    ? playedCards.value.at(-1)
    : { number: "", symbol: "" };
}

function hearts() {
  console.log("Hearts");
  if (parseInt(lastCardPlayed().number) > discardPile.value.length) {
    discardPile.value = discardPile.value.reverse();
    deck.value = discardPile.value.concat(deck.value);
    discardPile.value = [];
  } else {
    deck.value = discardPile.value
      .splice(-lastCardPlayed().number)
      .reverse()
      .concat(deck.value);
  }
}

function diamonds() {
  console.log("diamonds");

  let nCardsCanGet = 8 - hand.value.length;
  let nDraw =
    lastCardPlayed().number < nCardsCanGet
      ? lastCardPlayed().number
      : nCardsCanGet;

  console.log(nDraw);
  if (nDraw > deck.value.length) {
    deck.value = deck.value.reverse();
    hand.value = deck.value.concat(hand.value);
    deck.value = [];
  } else {
    hand.value = deck.value.splice(-nDraw).reverse().concat(hand.value);
  }
}

function clovers() {
  console.log("clovers");
  doDmg();
}

function pikes() {
  actualEnemy.attack -= lastCardPlayed().number;
}

function move() {
  console.log(lastCardPlayed().symbol);
  if (lastCardPlayed().symbol !== actualEnemy.symbol) {
    switch (lastCardPlayed().symbol) {
      case "♥":
        hearts();
        break;
      case "♦":
        diamonds();
        break;
      case "♣":
        clovers();
        break;
      case "♠":
        pikes();
        break;
    }
  }

  doDmg();

  if (actualEnemy.attack > 0 && actualEnemy.hp > 0) {
    rcvDmg = true;
  }
  if (actualEnemy.hp <= 0) {
    actualEnemy = castle.value.pop();
  }
}

function onDropPlay(evt) {
  if (!rcvDmg) {
    let itemId = evt.dataTransfer.getData("itemID");
    let cardTransfer = hand.value.splice(
      hand.value.findIndex((item) => item.number + item.symbol === itemId),
      1
    );
    console.log(cardTransfer);
    playedCards.value = playedCards.value.concat(cardTransfer);
    move();
  }
}

let actualDiscCards = ref(0);
function onDropDiscard(evt) {
  if (rcvDmg) {
    let itemId = evt.dataTransfer.getData("itemID");
    let cardTransfer = hand.value.splice(
      hand.value.findIndex((item) => item.number + item.symbol === itemId),
      1
    );
    console.log(cardTransfer);
    discardPile.value = discardPile.value.concat(cardTransfer);
    actualDiscCards.value += parseInt(discardPile.value.at(-1).number);
    console.log(discardPile.value.at(-1).number);
    console.log(actualDiscCards.value);
    console.log(actualEnemy.attack);
    if (actualDiscCards.value >= actualEnemy.attack) {
      rcvDmg = false;
      actualDiscCards.value = 0;
    }
  }
}
</script>

<template>
  <div class="grid grid-rows-3 gap-20">
    <div class="grid grid-cols-3 gap-20 max-h-10">
      <Card :number="actualEnemy.number" :symbol="actualEnemy.symbol">
        {{ actualEnemy.hp }}
        {{ actualEnemy.attack }}
      </Card>
      <Card
        :number="lastCardPlayed().number"
        :symbol="lastCardPlayed().symbol"
        @drop="onDropPlay($event)"
        @dragover.prevent
        @dragenter.prevent
      />
      <Card
        :number="discardPile.length.toString()"
        @drop="onDropDiscard($event)"
        @dragover.prevent
        @dragenter.prevent
      />
    </div>
    <CardList :cards="hand" />

    <button v-if="!playing" class="bg-gray-600" @click="draw(8);playing=true">Play!</button>
  </div>
  <div v-if="rcvDmg" class="p-10">
    Damage remaining {{ actualEnemy.attack - actualDiscCards }}
  </div>
</template>

<style></style>
