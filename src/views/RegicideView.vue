<script setup>
import CardList from "@/components/cards/CardList.vue";
import Card from "@/components/cards/Card.vue";
import regicide from "@/db/regicide.json";
import { version } from "@/../package.json";
import { ref } from "vue";

let castle = ref(regicide.castle);
let actualEnemy = castle.value.pop();
let playedCards = ref([]);
let discardPile = ref([]);
let deck = ref(regicide.deck);
let hand = ref(regicide.hand);
let rcvDmg = false;

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
}

function doDmg() {
  actualEnemy.hp -= lastCardPlayed().number;
}

function lastCardPlayed() {
  return playedCards.value.length > 0
    ? playedCards.value.at(-1)
    : { number: "X", symbol: "X" };
}

function hearts() {
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

  let nCardsCanGet = 8 - hand.value.length;
  let nDraw =
    lastCardPlayed().number < nCardsCanGet
      ? lastCardPlayed().number
      : nCardsCanGet;

  if (nDraw > deck.value.length) {
    deck.value = deck.value.reverse();
    hand.value = deck.value.concat(hand.value);
    deck.value = [];
  } else {
    hand.value = deck.value.splice(-nDraw).reverse().concat(hand.value);
  }
}

function clovers() {
  doDmg();
}

function pikes() {
  actualEnemy.attack -= lastCardPlayed().number;
}

function move() {
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
    if(actualEnemy.hp === 0){
      playedCards.value.unshift({"number": actualEnemy.attack, "symbol": actualEnemy.symbol})
    }
    playedCards.value = playedCards.value.reverse();
    discardPile.value = playedCards.value.concat(discardPile.value);
    playedCards.value = [];
    nEnemy.value++;
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
    discardPile.value = discardPile.value.concat(cardTransfer);
    actualDiscCards.value += parseInt(discardPile.value.at(-1).number);
    if (actualDiscCards.value >= actualEnemy.attack) {
      rcvDmg = false;
      actualDiscCards.value = 0;
    }
  }
}
draw(8);
let nEnemy = ref(1);
</script>

<template>
  <div class="min-h-[45vh] min-w-[35%] rounded-[2rem] glass flex items-center justify-center">
    <div class="grid grid-rows-2 gap-1 place-content-center m-[30px]">
      <div class="grid grid-rows-2 place-items-center border-dashed border-2 border-violet-800 mb-7 pb-8">
        <div class="grid grid-cols-4 gap-1 place-items-center">
          <div>S {{ nEnemy }}</div>
          <div>HP: {{actualEnemy.hp}}</div>
          <div>ATTACK: {{actualEnemy.attack}}</div>
          <div v-show="rcvDmg">
            DR {{ actualEnemy.attack - actualDiscCards }}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 place-items-center">
          <h1>Enemy</h1>
          <h1>Played</h1>
          <h1>Discard</h1>
        </div>
        <div class="grid grid-cols-3 gap-4 place-items-center">
          <Card :number="actualEnemy.number" :symbol="actualEnemy.symbol">
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
      </div>
      <CardList :cards="hand"/>
    </div>
  </div>
  <h1 class="p-6"> v{{ version }}</h1>
</template>

<style>
 .glass {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.2)
  );
 }
</style>