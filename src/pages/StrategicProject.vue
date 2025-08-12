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
          <label>目標市場 <span class="badge">必須</span></label>
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
          <div class="dropzone" :class="{ over: isOver }" @dragover.prevent="() => isOver = true" @dragleave="() => isOver = false" @drop.prevent="onDrop">
            <p>関連資料（事業計画・レポートなど）をここにドラッグ＆ドロップ</p>
            <input ref="picker" type="file" multiple @change="onPick" />
            <button class="btn" @click="picker?.click()">ファイルを選択</button>
          </div>
          <ul v-if="files.length" style="margin:8px 0 0 0;">
            <li v-for="f in files" :key="f.name">{{ f.name }}</li>
          </ul>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <router-link class="btn secondary" to="/projects/new">戻る</router-link>
          <button class="btn" @click="submit">AI分析開始</button>
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

const onPick = (e) => { files.value = Array.from(e.target.files) }
const onDrop = (e) => { files.value = Array.from(e.dataTransfer.files); isOver.value = false }

const validate = () => {
  errors.summary = form.summary ? '' : '事業概要は必須です'
  errors.market = form.market ? '' : '目標市場は必須です'
  return !errors.summary && !errors.market
}

const submit = () => {
  if (!validate()) return
  // モック：成功したと見なしてダッシュボードへ戻る
  alert('AI分析を開始しました（モック）')
  router.push('/')
}
</script>

<style scoped>
.dropzone { border: 2px dashed var(--line); border-radius: 12px; padding: 20px; text-align: center; background: #fff; display:grid; gap:12px; }
.dropzone.over { background: var(--brand-100); border-color: var(--brand-600); }
.dropzone input[type=file] { display:none; }
</style>
