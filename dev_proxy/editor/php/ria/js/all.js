
/*
runTime: 0.0387
fileTree:
 +---- conf/all.js
 |  +---- pl/home/iniInfo.js
 |  |  +---- comp/home/iniInfo.js
 |  |  |  +---- kit/dom/parseDOM.js
 |  +---- pl/home/contextSelect.js
 |  |  +---- comp/home/contextSelect.js
 |  |  |  +---- common/trans/editIni.js
 |  |  |  |  +---- kit/io/inter.js
 |  |  |  |  |  +---- kit/io/ajax.js
 |  |  |  |  |  |  +---- kit/extra/merge.js
 |  |  |  |  |  +---- kit/io/jsonp.js
 |  |  |  +---- common/dialog/setSvnDialog.js
 |  |  |  |  +---- common/dialog.js
 |  |  |  |  |  +---- module/dialog.js
 |  |  |  |  |  |  +---- module/layer.js
 |  |  |  |  |  +---- module/mask.js
 |  |  |  |  |  |  +---- kit/dom/fix.js
 |  |  |  |  |  |  |  +---- kit/dom/cssText.js
 |  |  |  |  +---- common/trans/dialog.js
 |  +---- pl/home/exRule.js
 |  |  +---- comp/home/exRule.js
 |  |  |  +---- common/dialog/setRuleDialog.js
 |  |  |  |  +---- common/channel/rule.js
 |  |  |  |  |  +---- common/listener.js
 |  |  |  +---- kit/dom/parentElementBy.js
 |  |  |  +---- common/dialog/getSetLocalFileDialog.js
 |  +---- pl/home/currentContext.js
 |  |  +---- comp/home/currentContext.js
 |  |  |  +---- common/settingRuleList.js
 |  |  |  |  +---- common/dialog/getSetSettingRuleDialog.js
 |  |  |  |  |  +---- common/channel/settingRule.js
 |  +---- pl/editSetting/settingList.js
 |  |  +---- comp/editSetting/settingList.js
*/

/**
* 
* @id $.pl.home.iniInfo
* @param {Object} node 组件最外节点
* @return {Object} 实例 
* @example 
* 
*/

/**
 * 
 * @id $.comp.home.iniInfo
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */
/**
 * kit.dom.parseDOM
 * 对 core.dom.builder 返回的列表进行过滤
 * 对传入的list遍历一次，每个成员数组，如果只包含一个dom就直接返回该dom；如果包含多个dom则不处理，直接返回数组
 * @id STK.kit.dom.parseDOM
 * @author WK | wukan@staff.sina.com.cn
 * @example
	var buffer = STK.core.dom.builder($.E("example"));
	buffer.list = STK.kit.dom.parseDOM(buffer.list);
 */
STK.register('kit.dom.parseDOM', function($){
	return function(list){
		for(var a in list){
			if(list[a] && (list[a].length == 1)){
				list[a] = list[a][0];
			}
		}
		return list;
	};
});

STK.register('comp.home.iniInfo', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				clickReloadIniDataBtn : function (oEvt) {
					$.ajax({
						'url':'/aj/reloadIni',
						'onComplete': function () {
							setTimeout(function() {location.reload('/home');},500);
						},
					});
				}
			}
			//属性方法区
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			if(!node) {
				throw new Error('comp.home.iniInfo node 没有定义');
			}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			if(!1) {
				throw new Error('comp.home.iniInfo 必需的节点 不存在');
			}

			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			$.addEvent(_this.DOM['reloadIniDataBtn'], 'click', _this.DOM_eventFun.clickReloadIniDataBtn);
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		
		//-------------------------------------------


		return that;
	};
	
});



STK.pageletM.register('pl.home.iniInfo',function($){
	var node = $.E('pl_home_iniInfo');
	if(node) {
		var that = $.comp.home.iniInfo(node);
		return that;
	}
});

/**
* 
* @id $.pl.home.contextSelect
* @param {Object} node 组件最外节点
* @return {Object} 实例 
* @example 
* 
*/

/**
 * 
 * @id $.comp.home.contextSelect
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */
/**
 * 配置文件操作 接口管理
 * @author gaoyuan3@staff.sina.com.cn
 * 
 * 使用此接口的范例：
		$.common.trans.editIni.getTrans('delete',{
			'onSuccess': function (o) {
				console.log('trans.editIni onSuccess');
			},
			'onError': function (o) {
				console.log('trans.editIni onError');
			},
			'onFail': function (o) {
				console.log('trans.editIni onFail');
			}
		}).request(data);
 */
/**
* 合并参数
* @id STK.core.obj.merge
* @alias STK.core.obj.merge
* @param {Object} a 第一个对象
* @param {Object} b 第二个对象
* @author WK | wukan@staff.sina.com.cn
* @example
* var a={a:1,b:2,d:6}
* var b={a:2,b:3,c:4}
* var c=STK.core.obj.merge(a, b);//以后传入的为准:a:2,b:3,c:4,d:6
*/
STK.register('kit.extra.merge', function($){
	return function(a,b){
		var buf = {};
		for (var k in a) {
			buf[k] = a[k];
		}
		for (var k in b) {
			buf[k] = b[k];
		}
		return buf;
	};
});


STK.register('kit.io.ajax', function($) {
	/*** url			: 
	 -----------args-------------
	 * onComplete	: 
	 * onTraning	: 
	 * onFail		: 
	 * method		: 
	 * asynchronous	: 
	 * contentType	: 
	 * encoding		: 
	 * responseType	: 
	 * timeout		: 
	 * 
	 */
	return function(args){
		var conf, that, queue, current, lock, complete, fail;
		
		complete = function(res){
			lock = false;
			if(args.onComplete) {
				args.onComplete(res, conf['args']);
			}
			
			setTimeout(nextRequest,0);//跳出递归
		};
		
		fail = function(res){
			lock = false;
			if(args.onFail) {
				args.onFail(res, conf['args']);
			}
			
			setTimeout(nextRequest,0);//跳出递归
		};
		
		queue = [];
		current = null;
		lock = false;
		
		conf = $.parseParam({
			'url'			: '',
			'method'		: 'get',
			'responseType'	: 'json',
			'timeout'		: 30 * 1000,
			'onTraning'		: $.funcEmpty,
			'isEncode' 		: true
		}, args);
		
		conf['onComplete'] = complete;
		conf['onFail'] = fail;
		
		var nextRequest = function(){
			if(!queue.length){
				return ;
			}
			if(lock === true){
				return;
			}
			lock = true;
			conf.args = queue.shift();
			current = $.ajax(conf);
		};
		
		var abort = function(params){
			while(queue.length){
				queue.shift();
			}
			lock = false;
			if(current){
				//try{
					current.abort();
				//}catch(exp){
				
				//}
			}
			current = null;
		};
		
		that = {};
		
		that.request = function(params){
			if(!params){
				params = {};
			}
			if(args['noQueue']){
				abort();
			}
			if(!args['uniqueRequest'] || !current){
				queue.push(params);
				params['_t'] = 0;
				nextRequest();
			}
		};
		
		that.abort = abort;
		return that;
	};
});

STK.register('kit.io.jsonp', function($) {
	/*** url			: 
	 -----------args-------------
	 * onComplete	: 
	 * onTraning	: 
	 * onFail		: 
	 * method		: 
	 * asynchronous	: 
	 * contentType	: 
	 * encoding		: 
	 * responseType	: 
	 * timeout		: 
	 * 
	 */
	return function(args){
		var conf, that, queue, current, lock;
		
		conf = $.parseParam({
			'url'			: '',
			'method'		: 'get',
			'responseType'	: 'json',
			'varkey'		: '_v',
			'timeout'		: 30 * 1000,
			'onComplete'	: $.funcEmpty,
			'onTraning'		: $.funcEmpty,
			'onFail'		: $.funcEmpty,
			'isEncode' 		: true
		}, args);
		queue = [];
		current = {};
		lock = false;
		
		var nextRequest = function(){
			if(!queue.length){
				return ;
			}
			if(lock === true){
				return;
			}
			lock = true;
			
			
			current.args = queue.shift();
			current.onComplete = function(res){
				lock = false;
				conf.onComplete(res,current['args']);
				setTimeout(nextRequest,0);
			};
			current.onFail = function(res){
				lock = false;
				conf.onFail(res);
				setTimeout(nextRequest,0);
			};
			
			$.jsonp($.kit.extra.merge(conf,{
				'args' : current.args,
				'onComplete' : function(res){current.onComplete(res);},
				'onFail' : function(res){try{current.onFail(res);}catch(exp){}}
			}));
		};
		
		that = {};
		
		that.request = function(params){
			if(!params){
				params = {};
			}
			queue.push(params);
			params['_t'] = 1;
			nextRequest();
		};
		
		that.abort = function(params){
			while(queue.length){
				queue.shift();
			}
			lock = false;
			current = null;
		};
		return that;
	};
});


