<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Content-Language" content="zh-cn" />
		<title> 修改环境配置 </title>
		<meta name="author" content="gaoyuan.ggg@gmail.com" />
	</head>

	<body>
		<a href="/index.php">回到首页</a>
		<style type="text/css">
			span {color:blue;text-decoration:underline;}
		</style>
		<button id="" type="button">刷新</button>
		<button id="" type="button">添加常用文件</button>
		<div id=""><ul>
		 {% foreach from=$listCss item=cssRow %}
			<li>{% $cssRow[0] %} {% $cssRow[1] %} {% $cssRow[2] %}<span>del</span> <span>to rule</span></li>
		 {% /foreach %}

		</ul></div>
		
	</body>
</html>



