# 日本のSaaS/B2B企業のマーケティングコンテンツ構造（2026-10調査）

調査日: 2026-10-13。各社サイトはWebFetch/curlで実際に取得して確認した。一部(Sansan・ジョブカンのトップ)はJS描画のため取得できず、検索結果での確認にとどまる。ラクスルはcorp.raksul.com(IR/コーポレート)しか確認できていない。

## URL設計（オウンドメディアをサブドメインに置くかサブフォルダに置くか、メインドメインへの移設）

### Takeaway
大手は「製品理解・SEO用の解説記事（用語集/基礎知識/比較）はメインドメインのサブフォルダ」、「ブランド・読み物系メディアはサブドメインか別名義」という二層構造をとる。freeeは旧来のサブドメインメディア「経営ハッカー」(keiei.freee.co.jp)を残しつつ、SEO用の解説記事は www.freee.co.jp/kb/ 配下に大量に置いており、経営ハッカーの更新はほぼ止まっている。

### Cited Findings
- freee: 解説記事のハブは `www.freee.co.jp/kb/`。カテゴリ配下に `/kb/kb-accounting/[slug]/` という英語スラッグの形で置く（例 `/kb/kb-accounting/balance-sheet/`, `/kb/kb-accounting/accounts/`）。タグページは `/kb/tag/[番号].html`、テンプレート集は `/kb/template/`。会計の基礎知識だけで400本以上が相互リンクしている — [freee kb-accounting](https://www.freee.co.jp/kb/kb-accounting/)
- freee「経営ハッカー」は今もサブドメイン `keiei.freee.co.jp` で200応答を返す。記事URLは `/articles/[id]`、カテゴリは `/category/[slug]`（会計/会社設立/経理・財務/経営・戦略/人事・労務/上場準備/働き方改革）。トップページで確認できた最新の日付は2024年11月07日で、それ以降は更新されていない — [経営ハッカー](https://keiei.freee.co.jp/)（日付はHTMLをcurlして抽出した）
- 経営ハッカーはCEO佐々木大輔のブログが前身で、もとは自社ブログだった — [ITmedia 2013](https://www.itmedia.co.jp/bizid/articles/1311/20/news072.html)。WordPressから移行した経緯は [はてな事例記事](https://www.hatena.ne.jp/contentmarketing/entry/2018/07/05/103000) にある
- freeeは個人事業主向けに別系統のパス `/personal-business/guide/articles/6249/` も持つ。税理士検索はサブドメイン `search-advisors.freee.co.jp/column/...` に置かれている — [検索結果](https://www.freee.co.jp/personal-business/guide/articles/6249/)
- SmartHR: ブランドメディア「SmartHR Mag.」はサブドメイン `mag.smarthr.jp` にあり、パスは `/hr/labor/[slug]/` や `/guide/user-story/[slug]/` など。メインドメインには製品寄りの `smarthr.jp/column/[category]/[slug]/` を別に持つ（例 `/column/explanation/2026-payroll-howto/`。カテゴリは機能解説/情報システム向け/イベントレポート/ユーザーコミュニティ/SmartHRの取り組み/調査レポート） — [SmartHR Mag.](https://mag.smarthr.jp/), [SmartHRコラム](https://smarthr.jp/column/)
- マネーフォワード クラウド: すべて `biz.moneyforward.com` のサブフォルダに置く。メディア名は「Money Forward Bizpedia」で `/blog/[数字ID]/`、用語集は `/words/[数字ID]/`、製品別のSEO記事は `/accounting/basic/[ID]/`, `/accounting/topics/[ID]/`, `/tax_return/basic/[ID]/` など製品ディレクトリ配下にある — [MF トップ](https://biz.moneyforward.com/), [Bizpedia](https://biz.moneyforward.com/blog/), [用語集](https://biz.moneyforward.com/words/), [記事例](https://biz.moneyforward.com/accounting/basic/568/)
- Bizpediaの自己定義は「マネーフォワード クラウドシリーズが運営する情報メディア」で、対象は中小企業・フリーランス・個人事業主 — [Bizpedia](https://biz.moneyforward.com/blog/)
- バクラク(LayerX): 解説記事は `bakuraku.jp/knowledge/knowledge-expense/[slug]/`、資料は `bakuraku.jp/resources/[how-to|product]/[slug]/`。いずれもサブフォルダ — [バクラク記事](https://bakuraku.jp/knowledge/knowledge-expense/system/), [比較資料](https://bakuraku.jp/resources/how-to/resources-comparison-expense/)
- kintone: 事例は別サブドメイン `kintone-sol.cybozu.co.jp/cases/[社名].html` にある。旧 `kintone.cybozu.co.jp/enterprise/case/` は301でそこへ転送される — [kintone 事例](https://kintone-sol.cybozu.co.jp/cases/)（301はWebFetchで確認）
- BASE: ノウハウメディア「BASE U」は別ドメイン `baseu.jp`。事例は `thebase.com/casestudy/`（ショップ事例）と `/ownersvoice/`（導入事例）の2系統 — [BASE トップ](https://thebase.com/)（curlでリンクを抽出）
- Sansan: 事例は `jp.sansan.com/case/[社名slug]/`（例 `/case/konicaminoltabj/`, `/case/akindo-sushiro/`）。一部の資料はMA系のLPドメイン `resources.sansan.com/...` に置かれている — [Sansan事例](https://jp.sansan.com/case/konicaminoltabj/), [resources.sansan.com](https://resources.sansan.com/jp_sansan_20250220_casestudy)

### Inferences
- SEOで集客してCVにつなげる記事（用語集・基礎知識・比較）は、各社ともメインドメインのサブフォルダ、しかも製品ディレクトリ配下（MFの `/accounting/basic/`）や `/kb/`、`/knowledge/` に集めている。ドメインの評価を製品LPと共有し、記事から製品LPへの内部リンクを強くする狙いと考えられる
- freeeが経営ハッカー（サブドメイン）を事実上止めて `/kb/` を拡充しているのは、メディアをメインドメインへ寄せる流れに合っている。ただしfreee自身が「移設した理由」を語った一次ソースは見つかっていない
- サブドメインや別ドメインに残っているのは、ブランド・カルチャー系の読み物（SmartHR Mag.、BASE U）と事例DBのような独立システム（kintone-sol）に限られる

### Gaps
- 経営ハッカーの記事が301で /kb/ へ移されたかどうか（記事単位のリダイレクト）は検証できていない。移設理由の公式発言もない
- ラクスル（raksul.com本体）、ジョブカン、Sansanのメディア・コラムのURLはJS描画のため取得できなかった

## グローバルナビゲーションの配置

### Takeaway
日本のSaaSのヘッダーには「導入事例」「お役立ち資料（資料ライブラリ）」「セミナー」が三点セットで並ぶ。CTAは「資料ダウンロード」と「無料トライアル」と「お問い合わせ」の3つを併記するのが標準。コラム・用語集はヘッダーより、フッターかリソース系メニューの中に置かれることが多い。

### Cited Findings
- SmartHR: ナビに「SmartHRコラム」(/column/)、「お役立ち資料」(/know-how/ebook/)、「イベント・セミナー」(/know-how/event/)、事例一覧(/case/。導入事例 `?is_usage=false` と活用事例 `?is_usage=true` に分かれる)、外部リンクとしてSmartHR Mag.がある。CTAは「お問い合わせ」(/contact/form/)、「無料トライアル」(/signup/、15日間)、「お見積もり」(/pricing/form/)、「資料ダウンロード」(/know-how/ebook/ebook_358-30/ ＝まるわかり資料3点セット) — [SmartHR](https://smarthr.jp/)
- マネーフォワード クラウド: 「導入事例」(/case/moneyforward-cloud/)、「資料ライブラリ」(/library/)、「セミナー情報」(/seminar/)、「Money Forward Bizpedia」(/blog/)、「サポートサイト」(/support/)、「会計用語集」(/words/)。ヒーローCTAは「実際の画面を無料で試す」と「サービス資料をダウンロード」(/library/24347/)。エンタープライズ向けセクションでは「資料ダウンロード」と「お問い合わせフォームへ」(/library/form/3955/) に切り替わる — [MF](https://biz.moneyforward.com/)
- バクラク: ヘッダーに「導入事例」(/case/)、「セミナー」(/seminar/)、「お役立ち資料」(/resources/)、「お役立ち情報」(/knowledge/)。主CTAは「バクラクがわかる3点セット 資料ダウンロード 無料」で、製品ごとに「料金表」ページ（/expense/price/ など）がある — [バクラク](https://bakuraku.jp/)（curlでリンクを抽出）
- kintone: 「セミナー」(/seminar/)、「資料をみる」(/material/)、「事例をもっとみる」(kintone-solへ)、CTAは「30日間無料お試し」(/trial/) — [kintone](https://kintone.cybozu.co.jp/)
- BASE(B2C/SMB寄り): 「料金」「事例」(/casestudy/)、「導入事例」(/ownersvoice/)、「BASE U」。CTAは「無料ではじめる」が主で、「資料請求（法人のお客様はこちら）」はkintone製フォームへ飛ぶ — [BASE](https://thebase.com/)
- 資料DLページの設計（二次ソース）: Sansanは左に資料のビジュアルと要約、右にフォーム、急ぎ用の電話番号も載せる2カラム。SmartHRは「3点セット」を1フォームでまとめてDLさせる。楽楽精算は資料プレビューのカルーセル、スマレジは入力→確認→メール受信のステップ表示、Sensesは資料とデモ動画をセットにしている — [プロフューチャー](https://www.profuture.co.jp/mk/column/25439)

### Inferences
- 「〇〇がわかる3点セット」（SmartHR、バクラク）はトップCTAの定番になっている。サービス資料・料金表・事例集を1フォームで束ね、ハードルを下げつつリード情報を取る
- 「料金表をダウンロード」（バクラク）のように料金をフォームの奥に置き、料金を知りたいという動機をリード獲得に転換するのは日本特有の色が強い
- 中小企業向けのセルフサーブ（BASE、freee個人）は「無料ではじめる」が主CTAで、資料請求は法人向けの脇役にとどまる。ターゲットの規模でCTAの序列が変わる

### Gaps
- ジョブカン・Sansanのヘッダー構成はJS描画のため未確認

## 導入事例の構造（フィルターとページテンプレート）

### Takeaway
事例一覧は「業種×従業員規模×利用製品/機能×課題」の多軸フィルターで絞り込むのが標準で、freeeはさらにエリア（都道府県）軸を持つ。個別ページの見出しは定量成果で書き、冒頭に「課題/解決策/効果」の要約を置き、そのあとインタビュー本文が続く。社名・実名（さん付け）・写真を掲載する。

### Cited Findings
- freee `/cases/`: フィルターは業種(20以上)、従業員規模、使っている製品・サービス、「課題からさがす」(約30)、エリア(都道府県)。カードには業種アイコン、見出し（例「紙台帳から脱却し、給与計算期間も2〜3日から半日へ」）、社名、従業員数、「詳しくみる」。URLは `/cases/[社名slug]`（例 /cases/itoma, /cases/takeyaryokan） — [freee 導入事例](https://www.freee.co.jp/cases/)
- SmartHR `/case/`: フィルターは業種13、従業員規模（2〜50/51〜100/101〜500/501〜2000/2001〜5000/5001〜）、課題（ペーパーレス、年末調整、上場企業事例など）、機能・サービス(約25)。カードにはロゴ/写真、業種、規模、都道府県、課題タグ、見出し、社名。URLは `/case/[slug]/` — [SmartHR 事例](https://smarthr.jp/case/)
- SmartHR個別事例（鴻池運輸）: 見出しは「全国150事業所の年末調整が1か月から9日へ。社用端末なしの現場にも9割浸透」。会社情報ボックス（業種・従業員規模・利用機能）、要約「課題／解決策／効果」、本文の章見出しも成果ベース（「年末調整の回収が1か月から9日へ。約13万枚のペーパーレス化を実現」）。数値は登録率93.7%、アプリ導入率91.9%、約60時間削減など。人事部の佐藤さん・佐々木さんの実名と写真が載る。末尾CTAは「お見積もり」「お問い合わせ」「無料トライアル」 — [SmartHR 鴻池運輸](https://smarthr.jp/case/konoike-unyu/)
- kintone事例: フィルターは部署、業種(約15)、用途、導入規模。カードには講演地域・日付があり、「講演資料を見る」リンクが付くものもある。kintone hiveなどイベント登壇型の事例が多く、100件以上 — [kintone-sol 事例](https://kintone-sol.cybozu.co.jp/cases/)。検索結果の記述では、業種・利用用途・導入部門・導入規模で検索できる — [kintone事例](https://kintone-sol.cybozu.co.jp/cases/iemura.html)
- Sansan事例のタイトルも「SEと名刺を共有することで ソリューション営業の強化を実現｜導入事例」と成果を先頭に置く形 — [Sansan コニカミノルタ](https://jp.sansan.com/case/konicaminoltabj/)
- SmartHRは「導入事例」と「活用事例」を分けている（導入前の検討者向けと既存顧客の活用促進向け） — [SmartHR](https://smarthr.jp/)。BASEも「ショップ事例」と「導入事例(ownersvoice)」の2系統 — [BASE](https://thebase.com/)

### Inferences
- 「課題からさがす」軸は日本の事例DBの特徴とみられる。検討者は自社の課題名（年末調整、ペーパーレス、電帳法）で探すからだ
- 地方の中小企業に向けて、エリア（都道府県）フィルターや都道府県表示で「近い会社」が使っていることを示している（freee、SmartHR）
- 実名・顔写真・定量成果（〇か月→〇日、〇%）を見出しに入れるのが標準。匿名事例は主要各社では確認できなかった

### Gaps
- 事例ページ下部の「事例集PDFダウンロード」CTAが各社にあるかは、SmartHR以外では個別に確認していない

## 用語集ページの構造と製品への導線

### Takeaway
用語集は50音インデックスで並べ、URLは数字IDか英語スラッグ。freeeの /kb/ は「用語解説＝SEO記事」で、監修者（税理士・会計士）、公開日、目次、上中下3か所の製品CTA、同じカテゴリの関連記事9本、という定型を持つ。

### Cited Findings
- MF会計用語集 `/words/`: あ行〜わ行＋英数字の50音インデックス、「共通（個人・法人）」「法人のみ」の区分。URLは `/words/[数字ID]/`（例 減価償却 /words/2264/、営業利益 /words/2234/） — [MF 用語集](https://biz.moneyforward.com/words/)
- freee `/kb/kb-accounting/balance-sheet/`（貸借対照表）: 公開日2026/08/26。監修者は前田昂平（公認会計士・税理士、あんず会計事務所代表）で経歴つきのプロフィール。目次は11項目。CTAは冒頭バナー「無料で30日間お試し」、中盤に同じバナーと「freee会計の詳細はこちら」、末尾の「大変な法人決算と税務申告を効率的に行う方法」セクション（freee会計＋freee申告）、サイドバーに「無料でfreee会計を試す」。関連記事は同カテゴリ9本 — [freee 貸借対照表](https://www.freee.co.jp/kb/kb-accounting/balance-sheet/)
- バクラクの解説記事は公開日2023/9/15と最終更新日2025/6/25を併記するが、執筆者・監修者名は確認できなかった。CTAはヘッダー「資料ダウンロード」、上部「料金表をダウンロード」、中盤「無料で試してみる」、末尾「詳細はこちら」 — [バクラク 経費精算システムとは](https://bakuraku.jp/knowledge/knowledge-expense/system/)

### Inferences
- 日本では「用語集」と「基礎知識記事」の境目があいまいで、freeeは1用語1記事の長文SEO記事、MFは /words/ の短い用語ページと /accounting/basic/ の長文記事を分けて持つ
- 用語ページから製品への導線は、記事テーマに直結する機能（貸借対照表なら「決算書を自動作成」）を文脈バナーで見せる形が基本

### Gaps
- MFの /words/ 個別ページの中身（監修者やCTAの有無）は取得していない

## 比較・選び方記事で自社製品を含める方法

### Takeaway
freeeもMFも、競合名（弥生、MF/freee、ジョブカン、勘定奉行など）を本文に出すが、順位はつけない。自社製品だけ詳しく書き、「シェアNo.1」「士業44,000名推奨」などの実績表示とCTAを集中させる。「この記事は自社が書いています」という明示的な利害開示はなく、ロゴとブランドが暗黙の開示を兼ねている。バクラクは記事では競合名を出さず、競合比較はゲート付き資料（DL）に回している。

### Cited Findings
- freee「法人におすすめの会計ソフトは？」: 「freee会計」「マネーフォワード クラウド」「弥生会計 オンライン」を1文で並べ、順位表・比較表はない。freeeには「導入シェアNo.1」「経理業務の時間を1/2にできる」の訴求があり、「無料で30日間お試し」が3か所。自社運営を明示する文言はない。監修は好川寛（税理士）、最終更新日2024/05/13 — [freee 記事](https://www.freee.co.jp/kb/kb-accounting/accounting-software-recommendations/)
- freee「会計ソフトの比較ポイントを解説」では選定軸（クラウド/インストール、アップデート規定、連携銀行数）を示し、自社の強み（連携銀行3,200以上）を選定軸の中に入れ込んでいる — [freee 比較ポイント](https://www.freee.co.jp/kb/kb-accounting/comparison-of-accounting-system/)（検索スニペットで確認）
- MF「2026年版-会計ソフトとは？代表ソフト一覧」: freee会計、弥生会計オンライン、ジョブカン会計、勘定奉行クラウド、PCAクラウド会計、Oracle NetSuiteを名指しするが順位なし。比較表は「クラウド型/インストール型/オンプレ型」の型比較にとどまる。自社には法人向け・個人向けの専用節と「全国44,000名の士業事務所の方々が推奨」の訴求があり、競合は後半で簡単に紹介するだけ。執筆・監修は岡和恵（税理士/CFP）、更新日2026年4月22日。免責文は「本サイトは、法律的またはその他のアドバイスの提供を目的としたものではありません」 — [MF 記事](https://biz.moneyforward.com/accounting/basic/568/)
- MFは「中小企業におすすめ会計ソフトの選び方」「わかりやすくて簡単な会計ソフトを比較する14のポイント」「人材業界向けの会計ソフトの選び方」など、選び方の記事を業種別・切り口別に量産している — [検索結果: MF](https://biz.moneyforward.com/accounting/basic/211/), [人材業界](https://biz.moneyforward.com/accounting/topics/2372/)
- バクラク: 解説記事では競合名を出さない。「結局どのツールが良いの？経費精算システム比較資料」（ジョブカン、TOKIUM、楽楽精算などとの違いと企業規模別の検討ポイント）をお役立ち資料として配布している — [バクラク 比較資料](https://bakuraku.jp/resources/how-to/resources-comparison-expense/), [記事](https://bakuraku.jp/knowledge/knowledge-expense/system/)
- 「A vs B どっちを選ぶ」型の名指し比較やランキング記事は、主に第三者や代理店のメディアが担っている（お名前.com、価格.com SaaS、backofficedb など） — [onamae.com](https://www.onamae.com/business/article/161996/), [価格.com](https://kakaku.com/saas/expenses/), [backofficedb](https://backofficedb.com/article/284/)

### Inferences
- 日本の大手SaaSの自社比較記事は「選び方（選定軸）を示し、その軸で自社が強いと読ませる」型で、「ランキングで自社を1位にする」型ではない。順位づけや優劣表は避け、景表法（比較広告）上のリスクと競合との関係悪化を避けていると推測される（法的理由を明言した一次ソースはない）
- 競合名入りの具体比較はゲート付きPDFに回すと、リード獲得と公開ページでの比較広告リスク回避を同時に満たせる（バクラク）
- 「この記事は自社製品を含みます」という英語圏のアフィリエイト開示に当たる文言は、日本の自社メディアでは一般的でない

### Gaps
- 比較記事の作り方の判断（景表法の観点など）を各社が語ったインタビューは見つからなかった

## CTAのパターンと配置

### Takeaway
3種のCTA（資料DL／無料トライアル／問い合わせ・見積もり）を併記し、セルフサーブが強い製品はトライアルを、エンタープライズ向けは資料DLと問い合わせを主にする。記事内は冒頭・中盤・末尾・サイドバーの4か所に置くのが定型で、記事テーマに合わせた文脈バナーにする。

### Cited Findings
- freee記事: 冒頭・中盤・末尾・サイドバーの4か所に「無料で30日間お試し」など。「初期費用・解約料0円」を併記 — [freee kb](https://www.freee.co.jp/kb/kb-accounting/balance-sheet/), [freee kb-accounting](https://www.freee.co.jp/kb/kb-accounting/)
- MFトップ: 中小企業向けは「無料で使ってみる」、エンタープライズ向けは「資料ダウンロード」と「お問い合わせ」。トライアルURLにはパラメータ `?from=indiv` を付けて流入元を判別している — [MF](https://biz.moneyforward.com/)
- SmartHR: お問い合わせ／無料トライアル(15日)／お見積もり／資料ダウンロード(3点セット)の4本立て。事例末尾にも同じセット — [SmartHR](https://smarthr.jp/), [事例](https://smarthr.jp/case/konoike-unyu/)
- SmartHR Mag.は資料DL（法改正ガイドやテンプレート）とメルマガ登録が主なCTA — [SmartHR Mag.](https://mag.smarthr.jp/)
- バクラク: 「3点セット資料DL」「料金表DL」「無料で試してみる」「お問い合わせ」 — [バクラク](https://bakuraku.jp/)
- 業界の通説（二次ソース）: 資料ダウンロードページは「BtoBサイトにおいて最もリードを獲得できるページの一つ」。比較検討段階の資料をDLしたリードにはインサイドセールスが早めに当たるのが有効とされる — [LANY](https://www.lany.co.jp/blog/white-paper-lead-generation), [ferret One](https://ferret-one.com/blog/whitepaper_questions)

### Inferences
- 日本型の流れは「資料DL→インサイドセールスが架電・メール→商談」で、資料DLはMQLを取る入口として扱われる。英語圏で主流の「Book a demo」「Start free」単独CTAより、ハードルの低いゲート付き資料を前に出す
- メディア記事のCTAは「その記事を読んでいる理由（例: 年末調整）に合ったホワイトペーパー」に寄せている

### Gaps
- CTAごとのCVRや効果の数値は公開ソースで確認できなかった

## 監修者・執筆者の表示と鮮度シグナル（日本のE-E-A-T）

### Takeaway
会計・税務・労務のSaaS（YMYLに近い領域）では、外部の士業（税理士・公認会計士・社労士）を「監修者」として経歴つきで表示し、公開日・最終更新日を記事冒頭に出すのが標準。一方、バクラクのように日付だけで監修者を置かない会社もある。

### Cited Findings
- freee: 監修者（公認会計士・税理士）の氏名、ふりがな、事務所名、職歴を表示し、公開日も示す — [freee 貸借対照表](https://www.freee.co.jp/kb/kb-accounting/balance-sheet/)。別記事では「監修：好川寛（プロゴ税理士事務所）」「最終更新日：2024/05/13」 — [freee 比較記事](https://www.freee.co.jp/kb/kb-accounting/accounting-software-recommendations/)
- MF: 執筆・監修に税理士/CFP、更新日、法的助言ではない旨の免責文 — [MF 記事](https://biz.moneyforward.com/accounting/basic/568/)
- SmartHR Mag.: 社労士・税理士・組織コンサルの寄稿者を名前と資格つきで表示 — [SmartHR Mag.](https://mag.smarthr.jp/)。SmartHRコラム（製品寄り）は社員が書き、20人以上の執筆者を顔写真つきで載せる。監修者はいない — [SmartHRコラム](https://smarthr.jp/column/)
- バクラク: 公開日と最終更新日はあるが、執筆者・監修者名は確認できなかった — [バクラク](https://bakuraku.jp/knowledge/knowledge-expense/system/)
- SEO業界の解説（二次ソース）: 税務・法務・労務・セキュリティなど企業活動に大きく影響するBtoBのジャンルもYMYLに当たり、監修者を入れることが推奨される。ただし名前だけ貸す監修では不十分で、実際に確認して独自のコメントを加えることが重要とされる — [cryptul](https://cryptul.co.jp/insights/articles/025-ymyl-eeat-seo), [keywordmap](https://keywordmap.jp/academy/ymyl/)

### Inferences
- 「外部の士業が監修＋社内編集部が執筆」という分業は日本特有の色が強い。英語圏のSaaSブログは社内の執筆者表示が主で、外部の監修者を立てる例は医療・金融以外では少ない（今回は英語圏側の比較調査をしていないので、ここは推論にとどまる）
- 製品の使い方記事（SmartHRコラム）は社員が書き、法令・制度の解説（Mag.、freee kb、MF）は士業が監修する、という使い分けがある
- 「2026年版」のように年号をタイトルに入れ、更新日を表示するのが鮮度シグナルの定番（MF記事タイトル「2026年版-会計ソフトとは？」）

### Gaps
- 監修者を置くことの効果（順位・CVR）を示した各社の一次データは見つからなかった
- 中小のWebマーケティング代理店の自社サイト構造は、時間の都合で個別に調べていない（比較記事の主な書き手として campnet.co.jp、realight.co.jp などが検索上位にいることは確認した — [campnet](https://campnet.co.jp/blog/expense-management-comparison.html), [realight](https://realight.co.jp/blog/37_expense-reimbursement-system-comparison/)）
