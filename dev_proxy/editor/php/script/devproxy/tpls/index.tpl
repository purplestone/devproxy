<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Content-Language" content="zh-cn" />
		<title> home </title>
		<meta name="author" content="" />
		<meta name="keywords" content="" />
		<meta name="description" content="" />
		<link href="style.css" type="text/css" rel="stylesheet" media="all" />
	</head>

	<body>
		{% block name=head %}{% /block %}
		<div id="home">
			<div id="contextselect" class="tableStyle">
				<div class="tableTilteStyle">环境选择<a href="editSetting.html" class="link">修改环境配置</a></div>
				
				<table cellspacing="0" cellpadding="5">
					<thead>
						<tr>
							<th>&nbsp;</td>
							<th>File</td>
							<th>SVN</td>
							<th>Local</td>
							<th>Test</td>
							<th>&nbsp;</td>
						</tr>
					</thead>
					<tr>
						<td>CSS</td>
						<td><a href="ruleSetting.html">rule</a>&nbsp;<a href="fileCheck.html">view</a></td>
						<td><a href="#" node-type="set">set</a>&nbsp;<a href="#">update</a></td>
						<td><input type="radio" id="" name="css" value=""/></td>
						<td><input type="radio" id="" name="css" value="" checked="checked"/></td>
						<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
					</tr>
					<tr>
						<td>JS</td>
						<td><a href="ruleSetting.html">rule</a>&nbsp;<a href="fileCheck.html">view</a></td>
						<td><a href="#" >set</a>&nbsp;<a href="#">update</a></td>
						<td><input type="radio" id="" name="js" value="" checked="checked" /></td>
						<td><input type="radio" id="" name="js" value="" /></td>
						<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
					</tr>
					<tr>
						<td>aj</td>
						<td><a href="ruleSetting.html">rule</a>&nbsp;<a href="fileCheck.html">view</a></td>
						<td><a href="#" >set</a>&nbsp;<a href="#">update</a></td>
						<td><input type="radio" id="" name="aj" value="" /></td>
						<td><input type="radio" id="" name="aj" value="" checked="checked"/></td>
						<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
					</tr>
					<tr>
						<td>HTML</td>
						<td><a href="ruleSetting.html">rule</a>&nbsp;<a href="fileCheck.html">view</a></td>
						<td><a href="#" >set</a>&nbsp;<a href="#">update</a></td>
						<td><input type="radio" id="" name="html" value="" /></td>
						<td><input type="radio" id="" name="html" value="" checked="checked"/></td>
						<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
					</tr>
				</table>
			</div>
			<br class="clear" />
			<div id="specialrules" class="tableStyle">
				<div class="tableTilteStyle">特殊规则
					<button class="link" type="button">添加规则</button>
				</div>
				<table cellspacing="0" cellpadding="5" >
					<tr>
						<td>img.t.sin.js..............................</td>
						<td>img..............</td>
						<td><a href="#">del</a>&nbsp;<a href="#" node-type = "edit">edit</a>&nbsp;<a href="#">file</a></td>
						<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
					</tr>
					<tr>
						<td>img.t.sin.js..............................</td>
						<td>img..............</td>
						<td><a href="#">del</a>&nbsp;<a href="#" node-type = "edit">edit</a>&nbsp;<a href="#">file</a></td>
						<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
					</tr>
					<tr>
						<td>img.t.sin.js..............................</td>
						<td>img..............</td>
						<td><a href="#">del</a>&nbsp;<a href="#" node-type = "edit">edit</a>&nbsp;<a href="#">file</a></td>
						<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
					</tr>
				</table>
			</div>
			<br class="clear" />
			<div class="tableStyle">
					<div class="tableTilteStyle"> 当前环境</br>
					</div>
					<table cellspacing="0" cellpadding="5" >
						<tr>
							<td>img.t.sin.js..............................</td>
							<td>img..............</td>
							<td><a href="#">to rule</a>&nbsp;<a href="#">edit</a></td>
							<td>Test</td><td>CSS</td>
							<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
						</tr>
						<tr>
							<td>img.t.sin.js..............................</td>
							<td>img..............</td>
							<td><a href="#">to rule</a>&nbsp;<a href="#">edit</a></td>
							<td>Test</td><td>CSS</td>
							<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
						</tr>
						<tr>
							<td>img.t.sin.js..............................</td>
							<td>img..............</td>
							<td><a href="#">to rule</a>&nbsp;<a href="#">edit</a></td>
							<td>Test</td><td>CSS</td>
							<td><input type="checkbox" id="" name="" value="" checked="checked"/></td>
						</tr>

					</table>
			</div>
		</div>
		<script type="text/javascript" src="http://www.cp/STK/js/gaea.js"></script>
		<script type="text/javascript" src="http://www.cp/ue/dev/js/home.js"></script>
		<br class="clear" />
	</body>
</html>