STK.register('kit.io.inter',function($){
	return function(){
		var that, argsList, hookList;
		that = {};
		argsList = {};
		hookList = {};
		that.register = function(name,args){
			if(argsList[name] !== undefined){
				throw name + ' interface has been registered';
			}
			argsList[name] = args;
			hookList[name] = {};
		};
		that.hookComplete = function(name,func){
			var key = $.core.util.getUniqueKey();
			hookList[name][key] = func;
			return key;
		};
		that.removeHook = function(name,key){
			if(hookList[name] && hookList[name][key]){
				delete hookList[name][key];
			}
		};
		that.getTrans = function(name, spec){
		
			var conf = $.kit.extra.merge(argsList[name], spec);
			conf.onComplete = function(req, params){
				//try{
				if(spec.onComplete) {
					spec.onComplete(req, params);
				}
				//}catch(exp){
				
				//}
				if(req['code'] === '100000'){
					//try{
						if(spec.onSuccess) {
							spec.onSuccess(req, params);
						}
					//}catch(exp){
						
					//}
				}else{
					//try{
						if(req['code'] === '100002'){
							window.location.href=req['data'];
							return;
						}
						if(spec.onError) {
							spec.onError(req, params);
						}
					//}catch(exp){

					//}
				}
				for(var k in hookList[name]){
					//try{
						hookList[name][k](req, params);
					//}catch(exp){

					//}
				}
			};
			if(argsList[name]['requestMode'] === 'jsonp'){
				return $.kit.io.jsonp(conf);
			}else if(argsList[name]['requestMode'] === 'ijax'){
				return $.kit.io.ijax(conf);
			}else{
				return $.kit.io.ajax(conf);
			}
		};
		that.request = function(name, spec, args){
			var conf = $.core.json.merge(argsList[name], spec);

			conf.onComplete = function(req, params){
				//try{
					if(spec.onComplete) {
						spec.onComplete(req, params);
					}
					
				//}catch(exp){

				//}
				if(req['code'] === '100000'){
					//try{
						if(spec.onSuccess) {
							spec.onSuccess(req, params);
						}
						
					//}catch(exp){

					//}
				}else{
					//try{
						if(req['code'] === '100002'){
							window.location.href=req['data'];
							return;
						}
						if(spec.onError) {
							spec.onError(req, params);
						}
						

					//}catch(exp){

					//}
				}
				for(var k in hookList[name]){
					//try{
						hookList[name][k](req, params);
					//}catch(exp){

					//}
				}
			};
			conf = $.core.obj.cut(conf, ['noqueue']);

			conf.args = args;

			if(argsList[name]['requestMode'] === 'jsonp'){
				return $.jsonp(conf);
			}else if(argsList[name]['requestMode'] === 'ijax'){
				return $.ijax(conf);
			}else{
				return $.ajax(conf);
			}
		};
		return that;
	};
});
STK.register('common.trans.editIni',function($){
	
		var t = $.kit.io.inter();
		var g = t.register;
	
		//设置某类型文件的请求环境
		g('selContextOfType',			{'url':'/aj/selContextOfType', 'method':'post'});
		/* 
			请求查询的key
			{
				type:		要改变的文件类型
				context:		要请求的环境
			}
		*/

		//开关某类型的文件的转向
		g('switchType',			{'url':'/aj/switchType', 'method':'post'});
		/* 
			请求查询的key
			{
				type:		要改变的文件类型
				able:		true | false
			}
		*/

		//编辑svn命令
		g('setSvnUpCmd',			{'url':'/aj/setSvnUpCmd', 'method':'post'});
		/* 
			请求查询的key
			{
				type:		要改变的文件类型
				cmd:		svn up 命令
			}
		*/

		//编辑规则
		g('setRule',			{'url':'/aj/setRule', 'method':'post'});
		/* 
			{
				act:		add | edit
				id:		act==edit时需要指定条目id
				src:		原url
				target:		转换到的url
				able:		是否启用
				table:		规则类型
								(
									ex
									transition_css_url
									transition_css_local
									transition_js_url
									transition_js_local
									transition_aj_url
									transition_aj_local
									transition_html_url
									transition_html_local
									transition_other_url
									transition_other_local
								)
			}
		*/


		//批量编辑配置规则
		g('setBatchSetting',			{'url':'/aj/setBatchSetting', 'method':'post'});

		//编辑配置规则
		g('setSettingRule',			{'url':'/aj/setSettingRule', 'method':'post'});
		/* 
			{
				act:		add | edit
				id:		act==edit时需要指定条目id
				src:		原url
				target:		转换到的url
				able:		是否启用
				src_context:		原环境
				src_type:		原类型
				context:		环境
				type:		类型
			}
		*/

		//编辑常用文件url
		g('setCommonFile',			{'url':'/aj/setCommonFile', 'method':'post'});
		/* 
			{
				type:		类型
			}
		*/

		//打开一个常用文件
		g('openFile',			{'url':'/aj/openFile', 'method':'post'});

		///重新读取配置文件
		g('reloadIni',			{'url':'/aj/reloadIni', 'method':'get'});


 

		///查看配置文件路径
		g('setLocalFileContent',			{'url':'/aj/setLocalFileContent', 'method':'post'});
		/*
			/aj/setLocalFileContent?act=add&path=/test.txt&text=xxxxxxxxxxxxxx
			/aj/setLocalFileContent?act=edit&path=/test.txt&text=xxxxxxxxxxxxxx

			act:		edit | add
			path: 本地文件路径
			text: 本地文件内容
		*/
		return t;
});
/**
 * 
 * @id $.common.dialog.setSvnDialog
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */
/**
 * 
 * @id $.common.dialog
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */
/**
 * 对话框
 * 事件show,hide,resize,change
 * @id STK.module.dialog
 * @param {String} html 对话框节点字符串 必须的node-type:outer inner title close
 * @param {Object} option
 * {
 * 		top:undefined //与页面body的上距离
 * 		,left:undefined //与页面body的左距离
 * 		,width:auto //对话框内宽
 * 		,height:auto //对话框内高
 * 		,align:{type:'c', offset:[0,0]} //类似于 fix中的 type 和offset参数  不传时不支持固定
 * 		,dragable:true //true/false 是否支持移动功能
 * }
 * 
 * @return {Object} 
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example 
 * 
 * @import STK.core.dom.builder
 * @import STK.core.dom.setStyle
 * @import STK.core.dom.removeNode
 * @import STK.core.evt.custEvent
 * @import STK.core.util.fix
 */

/**
 * 层
 * @id STK.module.layer
 * @param {String} template html
 * @example 
 * 
 * var a = STK.module.layer('<div node-type="outer"><div node-type="title"></div><div node-type="inner"></div></div>');
 * document.body.appendChild(a.getDom("outer"));
 * a.show();
 * a.getDom("title");
 * @author Robin Young | yonglin@staff.sina.com.cn
 * 		Finrila | wangzheng4@staff.sina.com.cn
 */

STK.register('module.layer', function($){
	
	var getSize = function(box){
		var ret = {};
		if (box.style.display == 'none') {
			box.style.visibility = 'hidden';
			box.style.display = '';
			ret.w = box.offsetWidth;
			ret.h = box.offsetHeight;
			box.style.display = 'none';
			box.style.visibility = 'visible';
		}
		else {
			ret.w = box.offsetWidth;
			ret.h = box.offsetHeight;
		}
		return ret;
	};
	var getPosition = function(el, key){
		key = key || 'topleft';
		var posi = null;
		if (el.style.display == 'none') {
			el.style.visibility = 'hidden';
			el.style.display = '';
			posi = $.core.dom.position(el);
			el.style.display = 'none';
			el.style.visibility = 'visible';
		}
		else {
			posi = $.core.dom.position(el);
		}
		
		if (key !== 'topleft') {
			var size = getSize(el);
			if (key === 'topright') {
				posi['l'] = posi['l'] + size['w'];
			}
			else 
				if (key === 'bottomleft') {
					posi['t'] = posi['t'] + size['h'];
				}
				else 
					if (key === 'bottomright') {
						posi['l'] = posi['l'] + size['w'];
						posi['t'] = posi['t'] + size['h'];
					}
		}
		return posi;
	};
	
	return function(template){
		var dom = $.core.dom.builder(template);
		var outer = dom.list['outer'][0]
			,inner = dom.list['inner'][0];
		var uniqueID = $.core.dom.uniqueID(outer);
		var that = {};
		//事件 显示 隐藏
		var custKey = $.core.evt.custEvent.define(that, "show");
		$.core.evt.custEvent.define(custKey, "hide");
		
		var sizeCache = null;
		/**
		 * 显示
		 * @method show
		 * @return {Object} this
		 */
		that.show = function(){
			outer.style.display = '';
			$.core.evt.custEvent.fire(custKey, "show");
			return that;
		};
		/**
		 * 隐藏
		 * @method hide
		 * @return {Object} this
		 */
		that.hide = function(){
			outer.style.display = 'none';
			//modify by zhaobo 201105111623 转发私信层Ctrl+Enter提交后到此处会有报错。原因未知。添加timeout，问题解决。
			//window.setTimeout(function(){$.core.evt.custEvent.fire(custKey, "hide");}, 0);
			$.custEvent.fire(custKey, "hide");
			return that;
		};
		/**
		 * 层位置获取
		 * @method getPosition
		 * @param {String} key
		 * 		topleft: 左上 topright: 右上 bottomleft: 左下 bottomright: 右下
		 * @return {Object} 
		 * {
		 * 	l: ,//左位置
		 * 	t: //上位置
		 * }
		 */
		that.getPosition = function(key){
			return getPosition(outer, key);
		};
		/**
		 * 层大小获取
		 * @method getSize
		 * @param {Boolean} isFlash 是否重新获取大小
		 * @return {Object} 
		 * {
		 * 	w: ,//宽度
		 * 	h: //高度
		 * }
		 */
		that.getSize = function(isFlash){
			if(isFlash || !sizeCache){
				sizeCache = getSize.apply(that, [outer]);
			}
			return sizeCache;
		};
		/**
		 * 设置html
		 * @method html
		 * @param {String} html html字符串
		 * @return {Object} this
		 */
		that.html = function(html){
			if (html !== undefined) {
				inner.innerHTML = html;
			}
			return inner.innerHTML;
		};
		/**
		 * 设置文本
		 * @method html
		 * @param {String} str 字符串
		 * @return {Object} this
		 */
		that.text = function(str){
			if (text !== undefined) {
				inner.innerHTML = $.core.str.encodeHTML(str);
			}
			return $.core.str.decodeHTML(inner.innerHTML);
		};
		/**
		 * 添加子节点
		 * @method appendChild
		 * @param {Node} node 子节点
		 * @return {Object} this
		 */
		that.appendChild = function(node){
			inner.appendChild(node);
			return that;
		};
		/**
		 * 返回node的iniqueID
		 * @method getIniqueID
		 * @return {String} uniqueID 
		 */
		that.getUniqueID = function(){
			return uniqueID;
		};
		/**
		 * 返回outer
		 * @method getOuter
		 * @return {Node} outer
		 */
		that.getOuter = function(){
			return outer;
		};
		/**
		 * 返回inner
		 * @method getInner
		 * @return {Node} inner
		 */
		that.getInner = function(){
			return inner;
		};
		/**
		 * 返回outer node的父节点
		 * @method getParentNode
		 * @return {Node} outer的父节点 
		 */
		that.getParentNode = function(){
			return outer.parentNode;
		};
		/**
		 * 返回节点node-type列表对象
		 * @method getDomList
		 * @return {Object} 列表对象
		 */
		that.getDomList = function(){
			return dom.list;
		};
		/**
		 * 返回某个node-type对应的节点列表
		 * @method getDomList
		 * @return {Object} 列表对象
		 */
		that.getDomListByKey = function(key){
			return dom.list[key];
		};
		/**
		 * 返回使用node-type="xxx"定义的节点
		 * @method getDom
		 * @param {String} key 节点node-type值
		 * @param {number} index 节点数组的下标 默认为0
		 * @return {Node} 对应的节点
		 */
		that.getDom = function(key, index){
			if(!dom.list[key]){
				return false;
			}
			return dom.list[key][index || 0];
		};
		/**
		 * 返回cascaded节点
		 * @method getCascadeDom
		 * @param {String} key 节点node-type值
		 * @param {number} index 节点数组的下标 默认为0
		 * @return {Node} 对应的cascaded节点
		 */
		that.getCascadeDom = function(key,index){
			if(!dom.list[key]){
				return false;
			}
			return $.core.dom.cascadeNode(dom.list[key][index || 0]);
		};
		return that;
	};
});


