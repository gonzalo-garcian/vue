<script setup>
import Card from "@/components/cards/Card.vue";
defineProps({
  cards: Array,
});

function startDrag(evt, item) {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("itemID", item);
}

</script>

<template>
  <div class="grid grid-cols-7 gap-5">
    <Card
      v-for="card in cards"
      :key="card.number + card.symbol"
      :number="card.number"
      :symbol="card.symbol"
      draggable="true"
      @dragstart="startDrag($event, card.number + card.symbol)"
    />
  </div>
</template>
