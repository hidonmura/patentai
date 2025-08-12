<template>
  <div class="container">
    <div class="card" style="max-width:840px; margin: 0 auto;">
      <h1 class="h1">対象事業の戦略情報を入力してください</h1>

      <div class="grid" style="gap:16px;">
        <div class="field">
          <label>事業概要 <span class="badge">必須</span></label>
          <textarea v-model.trim="form.summary" class="textarea" placeholder="次世代◯◯を開発し、◯◯市場でのリーダーシップを目指す"></textarea>
          <small v-if="errors.summary" class="text-muted">{{ errors.summary }}</small>
        </div>

        <div class="field">
          <label>目標市場</label>
          <input v-model.trim="form.market" class="input" placeholder="例）エンタープライズ向けクラウドサービス市場" />
          <small v-if="errors.market" class="text-muted">{{ errors.market }}</small>
        </div>

        <div class="field">
          <label>技術ロードマップ</label>
          <textarea v-model.trim="form.roadmap" class="textarea" placeholder="例）2025年：◯◯対応、2026年：◯◯拡張 ..."></textarea>
        </div>

        <div class="field">
          <label>競合情報</label>
          <textarea v-model.trim="form.competitor" class="textarea" placeholder="主要競合・代替技術など"></textarea>
        </div>

        <div class="field">
          <label>ファイルアップロード</label>
          <div
            class="dropzone"
            :class="{ over: isOver }"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
          >
            <p>関連資料（事業計画・レポートなど）をここにドラッグ＆ドロップ</p>
            <input ref="picker" type="file" multiple @change="onPick" />
            <button class="btn" @click="pick">ファイルを選択</button>
          </div>
        
          <ul v-if="files.length" class="file-list">
            <li v-for="f in files" :key="f.name">{{ f.name }}</li>
          </ul>
        </div>

<div class="actions-wrapper">
  <p class="note-warning">
    【注意】お客様のデータはAIモデルの学習には使用されず、セキュアな環境で処理されます。
  </p>
  <button class="btn-large" :disabled="loading" @click="submit">AI分析開始</button>
  <router-link class="btn-back" to="/projects/new">戻る</router-link>
</div>
<div v-if="loading" class="overlay" aria-live="polite">
  <div class="overlay-card">
    <h3 class="overlay-title">
      AIによる解析をすすめております。しばらくおまちください。
    </h3>
    <div class="progress">
      <div class="bar" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="progress-meta">
      <span>{{ progress }}%</span>
      <span class="step">{{ currentStep }}</span>
    </div>
  </div>
</div>
      </div>
    </div>
  </div>


</template>

<script setup>


import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive({ summary: '', market: '', roadmap: '', competitor: '' })
const errors = reactive({})
const files = ref([])
let isOver = ref(false)
const picker = ref(null)

/* ▼ 追加：進捗表示用の状態 */
const loading = ref(false)
const progress = ref(0)
const currentStep = ref('準備中…')
let timer = null
/* ▲ 追加ここまで */

const onPick = (e) => { files.value = Array.from(e.target.files) }
const onDrop = (e) => { files.value = Array.from(e.dataTransfer.files); isOver.value = false }

const validate = () => {
  errors.summary = form.summary ? '' : '事業概要は必須です'
  return !errors.summary && !errors.market
}

/* ▼ 置き換え：submit */
const submit = () => {
  if (!validate() || loading.value) return

  // 進捗オーバーレイを表示して疑似的に進める
  loading.value = true
  progress.value = 0
  currentStep.value = 'アップロード検証…'

  timer = setInterval(() => {
    if (progress.value < 30) {
      progress.value += 3
      currentStep.value = 'アップロード検証…'
    } else if (progress.value < 70) {
      progress.value += 5
      currentStep.value = 'AI前処理：テキスト抽出…'
    } else if (progress.value < 90) {
      progress.value += 3
      currentStep.value = '特徴量生成・類似検索…'
    } else if (progress.value < 100) {
      progress.value += 2
      currentStep.value = 'レポート整形…'
    }

    if (progress.value >= 100) {
      clearInterval(timer)
      setTimeout(() => {
        loading.value = false
        router.push({ name: 'sample-report' })
      }, 250) // ほんの少し余韻
    }
  }, 120)
}
/* ▲ submit ここまで */

const pick = () => {
  picker.value?.click()
}
const onDragOver = () => {
  isOver.value = true
}
const onDragLeave = () => {
  isOver.value = false
}
</script>


<style scoped>
/* ▼ 追加 */
.overlay{
  position: fixed; inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: grid; place-items: center;
  z-index: 50;
}
.overlay-card{
  width: min(560px, 92vw);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  text-align: center;
}
.overlay-title{ margin: 0 0 16px; font-size: 1.05rem; }

/* 進捗バー */
.progress{
  width: 100%;
  height: 12px;
  background: #eef2f7;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.bar{
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #7C3AED, #4F46E5); /* 紫系グラデ */
  transition: width .18s ease;
}
.progress-meta{
  margin-top: 8px;
  display: flex; justify-content: space-between; color: var(--muted);
  font-size: .9rem;
}
.step{ font-weight: 600; }
/* ▲ 追加ここまで */

/* ドロップゾーンの安定化 */
.dropzone {
  border: 2px dashed var(--line);
  border-radius: 12px;
  padding: 20px;
  background: #fff;
  display: grid;
  gap: 12px;
  justify-items: center;       /* 中央寄せ */
  text-align: center;
  min-height: 140px;           /* 高さを確保 */
}
.dropzone.over {
  background: var(--brand-100);
  border-color: var(--brand-600);
}
.dropzone p {                  /* テキストの余白調整 */
  margin: 0 0 4px;
  line-height: 1.5;
}
.dropzone input[type="file"] { display: none; }

/* 選択済みリストの詰まり解消 */
.file-list {
  margin: 8px 0 0 0;
  padding-left: 18px;
  line-height: 1.6;
}
.file-list li { margin-bottom: 4px; }

</style>