STK.register('module.dialog', function($){
//	var setPosition = function(){
//		box.style.top = spec.t + 'px';
//		box.style.left = spec.l + 'px';
//		return that;
//	};
	
	return function(template, spec){
		if(!template){
			throw 'module.dialog need template as first parameter';
		}
		var conf,layer,that,box,title,content,close,titleContent,supportEsc,beforeHideFn,diaHide,sup;
		supportEsc = true;
		var escClose = function(){
			if(supportEsc !== false){
				layer.hide();
			}
		};
		var init = function(){
			conf = $.parseParam({
				't' : null,
				'l' : null,
				'width' : null,
				'height' : null
			},spec);
			layer = $.module.layer(template,conf);
			box = layer.getOuter();
			title = layer.getDom('title');
			titleContent = layer.getDom('title_content');
			content = layer.getDom('inner');
			close = layer.getDom('close');
			$.addEvent(close,'click',function(){
				diaHide();
			});
			
			$.custEvent.add(layer, 'show', function(){
				$.hotKey.add(document.documentElement, ['esc'], escClose, {'type' : 'keyup', 'disableInInput' : true});
			});
			$.custEvent.add(layer, 'hide', function(){
				$.hotKey.remove(document.documentElement, ['esc'], escClose, {'type' : 'keyup'});
				supportEsc = true;
			});
			
		};
		init();
		sup = $.objSup(layer, ['show', 'hide']);
		diaHide =  function(isForce) {
			if(typeof beforeHideFn === 'function' && !isForce){
				if(beforeHideFn() === false){
					return false;
				}
			}
			sup.hide();
			if($.contains(document.body, layer.getOuter())) {
				document.body.removeChild(layer.getOuter());
			}
			return that;
		};


		that = layer;

		that.show = function() {
			if(!$.contains(document.body, layer.getOuter())) {
				document.body.appendChild(layer.getOuter());
			}
			sup.show();
			return that;
		};
		that.hide = diaHide;
		
		that.setPosition = function(pos){
			box.style.top = pos['t'] + 'px';
			box.style.left = pos['l'] + 'px';
			return that;
		};
		that.setMiddle = function(){
			var win = $.core.util.winSize();
			var dia = layer.getSize(true);
			box.style.top = $.core.util.scrollPos()['top'] + (win.height - dia.h)/2 + 'px';
			box.style.left = (win.width - dia.w)/2 + 'px';
			return that;
		};
		that.setTitle = function(txt){
			titleContent.innerHTML = txt;
			return that;
		};
		that.setContent = function(cont){
			if(typeof cont === 'string'){
				content.innerHTML = cont;
			}else{
				content.appendChild(cont);
			}
			return that;
		};
		that.clearContent = function(){
			while(content.children.length){
				$.removeNode(content.children[0]);
			}
			return that;
		};
		that.setAlign = function(){
			
		};
		that.setBeforeHideFn = function(fn){
			beforeHideFn = fn;
		};
		that.clearBeforeHideFn = function(){
			beforeHideFn = null;
		}
		that.unsupportEsc = function(){
			supportEsc = false;
		};
		that.supportEsc = function(){
			supportEsc = true;
		};
		return that;
		
	};
});

/**
 * 遮罩工具
 * @id STK.core.util.mask
 * @author Finrila|wangzheng4@staff.sina.com.cn
 * @example 
 * STK.core.util.mask.show()
 * STK.core.util.mask.showUnderNode(node)
 * STK.core.util.mask.hide()
 */

/**
 * node位置固定
 * @id  STK.kit.dom.fix
 * @param {Node} node 要进行位置固定的节点
 * @param {String} type 'c|lt|lb|rt|rb'//类型 c:中心,lt:左上,lb:左下,rt:右上,rb:右下
 * @param {Array} offset 
 * [//相对位置的边距 中心时相对左上
 * 	0,//和边框的横向距离 type == 'c'时无效
 * 	0//和边框的纵向距离 type == 'c'时无效
 * ]
 * @return {Object} fix
 * 
 * @author Finrila|wangzheng4@staff.sina.com.cn
 * @example 
 * var a = STK.kit.dom.fix(STK.E("test"), "lb");
 * a.destroy();
 * 
 * @import STK.core.obj.parseParam
 * @import STK.core.dom.isNode
 * @import STK.core.util.browser
 * @import STK.core.util.winSize
 * @import STK.core.util.scrollPos
 * @import STK.core.arr.isArray
 * @import STK.core.evt.addEvent
 * @import STK.core.evt.removeEvent
 * @import STK.core.evt.custEvent
 * //3.51
 */

//$Import("core.obj.parseParam");
//$Import("core.dom.isNode");
//$Import("core.util.browser");
//$Import("core.util.winSize");
//$Import("core.util.scrollPos");
//$Import("core.arr.isArray");
//$Import("core.evt.addEvent");
//$Import("core.evt.removeEvent");
//$Import("core.evt.custEvent");
/**
 * 样式缓存及合并
 * @id STK.kit.dom.cssText
 * @param {String} oldCss 旧的cssText
 * @author Finrila|wangzheng4@staff.sina.com.cn
 * @example 
 * var a = STK.kit.dom.cssText(STK.E("test").style.cssText);
 * a.push("width", "3px").push("height", "4px");
 * STK.E("test").style.cssText = a.getCss();
 */

STK.register("kit.dom.cssText", function($) {
	
	var _getNewCss = function(oldCss, addCss) {
		// 去没必要的空白
		var _newCss = (oldCss + ";" + addCss)
			.replace(/(\s*(;)\s*)|(\s*(:)\s*)/g, "$2$4"), _m;
		//循环去除前后重复的前的那个 如 width:9px;height:0px;width:8px; -> height:0px;width:8px;
		while(_newCss && (_m = _newCss.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i))) {
			_newCss = _newCss.replace(_m[1]+_m[2]+_m[3], "");
		}
		return _newCss;
	};
	
	return function(oldCss) {
		oldCss = oldCss || "";
		var _styleList = [],
			that = {
				/**
				 * 向样式缓存列表里添加样式
				 * @method push
				 * @param {String} property 属性名
				 * @param {String} value 属性值
				 * @return {Object} this
				 */
				push: function(property, value) {
					_styleList.push(property + ":" + value);
					return that;
				}
				/**
				 * 从样式缓存列表删除样式
				 * @method remove
				 * @param {String} property 属性名
				 * @return {Object} this
				 */
				,remove: function(property) {
					for(var i = 0; i < _styleList.length; i++) {
						if(_styleList[i].indexOf(property+":") == 0) {
							_styleList.splice(i, 1);
						}
					}
					return that;
				}
				/**
				 * 返回样式缓存列表
				 * @method getStyleList
				 * @return {Array} styleList
				 */
				,getStyleList: function() {
					return _styleList.slice();
				}
				/**
				 * 得到·
				 * @method getCss
				 * @param {String} property 属性名
				 * @param {String} value 属性值
				 * @return {Object} this
				 */
				,getCss: function() {
					return _getNewCss(oldCss, _styleList.join(";"));
				}
			};
		return that;
	};
});

