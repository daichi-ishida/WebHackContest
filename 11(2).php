<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 

	<link rel="stylesheet" href="style.css">
	<title>Third Stage</title>
</head>
<body class="third">
<?php
$input_data = $_GET['location'];
if ($input_data == "Nagano") : ?>
	<div class="main">
		<h1>分かってしまったか・・・</h1>
		<p>まあ次に進むがいい。</p>
		<p><span onclick="document.getElementById('lock').style.display='none';">鍵</span>を忘れるなよ？</p>

		<div id="wrap">
			<a href="vier.html">第四ステージへ</a>
			<div id="lock"></div>
		</div>
	</div>
<?php else : ?>
	<div class="main">
		<h1>ようこそ</h1>
	</div>
<?php endif; ?>

</body>
<script>
</script>
</html>