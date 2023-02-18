<script setup>
import CardList from "@/components/cards/CardList.vue";
import Card from "@/components/cards/Card.vue";
import regicide from "@/db/regicide.json";
import { ref, computed, reactive } from "vue";

let castle = ref(regicide.castle);
let actualEnemy = castle.value.pop();
let playedCards = ref([]);
let discardPile = ref([]);
let deck = ref(regicide.deck);
let hand = ref(regicide.hand);

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

function lastCardPlayed() {
  return playedCards.value.length > 0
    ? playedCards.value.at(-1)
    : { number: "", symbol: "" };
}

function move() {
    
}

function onDrop(evt) {
  let itemId = evt.dataTransfer.getData("itemID");
  let cardTransfer = hand.value.splice(
    hand.value.findIndex((item) => item.number + item.symbol === itemId),
    1
  );
  console.log(cardTransfer)
  playedCards.value = playedCards.value.concat(cardTransfer)
  move();
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
        @drop="onDrop($event)"
        @dragover.prevent
        @dragenter.prevent
      />
      <Card :number="discardPile.length.toString()" />
    </div>
    <CardList :cards="hand" />

    <button class="bg-gray-600" @click="draw(7)">Draw!</button>
  </div>
</template>

<style></style>