STK.register("kit.dom.fix", function($) {
	//dom 扩展数据
	var _canFix = !($.core.util.browser.IE6 || (document.compatMode !== "CSS1Compat" && STK.IE)),
		_typeReg = /^(c)|(lt)|(lb)|(rt)|(rb)$/;
	
	function _visible(node) {
		return $.core.dom.getStyle(node, "display") != "none";
	}
	
	function _createOffset(offset) {
		offset = $.core.arr.isArray(offset) ? offset : [0, 0];
		for(var i = 0; i < 2; i++) {
			if(typeof offset[i] != "number") offset[i] = 0;
		}
		return offset;
	}
	
	//处理div位置
	function _draw(node, type, offset) {
		if(!_visible(node)) return;
		var _position = "fixed", _top, _left, _right, _bottom
			,_width = node.offsetWidth,_height = node.offsetHeight
			, _winSize = $.core.util.winSize(), _limitTop = 0, _limitLeft = 0
			,_cssText = $.kit.dom.cssText(node.style.cssText);
		if (!_canFix) {
			_position = 'absolute';
			var _scrlPos = $.core.util.scrollPos();
			_limitTop = _top = _scrlPos.top;
			_limitLeft = _left = _scrlPos.left;
			switch(type) {
				case 'lt'://左上
					_top += offset[1];
					_left += offset[0];
				break;
				case 'lb'://左下
					_top += _winSize.height - _height - offset[1];
					_left += offset[0];
				break;
				case 'rt'://右上
					_top += offset[1];
					_left += _winSize.width - _width - offset[0];
				break;
				case 'rb'://右下
					_top += _winSize.height - _height - offset[1];
					_left += _winSize.width - _width - offset[0];
				break;
				case 'c'://中心
				default:
					_top += (_winSize.height - _height) / 2 + offset[1];
					_left += (_winSize.width - _width) / 2 + offset[0];
			}
			_right = _bottom = "";
		} else {
			_top = _bottom = offset[1];
			_left = _right = offset[0];
			switch(type) {
				case 'lt'://左上
					_bottom = _right = "";
				break;
				case 'lb'://左下
					_top = _right = "";
				break;
				case 'rt'://右上
					_left = _bottom = "";
				break;
				case 'rb'://右下
					_top = _left = "";
				break;
				case 'c'://中心
				default:
					_top = (_winSize.height - _height) / 2 + offset[1];
					_left = (_winSize.width - _width) / 2 + offset[0];
					_bottom = _right = "";
			}
		}
		if(type == 'c') {
			if(_top < _limitTop) _top = _limitTop;
			if(_left < _limitLeft) _left = _limitLeft;
		}
		_cssText.push("position", _position)
			   .push("top", _top+"px")
			   .push("left", _left+"px")
			   .push("right", _right+"px")
			   .push("bottom", _bottom+"px");
		node.style.cssText = _cssText.getCss();
	}

	return function(node, type, offset) {
		var _type, _offset, _fixed = true, _ceKey;
		if($.core.dom.isNode(node) && _typeReg.test(type)) {
			var that = {
				/**
				 * 得到节点
				 * @method getNode
				 * @return {Node}
				 */
				getNode: function() {
					return node;
				},
				/**
				 * 检测位置固定的可用性
				 * @method isFixed
				 * @return {Boolean}
				 */
				isFixed: function() {
					return _fixed;
				},
				
				/**
				 * 设置位置固定的可用性
				 * @method setFixed
				 * @param {Boolean} fixed 位置固定的可用性
				 * @return {Object} this
				 */
				setFixed: function(fixed) {
					(_fixed = !!fixed) && _draw(node, _type, _offset);
					return this;
				},
				/**
				 * 设置对齐方式 
				 * @method setAlign
				 * @param {String} type
				 * @param {Array} offset 
				 * [
				 * 	0,//和边框的横向距离 type == 'c'时无效
				 * 	0//和边框的纵向距离 type == 'c'时无效
				 * ]
				 * @return  {Object} this
				 */
				setAlign: function(type, offset) {
					if(_typeReg.test(type)) {
						_type = type;
						_offset = _createOffset(offset);
						_fixed && _draw(node, _type, _offset);
					}
					return this;
				},
				/**
				 * 销毁
				 * @method destroy
				 * @return {void}
				 */
				destroy: function() {
					if (!_canFix) {
						_canFix && $.core.evt.removeEvent(window, "scroll", _evtFun);
					}
					$.core.evt.removeEvent(window, "resize", _evtFun);
					$.core.evt.custEvent.undefine(_ceKey);
				}
			};
			_ceKey = $.core.evt.custEvent.define(that, "beforeFix");
			that.setAlign(type, offset);
			function _evtFun(event) {
				event = event || window.event;
				/**
				 * 系统事件导致的重绘前事件
				 * @event beforeFix
				 * @param {String} type 事件类型  scroll/resize
				 */
				$.core.evt.custEvent.fire(_ceKey, "beforeFix", event.type);
				if(_fixed && (!_canFix || _type == "c")) {
					_draw(node, _type, _offset);
				}
			};
			if (!_canFix) {
				$.core.evt.addEvent(window, "scroll", _evtFun);
			}
			$.core.evt.addEvent(window, "resize", _evtFun);
			return that;
		}
	};
});


STK.register("module.mask", function($) {
	var maskNode,
		nodeRegList = [],
		domFix,
		maskInBody = false,
		maskNodeKey = "STK-Mask-Key";
	
	var setStyle = $.core.dom.setStyle,
		getStyle = $.core.dom.getStyle,
		custEvent = $.core.evt.custEvent;
	
	//初始化遮罩容器
	function initMask() {
		maskNode = $.C("div");
		var _html = '<div node-type="outer">'
		if ($.core.util.browser.IE6) {
			//'<iframe style="position:absolute;z-index:-1;width:100%;height:100%;filter:mask();"></iframe>'+
			_html += '<div style="position:absolute;width:100%;height:100%;"></div>';
		}
		_html += '</div>';
		maskNode = $.builder(_html).list["outer"][0];
		document.body.appendChild(maskNode);
		maskInBody = true;
		domFix = $.kit.dom.fix(maskNode, "lt");
		var _beforeFixFn = function () {
			var _winSize = $.core.util.winSize();
			maskNode.style.cssText = $.kit.dom.cssText(maskNode.style.cssText)
					.push("width", _winSize.width + "px")
					.push("height", _winSize.height + "px").getCss();
		};
		custEvent.add(domFix, "beforeFix", _beforeFixFn);
		_beforeFixFn();
	}
	
	function getNodeMaskReg(node) {
		var keyValue;
		if(!(keyValue = node.getAttribute(maskNodeKey))) {
			node.setAttribute(maskNodeKey, keyValue = $.getUniqueKey());
		}
		return '>'+node.tagName.toLowerCase() + '['+maskNodeKey+'="'+keyValue+'"]';
	}
	
	var that = {
		
		getNode: function() {
			return maskNode;
		},
		/**
		 * 显示遮罩
		 * @method show
		 * @static
		 * @param {Object} option 
		 * {
		 * 	 opacity: 0.5,
		 * 	 background: "#000000"
		 * }
		 */
		show: function(option, cb) {
			if (maskInBody) {
				option = $.core.obj.parseParam({
					opacity: 0.3,
					background: "#000000"
				}, option);
				maskNode.style.background = option.background;
				setStyle(maskNode, "opacity", option.opacity);
				maskNode.style.display = "";
				domFix.setAlign("lt");
				cb && cb();
			} else {
				$.Ready(function() {
					initMask();
					that.show(option, cb);
				});
			}
			return that;
		},
		/**
		 * 隐藏遮罩
		 * @method hide
		 * @static
		 * @param {Node} node 
		 */
		hide: function() {
			maskNode.style.display = "none";
			nowIndex = undefined;
			nodeRegList = [];
			return that;
		},
		/**
		 * 将node显示于遮罩之上
		 * @method showUnderNode
		 * @static
		 * @param {Node} node 
		 * @param {Object} option 
		 * {
		 * 	 opacity: 0.5,
		 * 	 background: "#000000"
		 * }
		 */
		showUnderNode: function(node, option) {
			if ($.isNode(node)) {
				that.show(option, function() {
					setStyle(maskNode, 'zIndex', getStyle(node, 'zIndex'));
					var keyValue = getNodeMaskReg(node);
					var keyIndex = $.core.arr.indexOf(nodeRegList, keyValue);
					if(keyIndex != -1) {
						nodeRegList.splice(keyIndex, 1);
					}
					nodeRegList.push(keyValue);
					$.core.dom.insertElement(node, maskNode, "beforebegin");
				});
			}
			return that;
		},
		back: function() {
			if(nodeRegList.length < 1) return that;
			var node,
				nodeReg;
			nodeRegList.pop();
			if(nodeRegList.length < 1) {
				that.hide();
			} else if((nodeReg = nodeRegList[nodeRegList.length - 1]) && (node = $.sizzle(nodeReg, document.body)[0])) {
				setStyle(maskNode, 'zIndex', getStyle(node, 'zIndex'));
				$.core.dom.insertElement(node, maskNode, "beforebegin");
			} else {
				that.back();
			}
			return that;
		},
		/**
		 * 销毁
		 * @method destroy
		 */
		destroy: function() {
			custEvent.remove(domFix);
			maskNode.style.display = "none";
			lastNode = undefined;
			_cache = {};
		}
	};
	return that;
});


STK.register('common.dialog', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				clickCloseDialog : function (oDEvt) {
					that.hide();
				}
			},
			//属性方法区
			show : function () {
				that.getInner().style.height = '300px';
				that.getInner().style.width = '400px';
				_this._show();
				that.setMiddle();
			},
			resizeDialog : function () {
				that.getInner().style.height = '';
				that.getInner().style.width = '';
				that.setMiddle();
			}
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			//if(!node) {
				//throw new Error('common.dialog node 没有定义');
			//}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			//_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			//if(!1) {
				//throw new Error('common.dialog 必需的节点 不存在');
			//}

			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			sHtml = '<div class="dialogOuter" node-type="outer"><span class="dialogClose" node-type="closeDialog">☓</span><div class="dialogBox" node-type="inner">'+
				'<div class="dialogTitle"></div>'+
				'<div class="dialogInner"></div>'+
			'</div></div>';
			that = _this.objs.dialog = $.module.dialog(sHtml);
			_this._show = that.show;
			_this.DOM = $.kit.dom.parseDOM($.builder(that.getOuter()).list);
			_this.DOM['outer'] = that.getOuter();
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			$.addEvent(_this.DOM['closeDialog'], 'click', _this.DOM_eventFun.clickCloseDialog);
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			$.custEvent.add(that, 'show', function(){
				$.module.mask.showUnderNode(_this.DOM['outer']);
			});
			$.custEvent.add(that, 'hide', function(){
				that.getInner().innerHTML = '';
				$.module.mask.back();
			});
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				$.removeEvent(_this.DOM['closeDialog'], 'click', _this.DOM_eventFun.clickCloseDialog);
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		that.show = _this.show;
		that.resizeDialog = _this.resizeDialog;
		
		//-------------------------------------------


		return that;
	};
	
});

/**
 * 获取dialog 接口管理
 * @author gaoyuan3@staff.sina.com.cn
 * 
 * 使用此接口的范例：
		$.common.trans.dialog.getTrans('delete',{
			'onSuccess': function (o) {
				console.log('trans.dialog onSuccess');
			},
			'onError': function (o) {
				console.log('trans.dialog onError');
			},
			'onFail': function (o) {
				console.log('trans.dialog onFail');
			}
		}).request(data);
 */
