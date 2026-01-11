<template>
  <div class="container">
    <section class="card hero">
      <div class="hero-main">
        <p class="eyebrow">戦略的特許取得支援（メイン事業）</p>
        <h1 class="h1">戦略的特許取得支援レポート（画面モック）</h1>
        <p class="text-muted">
          AIと連携し、企業の事業戦略に沿った特許取得をサポートします。
          インタビューで得た「ゆらぎ語」を使い、検索語の広がりを可視化します。
        </p>
      </div>
      <div class="hero-badge">Mercury Scan</div>
    </section>

    <section class="card">
      <h2 class="h2">検索条件</h2>
      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-label">検索キーワード</span>
          <strong>タイヤ</strong>
        </div>
        <div class="meta-item">
          <span class="meta-label">対象領域</span>
          <strong>モビリティ・素材・製造</strong>
        </div>
        <div class="meta-item">
          <span class="meta-label">調査期間</span>
          <strong>2019 - 2024</strong>
        </div>
        <div class="meta-item">
          <span class="meta-label">類似語抽出</span>
          <strong>インタビュー由来のゆらぎ語</strong>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="section-header">
        <div>
          <h2 class="h2">ゆらぎ検索：「タイヤ」類似語グルーピング</h2>
          <p class="text-muted">
            インタビューで実際に使われた言い回しを再現し、類似特許をグルーピングして一覧化しています。
            出力フォーマットは「類似特許調査（URL付きリスト）」と同じです。
          </p>
        </div>
        <span class="pill">AIクラスタリング</span>
      </div>

      <div class="grid grid-2">
        <article v-for="group in groups" :key="group.title" class="panel">
          <div class="panel-head">
            <div>
              <h3>{{ group.title }}</h3>
              <p class="text-muted">{{ group.description }}</p>
            </div>
            <div class="keyword-list">
              <span v-for="keyword in group.keywords" :key="keyword" class="keyword">{{ keyword }}</span>
            </div>
          </div>
          <ol class="patent-list">
            <li v-for="item in group.items" :key="item.title">
              <div class="patent-title">{{ item.title }}</div>
              <a :href="item.url" target="_blank" rel="noopener">{{ item.url }}</a>
              <span class="patent-note">{{ item.note }}</span>
            </li>
          </ol>
        </article>
      </div>
    </section>

    <section class="card">
      <h2 class="h2">AIコメント</h2>
      <div class="ai-note">
        <p>
          「タイヤ」を起点とした検索では、部材名（トレッド/サイドウォール）や
          用途別（スタッドレス/スリック）で文献が分散しています。複合語の検索を
          追加することで、素材系特許と走行性能系特許の分離が明確になりました。
        </p>
        <p class="text-muted">
          次のステップとして、競合2社の重点領域（空気入りタイヤ/ノーパンクタイヤ）を
          重点的に追跡することを推奨します。
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
const groups = [
  {
    title: '一般的な呼称・同義語',
    description: '日常会話で使われる表現を中心に抽出。',
    keywords: ['車輪', 'ホイール', 'ゴム', 'フットウェア'],
    items: [
      {
        title: '車輪用ゴム部材の耐摩耗性向上構造',
        note: '車輪全体を指す語を含む出願'
      },
      {
        title: 'ホイール一体型ゴム成形体の固定機構',
        note: 'ホイール/タイヤ一体設計'
      },
      {
        title: '車両用フットウェアの制振パターン設計',
        note: '比喩表現から抽出された類似文献'
      }
    ]
  },
  {
    title: '技術的・専門的な呼称',
    description: '特許文書で多用される技術用語に寄せてクラスタ化。',
    keywords: ['空気入りタイヤ', 'ノーパンクタイヤ', 'トレッド', 'サイドウォール', 'リム', '転動体'],
    items: [
      {
        title: '空気入りタイヤの内圧制御と熱放散構造',
        note: '空気入りタイヤの正式名称で検索'
      },
      {
        title: 'エアレスタイヤのトレッド支持リブ配置',
        note: 'ノーパンク構造の支点設計'
      },
      {
        title: 'サイドウォール補強層の耐衝撃設計',
        note: '側面補強を示す技術文献'
      }
    ]
  },
  {
    title: '用途・種類による呼称',
    description: '用途別・構造別の名称から分類。',
    keywords: ['スタッドレス', 'スリック', 'スペア', 'ラジアル', 'バイアス', 'オールシーズン'],
    items: [
      {
        title: 'スタッドレス向け細溝パターンの排雪設計',
        note: '冬季向け特許群の中心'
      },
      {
        title: 'スリックタイヤの表面温度制御材',
        note: 'レース用途での特許'
      },
      {
        title: 'スペアタイヤの折り畳み機構と収納構造',
        note: '車体収納性に特化'
      }
    ]
  },
  {
    title: '俗語・スラング',
    description: '現場で出てきた俗称を含む検索語。',
    keywords: ['ゲタ', 'ダルマ'],
    items: [
      {
        title: '大型車両向け溝深タイヤの転動騒音低減',
        note: '太溝タイヤの俗語を含む文献'
      },
      {
        title: '丸形転動体の偏摩耗抑制構造',
        note: 'ダルマ表現を連想する文献'
      }
    ]
  }
]
</script>

<style scoped>
.hero {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
}
.hero-main {
  display: grid;
  gap: 8px;
}
.eyebrow {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--brand-600);
}
.hero-badge {
  background: var(--brand-100);
  color: var(--brand-600);
  font-weight: 800;
  padding: 10px 16px;
  border-radius: 999px;
  white-space: nowrap;
}
.meta-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}
.meta-item {
  background: #fff;
  border: 1px dashed var(--line);
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 4px;
}
.meta-label {
  color: var(--muted);
  font-size: 0.8rem;
}
.section-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}
.pill {
  background: #0ea5e91a;
  color: #0369a1;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
}
.panel {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px;
  display: grid;
  gap: 12px;
}
.panel-head {
  display: grid;
  gap: 10px;
}
.panel h3 {
  margin: 0 0 6px;
  font-size: 1.1rem;
}
.keyword-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.keyword {
  background: #f1f5f9;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 600;
}
.patent-list {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 12px;
}
.patent-list li {
  display: grid;
  gap: 4px;
}
.patent-title {
  font-weight: 700;
}
.patent-list a {
  color: #2563eb;
  text-decoration: none;
  word-break: break-all;
}
.patent-list a:hover {
  text-decoration: underline;
}
.patent-note {
  color: var(--muted);
  font-size: 0.85rem;
}
.ai-note {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--line);
  display: grid;
  gap: 10px;
}
@media (max-width: 900px) {
  .hero,
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .hero-badge {
    align-self: flex-start;
  }
}
</style>
