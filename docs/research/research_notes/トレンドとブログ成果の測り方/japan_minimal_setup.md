# 日本市場の特性と、小さな会社向け「トレンド×ブログ成果」最小構成

調査日: 2026-10-15。対象: 0UTL1ER（テックブログ→Zenn転載、MEO/SEO/SNS記事→note転載、Trino/Iceberg+Dagster+Grafana）。

## Q1. 日本のトレンドソースは何を表し、どれくらいの速さで上がって消えるか

### Takeaway
各ソースは寿命がかなり違う。Google Trends急上昇は数時間単位、はてブのホットエントリーは長くても約3日、Zenn Trendingは公開から最大7日ほどの記事が対象、Qiitaはいいね・ストックの増え方で決まる（数日単位）。どの社も重み付けを公開していないので、「どれだけ早く上がり、どれだけ早く消えるか」の目安にとどめ、正確なモデルとしては扱わないこと。

### Cited Findings
- はてブの流れは 新着エントリー → カテゴリ別人気エントリー → 総合ホットエントリー。目安としてカテゴリ人気は約10ブクマ、総合トップは50〜100ブクマ（実務者による経験値で、公式の数字ではない）。バズの賞味期限は「長くても3日くらい」 — [weblab](https://www.weblab.co.jp/blog/staff/marketing/7896.html)、[gaiax](https://gaiax-socialmedialab.jp/post-29857/)
- ホットエントリー入りした記事のアクセスは翌日以降に急に落ち、1週間ほどで「元より少し多い」水準に落ち着く（個人ブログのアクセス推移の報告） — [ginpen](https://ginpen.com/2011/02/01/after-a-month-from-hotentried/)、[racchai](https://racchai.hatenablog.com/entry/2016/06/07/070000)
- ホットエントリー入りするとX/Facebookなど他の流入も増える — [whitehatseo](https://whitehatseo.jp/%E3%83%9B%E3%83%83%E3%83%86%E3%83%B3%E3%83%88%E3%83%AA%E5%85%A5%E3%82%8A%E3%81%97%E3%81%9F%E3%81%93%E3%81%A8%E3%81%AB%E3%82%88%E3%82%8A%E5%86%8D%E8%AA%8D%E8%AD%98%E3%81%97%E3%81%9Fseo/)
- Zenn Trending は独自の集計。2020-09に「記事の鮮度をポイントに加算」「アクセスの流入元を考慮」「文字数あたりの滞在時間を考慮」へ調整された（重みは非公開） — [zenn-dev/zenn-roadmap #9](https://github.com/zenn-dev/zenn-roadmap/issues/9)
- Zennには1日約200本の新着があり、Trendingに出る記事は公開から最大7日程度 — [Zenn公式: For you レコメンドの裏側](https://zenn.dev/team_zenn/articles/zenn-recommend-system)
- Qiitaのトレンドは「いいね・ストック・コメント」が基準とされる。公式の時間減衰式は見つからなかった。「いいね÷閲覧数の打率が下がると消える」という説は一般ユーザーの考察にすぎない — [Qiita考察記事](https://qiita.com/PINTO/items/15c7d0d5249934a042ab)
- Google Trends「急上昇中（Trending Now）」は約10分ごとに更新。「通常より検索が多い」と判定されたクエリが表示され、ステータスは Active / 終了（Ended：通常の検索量に戻ったもの）の2つ。終了したトレンドが再びActiveになることもある。表示期間は4時間/24時間/48時間/7日で、RSS・CSVで出力できる — [Google トレンド ヘルプ](https://support.google.com/trends/answer/3076011?hl=ja)
- 2024-08-14の刷新で125か国に対応し、検出は平均10分ごとになった — [海外SEO情報ブログ](https://www.suzukikenichi.com/blog/google-has-released-new-trending-now-in-google-trends/)
- 急上昇RSSのURLが変わった。旧 `trends.google.co.jp/trends/trendingsearches/daily/rss?geo=JP` は404で、新URLは `https://trends.google.co.jp/trending/rss?geo=JP`（2025-02時点の実務者メモ）。pytrendsも404になる報告あり — [pokete](https://www.pokete.com/202502_googletrend_rss)、[note/まる](https://note.com/maru2501/n/n4ad953a11402)
- Yahoo!リアルタイム検索の「トレンド」は、X（旧Twitter）の投稿などを元に機械的に抽出して自動表示しているもの — [Yahoo!ヘルプ](https://support.yahoo-net.jp/SccRealtime/s/article/H000007998)。生成AIで話題を要約する「SNSのバズまとめ」機能も追加された — [LINEヤフー](https://www.lycorp.co.jp/ja/news/release/018502/)
- Xのトレンドではポスト数が表示されなくなった（2025-01）。そのため件数はYahoo!リアルタイム検索で見る、という実務者の記述あり（二次情報） — 検索結果スニペット経由、[tatap](https://tatap.jp/knowledge/x-realtime-search/)
- 技術系の話題の推移（Qiita 2017–2023）を集計した記事あり — [Qiita kaku3](https://qiita.com/kaku3/items/7865bcab9c24aa134e5f)

### Inferences
- 寿命の目安: Google急上昇 = 数時間〜1日（一般向けで、ニュースや芸能が中心。テック・MEOに関係するものは少ない）。X/Yahoo!リアルタイム = 数時間。はてブ = 1〜3日。Zenn/Qiita = 2〜7日。業界ニュース（口コミポリシーの変更など）は検索需要が数週間続くことがある。このため「rising」スコアは、ソースごとに半減期を変えて正規化するか、少なくともソース別に見るのがよい。
- 0UTL1ERの記事に関係するのは、はてブIT・Zenn・Qiita（テックブログ向け）と、業界RSSおよびGoogle Trendsの「探索」での比較（MEO向け）。急上昇RSSは雑音が多いので、ウォッチリストに一致したときだけ使うのが妥当。
- X/Yahoo!リアルタイムをAPIで取り込むのは費用と規約の面で割に合わない。目視確認で十分。

### Gaps
- はてブのホットエントリー選定ロジックの公式説明は見つからなかった（閾値はすべて実務者の経験値）。
- Zenn Trendingの現在の重みや、Qiitaトレンドの公式アルゴリズムは非公開。
- Zenn/noteでの反応（いいね）と、正本である会社ブログの検索流入の相関を示す定量データや実務報告は見つからなかった。

## Q2. 転載の効果をどう測るか（GA4参照元、はてブAPI、Zenn/Qiita API、note）

### Takeaway
Zenn/Qiitaは外部canonicalを設定できない。そのため転載はSEO上「別の記事」になり、会社ブログ側の効果は「転載先から本文内リンク経由で来たセッション」でしか測れない。リンクにUTMを付けるのが必須。はてブ件数は公式API（認証不要、50URLまで一括）で取れる。Zennのいいね数は非公開APIで取れる。noteは非公式APIのみで仕様は予告なく変わる。

### Cited Findings
- はてブ件数取得APIは公式で認証不要。単一URLは `https://bookmark.hatenaapis.com/count/entry?url=`、複数は `/count/entries?url=..&url=..`（1回50URLまで、超えると414） — [Hatena Developer](https://developer.hatena.ne.jp/ja/documents/bookmark/apis/getcount/)、[2019 HTTPS化告知](https://bookmark.hatenastaff.com/entry/2019/08/26/111011)
- Zennの非公式API: `https://zenn.dev/api/articles?username=...&order=latest`（ページング可）のレスポンスに `liked_count` が入る。ユーザーごとの累計は `zenn.dev/api/users/{username}` — [karaage0703](https://zenn.dev/karaage0703/articles/c24072adc188a6)、[aiq_dev](https://zenn.dev/aiq_dev/articles/2d0c83a26edca1)
- Zennはfrontmatterに canonical を書いても公開HTMLに反映されず、外部canonicalの公式仕様もない。Qiitaも外から設定する手段がない。現実的な対処は冒頭に原本URLを書くことだけ — [zenn.dev/zhener](https://zenn.dev/zhener/articles/zenn-canonical-crosspost-seo)、[Qiita Cosoado](https://qiita.com/Cosoado/items/4e7353d400340583c007)
- noteは `https://note.com/api/v2/creators/{creator}/contents?kind=note&page=N` で記事一覧（タイトル・投稿日・スキ数・コメント数）が取れるが、非公式APIで仕様は予告なく変わる。サーバー負荷に配慮すること — [note/masuyohasiri](https://note.com/masuyohasiri/n/ndaea3bfc8924)、[note/kiyo_ai_note](https://note.com/kiyo_ai_note/n/n4d7f8b9bd84a)
- アプリ内ブラウザやiOSのプライバシー保護でリファラが落ちると、GA4では (direct)/(none) になる。正確に測るならUTM付与を推奨 — [ebis](https://www.ebis.ne.jp/column/ga4-direct/)、[Nobilista](https://co.nobilista.com/ja/column/seo/referrer/)
- 効果の比較例: Zenn開始1か月でコンテンツあたり平均PVはZenn 101.9、社内サイト17.3 — [zenn.dev/namusour0763](https://zenn.dev/namusour0763/articles/knowledge-share-comparison-20231128)
- レバテックはZenn Publicationに移行し、月平均投稿0.16本・PV700（2023）から15本・27,000PV（2024）になった（Zenn運営元クラスメソッドの事例ページ） — [classmethod](https://classmethod.jp/cases/levtech/)

### Inferences
- 転載記事の冒頭と末尾にある正本へのリンクに `?utm_source=zenn&utm_medium=crosspost&utm_campaign={slug}`（noteは `utm_source=note`）を付ける。こうすればアプリ経由でdirectになる分も拾える。GA4の参照元 zenn.dev / note.com / b.hatena.ne.jp は補助として見る。
- 取得するもの: はてブ件数（正本URL・Zenn URL・note URLの3つ）を日次、Zenn `liked_count` を日次、noteのスキ数を日次（非公式なので失敗しても良い作りにする）。公開から30日以降は週次に間引いても問題ない。
- 転載は正本の検索順位を奪うリスクがある（canonicalが効かないため）。GSCで正本ページの表示回数が転載後に伸びているかを見るのが実務上の確認方法。

### Gaps
- noteの利用規約上、非公式APIでの自動取得がどう扱われるかは確認できなかった（要確認）。
- はてなブックマークアプリ経由のリファラ挙動の一次情報（はてな公式）は見つからなかった。上記は一般論からの推定。

## Q3. 日本企業はテックブログ/地域向けマーケ記事の効果をどう報告しているか

### Takeaway
日本のテックブログの振り返りは、投稿本数・執筆者数・月間PVの3つが中心。はてブやシェアは「参考値」扱いが多い。採用への寄与は測りにくく、PVを追いすぎるのは罠だという意見が目立つ。MEO系メディアは記事単位より、GBPの表示・行動指標を月1回記録して増減を見る形が主流。

### Cited Findings
- フューチャー技術ブログ2022の振り返りで報告されたKPIは、投稿数207本（2021は281）、執筆者73人（目標130）、新規執筆者25人、連載12本、月間PV 12万〜32万。シェアやはてブは収集しているが主要KPIにはしていない（2021はシェア合計30,652件だが外れ値の記事が押し上げたと説明） — [フューチャー](https://future-architect.github.io/articles/20230320a/)
- レバテックはZenn Publicationの運用で、目標を投稿本数やPVではなく「アウトプット継続」に置いた — [classmethod事例](https://classmethod.jp/cases/levtech/)
- 採用広報でPVやリーチを重視しすぎるのは罠。求人票やスカウトに添付され、使われ続けていることが重要 — [note/otogi_saiyo_koho](https://note.com/otogi_saiyo_koho/n/n777c8e4a3072)
- 公式テックブログが採用に結びつかない理由の論考 — [zenn.dev/shin_semiya](https://zenn.dev/shin_semiya/articles/8dda688bf14d52)
- Zenn Publicationの利用組織は2024年12月に1,000を超え、採用やカルチャーづくりを目的とした技術広報での利用が増えている — [classmethod news](https://classmethod.jp/news/20250203-zenn-publication-1000-over/)
- はてブ3以上の記事数では、2024年にQiitaとZennが逆転した（PVだけならQiitaの方が読まれやすい） — [zenn.dev/mima_ita](https://zenn.dev/mima_ita/articles/f78dcbef2a81d3)
- MEOの効果測定: 表示回数（検索/マップ）・ウェブサイトのクリック・電話・経路案内を毎月初めに前月分記録して増減を見る。効果が出るまでの目安は順位1〜3か月、集客3〜6か月 — [0120.co.jp](https://0120.co.jp/blog/shobai-ai-37/)、[0120.co.jp 期間](https://0120.co.jp/blog/shobai-ai-127/)
- オウンドメディア初期はPVを単一KPIにすると判断がぶれにくい — [LANY](https://www.lany.co.jp/blog/ownedmedia-kpi)

### Inferences
- 0UTL1ERの規模なら、本数・PV・はてブを追う大企業型ではなく、「その記事から問い合わせや商談の話題につながったか」と「検索で長く読まれるか」の2軸の方が意思決定に効く。
- 地域店舗向けの時事記事（口コミポリシーやInstagramの変更）は、Google公式発表の直後に「〇〇 変更」「〇〇 いつから」といった検索需要が数週間続く型。GSCで公開後7日のクリックと30日の表示回数を見れば足りる。

### Gaps
- 日本のマーケティングメディアが「速報記事（フロー）とストック記事を分けて効果を測る」方法を公開した具体例は見つからなかった。
- テックブログの「はてブ数と採用応募」を定量で結びつけた日本企業の報告は見つからなかった。

## Q4. 最小の指標セット・分析期間・記事分類・Grafanaパネル・月次レビュー・公開時の記録方法

### Takeaway
指標は記事あたり5つ、トレンドあたり3つで十分。期間は7/30/90日の3つ。分類は「トレンドのピークから何日後に公開したか（publish lag）」で機械的に決める。公開時にCMSで「狙ったトレンドキーワード」と「狙い」を必須入力にすれば、後から分析できる。

### Cited Findings（設計の根拠になる事実）
- GSCのデータ保持は16か月。2024-12に「24時間」ビューが追加され、データ遅延は平均で約半分になった — [Google Search Central Blog](https://developers.google.com/search/blog/2024/12/recent-data-search-console?hl=ja)、[web-ma](https://www.web-ma.co.jp/column/search-console/1173/)
- ページ単位の集計はクエリ単位より匿名化の影響を受けにくい — [technical-seo.jp](https://technical-seo.jp/clicks-do-not-match/)、[海外SEO情報ブログ](https://www.suzukikenichi.com/blog/google-explains-data-discrepancy-in-search-perfomance-report-caused-by-anonymized-queries/)
- 上のQ1の寿命データ（はてブ約3日、Zenn Trending約7日、急上昇は時間単位）

### Inferences（推奨設計）
**記事あたり5指標**
1. `search_clicks_d30`: GSC 正本ページのクリック（公開から30日）。90日も保持する。
2. `search_impr_d90`: GSC 表示回数（公開から90日）。evergreenとして育っているかを見る。
3. `crosspost_sessions_d7`: GA4 で utm_medium=crosspost または参照元が zenn.dev / note.com / b.hatena.ne.jp のセッション（7日）
4. `social_reactions_d7`: はてブ数（正本+転載URL）+ Zennいいね + noteスキ の合計（7日時点のスナップショット）
5. `key_events_d90`: GA4 そのLPからのキーイベント（問い合わせなど、90日）。件数は小さいので記事ごとの比較はせず、累計で見る。

**トレンドあたり3指標**: `peak_date`（mention数が最大の日）、`peak_mentions`、`days_active`（rising scoreが閾値を超えていた日数）。

**期間**: 7日（話題の波）、30日（初期評価）、90日（検索の定着）。GSCの遅延を考えて評価日は公開+9/+32/+92日にずらす。

**記事分類**（publish lag = 公開日 − トレンドのpeak_date）
- `trend-early`: lag ≤ 0（ピーク前またはピーク当日）
- `trend-timed`: 1〜3日（はてブ・Zennの寿命内）
- `trend-late`: 4〜14日
- `evergreen`: トレンドとの紐付けなし、または 15日以上

判定（30日・90日時点）: 「波を取れた」= social_reactions_d7 か crosspost_sessions_d7 が自社中央値以上。「検索に残った」= search_impr_d90 が自社中央値以上。この2×2で4象限に分ける。

**Grafana 2〜3パネル**
1. 記事一覧テーブル: 1行1記事で、分類・lag・5指標・象限を表示。中央値との比較は色で示す。
2. トレンドのタイムライン: ウォッチリストキーワードのmention数を時系列で描き、自社記事の公開日を annotation で重ねる。これでlagが目で見てわかる。
3. （任意）分類別の箱ひげ図 or 棒グラフ: search_impr_d90 を分類（trend-early/timed/late/evergreen）別に表示。

**アラート**: 1つだけ。「ウォッチリストのキーワードのrising scoreが閾値を超え、かつ過去14日に該当記事がない」→ Slack/メール通知。執筆の判断材料としてのみ使う。

**月次レビュー（30分）**: (1) 前月に公開した記事の象限を確認、(2) 90日経過した記事の検索定着を確認、(3) lag と結果の関係を1行でメモ、(4) ウォッチリストへの追加・削除。

**公開時の記録（CMSのfrontmatter）**: `trend_keyword`（ウォッチリストのID）、`trend_source`（hatebu/zenn/qiita/gtrends/industry_rss）、`intent`（trend|evergreen）、`why`（1行）、`zenn_url`、`note_url`。Dagsterでブログメタデータと一緒に取り込み、`publish_lag` を計算する。

### Gaps
- publish lagの閾値（3日、14日）は上記の寿命データからの推定で、検証した文献はない。運用しながら調整が必要。

## Q5. 低トラフィックサイト特有の落とし穴

### Takeaway
GSCのクエリ別データは大半が匿名化で消えるので、ページ単位の合計で見ること。GA4はAPIや探索でしきい値がかかるので、BigQueryエクスポートにするか、期間を広げて回避する。キーイベントは件数が小さすぎて統計的な比較はできない。

### Cited Findings
- 匿名化クエリとは、2〜3か月の期間で数十人程度以上に検索されなかったクエリのこと。Ahrefsの調査ではGSCトラフィックの46.77%（2025年4月）が匿名化クエリだった — [Ahrefs](https://ahrefs.com/blog/gsc-anonymized-queries/)
- 匿名化クエリはグラフの合計には含まれるが、フィルタをかけると除かれるため数字が一致しなくなる — [海外SEO情報ブログ](https://www.suzukikenichi.com/blog/google-explains-data-discrepancy-in-search-perfomance-report-caused-by-anonymized-queries/)、[Qiita](https://qiita.com/ToshihiroShishido/items/7463b7b5063c7a41e74e)
- GA4のデータしきい値は、ユーザー属性を含むレポートや、ユーザー数が少ないときの検索語レポートなどに適用される。自分で調整はできない。期間を広げるかBigQueryを使えば回避でき、BigQueryにはGoogleシグナル由来のデータは含まれない — [GA4ヘルプ](https://support.google.com/analytics/answer/9383630?hl=ja)
- Googleシグナルを無効にする、またはレポート用識別子を「デバイスベース」にするのがしきい値回避の定番。「2024年2月にGoogleシグナルがしきい値の適用条件から外れた」という記述もある（公式ヘルプでは確認できなかった） — [ebis](https://www.ebis.ne.jp/column/ga4-threshold/)、[ayudante](https://ayudante.jp/column/2022-06-21/11-00/)

### Inferences
- GSCは `page` ディメンションのみの日次（クエリなし）を主データにする。クエリ別は月次の参考にとどめる。
- GA4はBigQueryエクスポート（無料枠）が最も確実。Data APIを使う場合はユーザー属性ディメンションを使わず、landingPage×sessionSource 程度にとどめる。
- 同意モード（Consent Mode v2）は日本向けサイトでは法的な必須要件ではないが、CMP導入で同意拒否になった分はモデリングされないので、少ないセッションがさらに減る。導入するなら「Basic/Advanced」の選択と、数値の不連続を記録しておくこと（日本向けの一次情報は今回見つけられなかった）。
- 1記事あたり数十クリックの規模では、記事同士の差の大半はノイズ。中央値と比べる・象限で分けるといった粗い判定にとどめ、有意差検定はしない。

### Gaps
- 日本サイトでの同意モード普及率や、計測欠損率の日本データは見つからなかった。
- GA4しきい値の2024年仕様変更について、Google公式の一次情報は確認できなかった。