STK.register('common.trans.dialog',function($){
	
		var t = $.kit.io.inter();
		var g = t.register;
		//设置svn up命令弹层
		g('getSetSvnCmdDialog',			{'url':'/aj/getSetSvnCmdDialog', 'method':'get'});
		/* 
			{
				type:			svn type
			}
		*/

		//设置规则弹层
		g('getSetRuleDialog',			{'url':'/aj/getSetRuleDialog', 'method':'get'});
		/* 
			{
				act:		add | edit
				id:		act==edit时需要指定条目id
				src:		原url
				target:		转换到的url
				able:		是否启用
				table:		规则类型
								(
									ex
									transition_css_url
									transition_css_local
									transition_js_url
									transition_js_local
									transition_aj_url
									transition_aj_local
									transition_html_url
									transition_html_local
									transition_other_url
									transition_other_local
								)
			}
		*/



		//设置配置文件路径弹层
		g('getShowIniPathDialog',			{'url':'/aj/getShowIniPathDialog', 'method':'get'});

		//批量配置环境弹层
		g('getSetBatchSettingDialog',			{'url':'/aj/getSetBatchSettingDialog', 'method':'get'});

		//设置配置规则弹层
		g('getSetSettingRuleDialog',			{'url':'/aj/getSetSettingRuleDialog', 'method':'get'});
		/* 
			{
				act:		add | edit
				id:		act==edit时需要指定条目id
				src:		原url
				target:		转换到的url
				able:		是否启用
				src_context:		原环境
				src_type:		原类型
				context:		环境
				type:		类型
			}
		*/

		//设置常用文件转换规则弹层
		g('getSetCommonFileDialog',			{'url':'/aj/getSetCommonFileDialog', 'method':'get'});
		/* 
			{
				url:		url值
				type:		类型
			}
		*/
		

		///修改本地文件弹层
		g('getSetLocalFileDialog',			{'url':'/aj/getSetLocalFileDialog', 'method':'get'});
		/* 

			/aj/getSetLocalFileDialog?path=test.txt

			path :		本地文本路径
		*/


		return t;
});

STK.register('common.dialog.setSvnDialog', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{
				trans : {
					dialog : {
						getSetSvnCmdDialog : $.common.trans.dialog.getTrans('getSetSvnCmdDialog',{
							'onSuccess': function (o) {
								//alert(234);
								that.getInner().innerHTML = o.data;
								_this.DOM['svnUpCmdForm'] = $.sizzle('[node-type=svnUpCmdForm]', that.getInner())[0];
								$.addEvent(_this.DOM['svnUpCmdForm'], 'submit', _this.DOM_eventFun.submitSvnUpCmdForm);
								that.resizeDialog();
								//console.log('trans.getSetSvnCmdDialog onSuccess');
							},
							'onError': function (o) {
								//location.reload();
								//console.log('trans.getSetSvnCmdDialog onError');
							},
							'onFail': function (o) {
								//console.log('trans.getSetSvnCmdDialog onFail');
							}
						})
					},
					editIni : {
						setSvnUpCmd : $.common.trans.editIni.getTrans('setSvnUpCmd',{
							'onSuccess': function (o) {
								//console.log('trans.setSvnUpCmd onSuccess');
								that.hide();
							},
							'onError': function (o) {
								//location.reload();
								//console.log('trans.setSvnUpCmd onError');
								alert(o.msg);
							},
							'onFail': function (o) {
								//console.log('trans.setSvnUpCmd onFail');
							}
						})
					}
				}
			},//组件容器
			DOM_eventFun : {
				submitSvnUpCmdForm : function (oEvt) {
					_this.objs.trans.editIni.setSvnUpCmd.request($.htmlToJson(_this.DOM['svnUpCmdForm']));
					$.preventDefault();
				}
			},
			DEventFun : {
				clickCloseDialog : function (oDEvt) {
					that.hide();
				}
			},
			//属性方法区
			show : function (data) {
				_this.objs.trans.dialog.getSetSvnCmdDialog.request(data);
				_this._show();
			}
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			//if(!node) {
				//throw new Error('common.dialog.setSvnDialog node 没有定义');
			//}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			//_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			//if(!1) {
				//throw new Error('common.dialog.setSvnDialog 必需的节点 不存在');
			//}

			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			that = $.common.dialog();
			_this._show = that.show;
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			_this.objs.DEvent = $.core.evt.delegatedEvent(that.getOuter());
			_this.objs.DEvent.add('closeDialog', 'click', _this.DEventFun.clickCloseDialog);
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		that.show = _this.show;

		
		//-------------------------------------------


		return that;
	};
	
});


STK.register('comp.home.contextSelect', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			objs:{
				trans : {
					editIni : {
						selContextOfType : $.common.trans.editIni.getTrans('selContextOfType',{
							'onSuccess': function (o) {
								clearTimeout(_this.reloadST);
								_this.reloadST = setTimeout(function() {location.reload('/home');},1500);
								//console.log('trans.selContextOfType onSuccess');
							},
							'onError': function (o) {
								alert(o.msg);
								//console.log('trans.selContextOfType onError');
							},
							'onFail': function (o) {
								//console.log('trans.selContextOfType onFail');
							}
						}),
						switchType : $.common.trans.editIni.getTrans('switchType',{
							'onSuccess': function (o) {
								clearTimeout(_this.reloadST);
								_this.reloadST = setTimeout(function() {location.reload('/home');},1500);
								//console.log('trans.switchType onSuccess');
							},
							'onError': function (o) {
								alert(o.msg);
								//console.log('trans.switchType onError');
							},
							'onFail': function (o) {
								//console.log('trans.switchType onFail');
							}
						})
					}
				}
			},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				
			},
			DEventFun : {
				clickSwitchTypeBtn : function (oDEvt) {
					var oData = $.queryToJson(oDEvt.el.getAttribute('value'));
					oData.able = oDEvt.el.checked;
					_this.objs.trans.editIni.switchType.request(oData);
				},
				clickContextSelBtn : function (oDEvt) {
					var oData = $.queryToJson(oDEvt.el.getAttribute('value'));
					_this.objs.trans.editIni.selContextOfType.request(oData);
				},
				clickSetSvnBtn : function (oDEvt) {
					if(!_this.objs.setSvnDialog) {
						_this.objs.setSvnDialog = $.common.dialog.setSvnDialog();
					}
					_this.objs.setSvnDialog.show(oDEvt.data);
					$.preventDefault();
				}
			},
			//属性方法区
			checkRadio : function () {
				$.foreach(_this.DOMs['typeRow'], function(o) {

					$.removeClassName(o.eRadioLocal.parentNode, 'enable');
					$.removeClassName(o.eRadioTest.parentNode, 'enable');

					if(o.eCheckbox.checked) {
						if(o.eRadioLocal.checked) {
							$.addClassName(o.eRadioLocal.parentNode, 'enable');
						}
						if(o.eRadioTest.checked) {
							$.addClassName(o.eRadioTest.parentNode, 'enable');
						}
					}
				});
			}
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			if(!node) {
				throw new Error('comp.home.contextSelect node 没有定义');
			}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			_this.DOMs = $.builder(node).list;
			var temp;
			$.foreach(_this.DOMs['typeRow'], function(o) {
				temp = $.sizzle('[action-type=contextSelBtn]', o);
				o.eRadioLocal = temp[0];
				o.eRadioTest = temp[1];
				o.eCheckbox =  $.sizzle('[action-type=switchTypeBtn]', o)[0];
			});
			if(!1) {
				throw new Error('comp.home.contextSelect 必需的节点 不存在');
			}
			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){

			_this.checkRadio();
			var iSI = setInterval(function() {try{
				_this.checkRadio();
			}catch(e) {alert(e);clearInterval(iSI);}},500);

		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			_this.objs.DEvent = $.core.evt.delegatedEvent(node);
			_this.objs.DEvent.add('switchTypeBtn', 'click', _this.DEventFun.clickSwitchTypeBtn);
			_this.objs.DEvent.add('contextSelBtn', 'click', _this.DEventFun.clickContextSelBtn);
			_this.objs.DEvent.add('setSvnBtn', 'click', _this.DEventFun.clickSetSvnBtn);

		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		
		//-------------------------------------------


		return that;
	};
	
});



STK.pageletM.register('pl.home.contextSelect',function($){
	var node = $.E('pl_home_contextSelect');
	if(node) {
		var that = $.comp.home.contextSelect(node);
		return that;
	}
});

/**
* 
* @id $.pl.home.exRule
* @param {Object} node 组件最外节点
* @return {Object} 实例 
* @example 
* 
*/

/**
 * 
 * @id $.comp.home.exRule
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */
/**
 * 
 * @id $.common.dialog.setRuleDialog
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */
/**
 * rule操作 信道的事件 
 * @author gaoyuan3@staff.sina.com.cn
 */
/**
 * 进一步封装core.util.listener, 增加白名单策略, 避免在项目中, 广播混乱
* @author FlashSoft | fangchao@staff.sina.com.cn
* @changelog WK | wukan@ move to common folder
* @changelog Finrila | wangzheng4@ add data_cache_get 
 */
