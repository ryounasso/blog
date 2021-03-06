---
title: ウインターハッカソン vol7を終えて
published: 2021-03-01
---

先日、2/27,28 に株式会社サポーターズと株式会社 Boyage Group の共催で行われたウインターハッカソンに参加しました！

これは、僕自身としては 4 回目のハッカソンでした。今回、僕は一人で参加し、同じく一人で参加していた他の方と 4 名で運営の方にチームを組んでいただき、参加しました。そのチームの中で僕はリーダーの立場をさせていただき、初めてハッカソンにリーダーという立場で挑みました。<br>
今回のハッカソンのテーマは、

サポーターズさんが開催する **_「技育祭」_** をより良いものをするための何か

でした。

まずは、メンバーで何を作るかについて話し合う MTG を、本番 1 週間前に開きました。

そこで、オンラインでの講演会では、他にも人が参加している感じが無い、どうしても集中しづらい、といった問題点が浮かび上がり、僕たちのチームでは、 **_「memoChat」_** という、メモライクなチャットアプリを制作することに決まりました。

使用する技術としては、全員が共通して経験していた **_Python_** を使用し、フレームワークで **_Django_** を使用しました。

当日までに、それぞれで Django の復習を行っていただき、僕自身は非同期処理や画像の送信について学習を進めました。<br>

さあ、当日です！ 僕の中でどのよう作業を振り分けるか考えていたのですが...<br>
当日にメンバーの一人が音信不通になってしまいました泣<br>
急遽振り分けを変更し、なんとかスタートを切りましたが、開始直後から焦りました。<br>
僕は、画像の送受信、非同期通信の実装、参加人数のリアルタイム表示を主に担当し、その他エラー等の解決を行いました。

2 日間、(1 日目は翌日の朝の 6 時まで...)やりきり、なんとか動くものを完成させることができました！！！<br>
完成した作品には下のリンクから飛べます！<br>

[MemoChat]https://guarded-eyrie-48747.herokuapp.com/

少し作品について振り返ります。

### こだわった点

- メモライクなデザインにする
- 画像の送信を可能にする
- チャットスペースに参加している人数をリアルタイムで表示する
- 実際の技育祭と同じホールに合わせて、チャットスペースを分ける・選択できるようにする

といったような点をこだわりました！<br>
次に、足りなかった点です。

### 足りなかった点

- 参加している人の描画が、チープでリアリティが薄い
- 本当はメッセージ一つ一つに対して、画像をスタンプのようにして表示したかった...

といったようなことが足りず、後悔です。

また、リーダーとして足りなかった点です。

### リーダーとして足りなかった点

- 開発するものに対して必要な機能を、粒度細かく把握しきれていなかった
- 最後の発表練習の時間を多くとれず、プレゼンで詰まってしまった
- メンバーそれぞれの得意な技術や領域をもう少し詳しく理解した上で、作業を割り振るべきだった

上記の点が足りなかったと感じています。しかし、リーダーをしなければ感じることができなかった課題に触れることができて、本当にいい経験になったと感じています！！<br>
そして、動くものを完成させて、発表までやりきり、完走できたこと、何よりチームメンバーが、ハッカソン終了後に、本当にいい経験になったと言っていたのを見て、参加して良かったと思いました！<br>

他のチームの作品もとてもいいものばかりで、これからの開発意欲がすごく高まっています！！<br>
今後はモダンなフロントエンド技術を勉強していき、またハッカソンで何か作品を作りたいと思っています！！
