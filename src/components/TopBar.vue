<template>
  <header class="bar">
    <div class="brand">
      <img :src="logoUrl" alt="Patent Planet" width="28" height="28" />
      <strong>Patent Planet</strong>
    </div>
    <div class="right">
      <button class="icon-btn" title="通知">🔔</button>
      <div class="user">ゲストさん</div>
    </div>
  </header>
</template>

<script setup>
import logoUrl from '../assets/logo.png'
</script>

<style scoped>
.bar { display:flex; align-items:center; justify-content:space-between; padding: 0 15; border-bottom:1px solid var(--line); background:#fff; }
.brand { display:flex; gap:10px; align-items:center; }
.right { display:flex; gap:12px; align-items:center; }
.icon-btn { background: transparent; border: 1px solid var(--line); border-radius: 10px; padding: 6px 10px; cursor: pointer; }
.user { font-weight: 700; }
</style>