STK.register('common.listener', function($){
	var listenerList = {};
	var that = {};
	/**
	 * 创建广播白名单
	 * @param {String} sChannel
	 * @param {Array} aEventList
	 */
	that.define = function(sChannel, aEventList){
		if (listenerList[sChannel] != null) {
			throw 'common.listener.define: 频道已被占用';
		}
		listenerList[sChannel] = aEventList;
		
		var ret = {};
		ret.register = function(sEventType, fCallBack){
			if (listenerList[sChannel] == null) {
				throw 'common.listener.define: 频道未定义';
			}
			$.listener.register(sChannel, sEventType, fCallBack);
		};
		ret.fire = function(sEventType,oData){
			if (listenerList[sChannel] == null) {
				throw 'commonlistener.define: 频道未定义';
			}
			$.listener.fire(sChannel, sEventType, oData);
		};
		ret.remove = function(sEventType, fCallBack){
			$.listener.remove(sChannel, sEventType, fCallBack);
		};
		
		/**
		 * 使用者可以在任意时刻获取到listener缓存的(某频道+事件)最后一次触发(fire)的数据；如果没有fire过为undefined;
		 * @method cache 
		 * @param {String} sEventType
		 */
		ret.cache = function(sEventType){
			return $.listener.cache(sChannel, sEventType);
		};
		return ret;
	};
	
	// that.register = function(sChannel, sEventType, fCallBack){
	// 		if (listenerList[sChannel] == null) {
	// 			throw 'common.listener.define: 频道未定义';
	// 			
	// 		}
	// 		$.core.util.listener.register(sChannel, sEventType, fCallBack);
	// 	};
	// 	that.fire = function(sChannel, sEventType, oData){
	// 		if (listenerList[sChannel] == null) {
	// 			throw 'commonlistener.define: 频道未定义';
	// 		}
	// 		$.core.util.listener.fire(sChannel, sEventType, oData);
	// 	};
	// 	that.conn = function(){
	// 	
	// 	};
	return that;
});


STK.register('common.channel.rule', function($){
	var eventList = [
		'update',		//rule list有更新
		'add'	,		//添加一条rule
		'del',		//删除一条rule
		'edit',		//修改一条rule
	];

	return $.common.listener.define('common.channel.rule',eventList);
});



STK.register('common.dialog.setRuleDialog', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};

		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{
				trans : {
					dialog : {
						getSetRuleDialog : $.common.trans.dialog.getTrans('getSetRuleDialog',{
							'onSuccess': function (o) {
								//alert(o.data);
								that.getInner().innerHTML = o.data;//alert(o.data);
								_this.DOM['setRuleDialogForm'] = $.sizzle('[node-type=setRuleDialogForm]', that.getInner())[0];
								$.addEvent(_this.DOM['setRuleDialogForm'], 'submit', _this.DOM_eventFun.submitRuleDialogForm);
								//$.addEvent(_this.DOM['setRuleDialogForm'], 'click', function () {
									//alert(11);
								//});

								//$.addEvent(_this.DOM['setRuleDialogForm'], 'submit', _this.DOM_eventFun.submitSetRuleDialogForm);
								that.resizeDialog();
								//console.log('trans.setRuleDialogForm onSuccess');
							},
							'onError': function (o) {
								alert(o.msg);
								//location.reload();
								//console.log('trans.setRuleDialogForm onError');
							},
							'onFail': function (o) {
								//console.log('trans.setRuleDialogForm onFail');
							}
						})
					},
					editIni : {
						setRule : $.common.trans.editIni.getTrans('setRule',{
							'onSuccess': function (o) {
								//console.log('trans.setRule onSuccess');
								that.hide();
								_this.refreshData(o.data);
							},
							'onError': function (o) {
								//location.reload();
								//console.log('trans.setRule onError');
								//alert(o.msg);
							},
							'onFail': function (o) {
								//console.log('trans.setRule onFail');
							}
						})
					}
				}
			},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				submitRuleDialogForm : function (oEvt) {
					var data = $.htmlToJson(_this.DOM['setRuleDialogForm']);
					data.src && (data.src = data.src.replace(/^http:\/\/(.+)/, '$1'));
					data.target && (data.target = data.target.replace(/^http:\/\/(.+)/, '$1'));
					_this.objs.trans.editIni.setRule.request(data);
					$.preventDefault();
				}
			},
			DEventFun : {
				clickCloseDialog : function (oDEvt) {
					that.hide();
				},
				clickSubmitRule : function (oDEvt) {//alert('click');
					//this.objs.trans.editIni.setRule.request($.htmlToJson(_this.DOM['setRuleDialogForm']));
					//that.hide();
				}
			},
			//属性方法区
			show : function (data) {
				if(data.src) {
					data.src = decodeURIComponent(data.src);
					data.target = decodeURIComponent(data.target);
				}
				
				_this.objs.trans.dialog.getSetRuleDialog.request(data);
				_this._show();
			},
			refreshData : function (data) {
				$.common.channel.rule.fire('edit', [data]);	
			}
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			//if(!node) {
				//throw new Error('common.dialog.setRuleDialog node 没有定义');
			//}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			//_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			//if(!1) {
				//throw new Error('common.dialog.setRuleDialog 必需的节点 不存在');
			//}

			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			that = $.common.dialog();
			_this._show = that.show;
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			_this.objs.DEvent = $.core.evt.delegatedEvent(that.getOuter());
			_this.objs.DEvent.add('closeDialog', 'click', _this.DEventFun.clickCloseDialog);
			_this.objs.DEvent.add('submitRule', 'click', _this.DEventFun.clickSubmitRule);
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		that.show = _this.show;
		
		//-------------------------------------------


		return that;
	};
	
});

/**
 * 得到满足指定条件的某个祖先节点 
 * @id $.kit.dom.parentElementBy
 * @param {htmlElement} srcNode 此节点开始向上搜寻父节点  必
 * @param {htmlElement} rangeNode 在此节点下搜寻  必
 * @param {Function} fn  判断方法 必
 * @author gaoyuan3@staff.sina.com.cn
 * @example
	//得到#child的title为‘kkk’ 的祖先元素
	var oPB = $.kit.dom.parentElementBy($.E('#child'), document.HTMLElement, function (el) {
		if(el.title == 'kkk') {
			return true;
		}
	});
 */
STK.register('kit.dom.parentElementBy',function($){
	return function(srcNode, rangeNode, fn) {
		if(!srcNode || !rangeNode) {throw new Error('传入的参数为空');}
		var i = 0, oR;
		srcNode = srcNode.parentNode;

		while(srcNode.parentNode) {
			i++;
			oR = fn(srcNode);
			if(oR === false) {
				return false;
			}else if(oR === true) {
				return srcNode;
			}else if(oR === rangeNode) {
				return null;
			}

			srcNode = srcNode.parentNode;
			if(i >30000) {
				return false;
			}
		}
		return null;
	};
});
/**
 * 本地文件编辑弹层
 * @id $.common.dialog.getSetLocalFileDialog
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */

STK.register('common.dialog.getSetLocalFileDialog', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},
			objs:{
				trans : {
					dialog : {
						getSetLocalFileDialog : $.common.trans.dialog.getTrans('getSetLocalFileDialog',{
							'onSuccess': function (o) {
								that.getInner().innerHTML = o.data;
								_this.DOM['setLocalFileForm'] = $.sizzle('[node-type=setLocalFileForm]', that.getInner())[0];
								$.addEvent(_this.DOM['setLocalFileForm'], 'submit', _this.DOM_eventFun.submitSetLocalFileForm);
								_this.DOM = $.kit.dom.parseDOM($.builder(that.getInner()).list);

								that.resizeDialog();
							},
							'onError': function (o, arg) {
								that.hide();
								if(o.code == 100001 && o.data && o.data.act === 'edit') {
									if(confirm('本地文件不存在，是否创建一个文件? \n' + o.data.tempFilePath)) {
										_this.show({
											act : 'add',
											path : arg.path,
											text : '{"code":"100000","data":"xxxxxxxxxxxx","msg":"ok"}'
										});
									}
								}else{
									alert(o.msg);
								}
							},
							'onFail': function (o) {
							}
						})
					},
					editIni : {
						setLocalFileContent : $.common.trans.editIni.getTrans('setLocalFileContent',{
							'onSuccess': function (o, arg) {
								that.hide();
							},
							'onError': function (o) {
								alert(o.msg);
							},
							'onFail': function (o) {
							}
						})
					}
				}
			},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				submitSetLocalFileForm : function () {
					var data = $.htmlToJson(_this.DOM['setLocalFileForm']);
					//data.text && (data.text = data.text.replace(/^[\\\/]*(.+)/, '/$1'));
					_this.objs.trans.editIni.setLocalFileContent.request(data);
					$.preventDefault();		
				}
			},
			DEventFun : {		
				clickCloseDialog : function (oDEvt) {
					that.hide();
				}
			},	
			//属性方法区
			show : function (data) {
				_this.objs.trans.dialog.getSetLocalFileDialog.request(data);
				_this._show();
			}
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			that = $.common.dialog();
			_this._show = that.show;
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			_this.objs.DEvent = $.core.evt.delegatedEvent(that.getOuter());
			_this.objs.DEvent.add('closeDialog', 'click', _this.DEventFun.clickCloseDialog);
			_this.objs.DEvent.add('submitRule', 'click', _this.DEventFun.clickSubmitRule);
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		that.show = _this.show;
		
		//-------------------------------------------


		return that;
	};
	
});



