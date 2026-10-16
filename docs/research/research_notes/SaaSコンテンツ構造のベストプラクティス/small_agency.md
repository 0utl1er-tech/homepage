# 小規模サービス会社（MEO/SEO/Web制作・受託開発/インフラ）のサイト構造：何を真似し、何を避けるか

調査日: 2026-10-13。WebSearch（米国拠点のエンジン）とWebFetchで実際のページを取得した。WebFetchは小型モデルで要約するため、ナビ項目やセクションの順序は要約を経た結果で、ピクセル単位で正確ではない。日本のGoogleでの実際の順位は確認していない。ここでは「検索結果に出てきた」ことを順位の代わりにしている。

## Q1. 日本のMEO代行・SEO会社・Web制作会社サイトの構造（ナビ、サービスページ、実績、料金、コラム、自社を含む比較記事、CTA）

### Takeaway
上位に出てくるのは2種類のページだった。①コンテンツ型の大手代理店が書く「おすすめN選／費用相場」の比較記事（多くは自社を含め、ときに自社を1位に置く）と、②「サービス×地域」のエリアページ。エリアページは1つのテンプレートから大量に作られていることが多い。小さな地元のWeb制作会社のサイトは薄く、料金も事例も出していないことが多い。0UTL1ERにとって真似する価値があるのは、料金を明示すること、エリアページを1枚だけ本当に地域固有の内容で作ること、日付入りのMEO固有の実績を出すこと、の3つ。

