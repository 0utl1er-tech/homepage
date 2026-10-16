# microCMS と国産ヘッドレスCMS（2026年10月時点の調査メモ）

調査日: 2026-10-13。価格は特記なき限り **税抜**（microCMSは公式に税抜表記）。各URLはこの日に取得・確認した。

## Q1. microCMS の2026年料金・上限・有料限定機能、代理店で10〜30サイトを運用したときの費用

### Takeaway
2026年のmicroCMSは Hobby（0円）、Team（4,900円〜/月）、Business（75,000円〜/月）、Enterprise（見積）の4段。**契約は1サービス（xxx.microcms.io）ごとに1プラン**。権限管理、ワークフロー（カスタムステータス）、過去版への復元、同時編集の競合防止、IP制限、複数環境はすべて Business（75,000円/月）以上でしか使えない。中小企業のクライアントサイトを並べると、実際の選択肢は「Hobbyを1サイト1つずつ（無料だが機能制限あり）」か「Teamを1サイト1つずつ（約4,900円×サイト数）」になる。

### Cited Findings
- 料金表（税抜）: Hobby 0円/月（クレジットカード登録不要）、Team 4,900円〜/月、Business 75,000円〜/月（「おすすめ」表示）、Enterprise は見積。Team と Business は14日間の無料トライアルあり — [microCMS 料金](https://microcms.io/pricing)
- Hobby の上限: API 5個、メンバー3人、コンテンツ10,000件、転送量 月20GB、APIキー1個、APIリクエスト数は無制限 — [microCMS 料金](https://microcms.io/pricing)
- Team の上限: API 10個（追加は1個2,000円）、メンバー3人（追加は1人1,200円）、コンテンツ20,000件、転送量 月200GB（超過分は1GBあたり20円）、APIキー3個、AIクレジット 月700。CSVエクスポート、ファイルアップロード、AIレビュー、APIグループが付く — [microCMS 料金](https://microcms.io/pricing)
- Business の上限: API 30個、メンバー20人、コンテンツ50,000件、転送量 月1TB（超過分は1GBあたり18円）、APIキー10個、AIクレジット 月7,000。カスタムステータス、権限管理、IP制限30行（管理画面とAPIの両方）、環境管理、技術サポートが付く — [microCMS 料金](https://microcms.io/pricing)
- Enterprise: API 50個以上、メンバー50人以上、コンテンツ100,000件。Business の機能に加えて、監査ログ、SSO（SAML）、S3連携、二要素認証の必須化、独自ドメイン、請求書払い、専任サポート、SLA。転送量の超過分は1GBあたり16円 — [microCMS 料金](https://microcms.io/pricing); [aaam コラム（2026-08-16公開、2026-10-08更新）](https://aaam.jp/columns/microcms-pricing)
- 契約単位について公式の記載は「プランは1サービス（_***.microcms.io_）毎に1プランとなります」 — [microCMS 料金](https://microcms.io/pricing)。「サイトを分けた瞬間に契約が2本になります」 — [aaam](https://aaam.jp/columns/microcms-pricing)
- 機能比較表（料金ページ）での各機能の扱い:
  - 予約投稿: 全プラン○（Hobby を含む）
  - 画像API: 全プラン○
  - コンテンツ更新履歴: 全プランで見られる。過去版への復元は Business 以上
  - 権限管理（ロール）: Business 以上
  - カスタムステータス: Business 以上
  - 同時編集の競合防止: Business 以上
  - 複数環境: Business 以上
  - IP制限: Business は30行、Enterprise は100行
  - CSVエクスポート: Hobby は×、Team 以上は○
  - 監査ログ、SSO、二要素認証の必須化: Enterprise のみ
  - 出典: [microCMS 料金](https://microcms.io/pricing)（WebFetchで表を要約して取得。行単位の記載はブラウザでの再確認を推奨）
- 2025年の価格改定（2025-03-10告知、2025-06-10施行）: Business は 63,000→75,000円、Advanced は 150,000→180,000円（税抜）。Advanced は新規受付を終了し、その機能は Enterprise に移った。Hobby の API 上限は3→5に増えた。旧 Starter、旧 Business、旧 Standard プランは整理され、使っている機能に応じて現行プランへ自動移行 — [microCMS ブログ: 料金プランの価格改定／統合のお知らせ](https://blog.microcms.io/pricing-update-2025-06/)
- aaam の整理: Business でしか使えないのは、権限管理（公開権限の制限）、カスタムステータス、版の巻き戻し、同時編集の競合防止、IP制限、複数環境、優先サポート。「15倍の差は、人が増えたときの事故を防ぐ料金です」。3年間の総額比較は、Team＋API 3個追加で約39万円、Business で270万円。筆者自身は Team＋API 3個（月10,900円、年144,000円）を使っていたが2026年9月に解約し、Team が成り立つのは「更新する人がひとりで、ファイルを扱える場合だけ」と述べている — [aaam](https://aaam.jp/columns/microcms-pricing)

### Inferences
- 10〜30社のクライアントを Team で運用すると、4,900円×10〜30＝**月49,000〜147,000円（税抜）、年約59万〜176万円**。API が10個を超えたり、メンバーが3人を超えたりすると、その分が上乗せされる。代理店スタッフ2人とクライアント1人で、メンバー3人の枠は埋まる。
- 「店主には公開権限を渡さず、下書きと承認申請だけさせる」という運用は、権限管理とカスタムステータスが必要になるため **1サイトあたり月75,000円**かかり、地方の中小企業向けとしては現実的でない。したがって自前で構築するなら、ロール別の権限と承認フローを**無料の標準機能**として提供できるかが、最も大きな差別化点になる。
- Hobby でも1サイトずつなら無料で使える。ただし CSVエクスポートがなく、メンバーは3人まで、過去版への復元もできない。商用利用の可否は料金ページに明記されていなかった（Gaps 参照）。

### Gaps
- Hobby の商用利用が利用規約で制限されているかは確認できなかった。料金ページには明示的な制限が見当たらない。
- 代理店向けの複数サービス割引やパートナープランが公開されているかは見つからなかった。
- Webhook の各プランでの扱いは料金表の要約で取得できなかった（一般には全プランで使えると理解しているが、未検証）。

## Q2. 日本のユーザーが評価する microCMS の編集画面と、中小企業クライアントの反応

### Takeaway
評価の中心は「日本語の、シンプルで迷わない管理画面」と「API（スキーマ）単位で入力フォームを組めること」。マニュアルなしで更新でき、手順書もほぼ要らない、という声が多い。不満として挙がるのは、データを一括で書き出せないこと、サービスが続くかどうかの不安、ドキュメント不足（PHP など）。プレビューはフロントエンド側の実装が前提で、何もしなくても動く機能ではない。

### Cited Findings
- 管理画面は、分厚いマニュアルを読まなくても操作場所が直感的にわかり、手順書作成などの学習コストがほぼ不要とされる。導入事例には遠州鉄道（約300店舗がコンテンツを更新）、ニフティ、ミルボン、コロプラ。継続率99%、導入企業11,000社以上（ベンダー側の主張） — [ITトレンド](https://it-trend.jp/cms/11410); [microCMS 導入事例](https://microcms.io/interviews)
- ITreview の評価は 4.4/5（5件）。良い点: 「シンプルでよく整理されている」管理画面、「様々なフィールドの組み合わせることができるので、自在に投稿画面を作成することができる」、「サイト運営にかかる時間・コストともに半分以下になった」。悪い点: 管理画面から CSV やバックアップを一括で取れない、PHP などサーバーサイドとの連携手順のドキュメントが少ない、競合サービスの終了を見て「サービスが続くかどうか」が不安、更新情報の通知が足りない — [ITreview microCMS レビュー](https://www.itreview.jp/products/microcms/reviews)
- 制作会社 D2C ID の記事（2025-06-16）が挙げる点: 管理画面がわかりやすく教育がほぼ不要、日本語UI、権限に応じた入力項目の出し分け、複数サイトを1画面で管理できる、WordPress の脆弱性対応が要らなくなる。Business の月75,000円も保守コストの削減で正当化できるという立場 — [D2C ID ブログ](https://www.d2cid.co.jp/blog/microcms-for-operation-202506/)
- 2025年のリッチエディタ改善: ファイル埋め込みリンク、文字サイズの指定、nofollow の指定、カラーをプリセットだけに絞る設定（カラーピッカー非表示）、画像の左右寄せ。メディア関連: 画像の代替テキスト、メディアの一括削除。コンテンツ一覧関連: 「ビュー」（表示条件の保存）、編集中のメンバーをリアルタイム表示、作成者の一括変更、非公開化にもレビュー申請を出せる、ロールの複製。CSVインポートも強化され、下書きとして取り込める、メディアや繰り返しフィールドにも対応 — [2025年にリリースされたmicroCMSのアップデートまとめ](https://blog.microcms.io/microcms-2025-releases/)
- 画面プレビューの仕組み: 管理画面に `{CONTENT_ID}` と `{DRAFT_KEY}` を含む遷移先URLのテンプレートを設定し、フロントエンド側で draftKey を受け取って API から下書きを取得する実装が必要 — [microCMS ドキュメント: 画面プレビュー](https://document.microcms.io/manual/screen-preview)
- Team には「AIレビュー」と月700の AIクレジットが付く — [microCMS 料金](https://microcms.io/pricing)
- 2026年の7社比較: microCMS は「シンプルで直感的」。管理画面の完成度は NILTO（フェンリル製）が最も高いと評価されている — [note: ヘッドレスCMS 7社を本気で比較した（2026年3月）](https://note.com/jazzy_mole4711/n/n5e38ce73e05f)

### Inferences
- 自前で再現すべき最低限の機能:
  - 日本語UI
  - スキーマから入力フォームを生成する仕組み（項目ごとの説明文、必須チェック、文字数制限）
  - 色や文字サイズを制限できるリッチエディタ（店主がデザインを崩せないようにする）
  - 画像のアップロード、代替テキスト入力、自動リサイズと配信（microCMS の画像APIに相当）
  - 予約公開
  - 下書きプレビュー（ワンクリックで実際のページ表示を確認できる）
  - 更新履歴と過去版への復元
  - 承認申請フロー
  - ロール別に入力項目を出し分ける機能
- プレビューは microCMS でも開発側の実装が前提なので、Next.js の Draft Mode と組み合わせて自前で作れば同等の体験になる。

### Gaps
- モバイル（スマホ）での編集体験を評価した一次情報は見つからなかった。
- 地方の中小企業の店主が、代理店経由で microCMS を使った具体的な事例（好き嫌いの声）は見つからなかった。大手の事例ばかりだった。
- 項目の説明文や入力チェック（正規表現など）の仕様ページは取得していない。

## Q3. 開発者向け機能（APIスキーマ、Webhook、Next.js、MCP、AI）

### Takeaway
microCMS は REST の Content API と Management API、APIスキーマのエクスポートとインポート、Webhook を備える。2025年7月10日に公式の MCPサーバー（npm `microcms-mcp-server`）を公開し、ドキュメントを参照する MCPサーバーも出している。AI機能はクレジット制。

### Cited Findings
- microCMS MCPサーバーは2025年7月10日にリリース。AIツールから記事の作成、メディアのアップロード、アイキャッチの設定などができる。リポジトリは github.com/microcmsio/microcms-mcp-server — [microCMS ブログ: MCPサーバーをリリース](https://blog.microcms.io/microcms-mcp-server/); [ドキュメント: microCMS MCP](https://document.microcms.io/mcp-server/microcms-mcp)
- ドキュメント参照用の MCPサーバーも公開 — [microCMS Document MCPサーバー](https://blog.microcms.io/microcms-document-mcp-server/); [GitHub](https://github.com/microcmsio/microcms-document-mcp-server)
- MCP経由で WordPress から移行した検証記事あり — [microCMS ブログ](https://blog.microcms.io/wordpress-microcms-mcp-migration/)
- 2025年の Management API 拡張: メンバー詳細、API情報、API一覧の取得。そのほか Amazon S3 連携、拡張フィールド（iframe）の改善、転送量のメール通知 — [2025年アップデートまとめ](https://blog.microcms.io/microcms-2025-releases/)
- APIスキーマはエクスポートとインポートができる — [ドキュメント: APIスキーマのエクスポート／インポート](https://document.microcms.io/manual/export-and-import-api-schema)
- 2026年は MCP 経由で AI が CMS を直接操作できることが選定のポイントになり、複数ベンダーが MCPサーバーを出している — [note 7社比較](https://note.com/jazzy_mole4711/n/n5e38ce73e05f)

### Inferences
- 自前の CMS に MCPサーバーを持たせれば（社内では phox で /mcp の実績がある）、microCMS と同等以上の AI 運用ができる。

### Gaps
- Webhook の詳細仕様（対象イベント、プランごとの制限）と Next.js 用 SDK の現状は、今回取得していない。

## Q4. 国産の代替サービスの価格と状況（2026年）

### Takeaway
Newt は2026年11月24日でサービスを終了し、データはすべて削除される（新規作成は2025年5月20日で停止済み）。クラウド型の国産で安いのは NILTO（フェンリル）の Team と Kuroco（従量課金で月1,100円分は無料）。自社サーバーに置けるのは a-blog cms（PHP、2026年4月から月額サブスクのみ）と Movable Type のソフトウェア版で、どちらも従来型 CMS の色が濃い。国産の純ヘッドレスで自社サーバーに置けるものは見つからなかった。Strapi（MIT）などの海外OSSが受け皿になっている。

### Cited Findings
- **Newt**:
  - 2025-05-20 にサービス終了を告知し、新規スペースの作成を停止
  - **2026-11-24 13:59 で全サービス停止**。アカウント、スペース、モデル、コンテンツ、アセットの情報はすべて削除
  - 理由は事業が想定した軌道に乗らなかったため
  - 出典: [Newt サービス終了のお知らせ](https://www.newt.so/notice/newt-close); [FAQ](https://www.newt.so/notice/newt-close-faq)。移行支援を告知した制作会社もある: [ハコレコ](https://www.hakoreco.com/2025/05/21/%E3%80%8Cnewt%E3%80%8D%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E7%B5%82%E4%BA%86%E3%81%AB%E4%BC%B4%E3%81%86cms%E7%A7%BB%E7%AE%A1%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%81%AE%E3%81%94%E6%A1%88%E5%86%85/)
- **Kuroco**（ディバータ）:
  - 完全従量課金で、初期費用なし。月1,100円分までは無料で、クレジットカード不要
  - 単価: APIリクエスト 55円/1,000回、キャッシュされたリクエスト 44円/10,000回、計算時間 0.0132円/1,000ミリ秒、CDN転送量 110円/5GB、メール 11円/100通、ストレージ 55円/1GB
  - 参考費用は月100万PVのメディアで月33,000円、会員1,000人の会員サイトで月22,000円
  - 無料枠の範囲でも全機能が使える（ワークフロー、権限、予約、プレビュー、メール、会員管理など）
  - 出典: [Kuroco 料金](https://kuroco.app/ja/pricing/); [zenn: 国産ヘッドレスCMS3社の無料プラン比較(2025)](https://zenn.dev/ky2rz4/articles/d09af67dcecca6)。単価は検索結果の要約から取得しており、税込か税抜かは未確認
- **NILTO**（フェンリル、大阪）:
  - パーソナル 0円、チーム、ビジネス 107,800円/月、エンタープライズ 327,800円/月
  - チームは2025-03-10に新設されたセルフサーブ型。プレスリリースでは「月額2,900円（税抜）から」、月間リクエスト上限50万回（約10万PV相当）
  - 比較サイトはチームを2,200円/月と記載しており、プレスリリースと食い違う
  - 管理画面の完成度と、階層構造による複数サイト管理が高く評価されている
  - 出典: [フェンリル プレスリリース 2025-03-10](https://www.fenrir-inc.com/jp/news/2025/3/10/nilto-2503/); [Web担当者Forum](https://webtan.impress.co.jp/n/2025/03/11/48796); [キャククル](https://www.shopowner-support.net/attracting_customers/btob-business/nilto/); [note 7社比較](https://note.com/jazzy_mole4711/n/n5e38ce73e05f)
- **a-blog cms**（アップルップル、自社サーバーに置けるインストール型、PHP）:
  - 税込の月額サブスクで、月払いのみ
  - Startup 1,650円/月（5ユーザー。ユーザー無制限は5,500円）
  - Professional 11,000円/月（20ユーザー。無制限は16,500円）
  - Enterprise 88,000円/月（ユーザー無制限、高度な承認ワークフロー）
  - Solo は無料だが、非商用の個人利用のみ
  - 開発用ライセンスは無償
  - **買い切りライセンスの一般販売は2026-03-31で終了**（以後は公式パートナー経由のみ）
  - クラウド版（AWSシングル構成）は月89,980円（税込）
  - 出典: [a-blog cms ライセンス・費用](https://www.a-blogcms.jp/license/); [検索結果の要約](https://www.itreview.jp/products/a-blog-cms/price)
- **MovableType.net**（シックス・アパート、クラウド版）:
  - 2026-04-01からの新体系（税込）は、エントリー 3,850円/月（ブログ5、ユーザー5、容量5GB）、ビジネス 7,700円/月（ブログ15、ユーザー15、容量15GB）、エンタープライズ 16,500円/月（ブログ30、ユーザー30、容量30GB）
  - ソフトウェア版（自社サーバーに設置）とクラウド版も2025-09-10に価格改定を発表
  - 出典: [MovableType.net 料金改定のお知らせ](https://movabletype.net/news/2025/09/price-revision.html); [シックス・アパート プレスリリース 2025-09-10](https://www.sixapart.jp/press_releases/2025/09/10-1100.html)
- 2026年の7社比較で国産として取り上げられたのは NILTO、microCMS、Kuroco、Newt（終了予定）、Craft Cross CMS。自社サーバーに置く選択肢としては Strapi（MIT）が挙がっていた — [note 7社比較](https://note.com/jazzy_mole4711/n/n5e38ce73e05f)
- Newt から Sanity に移った体験記もある — [zenn](https://zenn.dev/noriyuk/articles/e42cdfff75cd44)

### Inferences
- MovableType.net のエンタープライズは月16,500円（税込）でブログ30・ユーザー30を使えるので、「30サイトを1契約で」まとめる価格としては国産で最も安い部類に入る。ただしヘッドレス用途ではなく、静的なブログ出力が前提。
- 自社サーバーに置ける国産は、a-blog cms と Movable Type のソフトウェア版、PowerCMS（いずれも PHP の従来型）に限られる。Next.js と組み合わせるヘッドレス運用で自社の Kubernetes に載せるなら、海外OSS（Strapi、Payload、Directus など）を日本語化して使うのが現実的。
- Newt の終了（データは全削除）は、「SaaS が終わるリスク」を顧客に説明するときの具体例として使える。

### Gaps
- PowerCMS X、Spiral、ShiftCMS、Craft Cross CMS の2026年の価格は、時間の都合で今回は調べていない。
- WordPress の国内シェアを示す一次統計は取得していない。
- Kuroco に自社サーバー版はないと理解しているが、未確認。

## Q5. ロックインとデータの書き出し

### Takeaway
microCMS には、管理画面から全データを一括で書き出す機能がない。手段は、API で取得する、CSVエクスポート（Team 以上）、メディアの URL 一覧を Management API で取得する、非公式の OSS バックアップツールを使う、の4つ。APIスキーマは書き出せる。完全なバックアップを取るには、自分でスクリプトを書いて運用する必要がある。

### Cited Findings
- 管理画面からのコンテンツの完全エクスポートとインポートには非対応。代わりに、GET API で取得するか、Team 以上の CSVエクスポートを使うよう案内している — [microCMS ヘルプ: コンテンツのエクスポート（バックアップ）](https://help.microcms.io/ja/knowledge/data-backup)
- メディアは Management API で URL 一覧を取得して書き出す — [microCMS ヘルプ: メディアのエクスポート](https://help.microcms.io/ja/knowledge/media-export-and-import)
- APIスキーマはエクスポートとインポートができる — [ドキュメント](https://document.microcms.io/manual/export-and-import-api-schema)
- 非公式の OSS バックアップツールがある — [Sinhalite/microcms-backup-tool](https://github.com/Sinhalite/microcms-backup-tool)。GitHub Actions や GAS で定期バックアップする手順記事もある — [jamstack.jp](https://jamstack.jp/blog/backup_with_github_actions/); [Qiita](https://qiita.com/tanaka_s_cnctor/items/39e7fc7c5664289170f5)
- ITreview にも、一括ダウンロードやバックアップの機能がないことへの不満がある — [ITreview](https://www.itreview.jp/products/microcms/reviews)
- Newt はサービス終了時にデータを全削除する — [Newt](https://www.newt.so/notice/newt-close)

### Inferences
- データは技術的には API で全件取り出せるので、ロックインは中程度。ただしリッチエディタの中身は HTML で、microCMS 独自の繰り返しフィールドやカスタムフィールドの構造があるため、移行のたびに変換スクリプトが必要になる。
- 自前で持てば、データベースのダンプとオブジェクトストレージをそのまま保有できる。これは中小企業クライアントへの「データはあなたのもの」という売り文句になる。社内の過去の障害記録を見る限り、DBバックアップの仕組みは必ず用意する必要がある。

### Gaps
- microCMS の利用規約上、解約後のデータ保持期間は確認していない。
