<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
	<title>专业网上购物平台品质保障-京东商城</title>
	<link rel="stylesheet" href="./css/buy.css">
</head>
<body>
<?php
$data=array(
		array("./img/buy-logo.png","￥45","iphone6s手机壳/手机保护套/使用于苹果6/6s/6plusiphone6s手机壳/手机保护套/使用于苹果6/6s/6plus"),
		array("./img/buy-logo.png","￥45","描述1"),
		array("./img/buy-logo.png","￥45","描述1"),
		array("./img/buy-logo.png","￥45","描述1")
	 );
?>
<!-- for($i=0;$i<count($data);$i++){
	for($j=0;$j<count($data[$i]);$j++){
       echo $data[$i][$j];
	}
}
 -->

<!-- 头部 -->
<header id="header">
	<div class="header-left">
		<a href="index.html">
			<span></span>
		</a>
	</div>
	<div class="header-center">
		<span>购物车</span>
	</div>
	<div class="header-right">
		<span></span>
	</div>
</header>
<!-- 安全 -->
<div id="anquan">
	<div class="anquan-warp">
		<em></em>
		<span>您正在安全购物环境中，请放心购物</span>
	</div>
</div>
<!-- 产品列表 -->
<div id="pro">
	<?php 
		for($i=0;$i<count($data);$i++){
	?>
	<div class="pro-warp">
		<div class="pro-title">
			<div class="pro-title-check"></div>
			<div class="pro-title-name">
				<img src="./img/buy-logo.png" alt="">
				<span>京东自营</span>
			</div>
		</div>
		<div class="pro-body">
			<div class="pro-body-check"></div>
			<div class="pro-body-des">
				<img src="<?php echo $data[$i][0] ?>" alt="">
				<div class="pro-body-des-text">
					<span><?php echo $data[$i][2] ?></span>
					<b><?php echo $data[$i][1] ?></b>
					<div class="pro-body-des-con">
						<span id="jia">
							<a></a>
						</span>
						<span id="shu">1</span>
						<span id="jian">
							<a></a>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php 
        }
	?>
		
</div>
<!-- 固定底边栏 -->
<footer id="foot">
	<div class="footLeft">
		<div class="checkall"></div>
		<div class="checktext">全选</div>
		<div class="foot-info">
			<strong>合计:￥213.80</strong>
			<span>总额:￥213.80 返现:￥0.00</span>
		</div>
	</div>
	<div class="footRight">
		去结算（0）
	</div>
</footer>
</body>
</html>