### Cited Findings
**「MEO対策 代行 料金」の検索結果は、ほぼ全部が事業者自身の比較・相場記事だった**
- 上位の結果: gyro-n.com（「MEO対策会社・運用代行おすすめ7選」）、stock-sun.com/column/meo-cheap/、gmotech.jp/semlabo/meo/blog/meo_vendor/、meo-times.com/meo/meo-agency/、media.meo-taisaku.com、assist-all.co.jp/note/... いずれもMEOサービスの販売元が自分で運営している。 — [検索: MEO対策 代行 料金（gyro-n、StockSun、GMO TECH、MEO TIMESなどの記事）](https://www.gyro-n.com/seo/hack/meo_company/)
- 検索結果のスニペットに出ていた相場: 月額固定 3〜10万円/月、成果報酬 上位表示1日500〜2,000円、単発の初期設定 5〜30万円。Gyro-n MEOは月16,500円〜、MEOアナリティクスは月22,000円〜。 — [GMO TECH semlabo MEO業者おすすめ13選](https://gmotech.jp/semlabo/meo/blog/meo_vendor/); [StockSun MEO格安](https://stock-sun.com/column/meo-cheap/)

**StockSun（stock-sun.com）：自社を含む比較記事の典型例**
- 「MEO対策を格安で依頼できる代行業者ランキング」で、1位は自社サービスの「マキトルくん」、2位は「StockSun株式会社」。PR表記や、自社であることを明示する注記は見当たらなかった。自社の料金欄は「要相談」。 — [StockSun /column/meo-cheap/](https://stock-sun.com/column/meo-cheap/)
- グローバルナビは対象者別で、法人向け（デジタルマーケティング支援）／個人向け（キャリア支援）／企業情報／採用情報。コラムのURLは `/column/[slug]/`（例: `/column/meo/`, `/column/clinic-meo/`）。業種別の記事もある。CTAは「プロに無料相談をする」と「会社概要資料をダウンロードする」。 — [StockSun](https://stock-sun.com/column/meo-cheap/)
- 同じ型の地域版として「埼玉県のホームページ制作会社おすすめ20選｜目的別の選び方と費用相場【2026年最新】」も出している。 — [StockSun 埼玉HP制作20選](https://stock-sun.com/column/homepage-production-saitama/)

**MEO TIMES（H2Technology運営、自社サービス「smart MEO」を含む）：自社を含めつつ透明性を保った手本**
- 運営元と、自社サービスを含めていることを開示している。採点は「公式サイトを参考に」行い、25社の公式サイトを2026-08-10に調べて、料金・契約期間・課金方式・実績表記・対応範囲を記録した、と方法論も明記している。 — [MEO TIMES 業者・代理店25社](https://www.meo-times.com/meo/meo-agency/)
- 調べた結果: 料金を公開しているのは25社中14社で、11社は問い合わせが必要。7社（28%）はMEOと関係のない実績を掲げていた（会社全体の取引社数、SEOツールの導入数など）。実績に時点を書いているのは4社、2年以内の実績を出しているのは1社だけ。 — [MEO TIMES](https://www.meo-times.com/meo/meo-agency/)
- 1拠点あたりの月額相場の整理: ツールのみ 1,000〜3,000円、ツール＋一部支援 3,000〜15,000円、運用まで丸ごと 15,000〜30,000円。例: smart MEO 18,000円、マイビジMEO 980円、Janus 15,000円、Gyro-n MEO 1,500円（ツール）。 — [MEO TIMES](https://www.meo-times.com/meo/meo-agency/)

**パルティータ（partita.co.jp）：MEO専業**
- ナビは 会社紹介／サービス／採用情報／コラム／問い合わせ の5項目だけ。サービスは MEO、SEO、SEB、JEO（Googleしごと）、GBP運用代行、オウンドメディア・サテライトサイト運用。トップページに円表記の料金はない。事例は各サービスページ（`/service/meo/`）の中に置いているようだ。コラムは `/meocolumn/[slug]/` で、AI時代のMEO、歯科向け、連載「海外GBP事情（43）」など。CTAは「お問い合わせ」で、「無料診断」はなし。「2025年度 SMBエクセレント企業賞〈WEBマーケティング部門〉」の受賞を掲げている。 — [partita.co.jp](https://partita.co.jp/)
- 「ウェブコンテンツはGoogleマップのランキングに影響しない!?」という、海外の考察を紹介するコラムもある（専門性を見せる記事の例）。 — [partita meocolumn](https://partita.co.jp/meocolumn/map-ranking/)

**エイチリンク（h-link-marketing.co.jp）：SEOのエリアページ（`/service/seo-consulting/area/kanto/saitama/`）**
- セクションの順番: ヒーロー → 無料相談フォーム（4項目）→ 会社紹介 → 埼玉の市場データ → 成果 → 選ばれる理由4つ → SEOのメリット → サービス5種 → 料金3プラン（月7万〜40万円）→ 業種・地域リンク集 → 相談の流れ4ステップ → FAQ。 — [h-link 埼玉ページ](https://h-link-marketing.co.jp/service/seo-consulting/area/kanto/saitama/)
- 地域固有の要素: 埼玉の事業所数「235,126 事業所」（全国の4.4%）、市別の事業所数（川口 19,323 など）、川越まつりや秩父夜祭による季節的な検索需要、打ち合わせの交通費実費（往復1,000〜3,000円）。事例は「月間問合せ数0→42件」のような匿名の数字で、会社名や業種はない。業種リンク（60以上）も他県のページと同じ。 — [h-link](https://h-link-marketing.co.jp/service/seo-consulting/area/kanto/saitama/)
- CTAの「SEO・AIO対策の無料相談に申し込む」は5回以上出てくる。資料ダウンロードもある。 — [h-link](https://h-link-marketing.co.jp/service/seo-consulting/area/kanto/saitama/)

**cantik（cantik.co.jp/kuki/）：「久喜」で上位に出る、MEO/SEO/AIO込みのホームページ制作**
- ナビは Business／Industries／Areas／Works／Column／News／Recruit／About／Contact。サービスは「つくる」「集める・続ける」「人材・費用・地域」の3つの括りで整理している。 — [cantik 久喜ページ](https://cantik.co.jp/kuki/)
- ページの流れ: ヒーロー（料金を最初に見せる）→ 数字（400件以上、初期0円、月額19,800円〜）→ 久喜の地域性（JR、物流の集積、2010年の合併、鷲宮神社）→ 悩み → 差別化 → MEO/SEO/AIO/SNS → 5ステップ → 料金表（制作15万円〜など）→ 久喜についてのFAQ 4問 → 制作例 → お客様の声 → CTA（無料Web診断、資料請求、電話）。 — [cantik](https://cantik.co.jp/kuki/)
- 100以上の市区町村ページがあり、フッターに市区町村リンクがずらりと並ぶ。久喜の顧客名や久喜の事例は載っていない。地域の説明以外は、他の市のページと同じ文章を使っているとみられる。 — [cantik](https://cantik.co.jp/kuki/)

**スタンダードラボ（standard-lab.com/area/saitama-kuki.html）：薄いエリアページの例**
- 久喜固有の情報は市名だけ。料金は通常のホームページ30〜50万円以上、1ページ版143,000円（5営業日）と明示している。事例は「お打ち合わせ時にご案内」としてページには出していない。 — [standard-lab](https://www.standard-lab.com/area/saitama-kuki.html)

**iorange（iorange.jp）：久喜の地元制作会社**
- ナビは 予算／流れ／実績／事務所／サポート／お問合せ。トップに円表記の料金はなく、ブログ・コラムもない。CTAは「ホームページのご相談を受け付けています」。それでも「ホームページ制作 久喜」の検索では1位に出ていた（そもそも競争が弱い）。 — [iorange](https://iorange.jp/); [検索結果](https://www.abcblog.co.jp/cmscost_kuki.html)
- 「ホームページ制作 久喜」の検索結果には、ABCBLOG（`cmscost_kuki.html`）、cantik `/kuki/`、K-FRONT `/area/kuki.html`、standard-lab `/area/saitama-kuki.html`、s-contigo `/hp/kanto/saitama/kukishi` が並び、地元外の会社のエリアページが目立つ。 — [k-front](https://www.k-front.jp/area/kuki.html); [s-contigo](https://www.s-contigo.com/hp/kanto/saitama/kukishi)

**「SEO 会社 埼玉」も比較記事ばかり**
- 上位は rank-quest.jp（30選）、web-kanji.com、switchitmaker2.com、search-engine-pirates.co.jp、yield-marketing.co.jp、branding-works.jp、better-life-japan.net で、ほとんどがSEO会社自身のコラム。h-linkのエリアページもここに入る。 — [rank-quest 埼玉SEO](https://rank-quest.jp/column/column/saitama-seo); [branding-works](https://www.branding-works.jp/seo/seo_saitama/)

### Inferences
- 「代行 料金」「会社 埼玉」のような比較・費用の検索では、比較記事を1本持てば戦える。ただし自社の扱い方が差になる。StockSun型（自社1位、PR表記なし、自社の料金は要相談）は信用を損なう。MEO TIMES型（運営元の開示、調査日、公式サイトを基にする方法論、自社も同じ基準で採点）は真似する価値がある。0UTL1ERなら「MEO代行の料金相場と、うちの料金」という記事で、自社の料金を数字で出したうえで相場の中のどこに位置するかを説明するのが筋がよい。
- 料金を出している事業者は25社中14社しかない。小さい会社が定額料金をはっきり出すだけで目立てる。cantikの「初期0円・月額19,800円〜」をヒーローに置く見せ方は、店舗オーナー向けにそのまま使える。
- 実績は「MEO固有の数字・時点入り・2年以内」の3つを満たすだけで、MEO TIMESの調査ではほぼ1社しかいない水準になる。
- 久喜はスタンダードラボやiorangeのように薄いページや料金非公開のサイトでも上位に出るほど競争が弱い。久喜の本社所在地、久喜の実例、久喜や周辺の業種事情を載せた本物のエリアページ1枚で勝てる見込みがある。100市区町村分のテンプレート展開は不要で、リスクがある（Q4）。
- サービスのページには、ヒーロー（料金）→ 悩み → やること → 流れ → 料金表 → FAQ → 事例 → CTA の順が、cantikとh-linkで共通していた。

### Gaps
- 日本のGoogleでの実際の順位は取れていない（WebSearchは米国拠点）。並び順は参考程度。
- gyro-n、GMO TECH、assist-all の比較記事で自社を何位に置いているかは確認していない。
- 小規模MEO代行（社員数名規模）の「無料診断」の中身（GBP診断レポートの形式など）は調べていない。

## Q2. 小規模なB2B開発・インフラ会社：技術ブログをどうサービスページにつなげるか、Zennやnoteの使い方

### Takeaway
受託やマネージドサービスで成功している会社は、技術ブログを自社ドメインに置き、記事からサービスページや資料DLへCTAで流している（Sreake、ハートビーツ）。クラスメソッドは別ドメインのDevelopersIOに加えてZennも使い、事例は `/cases/` に業種・テーマで絞り込める形で集めている。Zenn Publicationは主に採用や技術ブランディングに使われていて、リードを取る導線は自社ドメイン側にある。

### Cited Findings
- **Sreake（スリーシェイク）**: ナビは サービス紹介／活用事例／イベント・セミナー／新着情報／ブログ／ホワイトペーパー／資料ダウンロード／お問い合わせ。サービスはSRE総合支援の下にインフラ/DevOps、Kubernetes、セキュリティ、モダナイズ、AI、データなどを並べる。事例は専用セクションと「活用事例」ページの両方にあり、タグ（SRE、AI、データ分析）で絞り込める。ブログは自社ドメインの `sreake.com/category/blog/`（イベントレポート、技術、Claude関連）で、記事から関連サービスページへのCTAがある。料金は非公開。CTAは「資料請求・お問い合わせ」。 — [sreake.com](https://sreake.com/)
- **ハートビーツ（MSP。0UTL1ERの「マネージドプライベートクラウド」に最も近い）**: ナビは 選ばれる理由／AWS支援／サービス／導入事例／会社情報／ブログ／ニュース／資料DL／お問い合わせ。サービスは監視と一次対応、フルマネージド、移行、セキュリティ、SRE、脆弱性診断、開発、設計構築、保守。料金は非公開で、「実態に合わせた柔軟な課金」と説明している。技術ブログ「インフラエンジニアWay」は自社ドメインにある。信頼の材料としてAWS Advanced Partner 12年連続、MSSPコンピテンシー、Pマーク、ISMSを掲げる。CTAは無料相談と資料DL。 — [heartbeats.jp](https://heartbeats.jp/)
- **クラスメソッド**: ナビは AWS総合支援／Claude総合支援／サービス／取扱製品／事例／セミナー／会社情報／採用。事例は `/cases/[社名]/` で、カテゴリ・業種・テーマ（コスト削減、移行、セキュリティ）で絞り込める。技術ブログDevelopersIOは別ドメインの dev.classmethod.jp（「やってみた系技術メディア」）で、Zennへのリンクもある。CTAは お問い合わせ／資料請求／電話。 — [classmethod.jp](https://classmethod.jp/)
- クラスメソッドは、Zenn Publication Proの導入事例そのものも自社の `/cases/` に載せている（FLINTERS社。「採用候補者の閲覧率100%」）。Zennは採用広報の道具として売られている。 — [classmethod.jp/cases/flinters-zenn/](https://classmethod.jp/cases/flinters-zenn/)
- Zenn Publicationの導入例: エス・エム・エス（2024-09）、Safie（はてなブログから移行。「個人の資産化」と「運用効率化」が理由）、Leaner（2022）。PKSHAはPublication ProとGitHub連携で執筆環境を作った。 — [SMS tech blog](https://tech.bm-sms.co.jp/entry/2024/09/03/110000); [Safie](https://safie.hatenablog.com/entry/tech-blog-migration-to-zenn); [PKSHA Zenn](https://zenn.dev/pksha/articles/b1d9ff57853bcc)
- **さくらインターネット**: ナビは製品・サービス別（クラウド、GPU、AI、レンタルサーバ、VPS、専用サーバ）で、対象者別の入口はない。事例は別サブドメインの `case.sakura.ad.jp`。 — [sakura.ad.jp](https://www.sakura.ad.jp/)

### Inferences
- 0UTL1ERの開発・クラウド向けには、ハートビーツ型が手本になる。自社ドメインの技術ブログで運用ノウハウを見せ、そこからサービスページ、事例、相談へつなぐ。Zennは個人の発信や採用向けに補助的に使い、本筋の記事は自社ドメインに置く（Zennに書いた記事の評価は自社サイトに蓄積しない）。
- ブログ記事の末尾に、関連サービスへの固定CTA（Sreake型）を置く。
- 事例はサービスページの中に要約を数件出し、`/cases/` 一覧でテーマ別に絞り込めるようにする（Sreakeとクラスメソッドが両方やっている）。
- 開発・インフラ側は大手も小規模MSPも料金を出していない。見積もり型のビジネスでは料金非公開が普通で、MEO側（料金公開が効く）とは反対になる。

### Gaps
- note法人アカウントを使っている小規模受託・インフラ会社の具体例は見つからなかった。
- IIJ Engineers Blogからサービスへの導線は確認していない。
- 社員10人以下の受託開発会社の具体例は取れていない（Sreake、ハートビーツ、クラスメソッドは中堅から大手）。

## Q3. 地域SMBと企業ITの両方を相手にするサイト：対象者で分けるか、サービスで分けるか、別ブランドにするか

### Takeaway
2つの事業を持つ会社には、ナビを対象者で分ける例（StockSun: 法人向け/個人向け）と、サービス単位で別ブランド・別サイトにする例（GMO TECHの「semlabo」、さくらの `case.` サブドメイン、クラスメソッドのDevelopersIO）があった。埼玉の地場Web/システム会社は「HP制作からシステム開発まで総合」と1サイトにまとめることが多いが、各社の構造はほとんど確認できていない。

### Cited Findings
- StockSunはグローバルナビの最上位を「法人向け／個人向け」と対象者で分けている。 — [StockSun](https://stock-sun.com/column/meo-cheap/)
- cantikはナビを Business（「つくる」「集める・続ける」「人材・費用・地域」）、Industries、Areas で組んでいる。サービス・業種・地域の3軸を並べた構成。 — [cantik](https://cantik.co.jp/kuki/)
- GMO TECHはMEO・SEOのメディアを `gmotech.jp/semlabo/` という別ブランドで運営している。 — [GMO TECH semlabo](https://gmotech.jp/semlabo/meo/blog/meo_vendor/)
- さくらインターネットは製品別のナビで、事例は別サブドメインに置いている。 — [sakura.ad.jp](https://www.sakura.ad.jp/)
- 埼玉の会社の例: 三和ソリューション（川口。ホームページからWebシステム・業務システムまで総合）、フィーコデザイン（官公庁や大企業から小規模店舗まで）、ベア・フルーツ（浦和。ITコンサル、システム開発、HP制作）。いずれも比較記事での紹介で、各社のサイト構造は確認していない。 — [発注ラウンジ 埼玉システム開発](https://hnavi.co.jp/knowledge/blog/saitama_system_companies/)

### Inferences
- 0UTL1ERは、トップに対象者別の2つの入口（「お店・地域の事業者さま」／「開発・クラウドをお探しの企業さま」）を置き、その先はサービス別に組むのがよさそう。1つのドメインで続けるなら、ブログもカテゴリを分けて読者層が混ざらないようにする（例: `/column/` は店舗向け、`/tech/` は技術ブログ）。
- 2つの層は、トーン（店舗向けは平易に、企業向けは技術的に）、料金の出し方（公開か見積もりか）、CTA（無料診断か技術相談・資料DLか）がまったく違う。それでも別ブランドにするかは、流入規模を見て後から決めればよい。最初は1サイトで2つの入口にするほうが、ドメインの評価を分散させずに済む（推測）。

### Gaps
- 地域SMB向けと企業IT向けを同じ会社が両方やっていて、その分け方を公開している小規模な実例は、構造まで確認できていない（kishow.co.jp はDNSで解決できなかった）。

## Q4. よくある間違い：薄い地域名の誘導ページ、根拠のないランキング、「No.1」表記

### Takeaway
市区町村名だけを差し替えたエリアページの量産は、Googleのスパムポリシーでいう「誘導ページの不正使用」の例に当てはまる。「No.1」表記は、2024年9月26日に消費者庁が出した報告書で要件が示され、イメージ調査に基づく「顧客満足度No.1」は景品表示法違反のおそれがあるとされた。MEO業界では「MEOと関係ない実績」の表示も多い。

### Cited Findings
- Googleのスパムポリシー（誘導ページの不正使用）は、例として「特定の地域や都市を対象としたドメイン名やページを複数持ち、それらのドメインから 1 つのページにユーザーを誘導する」「内容が類似する複数のページを作成する」を挙げている。 — [Google 検索のスパムに関するポリシー](https://developers.google.com/search/docs/essentials/spam-policies?hl=ja)
- 2015年3月の「誘導ページに関するアップデート」。地名だけを変えたページは問題になる、という趣旨の判断基準がある。 — [Google Search Central Blog 2015](https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages?hl=ja); [あきばれホームページ解説](https://www.akibare-hp.jp/ml/doorway-page/)
- 実例: cantikは100以上の市区町村ページを持つ。地域の説明やFAQの一部は地域ごとに書いているが、サービス説明・料金・お客様の声は共通とみられる。スタンダードラボの久喜ページは市名を差し替えただけに近い。h-linkは市場データや祭りで地域性を足しているが、事例や業種リンクは共通。 — [cantik](https://cantik.co.jp/kuki/); [standard-lab](https://www.standard-lab.com/area/saitama-kuki.html); [h-link](https://h-link-marketing.co.jp/service/seo-consulting/area/kanto/saitama/)
- 消費者庁「No.1表示に関する実態調査報告書」（2024-09-26公表）は、適切なNo.1表示の要件として次の4つを挙げる。①主要な競合を比較対象に含める（検索上位だけで選ぶのは不適切）②回答者を無作為に選ぶ（自社の顧客や従業員だけは問題）③回答を誘導しない、結論ありきにしない ④イメージ調査なのに「顧客満足度No.1」と表示しない。 — [長島・大野・常松](https://www.nagashima.com/publications/publication20241004-1/); [日本商工会議所](https://www.jcci.or.jp/news/trend/2024/1001115013.html)
- 令和5年度だけで、No.1表示の根拠が不十分として措置命令を受けた事例が13件ある。 — [消費者庁報告書の紹介（検索スニペット、ushijima-law/businessandlaw経由）](https://www.ushijima-law.gr.jp/client-alert_seminar/client-alert/20241011no1/)
- MEO代行25社のうち7社（28%）がMEOと関係のない実績を掲げ、実績の時点を書いているのは4社だけ。 — [MEO TIMES](https://www.meo-times.com/meo/meo-agency/)
- 自社を1位に置くランキング記事でPR表記や自社であることの明示がない例: StockSun。なお2023年10月施行のステマ規制は「事業者の表示であることが分かりにくい」ことを問題にしている。自社ドメインの記事に当てはまるかは文脈次第で、法的な判断はここではしていない。 — [StockSun](https://stock-sun.com/column/meo-cheap/); [Web担当者Forum ステマ規制解説](https://webtan.impress.co.jp/e/2023/07/11/45094)
- 根拠の注記がない受賞表記: パルティータ「SMBエクセレント企業賞」（注記なし。これ自体は違法ではないが、出典リンクがあるほうが望ましい）。 — [partita.co.jp](https://partita.co.jp/)

### Inferences
- 0UTL1ERのエリアページは、久喜市（本社）と、実際に訪問対応する数市までに絞る。各ページには、そこに本当にある事例、訪問の可否と交通費、地域の業種事情のような固有の情報を載せる。市名を差し替えるだけのページは作らない。
- 「No.1」「満足度◯%」は使わない。代わりに、時点つきの具体的な実績（「2026年◯月、久喜市の◯◯店でマップ表示回数が◯→◯」）と、顧客の実名や業種（許可を取ったもの）を載せる。MEO TIMESの調べ方からすると、それだけで上位数社に並ぶ水準になる。
- 比較・相場記事に自社を入れるなら、自社であることを冒頭に書き、調査日、方法、他社は公式サイトの情報に基づくこと、を明記する（MEO TIMES型）。自社を一方的に1位にしない。

### Gaps
- No.1表記で措置命令を受けたMEO・SEO代理店の具体例は調べていない。
- 自社サイトでの自社を含む比較記事にステマ規制が当てはまるかについて、一次の解釈資料（消費者庁Q&A）は確認していない。
