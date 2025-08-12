<template>
  <aside class="nav">
    <div>
      <div class="logo-wrap">
        <!-- ロゴをクリックでダッシュボードへ -->
        <router-link to="/" class="logo-link" aria-label="ダッシュボードへ">
          <img :src="logo" alt="Patent Planet" class="logo" />
        </router-link>
      </div>

      <h3>メニュー</h3>
      <router-link to="/" class="item" active-class="active">ダッシュボード</router-link>
      <router-link to="/reports/sample" class="item" active-class="active">戦略的特許分析レポート</router-link>
    </div>

    <!-- 下部固定CTA -->
    <router-link to="/projects/new" class="cta" aria-label="新規プロジェクト作成">
      ＋ 新規プロジェクト作成
    </router-link>
  </aside>
</template>

<script setup>
import logo from '../assets/logo.png' // ← これで確実にバンドル
</script>

<style scoped>
.nav {
  background: #fff;
  border-right: 1px solid var(--line);
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.logo-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

/* ロゴ周りのクリック感＆フォーカス可視化 */
.logo-link { display: inline-block; border-radius: 12px; }
.logo-link:focus-visible { outline: 3px solid var(--brand-600); outline-offset: 4px; }
.logo { width: 160px; height: auto; max-width: 100%; cursor: pointer; }

.item {
  display: block;
  padding: 10px 12px;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
}
.item:hover { background: var(--brand-100); }
.active { background: var(--brand); color: #05314a; font-weight: 800; }

.cta {
  margin-top: auto;
  display: flex; align-items: center; justify-content: center;
  padding: 12px 14px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 800;
  border: 1px solid var(--brand-600);
  background: var(--brand);
  color: #05263a;
  box-shadow: 0 6px 20px rgba(14,165,233,0.25);
}
.cta:hover { filter: brightness(1.05); }

@media (max-height: 720px) {
  .cta { margin-top: 12px; }
}
</style>
