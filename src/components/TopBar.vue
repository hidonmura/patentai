<template>
  <header class="bar">
    <div class="brand">
      <img :src="brandLogo" :alt="brandAlt" class="brand-logo" />
    </div>
    <div class="right">
      <button class="icon-btn" title="通知">🔔</button>
      <div class="user">ゲストさん</div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import mercuryLogo from '../assets/mercury-scan.png'
import defaultLogo from '../assets/vue.svg'

const route = useRoute()
const isStrategicSupport = computed(() => route.name === 'strategic-support-report')
const brandLogo = computed(() => (isStrategicSupport.value ? mercuryLogo : defaultLogo))
const brandAlt = computed(() => (isStrategicSupport.value ? 'Mercury Scan' : 'Patent Planet'))
</script>

<style scoped>
.bar { display:flex; align-items:center; justify-content:space-between; padding: 0 15px; border-bottom:1px solid var(--line); background:#fff; }
.brand { display:flex; gap:10px; align-items:center; }
.brand-logo { height: 32px; width: auto; }
.right { display:flex; gap:12px; align-items:center; }
.icon-btn { background: transparent; border: 1px solid var(--line); border-radius: 10px; padding: 6px 10px; cursor: pointer; }
.user { font-weight: 700; }
</style>
