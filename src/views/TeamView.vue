<script setup>
import TeamMember from "@/components/teams/TeamMember.vue";
import team from "@/db/team.json";
</script>
<template>
  <div class="place-self-center flex flex-col gap-y-3" style="width: 725px">
    <table class="table-fixed border-spacing-2 border-separate">
      <tbody>
        <TeamMember
          v-for="member in team"
          :name="member.name"
          :email="member.email"
          :status="member.status"
          :key="member.email"
        ></TeamMember>
      </tbody>
    </table>
  </div>
</template>
