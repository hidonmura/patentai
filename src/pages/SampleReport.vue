<!-- src/pages/SampleReport.vue -->
<template>
  <section class="card">
    <header class="report-head">
      <h1>戦略的特許分析レポート（サンプル）</h1>
      <div class="actions">
        <button class="btn" @click="window.print()">印刷 / PDF保存</button>
        <router-link class="btn secondary" to="/">ダッシュボードへ戻る</router-link>
      </div>
    </header>

    <!-- タブ -->
    <div class="tabs" role="tablist">
      <button
        v-for="t in tabs" :key="t.key"
        class="tab" :class="{active: activeTab===t.key}"
        role="tab" :aria-selected="activeTab===t.key" :aria-controls="`panel-${t.key}`"
        @click="switchTab(t.key)"
      >
        {{ t.label }}
      </button>
    </div>
  </section>

  <!-- 1. 概要 -->
  <section v-show="activeTab==='overview'" id="panel-overview" class="card" role="tabpanel" aria-labelledby="tab-overview">
    <h2>レポート概要</h2>
    <p>
      本レポートは、提出いただいた事業情報をベースに、特許観点での着眼点をサンプルとして可視化したものです。
      市場トレンド、競合の出願動向、技術シーズの整理を行い、優先度の高いテーマの仮説を提示します。
    </p>
  </section>

  <!-- 2. 重点領域候補 -->
  <section v-show="activeTab==='focus'" id="panel-focus" class="card" role="tabpanel" aria-labelledby="tab-focus">
    <h2>重点領域候補</h2>
    <div class="grid">
      <div class="panel">
        <h3>AI最適化アルゴリズム ⟶ 制御システム</h3>
        <ul class="bullets">
          <li>優先度：<b>高</b> <span class="badge green">特許アプローチ良好</span></li>
          <li>関連キーワード：強化学習 / 最適化 / 省電力制御</li>
        </ul>
      </div>
      <div class="panel">
        <h3>知財連携基盤</h3>
        <ul class="bullets">
          <li>優先度：<b>中</b> <span class="badge green">特許アプローチ良好</span></li>
          <li>関連キーワード：API連携 / 監査ログ / 権利化KPI</li>
        </ul>
      </div>
      <div class="panel">
        <h3>エッジ端末管理セキュリティ</h3>
        <ul class="bullets">
          <li>優先度：<b>中</b> <span class="badge yellow">追加検証</span></li>
          <li>関連キーワード：ゼロトラスト / 署名更新</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- 3. 競合分析（折れ線） -->
  <section v-show="activeTab==='competition'" id="panel-competition" class="card" role="tabpanel" aria-labelledby="tab-competition">
    <h2>競合分析：特許出願件数の推移</h2>
    <canvas ref="lineRef" height="120"></canvas>
  </section>

  <!-- 4. パテントマップ（バブル） -->
  <section v-show="activeTab==='patentmap'" id="panel-patentmap" class="card" role="tabpanel" aria-labelledby="tab-patentmap">
    <h2>パテントマップ</h2>
    <div class="controls">
      <label>領域：
        <select v-model="domain">
          <option>全体像</option>
          <option>制御系</option>
          <option>セキュリティ</option>
        </select>
      </label>
    </div>
    <canvas ref="bubbleRef" height="140"></canvas>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip, BubbleController } from 'chart.js'
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip, BubbleController)

const tabs = [
  { key: 'overview', label: 'レポート概要' },
  { key: 'focus', label: '重点領域候補' },
  { key: 'competition', label: '競合分析' },
  { key: 'patentmap', label: 'パテントマップ' }
]
const activeTab = ref('overview')       // 初期は「概要」

// Chart.js
const lineRef = ref(null)
const bubbleRef = ref(null)
let lineChart, bubbleChart

