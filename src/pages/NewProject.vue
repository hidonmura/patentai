<template>
  <div class="container">
    <div class="card" style="max-width:980px; margin: 0 auto; text-align:center;">
      <h1 class="h1">どのような知財プロジェクトを開始しますか？</h1>

      <div class="options-grid" style="margin: 20px 0;">
        <!-- 戦略的特許取得支援 -->
        <label class="option" :class="{ active: kind==='discovery' }" @click="kind='discovery'" role="radio" :aria-checked="kind==='discovery'">
          <input class="visually-hidden" type="radio" name="kind" value="discovery" v-model="kind" tabindex="-1" />
          <div class="emoji" aria-hidden="true">✨</div>
          <div class="title">戦略的特許取得支援</div>
          <div class="text-muted">
            新技術や製品の特許取得を目指すプロジェクトです。<br>
            競合調査や出願戦略を重視します。
          </div>
        </label>

        <!-- 発明アイデア発掘 -->
        <label class="option" :class="{ active: kind==='support' }" @click="kind='support'" role="radio" :aria-checked="kind==='support'">
          <input class="visually-hidden" type="radio" name="kind" value="support" v-model="kind" tabindex="-1" />
          <div class="emoji" aria-hidden="true">💡</div>
          <div class="title">発明アイデア発掘</div>
          <div class="text-muted">
            新しい発明の種を探し出すためのプロジェクトです。<br>
            ブレインストーミングや社内発掘活動を行います。
          </div>
        </label>

        <!-- 戦略的特許プロジェクト大規模企画 -->
        <label class="option" :class="{ active: kind==='strategic' }" @click="kind='strategic'" role="radio" :aria-checked="kind==='strategic'">
          <input class="visually-hidden" type="radio" name="kind" value="strategic" v-model="kind" tabindex="-1" />
          <div class="emoji" aria-hidden="true">🚀</div>
          <div class="title">戦略的特許プロジェクト大規模企画</div>
          <div class="text-muted">
            大規模な特許ポートフォリオ構築を目的とし、<br>
            複数分野にわたる特許戦略を展開します。
          </div>
        </label>
      </div>

      <!-- 重要: type="button" とする -->
      <button type="button" class="btn" :disabled="!kind" @click="goNext">次へ</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const kind = ref('strategic')

const goNext = () => {
  // ここは従来通りルート名で遷移
  router.push({ name: 'strategic-project', query: { kind: kind.value } })
}
</script>

<style scoped>
.options-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.option {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px;
  display: grid;
  gap: 10px;
  cursor: pointer;
  text-align: center;
  align-content: start;
  min-height: 180px;
}
.option.active { outline: 2px solid var(--brand-600); background: var(--brand-100); }

.visually-hidden {
  position: absolute !important;
  clip: rect(1px,1px,1px,1px);
  clip-path: inset(50%);
  width: 1px; height: 1px;
  overflow: hidden; white-space: nowrap; border: 0; padding: 0; margin: -1px;
}

.emoji { font-size: 2rem; line-height: 1; margin-bottom: 2px; }

.title {
  font-weight: 800;
  font-size: 1.35rem;
  line-height: 1.35;
  white-space: normal;
  word-break: normal;
  overflow-wrap: anywhere;
}

.text-muted {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.7;
}
</style>
