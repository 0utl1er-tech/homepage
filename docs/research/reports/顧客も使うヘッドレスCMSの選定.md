# Payloadを顧客ごとに1つずつ立て、店主の更新範囲を絞る

結論から書きます。0UTL1ERは、**自社HPも顧客の店舗サイトも Payload（MIT ライセンスの無料OSS）にそろえ、同じプログラムを顧客ごとの namespace に1つずつ立てる**のがよいと考えます。Payload は、下書き・版の履歴・予約公開・プレビュー・顧客ごとの区分け・AI 接続（MCP）がすべて無料で、管理画面の日本語訳も英語と同じ件数までそろっています（[Payload MCP](https://payloadcms.com/docs/plugins/mcp)、[Payload ja.ts](https://github.com/payloadcms/payload/blob/main/packages/translations/src/languages/ja.ts)）。microCMS で同じこと（店主には下書きだけ許し、公開は承認制にする）をすると、権限管理とカスタムステータスが Business プランにしかないため**1サイト月75,000円（税抜）、30サイトなら月225万円**になります（[microCMS 料金](https://microcms.io/pricing)）。機能を落として Team プランにしても、30サイトで月14.7万円です。いまの Strapi v5 は無料版のままだと、予約公開・ライブプレビュー・変更履歴が有料（1インスタンス月45ドル〜）で、承認フローは Enterprise 限定です（[Strapi 料金](https://strapi.io/pricing-self-hosted)）。自社HPは Service/Case/Post などを新しく作るリニューアルの最中なので、**いま Payload に移れば作り直しは1回で済みます**。ただし、エンジニア本人の作業時間が実際の費用になります。Payload v4 への移行が近いこと、店主がスマホで本当に使えるかを示す証拠がないこと、Google ビジネスプロフィール（以下 GBP）の API 承認が要ることの3点は、先に確かめる必要があります。CMS そのものは他社も無料で手に入れられます。他社と差がつくのは、店主の入力が1回で「サイト・GBP・構造化データ」の3か所に反映される仕組みと、AI が下書きし店主はスマホで承認するだけの運用です。

## microCMS が選ばれる理由と、権限を付けた瞬間に15倍になる料金

microCMS の評価は「日本語で、マニュアルなしで迷わず使える管理画面」に集まっています。項目を組み合わせて入力フォームを自由に作れることや、WordPress の脆弱性対応が要らなくなることも評価されています（[ITreview](https://www.itreview.jp/products/microcms/reviews)、[D2C ID](https://www.d2cid.co.jp/blog/microcms-for-operation-202506/)）。遠州鉄道では約300店舗が自分でコンテンツを更新しているという事例もあります（[ITトレンド](https://it-trend.jp/cms/11410)）。2025年にはリッチエディタで色をプリセットだけに絞る設定が入り、CSV を下書きとして取り込めるようにもなりました（[microCMS 2025年アップデート](https://blog.microcms.io/microcms-2025-releases/)）。2025年7月には公式の MCP サーバー（AI ツールから記事を作成・編集する窓口）も公開しています（[microCMS MCP](https://blog.microcms.io/microcms-mcp-server/)）。不満として挙がるのは、全データを一括で書き出せないことと、サービスが続くかどうかの不安です（[ITreview](https://www.itreview.jp/products/microcms/reviews)）。

料金は **Hobby 0円、Team 4,900円〜、Business 75,000円〜、Enterprise 見積（税抜・月額）**で、**契約は1サイト（xxx.microcms.io）ごとに1つ**です（[microCMS 料金](https://microcms.io/pricing)）。代理店が困るのは、権限管理（ロール）、カスタムステータス（承認待ちなどの状態）、過去版への復元、同時編集の衝突防止がすべて Business 以上にしかない点です。Team のメンバー枠は3人なので、代理店スタッフ2人と店主1人で埋まります。2025年6月には Business が63,000円から75,000円に値上げされました（[microCMS 価格改定](https://blog.microcms.io/pricing-update-2025-06/)）。Team を自分で使っていた人は、Team が成り立つのは「更新する人がひとりで、ファイルを扱える場合だけ」と書き、2026年9月に解約しています（[aaam](https://aaam.jp/columns/microcms-pricing)）。

| 10〜30サイトの月額（税抜、ライセンス代のみ） | 10サイト | 30サイト | 店主に下書き専用の権限を渡せるか |
|---|---|---|---|
| microCMS Team | 49,000円 | 147,000円 | 渡せない（権限管理なし） |
| microCMS Business | 750,000円 | 2,250,000円 | 渡せる |
| Strapi Growth（月45ドル×サイト数、1ドル150円で換算） | 約67,500円 | 約202,500円 | 承認フローは Enterprise のみ |
| Kuroco（従量課金、月1,100円分は無料） | 小規模ならほぼ0円の可能性 | 同左 | 無料枠でもワークフロー・権限あり |
| Payload（自前運用） | 0円 | 0円 | 自分で作る（アクセス制御で実現） |

出典は [microCMS 料金](https://microcms.io/pricing)、[Strapi 料金](https://strapi.io/pricing-self-hosted)、[Kuroco 料金](https://kuroco.app/ja/pricing/) です。Kuroco の単価が税込か税抜かと、1サイトごとの契約になるかは確認できていません。自前運用の場合、ライセンス代の代わりに kuki-dc のメモリと作業時間を使います。Node のプロセス1つで300〜700MB 程度と見込んでいますが、これは公開された測定値ではなく経験則による推定です。30サイトなら数GB〜20GB 程度のメモリを見込みます。お金の比較だけなら、microCMS Team の30サイト分（**年約176万円**）が、自前で作る作業時間の上限の目安になります。それに加えて、microCMS では月75,000円かかる「承認付きの権限」を、全顧客に追加料金なしで出せるようになります。

## 国産は「終わる」か「従来型」で、自前で動かす本命は Payload

国産のクラウド型には、はっきりした警告があります。**Newt は2026年11月24日に全サービスを停止し、データを全削除します**（[Newt サービス終了](https://www.newt.so/notice/newt-close)）。顧客に「SaaS は終わることがある」と説明するときの具体例になります。残る国産の安い選択肢は、NILTO のチームプランと Kuroco です。NILTO のチームプランはプレスリリースでは「月2,900円（税抜）から」ですが、比較サイトには2,200円とあり、食い違っています（[フェンリル](https://www.fenrir-inc.com/jp/news/2025/3/10/nilto-2503/)）。Kuroco は従量課金で、無料枠の範囲でもワークフローと権限が使えます（[Kuroco 料金](https://kuroco.app/ja/pricing/)）。「作らずに済ませる」なら Kuroco が最も現実的な対抗馬です。自社サーバーに置ける国産は、a-blog cms（PHP。買い切りは2026年3月末で一般販売終了）と Movable Type のような従来型の CMS だけで、Next.js と組み合わせる用途には向きません（[a-blog cms](https://www.a-blogcms.jp/license/)、[MovableType.net](https://movabletype.net/news/2025/09/price-revision.html)）。

自前で動かす OSS は、Strapi・Payload・Directus の3つに絞れます。3つとも、1つの Node コンテナを Postgres と S3 互換ストレージにつなぐ構成なので、kuki-dc の CNPG と Ceph RGW にそのまま載ります。違いは「何が無料か」と「日本語がどこまで訳されているか」です。

| | Payload v3 | Strapi v5 Community | Directus v12 |
|---|---|---|---|
| ライセンス | MIT | MIT（一部 ee/ は有料） | MSCL（ライセンスキーで制限）。4年後に GPL |
| 下書き・版・予約公開 | 無料 | 下書きは無料。予約（Releases）と履歴は Growth 以上 | v12 で下書き・公開を標準搭載 |
| ライブプレビュー | 無料 | 有料。簡易プレビューは無料 | あり |
| 承認フロー | Enterprise（自作は可能） | Enterprise のみ | Flows で組める |
| SSO（Keycloak） | コミュニティ製プラグインで無料 | 公式は月150ドル。コミュニティ製は無料 | Core 版では使えない |
| 顧客ごとの区分け | 公式の無料プラグイン | なし | 行単位の権限で可能。ただし席数3 |
| 管理画面の日本語 | 728/728キー（100%） | 本体88%、編集画面98% | 68% |
| MCP（AI 接続） | 公式プラグイン、無料 | 本体に搭載（5.49で正式版） | 本体に搭載、OAuth 2.1 |

出典は [Strapi 料金](https://strapi.io/pricing-self-hosted)、[Strapi プレビュー](https://docs.strapi.io/cms/features/preview)、[Payload Enterprise](https://payloadcms.com/enterprise)、[Payload マルチテナント](https://payloadcms.com/docs/plugins/multi-tenant)、[Directus 料金](https://directus.com/pricing)、[Directus ライセンス](https://github.com/directus/directus/blob/main/license)、[Strapi ja.json](https://github.com/strapi/strapi/blob/develop/packages/core/admin/admin/src/translations/ja.json)、[Directus ja-JP](https://github.com/directus/directus/blob/main/app/src/lang/translations/ja-JP.yaml)、[Strapi MCP GA](https://strapi.io/blog/the-strapi-mcp-server-is-now-ga)、[Directus MCP](https://directus.com/docs/guides/ai/mcp) です。日本語の比率は翻訳ファイルのキーの数を比べたもので、訳の質までは分かりません。Payload の訳は機械翻訳を下敷きにしている可能性があり、設定で上書きできます。

**Directus は今回は外すのが安全です。** 2026年5月の v12 からライセンスキーによる制限が入り、無料の Core 版は「編集者3人・コレクション25個・SSO なし」に制限されました（[Directus 料金](https://directus.com/pricing)）。年商500万ドル（1ドル150円で約7.5億円）未満・50人未満の組織なら全機能が無料になる助成枠があります。ただ、その判定は「管理画面にログインする法人」ごとに行うと書かれています（[Directus ライセンス](https://directus.com/docs/licensing/overview)）。顧客の会社の社員がログインする使い方にこの枠が使えるかは、文書では分かりません。他社と競合する用途の禁止条項に代理店のホスティングが当たるかも分かりません。選ぶなら licensing@directus.com から書面で回答をもらうのが前提になります。

Payload の弱点は2つです。1つ目は所有者の変化です。2025年6月に Figma が買収しました。リポジトリは MIT のままで、自前運用も変わらないと公式に表明されていますが、Payload Cloud は新規受付を止めています（[Payload × Figma](https://github.com/payloadcms/payload/discussions/12843)、[CMSWire](https://www.cmswire.com/digital-experience/when-cms-meets-ux-design-what-figmas-payload-deal-really-means/)）。今後の目玉機能（ビジュアルエディタなど）が Enterprise 側に寄る心配はあります。それでも MIT なので、最悪の場合は fork して使い続けられます。2つ目は **v4 が目の前に来ていること**です。v4 はベータ版で、管理画面の作り直しや、関連データの既定の取得深さを2から1に変更するといった破壊的な変更を含みます。ベータの日付も資料によって2026年4月と10月で食い違っています（[Payload releases](https://github.com/payloadcms/payload/releases)、[buildwithmatija](https://www.buildwithmatija.com/blog/payload-4-0)）。なお Strapi も、v4 から v5 への移行は API の形が変わる大きな作業でした。v4 は2026年6月の v4.26.2 で開発を終えています（[Strapi 2026年夏のまとめ](https://strapi.io/blog/strapi-release-roundup-everything-that-changed-between-june-and-august-2026)）。どれを選んでも、数年に一度の大きな移行は避けられません。

その他の候補にも触れておきます。Ghost（ブログ向けで MySQL 専用）、Wagtail（Python）、Keystatic や Decap（Git に保存する方式で、権限や承認がない）は、「日本語・Postgres・顧客ごとの権限」という条件を Payload ほど満たしません。Sanity はデータ本体を Sanity 社のクラウドに置くので、自前運用になりません（[Ghost](https://github.com/TryGhost/Ghost)、[Wagtail](https://github.com/wagtail/wagtail)、[Sanity](https://github.com/sanity-io/sanity)）。

## Strapi から移るなら、リニューアルと同時の今が一番安い

Strapi に残る案も、きちんと検討しておきます。Strapi の編集画面は分かりやすく、MCP サーバーも本体に入りました（[Strapi MCP GA](https://strapi.io/blog/the-strapi-mcp-server-is-now-ga)）。Keycloak も、コミュニティ製の無料プラグイン（strapi-plugin-oidc など）でつなげます（[strapi-plugin-oidc](https://github.com/edmogeor/strapi-plugin-oidc)）。自社HPだけなら Strapi のままでも困りません。困るのは顧客サイトに広げるときです。店主向けに欲しい「予約公開」「過去版に戻す」「横に並べたプレビュー」が1インスタンスごとに有料になり、承認フローは Enterprise 限定です（[Strapi 料金](https://strapi.io/pricing-self-hosted)）。MCP の操作記録も監査ログ機能（Enterprise）の上にしか残りません。無料版で MCP がどこまで動くかも、公式には明記されていません（[Strapi 2026年夏のまとめ](https://strapi.io/blog/strapi-release-roundup-everything-that-changed-between-june-and-august-2026)）。自社HPと顧客サイトで CMS を分けると、知識と運用手順が2系統になります。そのため、そろえる価値は大きいと考えます。

移行のコストは見た目ほど大きくありません。リニューアルで作る Service/Case/Post/Category/Author/News は、まだ Strapi で作り込む前の段階なので、最初から Payload で書けば二度手間になりません。既存のデータは、News と、経歴書用の Person/Contract/Experience/Skill/Product の5種類だけです。進め方は次のとおりです。まず Strapi の REST API で全件を JSON に書き出します（v5 では documentId が各記事の ID）。次に、それを Payload の Local API（サーバー内から直接データを入れる仕組み）で流し込むスクリプトを書きます。画像は RGW から取り出して Payload のアップロードとして登録し直します。サイトの URL は Next.js 側で決めているので、CMS を替えても URL は変わりません。切り替えまでの間、Strapi は読み取り専用で残しておき、新旧の件数が一致することを確かめてから止めます。経歴書の5種類をどのアプリが読んでいるかはまだ調べていないので、移行前に洗い出しが要ります。洗い出しが済むまで、経歴書だけ Strapi に残しておく案も取れます。

Case に必要な「掲載許諾」も、Payload なら設定の範囲で作れます。Case に「掲載許諾：実名で可／匿名なら可／不可」の項目を持たせます。次に、公開用 API の読み取り権限を「許諾が不可でないもの」だけに絞ります。最後に、匿名可の場合は社名の項目そのものを返さないよう、項目単位で読み取り権限をかけます。Payload の権限は、コレクション単位と項目単位で「誰が何を読めるか」を関数で書く方式なので、この形に合います。これは公式資料を今回読み直したものではなく、Payload の一般的な仕様からの判断です。最初の検証で必ず確かめてください。

## 提供の形は「同じプログラムを顧客ごとの namespace に1つずつ」

複数の顧客に CMS を出す方法は、大きく2つあります。1つは「全員で1つの CMS を共有し、中で顧客を区切る」方法です。もう1つは「顧客ごとに CMS を1つずつ立てる」方法です。Payload には前者のための公式プラグインがあります。データベースは1つで、各データに「どの顧客のものか」の項目を付け、ログインした人が自分の顧客のデータしか触れないようにプログラム側で止める仕組みです。初期設定では、顧客を消すとその顧客のデータもまとめて消えます（[Payload マルチテナント](https://payloadcms.com/docs/plugins/multi-tenant)）。WordPress の世界では、同じ共有方式（マルチサイト）の弱点が知られています。1つのプラグインの穴や管理者アカウント1つの漏れが全サイトに及びます。1サイトだけを戻すのが難しく、1サイトの急なアクセス増が全体の資源を食います。そのため、ブランドも契約も別々の顧客には、別々に立てるのが普通とされています（[Pagely](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)）。

tilcayo はもともと「1顧客1namespace」で、ネットワークの分離、資源の上限、バックアップを namespace 単位で持っています。共有方式はこの境目をまたいでしまいます。そこで、**CMS のプログラム（コンテナイメージ）と項目の定義は1つにまとめて Git で管理し、顧客ごとの namespace に1つずつ配る**形を勧めます。ArgoCD の ApplicationSet で顧客の一覧から自動展開すれば、更新はイメージの番号を上げるだけで全顧客に順番に行き渡ります。顧客が解約するときは、その顧客のデータベースの dump と画像フォルダを渡すだけで済みます。共有プラグインのほうが、確かに資源は少なくて済みます。しかし30サイト程度なら、メモリの差より事故の範囲と解約のしやすさのほうが重いと考えます（この比較は推論です）。

データベースは、顧客ごとに CNPG のクラスタを1つずつ立てる方法と、CNPG を1つだけ立てて中に顧客ごとのデータベースを作る方法があります。最初は後者で始め、顧客ごとの pg_dump を毎晩 RGW に送る運用にするのが手間と安全の釣り合いがよいと考えます。これも検証前の推論です。CNPG 標準のバックアップはクラスタ全体を戻す仕組みなので、1顧客だけ戻すには pg_dump が別に必要になる点に注意してください。WordPress で動いている tilcayo の顧客は、無理に移しません。予約や EC など WordPress のプラグインに頼っている顧客はそのまま残し、契約更新やリニューアルのときに移行を提案します。自社HPも「顧客の1つ」として同じ仕組みに載せ、更新のたびに最初に適用する試験台（カナリア）にします。

## 店主が更新を続けるには、編集できる範囲を小さく決める

更新が止まる理由ははっきりしています。従業員50人未満の会社の経営者1,127人への調査では、更新しない理由の上位は「担当者がいない」30.5%と「やり方が分からない」30.2%でした。更新されていないサイトを見た人の49.8%が「営業しているか不安になる」と答えています（[PR TIMES（プラスト調査）](https://prtimes.jp/main/html/rd/p/000000006.000049109.html)）。首都圏の小さな建設業300社を調べた別の調査では、36%が3年以上新しい投稿をしていませんでした（[イーコネクション](https://www.e-conne.co.jp/blog/1268)）。グーペのような店舗向けサービスも、売りにしているのは「お知らせ・メニュー・クーポン・予約・スマホで編集」です（[グーペ](https://goope.jp/service/price/)）。GBP のメニュー編集も、「区分・品名・説明・価格」を1つずつ入れる形になっています（[GBP メニュー エディタ](https://support.google.com/business/answer/9455840?hl=ja)）。店主が見慣れているのは、自由に書く文章ではなく、決まった欄に1つずつ入れる形です。

そこで、店主が触れるのは次の6種類に限ります。お知らせ（題名・日付・写真1枚・短い本文）、メニューと料金（品名・価格・税込かどうか・写真・区分・売り切れ）、営業時間、臨時休業（日付で入れる）、写真、スタッフです。ページの構成、ナビ、SEO の設定、構造化データ、規約、デザインは代理店が持ちます。本文には文字数の上限を付け、画像はサーバー側で縮小と切り抜きをします。店主には構造を消す権限を渡さず、間違えても過去版から戻せるようにします。お知らせが30日更新されていなければ、こちらから連絡します。これらは調査結果から組み立てた設計案で、効果を測ったデータはありません。

作るか使うかの線引きもしておきます。最初は Payload の管理画面を日本語の説明文や項目の非表示で整えて使い、2〜3軒の店主に実際にスマホで触ってもらいます。そこで迷う様子が見えたら、「お知らせを出す」「今日は休み」「売り切れ」の3つだけを大きなボタンにした店主専用のスマホ画面を、自社の Next.js で別に作ります。Payload の管理画面をスマホで使った評価は、今回どこにも見つかりませんでした。Strapi は新しいメディアライブラリでスマホ対応を明記しています（[Strapi 2026年夏のまとめ](https://strapi.io/blog/strapi-release-roundup-everything-that-changed-between-june-and-august-2026)）。ここが今回いちばん証拠の薄い部分で、検証で最初に確かめるべき点です。

売り方の基準も確認しておきます。グーペは月1,331〜3,993円、Studio は月590〜12,900円です（[グーペ](https://goope.jp/service/price/)、[Studio](https://studio.design/ja/pricing)）。店舗向けの制作会社は、初期費用0円で月2,500〜12,800円のサブスクが多く、更新代行は月5,000〜20,000円が多い価格帯です（[ミツモア](https://meetsmore.com/services/salon-website-development)、[webkanri](https://webkanri.jp/column/2027/)）。CMS の値段で勝負しても勝てません。値段の差ではなく、「店主が1回入れるだけで Google の表示まで変わる」「入力が面倒なら LINE で送れば代わりにやる」という手間の少なさで売る必要があります。

## GBP 連携はいちばんの差別化になるが、API の承認が先に要る

MEO をやっている会社にとって、いちばん効く機能は、CMS に入れた営業時間・臨時休業・お知らせがそのまま GBP にも出ることです。技術的にはできます。営業時間と特別営業時間は Business Information API の locations.patch で書き換えられます。この API では、どの項目を変えるかを指定する updateMask が必須です（[Google: location data](https://developers.google.com/my-business/content/location-data)）。お知らせは v4 の localPosts API で投稿・編集・削除できます。種類はイベント、予約や電話などのボタン付き投稿、特典の3つで、商品投稿は API では作れません（[Google: Posts](https://developers.google.com/my-business/content/posts-data)）。

ただし、**API を使うには申請が要り、「確認済みで60日以上動いている GBP を管理していること」「GBP に載せたウェブサイトがあること」が条件**です。承認されていなければ、利用枠（1分あたりの呼び出し回数）が0のままです（[Google: Prerequisites](https://developers.google.com/my-business/content/prereqs)）。申請は代理店の Google アカウントと GCP プロジェクト1つで行い、各店の GBP の管理者権限を代理店側に付けてもらう形にします。そうすれば、店主それぞれに API の申請をしてもらう必要はありません。メニューを API で書き込めるか、API で変えた営業時間に Google の審査が入るか、利用回数の上限はどうか、の3点は確認できていません。承認が遅れたときは、GBP の更新を代行する外部 API サービスを一時的に使う手もあります（[bundle.social](https://bundle.social/google-business-profile-hours-api)）。

仕組みはこう組みます。CMS で公開されたら、Payload の保存後に動く処理（afterChange フック）から作業の依頼をキューに積みます。既存の Dagster か K8s の CronJob がそれを受け取り、GBP に反映します。同じデータからサイトの構造化データ（JSON-LD の openingHoursSpecification）も作ります。GBP は利用者や Google 自身が情報を書き換えることがあるため、定期的に GBP 側を読み直し、CMS との食い違いを知らせる仕組みも要ります。ここまでは設計案です。

## AI は下書きだけ書き、公開の押しボタンは店主が持つ

流れは4段にします。まず店主が LINE やフォームで「10/20 臨時休業」や写真を送ります。次に Claude が MCP 経由でその顧客の CMS に下書きを作ります。店主にはプレビューのリンクが届き、スマホで「承認」を押します。最後に、公開をきっかけにサイトと GBP が更新されます。Payload の MCP プラグインは、API キーごと、コレクションごとに「検索・作成・更新・削除」を許すかどうかを切り替えられます。キーで呼んだ操作は、そのキーに結び付いたユーザーの権限の範囲でしか動きません（[Payload MCP](https://payloadcms.com/docs/plugins/mcp)）。そこで AI 用のキーには削除を許さず、「公開状態にする」ことも Payload のアクセス制御で禁止します。こうすると、AI がどう動いても下書きまでしか作れません。顧客ごとに CMS を分けておけば、キーが漏れても届くのはその顧客の CMS だけです。

注意点が2つあります。1つ目に、Payload の公式資料には MCP 経由の操作が下書きとして保存されるとは書いてありません。「AI の編集はすべて下書きにする」設計は、外部の解説記事やコミュニティ製ツールが言っているものです（[idealabz](https://idealabz.ae/blog/payload-cms-mcp)、[payload-mcp-toolkit](https://github.com/jon8800/payload-mcp-toolkit)）。そのため、公開状態を拒否する処理はサーバー側に自分で書き、実際に試して確かめる必要があります。2つ目に、Payload の MCP は API キー方式です。Claude Code や Claude Desktop ならヘッダーにキーを入れてつなげます。一方、claude.ai のウェブ版のコネクタは OAuth を求めるので、そのままではつながらない可能性があります（未確認）。phox の /mcp ですでに作った OAuth の仕組みを前に置けば解決できる見込みです。AI が作った変更は、誰がいつ何を変えたかを記録に残します。値段の誤表示のようなもめごとになったときの証拠になるからです。

## 運用の決まりは、顧客を増やす仕組みに最初から組み込む

kuki-dc では以前、phox・forgejo・harbor のデータベースにバックアップが1つもないことが分かっています。顧客ごとに CMS を立てると、データベースの数は顧客の数だけ増えます。手作業で設定する前提では、また漏れます。そこで、**バックアップの設定、復元の確認、監視を、顧客を1つ追加する雛形（Helm か Kustomize）の中に必ず含め、雛形を使わずには顧客を増やせないようにします。** 具体的には、毎晩の pg_dump と CNPG の継続バックアップを RGW へ送り、画像のバケットは版の保持（バージョニング）を有効にします。月に1回は、別の namespace に自動で復元して件数を比べる確認を走らせます。国内の保守プランでも、月5,000〜20,000円の価格帯ではバックアップと改ざん監視が含まれるのが普通なので、顧客は最初からこれを当然と考えています（[webkanri](https://webkanri.jp/column/2027/)）。1サイトだけ戻せることは、別々に立てる方式の大きな利点です（[Pagely](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)）。

ログインは2系統に分けます。代理店スタッフは既存の Keycloak（OIDC）で全顧客の CMS に入ります。Payload の公式 SSO は Enterprise なので、無料の payload-oauth2（MIT、週約1.8万ダウンロード）を使います（[payload.market](https://payload.market/item/payload-oauth2-IOLWOH7)）。ただし、コミュニティ製プラグインの保守状況と安全性はまだ見ていません。店主は自分の会社の認証基盤を持っていないので、メールアドレスとパスワード（またはログイン用のメールリンク）にします。役割は顧客ごとに4つ用意します。店主（編集と公開ができる）、店のスタッフ（下書きまで）、代理店（すべて）、AI のキー（下書きまで）です。更新の手順も決めておきます。イメージは月1回、まず自社HPに当て、問題がなければ全顧客に順番に行き渡らせます。脆弱性が出たときはすぐに当てます。解約時には、データベースの dump、画像一式、静的に書き出したサイトを渡すことを契約書に書きます。これは microCMS（一括書き出しなし）と比べたときの売りにもなります（[microCMS ヘルプ](https://help.microcms.io/ja/knowledge/data-backup)）。

## 段階計画と、先に確かめること

| 段階 | 期間の目安 | やること | 次に進む条件 |
|---|---|---|---|
| 0. 検証 | 2〜3週 | Payload v3 を kuki-dc に立てる（CNPG・RGW・Keycloak）。Case の掲載許諾の権限、MCP で公開状態を拒否できるか、店主2人のスマホ操作を確かめる。**GBP API の申請はこの時点で出す** | 3つの検証がすべて通る |
| 1. 自社HP | 1〜2か月 | Service/Case/Post/Category/Author/News を Payload で作る。Strapi の News と経歴書のデータを移し、件数を照合して Strapi を止める | 本番公開と復元確認が済む |
| 2. 顧客の雛形 | 1か月 | 店舗用の項目定義（お知らせ・メニュー・料金・営業時間・臨時休業・写真・スタッフ）、ApplicationSet、バックアップ込みの雛形を作る。試験顧客2〜3社 | 店主が2週間、自分で更新を続けられる |
| 3. 差別化機能 | 1〜2か月 | GBP 同期、JSON-LD 自動生成、AI の下書き→承認、LINE からの入力 | GBP API が承認されている |
| 4. 拡大 | 以後 | 10〜30社へ広げる。v4 が安定したら自社HPで先に上げる。WordPress の顧客は更新時に移行を提案する | ― |

期間は作業量からの見積もりで、根拠になるデータはありません。

| 未確認事項 | なぜ大事か | 確かめ方 |
|---|---|---|
| Payload v4 の安定版の時期と移行量 | v3 で作ると、すぐに移行作業が来る | releases を追う。検証は v3 で行い、v4 ベータでも動かしてみる |
| MCP の操作が下書きで止まるか | AI が勝手に公開する事故を防ぐため | 段階0で実際に試す |
| Payload 管理画面のスマホでの使い勝手 | 店主が使えなければ専用画面を作る必要がある | 店主2人に触ってもらう |
| GBP API の承認、メニュー書き込み、審査の有無 | 差別化機能の前提 | 申請を早めに出し、自社の GBP で試す |
| claude.ai ウェブ版から MCP につながるか | 店主側の AI 利用の形が変わる | phox の OAuth を前に置いて試す |
| コミュニティ製 OIDC プラグインの保守状況 | 代理店スタッフのログインの安全性 | コードと更新履歴を読む。駄目なら自作する |
| 1インスタンスあたりのメモリ | 30サイト分の資源計画 | 検証環境で実測する |
| Directus の助成枠が顧客ログインに使えるか | Directus を選ぶ場合だけ必要 | licensing@directus.com に書面で問い合わせる |
| Kuroco の税込・税抜と、契約単位 | 「作らない」選択肢との比較 | 問い合わせる |
| 経歴書の5種類を読んでいるアプリ | 移行で何かを壊さないため | リポジトリを検索する |

## Conclusion

この調査で見えてきたのは、microCMS の価格の大半が CMS そのものではなく「人が増えたときの事故を防ぐ機能」（権限・承認・版の復元）の値段だということです。Payload ではその部分が無料です。ですから、0UTL1ER が自前で持つ意味は月額の節約より、**全顧客に承認付きの権限を最初から付けられる**ことにあります。一方で、CMS を選んでも、店主が更新を続けるかどうかはほとんど決まりません。更新を止める理由は「人がいない」と「やり方が分からない」です。効くのは CMS の機能ではなく、入力欄を小さくし、AI と代行で手間を引き取ることです。

もう1つの気づきは、自前運用でいちばん危ないのが技術の選定ではなく、顧客が増えたときに運用の決まりが抜け落ちることだという点です。過去にバックアップのないデータベースが3つ見つかっています。顧客ごとに CMS を立てる以上、バックアップと復元確認は人の注意に任せず、雛形の中で強制する必要があります。また GBP API の申請には条件と待ち時間があるので、CMS を作り始めるより先に出しておくのが、最も安く効く一手です。