const domain = ref('全体像')
const years = ['2020','2021','2022','2023','2024']
const series = { 'A社':[12,15,18,26,33], 'B社':[8,11,14,19,25], '自社':[5,8,12,17,22] }
const bubbleSets = () => ({
  '全体像': [
    {label:'自社', data:[{x:1,y:6,r:18}]},
    {label:'A社', data:[{x:3,y:8,r:22}]},
    {label:'B社', data:[{x:6,y:4,r:12}]}
  ],
  '制御系': [
    {label:'自社', data:[{x:2,y:7,r:16}]},
    {label:'A社', data:[{x:4,y:9,r:24}]},
    {label:'B社', data:[{x:5,y:5,r:10}]}
  ],
  'セキュリティ': [
    {label:'自社', data:[{x:3,y:5,r:14}]},
    {label:'A社', data:[{x:6,y:6,r:18}]},
    {label:'B社', data:[{x:2,y:4,r:12}]}
  ]
})

const buildLine = () => {
  if (!lineRef.value) return
  if (lineChart) lineChart.destroy()
  lineChart = new Chart(lineRef.value, {
    type: 'line',
    data: { labels: years, datasets: Object.entries(series).map(([label, data]) => ({ label, data, tension: 0.25 })) },
    options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }
  })
}

const buildBubble = () => {
  if (!bubbleRef.value) return
  if (bubbleChart) bubbleChart.destroy()
  const sets = bubbleSets()[domain.value]
  bubbleChart = new Chart(bubbleRef.value, {
    type: 'bubble',
    data: { datasets: sets.map(s => ({ label: s.label, data: s.data })) },
    options: {
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { title: { display: true, text: '技術スコア' }, beginAtZero: true, max: 10 },
        y: { title: { display: true, text: '出願件数（相対）' }, beginAtZero: true, max: 10 }
      }
    }
  })
}

// タブ切替時に必要なチャートだけ初期化（非表示状態での初期化を避ける）
const switchTab = (key) => {
  activeTab.value = key
  if (key === 'competition') buildLine()
  if (key === 'patentmap') buildBubble()
}

watch(domain, () => { if (activeTab.value === 'patentmap') buildBubble() })

onMounted(() => {
  // 初期タブがグラフなら作成（デフォはoverviewなので不要）
})
onBeforeUnmount(() => { lineChart?.destroy(); bubbleChart?.destroy() })
</script>

<style scoped>
.tabs { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
.tab { padding:8px 12px; border-radius:10px; border:1px solid var(--line); background:#fff; cursor:pointer; }
.tab.active { background: var(--brand-100); border-color: var(--brand-600); font-weight: 800; }
.report-head { display:flex; gap:16px; align-items:center; justify-content:space-between; }
.actions { display:flex; gap:8px; }

/* 重点領域候補パネル */
.panel { 
  background:#fff; 
  border:1px solid var(--line); 
  border-radius:12px; 
  padding:16px; 
}

/* タイトルを目立たせる */
.panel h3 {
  font-size: 1.25rem;       /* 少し大きく */
  font-weight: 800;
  color: #111827;           /* 濃いめの文字色 */
  margin-bottom: 8px;       /* 箇条書きとの余白 */
}

/* 箇条書きの行間を広めに */
.bullets { 
  margin: 8px 0 0; 
  padding-left: 20px; 
}
.bullets li {
  margin-bottom: 6px;       /* 項目間の余白 */
  line-height: 1.5;         /* 行間も少し広く */
}

/* バッジを大きく見やすく */
.badge { 
  display: inline-block;
  padding: 4px 10px; 
  border-radius: 999px; 
  font-size: 0.9rem; 
  font-weight: 700;
  margin-left: 6px; 
}
.badge.green { 
  background:#16a34a33; 
  border:1px solid #16a34a88; 
  color: #166534; 
}
.badge.yellow { 
  background:#ca8a0433; 
  border:1px solid #ca8a0488; 
  color: #92400e; 
}

.controls { margin-bottom:8px; }
</style>