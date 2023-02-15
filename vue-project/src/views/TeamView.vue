<script setup>
import TeamMember from "@/components/teams/TeamMember.vue";
import team from "@/team.json";
</script>

<template>
  <table>
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
</template>
