<template>
  <div class="layout">
    <SideNav />
    <div class="main">
      <TopBar />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import SideNav from './components/SideNav.vue'
import TopBar from './components/TopBar.vue'
</script>

<style scoped>
.layout { display: grid; grid-template-columns: 240px 1fr; height: 100vh; }
.main { display: grid; grid-template-rows: 64px 1fr; }
.content { padding: 20px; overflow: auto; }
@media (max-width: 920px) {
  .layout { grid-template-columns: 1fr; }
}
</style>