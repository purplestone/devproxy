#配置 C:\Windows\System32\drivers\etc\hosts 文件

127.0.0.1		devproxy

=================================

#配置apache \conf\extra\httpd-vhosts.conf 文件

<VirtualHost *:80>
	ServerAdmin webmaster@dummy-host.site
	DocumentRoot "{$$$dir$$$}/editor"
	ServerName devproxy
	#ErrorLog "logs/devproxy-error.log"
	#CustomLog "logs/devproxy-access.log" common

	RewriteEngine On
	#RewriteLog "logs/devproxy-rewrite.log"
	#RewriteLogLevel 9

	RewriteRule		^/(.+)\.css		/php/ria/css/$1.css		[L,QSA]
	RewriteRule		^/(.+)\.js		/php/ria/js/$1.js		[L,QSA]
	RewriteRule		^/aj/([^.]+)		/php/script/devproxy/url/aj/$1.php		[L,QSA]
	RewriteRule		^/([^.]+)		/php/script/devproxy/url/page/$1.php		[QSA]

	<Directory "{$$$dir$$$}/editor">
	    Options FollowSymLinks ExecCGI
	    #Order allow,deny
	    Allow from all
	</Directory>
</VirtualHost>

================================



#将dev_proxy.bat , url_warp.ini两个文件拷贝到项目文件夹中，将dev_proxy.bat里的xxxxxxxxxx改成项目文件夹路径，运行dev_proxy.bat即可

#访问项目时将浏览器的代理服务器指向127.0.0.1:8000，（IE、chrome浏览器注意将“跳过本地地址的代理服务器”选项取消）