STK.register('comp.home.exRule', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{
				trans:{
					editIni:{
						setRule : $.common.trans.editIni.getTrans('setRule',{
							'onSuccess': function (o, arg) {
								//console.log('trans.setRule onSuccess');
								if(arg.act === 'del') {
									arg.activeData.parentNode.parentNode.parentNode.removeChild(_this.DOM['row_' + arg.id]);
								}
							},
							'onError': function (o) {
								alert(o.msg);
								//console.log('trans.setRule onError');
							},
							'onFail': function (o) {
								//console.log('trans.setRule onFail');
							}
						})
					}
				}
			},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				
			},
			DEventFun : {
				clickEditExRuleBtn : function (oDEvt) {
					if(!_this.objs.setRuleDialog) {
						_this.objs.setRuleDialog = $.common.dialog.setRuleDialog();
					}
					_this.actWithTrInfo(oDEvt.el, oDEvt.data, function (oTr, dom, oData) {
						oData.src = dom['srcReg'].innerHTML;
						oData.target = dom['targetReg'].innerHTML;
						oData.able = dom['ableStatus'].checked;
						_this.objs.setRuleDialog.show(oData);
					});
					$.preventDefault();
				},
				clickSetLocalFileBtn : function (oDEvt) {
					if(!_this.objs.getSetLocalFileDialog) {
						_this.objs.getSetLocalFileDialog = $.common.dialog.getSetLocalFileDialog();
					}
					oDEvt.data['path'] = oDEvt.el.innerHTML;
					_this.objs.getSetLocalFileDialog.show(oDEvt.data);
					$.preventDefault();
				},
				clickDelExRuleBtn : function (oDEvt) {
					if(confirm('确定删除？')) {
						oDEvt.data.act = 'del';
						oDEvt.data.activeData = oDEvt.el;
						_this.actWithTrInfo(oDEvt.el, oDEvt.data, function (oTr, dom, oData) {
							_this.objs.trans.editIni.setRule.request(oData);
						});
					}
					$.preventDefault();
				},
				clickAddExRuleBtn : function (oDEvt) {
					if(!_this.objs.addRuleDialog) {
						_this.objs.addRuleDialog = $.common.dialog.setRuleDialog();
					}
					_this.objs.addRuleDialog.show(oDEvt.data);
					$.preventDefault();
				},
				clickSwitchExRuleBt : function (oDEvt) {
					var data = $.queryToJson(oDEvt.el.value);
					_this.actWithTrInfo(oDEvt.el, oDEvt.data, function (oTr, dom, oData) {
						oData.able = !!oDEvt.el.checked;
						if(oData.able) {
							$.removeClassName(oTr, 'disable');
						}else{
							$.addClassName(oTr, 'disable');
						}
						_this.objs.trans.editIni.setRule.request(oData);
					});
					
				}
			},
			listenerFun : {
				ruleEdit : function (data) {
					if(data.act === 'add') {
						_this.addRule(data);
					}else if(data.act === 'edit') {
						_this.refreshRule(data);
					}
				}
			},
			//属性方法区
			refreshRule : function (data) {
				var eRowBox = _this.DOM['row_'+data.id];
				var eTr =  _this.parseHtmlToTrElm(data.html);//debugger;
				_this.DOM['exRuleTable'].insertBefore(eTr, eRowBox);
				$.removeNode(eRowBox);
				_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
				//var eSrcReg = $.sizzle('[node-type=srcReg]', eRowBox)[0];
				//var eTargetReg = $.sizzle('[node-type=targetReg]', eRowBox)[0];
				//var eAbleStatus = $.sizzle('[node-type=ableStatus]', eRowBox)[0];

				//if(data['able']) {
					//$.removeClassName(eRowBox, 'disable');
				//}else{
					//$.addClassName(eRowBox, 'disable');
				//}
				//eSrcReg.innerHTML = data['src'];
				//eTargetReg.innerHTML = data['target'];
				//eAbleStatus.checked = data['able'];
			},
			addRule : function (data) {
				var eTr =  _this.parseHtmlToTrElm(data.html);
				_this.DOM['exRuleTable'].appendChild(eTr);

				_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			},
			actWithTrInfo : function (el, data, fn) {
				var dom, oData;
				var oTr = $.kit.dom.parentElementBy(el, node, function (o) {
					if($.hasClassName(o, '_e_exRuleRow')) {
						return true;
					}
				});
				if(oTr) {
					dom = $.kit.dom.parseDOM($.builder(oTr).list);
					oData = $.queryToJson(oTr.getAttribute('info'));
					$.foreach(data, function(o, key) {
						oData[key] = data[key];
					});
					fn(oTr, dom, oData);
				}
				
			},
			parseHtmlToTrElm : function (sHtml) {
				var eDiv = $.C('div');
				eDiv.innerHTML = '<table><tbody>'+ sHtml +'</tbody></table>'; 
				var eTr =  $.sizzle('tr', eDiv)[0];
				return eTr;
			}
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			if(!node) {
				throw new Error('comp.home.exRule node 没有定义');
			}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			if(!1) {
				throw new Error('comp.home.exRule 必需的节点 不存在');
			}

			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			_this.objs.DEvent = $.core.evt.delegatedEvent(node);

			_this.objs.DEvent.add('editExRuleBtn', 'click', _this.DEventFun.clickEditExRuleBtn);
			_this.objs.DEvent.add('delExRuleBtn', 'click', _this.DEventFun.clickDelExRuleBtn);
			_this.objs.DEvent.add('addExRuleBtn', 'click', _this.DEventFun.clickAddExRuleBtn);
			_this.objs.DEvent.add('switchExRuleBtn', 'click', _this.DEventFun.clickSwitchExRuleBt);
			_this.objs.DEvent.add('setLocalFileBtn', 'click', _this.DEventFun.clickSetLocalFileBtn);

		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			$.common.channel.rule.register('edit', _this.listenerFun.ruleEdit);
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		
		//-------------------------------------------


		return that;
	};
	
});



STK.pageletM.register('pl.home.exRule',function($){
	var node = $.E('pl_home_exRule');
	if(node) {
		var that = $.comp.home.exRule(node);
		return that;
	}
});

/**
* 
* @id $.pl.home.currentContext
* @param {Object} node 组件最外节点
* @return {Object} 实例 
* @example 
* 
*/

/**
 * 
 * @id $.comp.home.currentContext
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */
/**
 * 配置规则列表
 * @id $.common.settingRuleList
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 *
 */
/**
 * 
 * @id $.common.dialog.getSetSettingRuleDialog
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */
/**
 * settingRule操作 信道的事件 
 * @author gaoyuan3@staff.sina.com.cn
 */

STK.register('common.channel.settingRule', function($){
	var eventList = [
		'update',		//settingRule list有更新
		'add'	,		//添加一条settingRule
		'del',		//删除一条settingRule
		'edit',		//修改一条settingRule
	];

	return $.common.listener.define('common.channel.settingRule',eventList);
});



STK.register('common.dialog.getSetSettingRuleDialog', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{
				trans : {
					dialog : {
						getSetSettingRuleDialog : $.common.trans.dialog.getTrans('getSetSettingRuleDialog',{
							'onSuccess': function (o) {
								//alert(o.data);
								that.getInner().innerHTML = o.data;
								_this.DOM['getSettingDialogForm'] = $.sizzle('[node-type=getSettingDialogForm]', that.getInner())[0];
								$.addEvent(_this.DOM['getSettingDialogForm'], 'submit', _this.DOM_eventFun.submitGetSettingDialogForm);
								_this.DOM = $.kit.dom.parseDOM($.builder(that.getInner()).list);

								that.resizeDialog();
								//console.log('trans.setRuleDialogForm onSuccess');
							},
							'onError': function (o) {
								alert(o.msg);
								//console.log('trans.setRuleDialogForm onError');
							},
							'onFail': function (o) {
								//console.log('trans.setRuleDialogForm onFail');
							}
						})
					},
					editIni : {
						setSettingRule : $.common.trans.editIni.getTrans('setSettingRule',{
							'onSuccess': function (o, arg) {
								if(arg.act === 'edit') {
									$.common.channel.settingRule.fire('edit', [o.data]);
								}else if(arg.act === 'add') {
									$.common.channel.settingRule.fire('add', [o.data]);
								}
								that.hide();
								//console.log(o.data)
							},
							'onError': function (o) {
								alert(o.msg);
								////location.reload();
								//console.log('trans.setRule onError');
								////alert(o.msg);
							},
							'onFail': function (o) {
								//console.log('trans.setRule onFail');
							}
						})
					}
				}
			},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				submitGetSettingDialogForm : function () {
					var data = $.htmlToJson(_this.DOM['getSettingDialogForm']);
					var ableBtn = $.sizzle('[id="able"]', _this.DOM['getSettingDialogForm'])[0];
					if(ableBtn.checked) {
						data.able = true;
					}else{
						data.able = false;
					}
					data.src && (data.src = data.src.replace(/^http:\/\/(.+)/, '$1'));
					data.target && (data.target = data.target.replace(/^http:\/\/(.+)/, '$1'));
					_this.objs.trans.editIni.setSettingRule.request(data);
					$.preventDefault();		
				}
			},
			DEventFun : {		
				clickCloseDialog : function (oDEvt) {
					that.hide();
				}
			},	
			//属性方法区
			show : function (data) {
				_this.objs.trans.dialog.getSetSettingRuleDialog.request(data);
				_this._show();
			}
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			if(!node) {
				//throw new Error('common.dialog.getSetSettingRuleDialog node 没有定义');
			}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			that = $.common.dialog();
			_this._show = that.show;
			
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			_this.objs.DEvent = $.core.evt.delegatedEvent(that.getOuter());
			_this.objs.DEvent.add('closeDialog', 'click', _this.DEventFun.clickCloseDialog);
			
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		that.show = _this.show;
		
		//-------------------------------------------


		return that;
	};
	
});



