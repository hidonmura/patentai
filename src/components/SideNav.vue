<template>
  <aside class="nav">
    <h3>メニュー</h3>
    <router-link to="/" class="item" active-class="active">ダッシュボード</router-link>
    <router-link to="/projects/new" class="item" active-class="active">新規プロジェクト作成</router-link>
  </aside>
</template>

<style scoped>
.nav { background:#fff; border-right:1px solid var(--line); height:100%; padding:20px; }
.item { display:block; padding:10px 12px; border-radius:10px; color:inherit; text-decoration:none; }
.item:hover { background: var(--brand-100); }
.active { background: var(--brand); color:#05314a; font-weight: 800; }
</style>