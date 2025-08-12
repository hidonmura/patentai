<template>
  <div class="container">
    <h1 class="h1">AI知財ダッシュボード</h1>

    <div class="row">
      <div class="card" style="flex:1">
        <div class="h2">プロジェクトサマリー</div>
        <div class="row" style="align-items:center;">
          <div>
            <div class="big">3</div>
            <div class="text-muted">稼働中のプロジェクト</div>
          </div>
          <div>
            <div class="big">12</div>
            <div class="text-muted">タスク総数</div>
          </div>
        </div>
      </div>

      <div class="card" style="width:280px; display:grid; place-items:center;">
        <div class="h2">AI解析進捗</div>
        <div class="donut">
          <div class="donut-center">72%</div>
        </div>
      </div>

      <div class="card" style="width:280px;">
        <div class="h2">最近の通知</div>
        <ul>
          <li>レポートが生成されました</li>
          <li>新しいコメントがあります</li>
        </ul>
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <div class="h2">課題資料のインポート</div>
      <p class="text-muted">関連資料（事業計画・競合情報・技術資料など）をアップロードしてください。</p>

      <div class="dropzone" :class="{ over: isOver }" @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">
        <p>ここにファイルをドラッグ＆ドロップ</p>
        <input type="file" multiple @change="onPick" />
        <button class="btn" @click="pick">ファイルを選択</button>
      </div>

      <div v-if="files.length" style="margin-top:12px">
        <strong>選択済み:</strong>
        <ul>
          <li v-for="f in files" :key="f.name">{{ f.name }} ({{ Math.round(f.size/1024) }} KB)</li>
        </ul>
      </div>
    </div>



    <div class="grid grid-3" style="margin-top:16px;">
      <div v-for="p in projects" :key="p.id" class="card">
        <div class="h2">{{ p.title }}</div>
        <div class="text-muted">{{ p.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  { id: 1, title: 'AI 分析 PoC', desc: '競合A領域のクレーム調査' },
  { id: 2, title: '新規事業X', desc: '関連特許の俯瞰' },
  { id: 3, title: '社内ナレッジ整理', desc: '無効資料の探索' }
])

const files = ref([])
const isOver = ref(false)
let hiddenInput

const onDragOver = () => { isOver.value = true }
const onDragLeave = () => { isOver.value = false }
const onDrop = (e) => { files.value = Array.from(e.dataTransfer.files); isOver.value = false }

const onPick = (e) => { files.value = Array.from(e.target.files) }
const pick = () => { hiddenInput?.click() }
</script>

<style scoped>
.big { font-size: 28px; font-weight: 800; }
.donut { width: 120px; height: 120px; border-radius: 999px; background: conic-gradient(var(--brand) 0 260deg, #e5e7eb 260deg); display: grid; place-items: center; position: relative; }
.donut::after { content:''; width: 80px; height: 80px; background:#fff; border-radius: 999px; position:absolute; }
.donut-center { position: relative; font-weight: 800; }
.dropzone { border: 2px dashed var(--line); border-radius: 12px; padding: 20px; text-align: center; background: #fff; display:grid; gap:12px; }
.dropzone.over { background: var(--brand-100); border-color: var(--brand-600); }
.dropzone input[type=file] { display:none; }
</style>