STK.register('common.settingRuleList', function($){


	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------

	return function(node, spec){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{
				trans : {
					editIni : {
						setSettingRule : $.common.trans.editIni.getTrans('setSettingRule',{
							'onSuccess': function (o, arg) {
								if(arg.act === 'edit') {
									arg.el.checked = arg.able;
								}else if(arg.act === 'del') {
									_this.removeRow(arg.el);
								}

								//console.log('trans.selContextOfType onSuccess');
							},
							'onError': function (o) {
								alert(o.msg);
								//console.log('trans.selContextOfType onError');
							},
							'onFail': function (o) {
								//console.log('trans.selContextOfType onFail');
							}
						})
					}
				}
			},//组件容器
			DOM_eventFun: {//DOM事件行为容器

			},
			DEventFun : {
				clickSetLocalFileBtn : function (oDEvt) {
					if(!_this.objs.getSetLocalFileDialog) {
						_this.objs.getSetLocalFileDialog = $.common.dialog.getSetLocalFileDialog();
					}
					oDEvt.data['path'] = oDEvt.el.innerHTML;
					_this.objs.getSetLocalFileDialog.show(oDEvt.data);
					$.preventDefault();
				},
				clickDelSettingRuleBtn : function (oDEvt) {
					if(confirm('确定要删除此条配置')) {
						var actIsOk = _this.actWithTrInfo(oDEvt.el, oDEvt.data, function (oTr, dom, oData) {
							oData.context = dom['context'].innerHTML;
							oData.type = dom['type'].innerHTML;
							oData.el = oTr;
							_this.objs.trans.editIni.setSettingRule.request(oData);
						});
					}
					$.preventDefault();
				},
				clickSwitchAbleBtn : function (oDEvt) {
					var actIsOk = _this.actWithTrInfo(oDEvt.el, oDEvt.data, function (oTr, dom, oData) {
						oData.src_context = dom['context'].innerHTML;
						oData.src_type = dom['type'].innerHTML;
						oData.able = !!dom['able'].checked;
						if(oData.able) {
							$.removeClassName(oTr, 'disable');
						}else{
							$.addClassName(oTr, 'disable');
						}
						oData.el = oTr;
						_this.objs.trans.editIni.setSettingRule.request(oData);
					});
					if(!actIsOk) {
						$.preventDefault();
					}

				},
				clickToRuleBtn : function (oDEvt) {
					if(!_this.objs.setRuleDialog) {
						_this.objs.setRuleDialog = $.common.dialog.setRuleDialog();
					}
					_this.actWithTrInfo(oDEvt.el, oDEvt.data, function (oTr, dom, oData) {
						oData.src = dom['srcReg'].innerHTML;
						oData.target = dom['targetReg'].innerHTML;
						_this.objs.setRuleDialog.show(oData);
					});
					$.preventDefault();
				},
				clickEditSettingRuleBtn : function (oDEvt) {
					if(!_this.objs.getSetSettingRuleDialog) {
						_this.objs.getSetSettingRuleDialog = $.common.dialog.getSetSettingRuleDialog({});
					}
					_this.actWithTrInfo(oDEvt.el, oDEvt.data, function (oTr, dom, oData) {
						oData.src_context = dom['context'].innerHTML;
						oData.src_type = dom['type'].innerHTML;
						oData.src = dom['srcReg'].innerHTML;
						oData.target = dom['targetReg'].innerHTML;
						oData.able = !!dom['able'].checked;
						_this.objs.getSetSettingRuleDialog.show(oData);
					});
					$.preventDefault();
				}
			},
			listenerFun : {
				settingRuleEdit : function (data) {
					var sRowNodeType = 'row_' + data.src_context + '_' + data.src_type + '_' + data.src_id;
					var eRow = _this.DOM[sRowNodeType];
					if(eRow) {
						if(data.currentSetting[data.type] === data.context) {
							_this.refreshSetttingRule(eRow, data);
							//alert('refreshSetttingRule');
						}else{
							if(spec.ifDisableToRemove) {
								_this.removeRow(eRow);
							}
							//alert('removeRow');
						}
					}
				},
				settingRuleAdd : function (data) {
					_this.addSettingRule(data);
				}
			},
			//属性方法区
			refreshSetttingRule : function (eRow, data) {
				var eNewRow = _this.parseHtmlToTrElm(data.html);
				_this.DOM['settingRuleTable'].insertBefore(eNewRow, eRow);
				$.removeNode(eRow);
				_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
				//var sNewRowNodeType = 'row_' + data.context + '_' + data.type + '_' + data.id;
				//eRow.setAttribute('node-type', sNewRowNodeType);
				//var dom = $.kit.dom.parseDOM($.builder(eRow).list);
				//var oInfo = $.queryToJson(eRow.getAttribute('info'));
				//oInfo.id = data.id;
				//dom['context'].innerHTML = data.context;
				//dom['type'].innerHTML = data.type;
				//dom['srcReg'].innerHTML = data.src;
				//dom['targetReg'].innerHTML= data.target;
				//dom['able'].checked = data.able;
				//if(data['able']) {
					//$.removeClassName(eRow, 'disable');
				//}else{
					//$.addClassName(eRow, 'disable');
				//}
				//eRow.setAttribute('info',$.jsonToQuery(oInfo));
			},
			removeRow : function (eRow) {
				$.removeNode(eRow);
			},
			actWithTrInfo : function (el, data, fn) {
				var dom, oData;
				var oTr = $.kit.dom.parentElementBy(el, node, function (o) {
					if($.hasClassName(o, '_e_settingRuleRow')) {
						return true;
					}
				});
				if(oTr) {
					dom = $.kit.dom.parseDOM($.builder(oTr).list);
					oData = $.queryToJson(oTr.getAttribute('info'));
					$.foreach(data, function(o, key) {
						oData[key] = data[key];
					});
					fn(oTr, dom, oData);
					return true;
				}else{
					return false;
				}
			},
			showAddRuleDialog : function (data) {//alert('showAddRuleDialog');return;
				data = data || {};
				if(!_this.objs.getSetSettingRuleDialog) {
					_this.objs.getSetSettingRuleDialog = $.common.dialog.getSetSettingRuleDialog({});
				}
				data.act = 'add';
				data.able = true;
				_this.objs.getSetSettingRuleDialog.show(data);
			},
			addSettingRule : function (data) {
				var eTr =  _this.parseHtmlToTrElm(data.html);
				_this.DOM['settingRuleTable'].appendChild(eTr);

				_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			},
			parseHtmlToTrElm : function (sHtml) {
				var eDiv = $.C('div');
				eDiv.innerHTML = '<table><tbody>'+ sHtml +'</tbody></table>'; 
				var eTr =  $.sizzle('tr', eDiv)[0];
				return eTr;
			}
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			if(!node) {
				throw new Error('common.settingRuleList node 没有定义');
			}
			spec = spec || {};
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			if(!1) {
				throw new Error('common.settingRuleList 必需的节点 不存在');
			}


		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){

		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			_this.objs.DEvent = $.core.evt.delegatedEvent(node);
			_this.objs.DEvent.add('toRuleBtn', 'click', _this.DEventFun.clickToRuleBtn);
			_this.objs.DEvent.add('editSettingRuleBtn', 'click', _this.DEventFun.clickEditSettingRuleBtn);
			_this.objs.DEvent.add('switchAbleBtn', 'click', _this.DEventFun.clickSwitchAbleBtn);
			_this.objs.DEvent.add('delSettingRuleBtn', 'click', _this.DEventFun.clickDelSettingRuleBtn);
			_this.objs.DEvent.add('setLocalFileBtn', 'click', _this.DEventFun.clickSetLocalFileBtn);
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){

		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			$.common.channel.settingRule.register('edit', _this.listenerFun.settingRuleEdit);
			$.common.channel.settingRule.register('add', _this.listenerFun.settingRuleAdd);
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {


				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		that.showAddRuleDialog = _this.showAddRuleDialog;

		//-------------------------------------------


		return that;
	};


});


STK.register('comp.home.currentContext', function($){
	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				
			}
			//属性方法区
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			if(!node) {
				throw new Error('common.settingRuleList node 没有定义');
			}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			if(!1) {
				throw new Error('common.settingRuleList 必需的节点 不存在');
			}

		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			$.common.settingRuleList(_this.DOM['settingRuleList'], {
				ifDisableToRemove : true
			});
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		
		//-------------------------------------------


		return that;
	};

});



STK.pageletM.register('pl.home.currentContext',function($){
	var node = $.E('pl_home_currentContext');
	if(node) {
		var that = $.comp.home.currentContext(node);
		return that;
	}
});

/**
* 
* @id $.pl.editSetting.settingList
* @param {Object} node 组件最外节点
* @return {Object} 实例 
* @example 
* 
*/

/**
 * 
 * @id $.comp.editSetting.settingList
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author gaoyuan3@staff.sina.com.cn
 * @example
 * 
 */

STK.register('comp.editSetting.settingList', function($){

	//+++ 常量定义区 ++++++++++++++++++
	//-------------------------------------------
	
	return function(node){
		var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, init, that = {};


		//+++ 变量定义区 ++++++++++++++++++
		var _this = {
			DOM:{},//节点容器
			objs:{},//组件容器
			DOM_eventFun: {//DOM事件行为容器
				clickAddRuleDialog : function (oEvt) {
					_this.objs.settingRuleList.showAddRuleDialog();
				}
			}
			//属性方法区
			
		};
		//----------------------------------------------


		//+++ 参数的验证方法定义区 ++++++++++++++++++
		argsCheck = function(){
			if(!node) {
				throw new Error('comp.editSetting.settingList node 没有定义');
			}
		};
		//-------------------------------------------


		//+++ Dom的获取方法定义区 ++++++++++++++++++
		parseDOM = function(){
			//内部dom节点
			_this.DOM = $.kit.dom.parseDOM($.builder(node).list);
			if(!1) {
				throw new Error('comp.editSetting.settingList 必需的节点 不存在');
			}

			
		};
		//-------------------------------------------


		//+++ 模块的初始化方法定义区 ++++++++++++++++++
		initPlugins = function(){
			_this.objs.settingRuleList = $.common.settingRuleList(_this.DOM['settingRuleList']);
		};
		//-------------------------------------------


		//+++ DOM事件绑定方法定义区 ++++++++++++++++++
		bindDOM = function(){
			$.addEvent(_this.DOM['addRuleDialog'], 'click', _this.DOM_eventFun.clickAddRuleDialog);
		};
		//-------------------------------------------


		//+++ 自定义事件绑定方法定义区 ++++++++++++++++++
		bindCustEvt = function(){
			
		};
		//-------------------------------------------


		//+++ 广播事件绑定方法定义区 ++++++++++++++++++
		bindListener = function(){
			
		};
		//-------------------------------------------


		//+++ 组件销毁方法的定义区 ++++++++++++++++++
		destroy = function(){
			if(_this) {
				
				
				$.foreach(_this.objs, function(o) {
					if(o.destroy) {
						o.destroy();
					}
				});
				_this = null;
			}
		};
		//-------------------------------------------

		//+++ 组件的初始化方法定义区 ++++++++++++++++++
		init = function(){
			argsCheck();
			parseDOM();
			initPlugins();
			bindDOM();
			bindCustEvt();
			bindListener();
		};
		//-------------------------------------------
		//+++ 执行初始化 ++++++++++++++++++
		init();
		//-------------------------------------------


		//+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
		that.destroy = destroy;
		
		//-------------------------------------------


		return that;
	};
	
});



STK.pageletM.register('pl.editSetting.settingList',function($){
	var node = $.E('pl_editSetting_settingList');
	if(node) {
		var that = $.comp.editSetting.settingList(node);
		return that;
	}
});


//$Import('bigpipeM');
