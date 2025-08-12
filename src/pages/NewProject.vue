<template>
  <div class="container">
    <div class="card" style="max-width:800px; margin: 0 auto; text-align:center;">
      <h1 class="h1">どのような知財プロジェクトを開始しますか？</h1>

      <div class="grid grid-3" style="margin: 20px 0;">
        <label class="option" :class="{ active: kind==='discovery' }">
          <input type="radio" name="kind" value="discovery" v-model="kind"/>
          <div class="title">発明アイデア発掘</div>
          <div class="text-muted">社内のアイデアを発掘し、特許化候補を抽出</div>
        </label>
        <label class="option" :class="{ active: kind==='support' }">
          <input type="radio" name="kind" value="support" v-model="kind"/>
          <div class="title">先着的特許取得支援</div>
          <div class="text-muted">出願準備〜ドラフトの支援を実施</div>
        </label>
        <label class="option" :class="{ active: kind==='strategic' }">
          <input type="radio" name="kind" value="strategic" v-model="kind"/>
          <div class="title">戦略的特許プロジェクト</div>
          <div class="text-muted">重点領域でのポートフォリオ強化</div>
        </label>
      </div>

      <button class="btn" :disabled="!kind" @click="goNext">次へ</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const kind = ref('strategic')

const goNext = () => {
  // 仕様どおり「次へ」で戦略ページへ遷移（今回は常に同じ遷移）
  router.push({ name: 'strategic-project', query: { kind: kind.value } })
}
</script>

<style scoped>
.option { background:#fff; border:1px solid var(--line); border-radius:16px; padding:16px; display:grid; gap:8px; cursor: pointer; }
.option input { display:none; }
.option.active { outline: 2px solid var(--brand-600); background: var(--brand-100); }
.title { font-weight: 800; }
</style>