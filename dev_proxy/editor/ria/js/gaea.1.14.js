var STK = (function() {
	var that = {};
	var errorList = [];
	//$Import
    that.inc = function (ns, undepended) {
		return true;
	};
	//STK.register
    that.register = function (ns, maker) {
		var NSList = ns.split('.');
		var step = that;
		var k = null;
		while(k = NSList.shift()){
			if(NSList.length){
				if(step[k] === undefined){
					step[k] = {};
				}
				step = step[k];
			}else{
				if(step[k] === undefined){
					//try{
						step[k] = maker(that);
					//}catch(exp){
						
					//}
				}
			}
		}
	};
	//STK.regShort
	that.regShort = function (sname, sfun) {
		if (that[sname] !== undefined) {
			throw '[' + sname + '] : short : has been register';
		}
		that[sname] = sfun;
	};
	//STK.IE
	that.IE = /msie/i.test(navigator.userAgent);
	//STK.E
	that.E = function(id) {
		if (typeof id === 'string') {
			return document.getElementById(id);
		} else {
			return id;
		}
	};
	//STK.C
	that.C = function(tagName) {
		var dom;
		tagName = tagName.toUpperCase();
		if (tagName == 'TEXT') {
			dom = document.createTextNode('');
		} else if (tagName == 'BUFFER') {
			dom = document.createDocumentFragment();
		} else {
			dom = document.createElement(tagName);
		}
		return dom;
	};
	
	that.log = function(str){
		errorList.push('[' + ((new Date()).getTime() % 100000) + ']: ' + str);
	};
	
	that.getErrorLogInformationList = function(n){
		return errorList.splice(0, n || errorList.length);
	};
	return that;
})();
$Import = STK.inc;

/**
 * 让指定对象执行动画效果(静态方法,不需要实例化)
 * @id STK.core.ani.tween
 * @param {Element} node 需要被执行动画效果的对象ID或者DOM对象
 * @param {Object} spec 动画的结束值,带单位,可传入多个	
		// 	'animationType' : 'linear',
		// 	'duration' : 500,
		// 	'algorithmParams' : {},
		// 	'extra' : 5,
		// 	'delay' : 25,
		// 	'end' : function(){},
		// 	'tween' : function(){},
		// 	'propertys' : {}
 * @return {Object}
			that.play(target);
			that.stop();
			that.pause();
			that.resume();
			that.finish(target);
			that.setNode(el);
			that.destroy();
 * @example tween($E('test'),{'end':function(el){el.style.display='none'}}).finish({'height':0});
			tween($E('test')).
				play({'height':100}).
				play({'width':100}).
				play({
					'top':100,
					'left':100
				}).
				destory();
 * @author FlashSoft | fangchao@staff.sina.com.cn
	modify by Robin Young | yonglin@staff.sina.com.cn
 */
/**
 * 动画运算类
 * @id STK.core.ani.tweenArche
 * @alias STK.core.ani.tweenArche
 * @param {Function} tween 循环执行的函数
 * @param {Object} 
		{
			'animationType' : 'linear',		//动画类型
			'distance' : 1,					//动作距离
			'duration' : 500,				//持续时间(毫秒)
			'callback' : $.core.func.empty,	//执行后的返回函数
			'algorithmParams' : {},			//动画算法所需要的额外参数
			'extra' : 5,					//基本动画需要的偏移量信息
			'delay' : 25					//动画间隔时间
		}
 * @return {Object} 
		{
			{Function}getStatus	: //获取当点状态
			{Function}play		: //播放动画
			{Function}stop		: //停止动画
			{Function}resume	: //继续播放
			{Function}pause		: //暂停动画
			{Function}destroy	: //销毁对象
		}
 * @author FlashSoft | fangchao@staff.sina.com.cn
		modify by Robin Young | yonglin@staff.sina.com.cn
 * @import STK.core.ani.tweenValue
 */
/**
 * tween动画运算库
 * @id STK.core.ani.algorthm
 * @return {Number} 随着时间参数而改变的运算数值
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example 
		var res = core.ani.algorithm.compute('linear', 0, 100, 50, 500, 5, {});
 *
		core.ani.algorithm.addAlgorithm('test',function(t, b, c, d, s){
			return c * t / d + b;
		})
 */
STK.register('core.ani.algorithm', function($){
	
	var algorithm = {
		'linear' : function(t, b, c, d, s){
			return c * t / d + b;
		},
		
		'easeincubic' : function(t, b, c, d, s){
			return c * (t /= d) * t * t + b;
		},
		
		'easeoutcubic' : function(t, b, c, d, s){
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t + b;
			}
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		
		'easeinoutcubic' : function(t, b, c, d, s){
			if (s == undefined) {
				s = 1.70158;
			}
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		
		'easeinback' : function(t, b, c, d, s){
			if (s == undefined) {
				s = 1.70158;
			}
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		
		'easeoutback' : function(t, b, c, d, s){
			if (s == undefined) {
				s = 1.70158;
			}
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		
		'easeinoutback' : function(t, b, c, d, s){
			if (s == undefined) {
				s = 1.70158;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			}
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		}
	};
	return {
		'addAlgorithm' : function(name, fn){
			if ( algorithm[name] ){
				throw '[core.ani.tweenValue] this algorithm :' + name + 'already exist';
			}
			algorithm[name] = fn;
		},
		'compute' : function(type, propStart, proDest, timeNow, timeDest, extra, params){
			if ( typeof algorithm[type] !== 'function' ){
				throw '[core.ani.tweenValue] this algorithm :' + type + 'do not exist';
			}
			return algorithm[type](timeNow, propStart, proDest, timeDest,  extra, params);
		}
	};
});

/**
 * empty function
 * @id STK.core.func.empty
 * @alias STK.core.func.empty
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var a = {'onError':STK.core.func.empty}s
 */
STK.register('core.func.empty', function(){
	return function(){};
});
/**
 * 合并参数，不影响源
 * @id STK.core.obj.parseParam
 * @alias STK.core.obj.parseParam
 * @param {Object} oSource 需要被赋值参数的对象
 * @param {Object} oParams 传入的参数对象
 * @param {Boolean} isown 是否仅复制自身成员，不复制prototype，默认为false，会复制prototype
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * var cfg = {
 * 	name: '123',
 *  value: 'aaa'
 * };
 * cfg2 = STK.core.obj.parseParam(cfg, {name: '456'});
 * //cfg2 == {name:'456',value:'aaa'}
 * //cfg == {name:'123',value:'aaa'}
 */
STK.register('core.obj.parseParam', function($){
	return function(oSource, oParams, isown){
		var key, obj = {};
		oParams = oParams || {};
		for (key in oSource) {
			obj[key] = oSource[key];
			if (oParams[key] != null) {
				if (isown) {// 仅复制自己
					if (oSource.hasOwnProperty[key]) {
						obj[key] = oParams[key];
					}
				}
				else {
					obj[key] = oParams[key];
				}
			}
		}
		return obj;
	};
});

STK.register('core.ani.tweenArche', function($){
	
	return function(tween, spec){
		var conf, that, currTime, startTime, currValue, timer, pauseTime, status;
		that = {};
		conf = $.core.obj.parseParam({
			'animationType' : 'linear',
			'distance' : 1,
			'duration' : 500,
			'callback' : $.core.func.empty,
			'algorithmParams' : {},
			'extra' : 5,
			'delay' : 25
		}, spec);
		
		var onTween = function(){
			currTime = (+new Date() - startTime);
			if(currTime < conf['duration']){
				currValue = $.core.ani.algorithm.compute(
					conf['animationType'],
					0,
					conf['distance'],
					currTime,
					conf['duration'],
					conf['extra'],
					conf['algorithmParams']
				);
				tween(currValue);
				
				timer = setTimeout(onTween, conf['delay']);
			}else{
				status = 'stop';
				conf['callback']();
			}
		};
		
		status = 'stop';
		
		that.getStatus = function(){
			return status;
		};
		
		that.play = function(){
			startTime = +new Date();
			currValue = null;
			onTween();
			status = 'play';
			return that;
		};
		
		that.stop = function(){
			clearTimeout(timer);
			status = 'stop';
			return that;
		};
		
		that.resume = function(){
			if(pauseTime){
				startTime += (+new Date() - pauseTime);
				onTween();
			}
			return that;
		};
		
		that.pause = function(){
			clearTimeout(timer);
			pauseTime = +new Date();
			status = 'pause';
			return that;
		};
		
		that.destroy = function(){
			clearTimeout(timer);
			pauseTime = 0;
			status = 'stop';
		};
		return that;
	};
});

/**
 * get Elements style
 * @id STK.core.dom.getStyle
 * @alias STK.core.dom.getStyle
 * @param {Element} node
 * @param {String} property
 * @return {String} value
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.getStyle($.E('test'),'display') === 'none';
 */
STK.register('core.dom.getStyle', function($){
	return function(node, property){
		if ($.IE) {
			switch (property) {
				// 透明度
				case "opacity":
					var val = 100;
					try {
						val = node.filters['DXImageTransform.Microsoft.Alpha'].opacity;
					} 
					catch (e) {
						try {
							val = node.filters('alpha').opacity;
						} 
						catch (e) {
						}
					}
					return val / 100;
				// 浮动
				case "float":
					property = "styleFloat";
				default:
					var value = node.currentStyle ? node.currentStyle[property] : null;
					return (node.style[property] || value);
			}
		}
		else {
			// 浮动
			if (property == "float") {
				property = "cssFloat";
			}
			// 获取集合
			try {
				var computed = document.defaultView.getComputedStyle(node, "");
			} 
			catch (e) {}
			return node.style[property] || computed ? computed[property] : null;
		}
	};
});

/**
 * 样式缓存及合并
 * @id STK.core.dom.cssText
 * @param {String} oldCss 旧的cssText
 * @author Finrila|wangzheng4@staff.sina.com.cn
 * @example 
 * var a = STK.kit.dom.cssText(STK.E("test").style.cssText);
 * a.push("width", "3px").push("height", "4px");
 * STK.E("test").style.cssText = a.getCss();
 */

STK.register("core.dom.cssText", function($) {
	
	return function(oldCss) {
		oldCss = (oldCss || "").replace(/(^[^\:]*?;)|(;[^\:]*?$)/g, "").split(";");
		var cssObj = {}, cssI;
		for(var i = 0; i < oldCss.length; i++) {
			cssI = oldCss[i].split(":");
			cssObj[cssI[0].toLowerCase()] = cssI[1];
		}
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
					cssObj[property.toLowerCase()] = value;
					return that;
				},
				/**
				 * 从样式缓存列表删除样式
				 * @method remove
				 * @param {String} property 属性名
				 * @return {Object} this
				 */
				remove: function(property) {
					property = property.toLowerCase();
					cssObj[property] && delete cssObj[property];
					return that;
				},
				/**
				 * 得到·
				 * @method getCss
				 * @param {String} property 属性名
				 * @param {String} value 属性值
				 * @return {Object} this
				 */
				getCss: function() {
					var newCss = [];
					for(var i in cssObj) {
						newCss.push(i + ":" + cssObj[i]);
					}
					return newCss.join(";");
				}
			};
		return that;
	};
});
/**
 * 判断对象类型
 * @param {Object} oObject 需要判断类型的对象,可以是任意对象
 * @return {String} 传入对象的类型,取值全部为小写
 * @author FlashSoft | flashsoft@live.com
 */
STK.register('core.func.getType', function($){
	return function(oObject){
		var _t;
		return ((_t = typeof(oObject)) == "object" ? oObject == null && "null" || Object.prototype.toString.call(oObject).slice(8, -1) : _t).toLowerCase();
	};
});

/**
 * get result for each item
 * @id STK.core.arr.foreach
 * @alias STK.core.arr.foreach
 * @param {Array} o
 * @param {Function} insp
 * @return {Array} r
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var li1 = [1,2,3,4]
 * var li2 = STK.core.arr.foreach(li1,function(v,i){return v + i});
 * li2 === [1,3,5,7]
 */

/**
 * Check Array
 * @id STK.core.arr.isArray
 * @alias STK.core.arr.isArray
 * @param {Array} o
 * @return {Boolean} TRUE/FALSE
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var li1 = [1,2,3]
 * var bl2 = STK.core.arr.isArray(li1);
 * bl2 == TRUE
 */
STK.register('core.arr.isArray', function($){
	return function(o){
		return Object.prototype.toString.call(o) === '[object Array]';
	};
});

STK.register('core.arr.foreach', function($){
	
	var arrForeach = function(o, insp){
		var r = [];
		for (var i = 0, len = o.length; i < len; i += 1) {
			var x = insp(o[i], i);
			if (x === false){
				break;
			} else if (x !== null) {
				r[i] = x;
			}
		}
		return r;
	};
	
	var objForeach = function(o, insp){
		var r = {};
		for (var k in o) {
			var x = insp(o[k], k);
			if (x === false){
				break;
			} else if (x !== null) {
				r[k] = x;
			}
		}
		return r;
	};
	return function(o, insp){
		if ($.core.arr.isArray(o) || (o.length && o[0] !== undefined)) {
			return arrForeach(o, insp);
		} else if (typeof o === 'object') {
			return objForeach(o, insp);
		}
		return null;
	};
});


/**
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @id STK.core.json.merge
 * @alias STK.core.json.merge
 * @param {Object} origin
 * @param {Object} cover
 * @return {Object} opts{isDeep:true/false}
 */

/**
 * Check if in Array
 * @id STK.core.arr.inArray
 * @alias STK.core.arr.inArray
 * @param {String | Number} oElement 需要查找的对象
 * @param {Array} aSource 源数组
 * @return {Boolean} 是否在数组中
 * @author WK | wukan@staff.sina.com.cn Copy from jQuery
 *         FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * var a = 2,b=[3,2,1]
 * alert(STK.core.arr.inArray(a,b));// true
 */
/**
 * 返回在数组中的索引
 * @id STK.core.arr.indexOf
 * @alias STK.core.arr.indexOf
 * @param {String | Number} oElement 需要查找的对象
 * @param {Array} aSource 源数组
 * @return {Number} 在数组中的索引,-1为未找到
 * @author WK | wukan@staff.sina.com.cn Copy from jQuery
 *         FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * var a = 2, b=[3,2,1];
 * alert(STK.core.arr.indexOf(a,b));// 1
 */
STK.register('core.arr.indexOf', function($){
	return function(oElement, aSource){
		if (aSource.indexOf) {
			return aSource.indexOf(oElement);
		}
		for (var i = 0, len = aSource.length; i < len; i++) {
			if (aSource[i] === oElement) {
				return i;
			}
		}
		return -1;
	};
});

STK.register('core.arr.inArray', function($){
	return function(oElement, aSource){
		return $.core.arr.indexOf(oElement, aSource) > -1;
	};
});

/**
 * is node
 * @id STK.core.dom.isNode
 * @alias STK.core.dom.isNode
 * @param {Element} node
 * @return {Boolean} true/false
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.isNode($.E('test')) == true;
 */
STK.register('core.dom.isNode', function($){
	return function(node){
		return (node != undefined) && Boolean(node.nodeName) && Boolean(node.nodeType);
	};
});

STK.register('core.json.merge',function($){
	var checkOriginObj = function(obj){
		if(obj === undefined){
			return true;
		}
		if(obj === null){
			return true;
		}
		if($.core.arr.inArray(['number','string','function'], (typeof obj))){
			return true;
		}
		if($.core.arr.isArray(obj)){
			return true;
		}
		if($.core.dom.isNode(obj)){
			return true;
		}
		return false;
	};
	var merge = function(origin, cover, isDeep){
		var ret = {};
		for(var k in origin){
			if(cover[k] === undefined){
				ret[k] = origin[k];
			}else{
				if(!checkOriginObj(origin[k]) && !checkOriginObj(cover[k]) && isDeep){
					ret[k] = arguments.callee(origin[k], cover[k]);
				}else{
					ret[k] = cover[k];
				}
			}
		}
		for(var l in cover){
			if(ret[l] === undefined){
				ret[l] = cover[l];
			}
		}
		return ret;
	};
	return function(origin, cover, opts){
		var conf = $.core.obj.parseParam({
			'isDeep' : false
		}, opts);
		
		return merge(origin, cover, conf.isDeep);
	};
});
/**
 *	@author Robin Young | yonglin@staff.sina.com.cn
*/
STK.register('core.util.color',function($){
	
	
	var analysisHash = /^#([a-fA-F0-9]{3,8})$/;
	var testRGBorRGBA = /^rgb[a]?\s*\((\s*([0-9]{1,3})\s*,){2,3}(\s*([0-9]{1,3})\s*)\)$/;
	var analysisRGBorRGBA = /([0-9]{1,3})/ig;
	var splitRGBorRGBA = /([a-fA-F0-9]{2})/ig;
	var foreach = $.core.arr.foreach;
	
	var analysis = function(str){
		var ret = [];
		var list = [];
		if(analysisHash.test(str)){
			list = str.match(analysisHash);
			if(list[1].length <= 4){
				ret = foreach(list[1].split(''),function(value, index){
					return parseInt(value + value, 16);
				});
			} else if( list[1].length <= 8) {
				ret = foreach(list[1].match(splitRGBorRGBA),function(value, index){
					return parseInt(value, 16);
				});
			}
			return ret;
		}
		if(testRGBorRGBA.test(str)){
			list = str.match(analysisRGBorRGBA);
			ret = foreach(list, function(value, index){
				return parseInt(value, 10);
			});
			return ret;
		}
		return false;
	};
	
	return function(colorStr, spec){
		var ret = analysis(colorStr);
		if(!ret){
			return false;
		}
		var that = {};
		
		that.getR = function(){
			return ret[0];
		};
		
		that.getG = function(){
			return ret[1];
		};
		
		that.getB = function(){
			return ret[2];
		};
		
		that.getA = function(){
			return ret[3];
		};
		return that;
	};
});

STK.register('core.ani.tween', function($){
	
	var tweenArche	= $.core.ani.tweenArche;
	var foreach		= $.core.arr.foreach;
	var getStyle	= $.core.dom.getStyle;
	var getType		= $.core.func.getType;
	var parseParam	= $.core.obj.parseParam;
	var merge		= $.core.json.merge;
	var color		= $.core.util.color;
	
	var getSuffix = function(sValue){
		var charCase = /(-?\d\.?\d*)([a-z%]*)/i.exec(sValue);
		var ret = [0, 'px'];
		if(charCase){
			if(charCase[1]){
				ret[0] = charCase[1] - 0;
			}
			if(charCase[2]){
				ret[1] = charCase[2];
			}
		}
		return ret;
	};
	//'marginTop'==>'margin-top'
	var styleToCssText = function(s){
	    for(var i = 0, len = s.length; i < len; i += 1){
	        var l = s.charCodeAt(i);
	        if(l > 64 && l < 90){
	            var sf = s.substr(0,i);
	            var sm = s.substr(i,1);
	            var se = s.slice(i+1);
	            return sf + '-' + sm.toLowerCase() + se;
	        }
	    }
		return s;
	};
	
	var formatProperty = function(node, value, key){
		//for node property
		var property = getStyle(node,key);
		
		if(getType(property) === 'undefined' || property === 'auto'){
			if(key === 'height'){
				property = node.offsetHeight;
			}
			if(key === 'width'){
				property = node.offsetWidth;
			}
		}
		//end node property
		
		var ret = {
			'start'	: property,
			'end'	: value,
			'unit'	: '',
			'key'	: key,
			'defaultColor' : false
		};
		
		//about number
		if(getType(value) === 'number'){
			var style = [0, 'px'];
			if(getType(property) === 'number'){
				style[0] = property;
			}else{
				style = getSuffix(property);
			}
			ret['start'] = style[0];
			ret['unit'] = style[1];
		}
		
		//about color
		if(getType(value) === 'string'){
			var tarColObj, curColObj;
			tarColObj = color(value);
			if(tarColObj){
				curColObj = color(property);
				if(!curColObj){
					curColObj = color('#fff');
				}
				ret['start'] = curColObj;
				ret['end'] = tarColObj;
				ret['defaultColor'] = true;
			}
		}
		node = null;
		return ret;
	};
	
	var propertyFns = {
		'opacity' : function(rate, start, end, unit){
			var value = (rate*(end - start) + start);
			return {
				'filter' : 'alpha(opacity=' + value*100 + ')',
				'opacity' : Math.max(Math.min(1,value),0)
			};
		},
		'defaultColor' : function(rate, start, end, unit){
			var r =  Math.max(0,Math.min(255, Math.ceil((rate*(end.getR() - start.getR()) + start.getR()))));
			var g =  Math.max(0,Math.min(255, Math.ceil((rate*(end.getG() - start.getG()) + start.getG()))));
			var b =  Math.max(0,Math.min(255, Math.ceil((rate*(end.getB() - start.getB()) + start.getB()))));
			var ret = {};
			ret[styleToCssText(key)] = '#' + 
				(r < 16 ? '0' : '') + r.toString(16) + 
				(g < 16 ? '0' : '') + g.toString(16) + 
				(b < 16 ? '0' : '') + b.toString(16);
			return ret;
		},
		'default' : function(rate, start, end, unit, key){
			var value = (rate*(end - start) + start);
			var ret = {};
			ret[styleToCssText(key)] = value + unit;
			return ret;
		}
	};
	
	
	// 	'animationType' : 'linear',
	// 	'distance' : 1,
	// 	'duration' : 500,
	// 	'algorithmParams' : {},
	// 	'extra' : 5,
	// 	'delay' : 25,
	// 	'end' : function(){},
	// 	'tween' : function(){},
	// 	'propertys' : {}
	
	return function(node, spec){
		var that, conf, propertys, ontween, propertyValues, staticStyle, onend, sup, queue, arche;
		
		spec = spec || {};
		
		conf = parseParam({
			'animationType' : 'linear',
			'duration' : 500,
			'algorithmParams' : {},
			'extra' : 5,
			'delay' : 25
		}, spec);
		
		conf['distance'] = 1;
		
		conf['callback'] = (function(){
			var end = spec['end'] || $.core.func.empty;
			return function(){
				ontween(1);
				onend();
				end(node);
			};
		})();
		
		propertys = merge(propertyFns, spec['propertys'] || {});
		
		staticStyle = null;
		
		propertyValues = {};
		
		queue = [];
		
		ontween = function(rate){
			var list = [];
			var opts = foreach(propertyValues, function(value, key){
				var fn;
				if(propertys[key]){
					fn = propertys[key];

				}else if(value['defaultColor']){
					fn = propertys['defaultColor'];

				}else{
					fn = propertys['default'];

				}
				var res = fn(
					rate, 
					value['start'], 
					value['end'], 
					value['unit'],
					value['key']
				);
				for(var k in res){
					staticStyle.push(k, res[k]);
				}
				
				
			});
			node.style.cssText = staticStyle.getCss();
		};
		
		
		onend = function(){
			var item;
			while(item = queue.shift()){
				try{
					item.fn();
					if(item['type'] === 'play'){
						break;
					}
					if(item['type'] === 'destroy'){
						break;
					}
				}catch(exp){
					
				}
			}
		};
		
		arche = tweenArche(ontween, conf);
		
		var setNode = function(){
			if(arche.getStatus() !== 'play'){
				node = el;
			}else{
				queue.push({'fn' : setNode, 'type':'setNode'});
			}
		};
		
		var play = function(target){
			if(arche.getStatus() !== 'play'){
				propertyValues = foreach(target, function(value, key){
					return formatProperty(node, value, key);
				});
				staticStyle = $.core.dom.cssText(node.style.cssText + (spec['staticStyle'] || ''));
				arche.play();
			}else{
				queue.push({'fn':function(){play(target);},'type':'play'});
			}
		};
		
		var destroy = function(){
			if(arche.getStatus() !== 'play'){
				arche.destroy();
				node = null;
				that = null;
				conf = null;
				propertys = null;
				ontween = null;
				propertyValues = null;
				staticStyle = null;
				onend = null;
				sup = null;
				queue = null;
			}else{
				queue.push({'fn':destroy,'type':'destroy'});
			}
		};
		
		that = {};
		
		that.play = function(target){
			play(target);
			return that;
		};
		that.stop = function(){
			arche.stop();
			return that;
		};
		that.pause = function(){
			arche.pause();
			return that;
		};
		that.resume = function(){
			arche.resume();
			return that;
		};
		that.finish = function(target){
			play(target);
			destroy();
			return that;
		};
		that.setNode = function(el){
			setNode();
			return that;
		};
		that.destroy = function(){
			destroy();
			return that;
		};
		return that;
	};
});


/**
 * Delete empty item in array(like undefined/null/empty string)
 * @id STK.core.arr.clear
 * @alias STK.core.arr.clear
 * @param {Array} o
 * @return {Array} result
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var li = STK.core.arr.clear([1,2,3,undefined]);
 * li === [1,2,3];
 * @import STK.core.arr.isArray
 * @import STK.core.arr.findout
 */
/**
 * Find out the index of items which equal to some value.
 * @id STK.core.arr.findout
 * @alias STK.core.arr.findout
 * @param {Array} o
 * @param {String/Number} value
 * @return {Array} k
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var li1 = ['a','b','c','a']
 * var li2 = STK.core.arr.findout(li1,'a');
 * li2 === [0,3]
 */

STK.register('core.arr.findout', function($){
	return function(o, value){
		if (!$.core.arr.isArray(o)) {
			throw 'the findout function needs an array as first parameter';
		}
		var k = [];
		for (var i = 0, len = o.length; i < len; i += 1) {
			if (o[i] === value) {
				k.push(i);
			}
		}
		return k;
	};
});

STK.register('core.arr.clear', function($){
	return function(o){
		if (!$.core.arr.isArray(o)) {
			throw 'the clear function needs an array as first parameter';
		}
		var result = [];
		for (var i = 0, len = o.length; i < len; i += 1) {
			if (!($.core.arr.findout([undefined,null,''],o[i]).length)) {
				result.push(o[i]);
			}
		}
		return result;
	};
});

/**
 * Copy an array
 * @id STK.core.arr.copy
 * @alias STK.core.arr.copy
 * @param {Array} o
 * @return {Array} result
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var li1 = [1,2,3]
 * var li2 = STK.core.arr.copy(li1);
 * li2 === [1,2,3];
 * li2 !== li1;
 */
STK.register('core.arr.copy', function($){
	return function(o){
		if (!$.core.arr.isArray(o)) {
			throw 'the copy function needs an array as first parameter';
		}
		return o.slice(0);
	};
});

/**
 * Find out the index of items which confirm some rules.
 * @id STK.core.arr.hasby
 * @alias STK.core.arr.hasby
 * @param {Array} o
 * @param {Function} insp
 * @return {Array} k
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var li1 = ['a','b','c','ab']
 * var li2 = STK.core.arr.hasby(li1,function(v,i){return (v.indexOf('a') !== -1)});
 * li2 === [0,3]
 */

STK.register('core.arr.hasby', function($){
	return function(o, insp){
		if (!$.core.arr.isArray(o)) {
			throw 'the hasBy function needs an array as first parameter';
		}
		var k = [];
		for (var i = 0, len = o.length; i < len; i += 1) {
			if (insp(o[i], i)) {
				k.push(i);
			}
		}
		return k;
	};
});

/**
 * Make the items of Array unique
 * @id STK.core.arr.unique
 * @alias STK.core.arr.unique
 * @param {Array} o
 * @return {Array} result
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var li1 = ['a','b','c','a']
 * var li2 = STK.core.arr.unique(li1);
 * li2 === ['a','b','c']
 */
STK.register('core.arr.unique', function($) {
	return function(o) {
		if (!$.core.arr.isArray(o)) {
			throw 'the unique function needs an array as first parameter';
		}
		var result = [];
		for (var i = 0, len = o.length; i < len; i += 1) {
			if ($.core.arr.indexOf(o[i], result) === -1) {
				result.push(o[i]);
			}
		}
		return result;
	};
});

/**
 * Add a classname for an Element
 * @id STK.core.dom.addClassName
 * @alias STK.core.dom.addClassName
 * @param {Element} node
 * @param {String} className
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.addClassName($.E('test'),'classname1');
 */
/**
 * to decide whether Element A has an classname B
 * @id STK.core.dom.hasClassName
 * @alias STK.core.dom.hasClassName
 * @param {Element} node
 * @param {String} className
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.hasClassName($.E('test'),'classname1');
 */
STK.register('core.dom.hasClassName', function($){
	return function(node, className){
		return (new RegExp('\\b' + className + '\\b').test(node.className));
	};
});

STK.register('core.dom.addClassName', function($) {
	return function(node, className) {
		if(node.nodeType === 1){
			if (!$.core.dom.hasClassName(node,className)) {
				node.className += (' ' + className);
			}
		}
		
	};
});
/**
 * Add a htmlstring in an Element
 * @id STK.core.dom.addHTML
 * @alias STK.core.dom.addHTML
 * @param {Element} node
 * @param {String} html
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.addHTML($.E('test'),'<span>new HTML<span>');
 */
STK.register('core.dom.addHTML', function($){
	return function(node, html){
		if ($.IE) {
			node.insertAdjacentHTML("BeforeEnd", html);
		}
		else {
			var oRange = node.ownerDocument.createRange();
			oRange.setStartBefore(node);
			var oFrag = oRange.createContextualFragment(html);
			node.appendChild(oFrag);
		}
	};
});

/**
 * 自动把HTML分析成Dom节点,并返回相应的文档碎片跟带级联的节点列表
 * 不传入规则自动分析node-type属性,传入规则按照传入规则进行分析
 * @id STK.core.dom.builder
 * @alias STK.core.dom.builder
 * @param {String|Node} sHTML 需要被处理的HTML字符串 或者节点引用
 * @param {Object | Null} 参数
 * {
 * // dom对象, 选择器
 * 'input1': 'input[node-type=input1],textarea[node-type=input1]'
 * }
 * @return {Object} 文档碎片跟节点列表
 * {
 * 	'box': 文档碎片
 * 	'list': 节点列表,带级联
 * }
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * var sHTML = '' +
 * '<div node-type=div1>' +
 * '<input />' +
 * '<input />' +
 * '<input />' +
 * '<input />' +
 * '<input />' +
 * '<input />' +
 * '<input node-type="feed_item444444" />' +
 * '<input node-type="feed_item" />' +
 * '<textarea style="font-family: Tahoma,宋体;" range="1400" name="status" node-type="poster"></textarea>' +
 * '<ul>' +
 * '<li class="MIB_linedot_l" node-type ="feed_item" dynamic-id="2777763617"></li>' +
 * '<li class="MIB_linedot_l" node-type= "feed_ite43m" dynamic-id="2777763617"></li>' +
 * '<li class="MIB_linedot_l" node-type=              "feed_1item" dynamic-id="2777763617"></li>' +
 * '<li class="MIB_linedot_l" node-type="feed_it2em" dynamic-id="2777763617"></li>' +
 * '<li class="MIB_linedot_l" node-type="feed_item" dynamic-id="2777763617"></li>' +
 * '<li class="MIB_linedot_l" anode-type="1111111111111111111" dynamic-id="2777763617"></li>' +
 * '</ul>' +
 * '</div>' +
 * '<input node-type="input13" />' +
 * '<h1 node-type="h1111" />asdfasdf</h1>';
 * var bd = $.core.dom.builder(sHTML);
 */
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 *  http://wiki.github.com/jeresig/sizzle/
 *
 */
STK.register('core.dom.sizzle', function($){
	var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, done = 0, toString = Object.prototype.toString, hasDuplicate = false, baseHasDuplicate = true;
	
	// Here we check if the JavaScript engine is using some sort of
	// optimization where it does not always call our comparision
	// function. If that is the case, discard the hasDuplicate value.
	//   Thus far that includes Google Chrome.
	[0, 0].sort(function(){
		baseHasDuplicate = false;
		return 0;
	});
	
	var Sizzle = function(selector, context, results, seed){
		results = results || [];
		context = context || document;
		
		var origContext = context;
		
		if (context.nodeType !== 1 && context.nodeType !== 9) {
			return [];
		}
		
		if (!selector || typeof selector !== "string") {
			return results;
		}
		
		var parts = [], m, set, checkSet, extra, prune = true, contextXML = Sizzle.isXML(context), soFar = selector, ret, cur, pop, i;
		
		// Reset the position of the chunker regexp (start from head)
		do {
			chunker.exec("");
			m = chunker.exec(soFar);
			
			if (m) {
				soFar = m[3];
				
				parts.push(m[1]);
				
				if (m[2]) {
					extra = m[3];
					break;
				}
			}
		}
		while (m);
		
		if (parts.length > 1 && origPOS.exec(selector)) {
			if (parts.length === 2 && Expr.relative[parts[0]]) {
				set = posProcess(parts[0] + parts[1], context);
			}
			else {
				set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
				
				while (parts.length) {
					selector = parts.shift();
					
					if (Expr.relative[selector]) {
						selector += parts.shift();
					}
					
					set = posProcess(selector, set);
				}
			}
		}
		else {
			// Take a shortcut and set the context if the root selector is an ID
			// (but not if it'll be faster if the inner selector is an ID)
			if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
			Expr.match.ID.test(parts[0]) &&
			!Expr.match.ID.test(parts[parts.length - 1])) {
				ret = Sizzle.find(parts.shift(), context, contextXML);
				context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
			}
			
			if (context) {
				ret = seed ? {
					expr: parts.pop(),
					set: makeArray(seed)
				} : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
				set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
				
				if (parts.length > 0) {
					checkSet = makeArray(set);
				}
				else {
					prune = false;
				}
				
				while (parts.length) {
					cur = parts.pop();
					pop = cur;
					
					if (!Expr.relative[cur]) {
						cur = "";
					}
					else {
						pop = parts.pop();
					}
					
					if (pop == null) {
						pop = context;
					}
					
					Expr.relative[cur](checkSet, pop, contextXML);
				}
			}
			else {
				checkSet = parts = [];
			}
		}
		
		if (!checkSet) {
			checkSet = set;
		}
		
		if (!checkSet) {
			Sizzle.error(cur || selector);
		}
		
		if (toString.call(checkSet) === "[object Array]") {
			if (!prune) {
				results.push.apply(results, checkSet);
			}
			else 
				if (context && context.nodeType === 1) {
					for (i = 0; checkSet[i] != null; i++) {
						if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
							results.push(set[i]);
						}
					}
				}
				else {
					for (i = 0; checkSet[i] != null; i++) {
						if (checkSet[i] && checkSet[i].nodeType === 1) {
							results.push(set[i]);
						}
					}
				}
		}
		else {
			makeArray(checkSet, results);
		}
		
		if (extra) {
			Sizzle(extra, origContext, results, seed);
			Sizzle.uniqueSort(results);
		}
		
		return results;
	};
	
	Sizzle.uniqueSort = function(results){
		if (sortOrder) {
			hasDuplicate = baseHasDuplicate;
			results.sort(sortOrder);
			
			if (hasDuplicate) {
				for (var i = 1; i < results.length; i++) {
					if (results[i] === results[i - 1]) {
						results.splice(i--, 1);
					}
				}
			}
		}
		
		return results;
	};
	
	Sizzle.matches = function(expr, set){
		return Sizzle(expr, null, null, set);
	};
	
	Sizzle.find = function(expr, context, isXML){
		var set;
		
		if (!expr) {
			return [];
		}
		
		for (var i = 0, l = Expr.order.length; i < l; i++) {
			var type = Expr.order[i], match;
			
			if ((match = Expr.leftMatch[type].exec(expr))) {
				var left = match[1];
				match.splice(1, 1);
				
				if (left.substr(left.length - 1) !== "\\") {
					match[1] = (match[1] || "").replace(/\\/g, "");
					set = Expr.find[type](match, context, isXML);
					if (set != null) {
						expr = expr.replace(Expr.match[type], "");
						break;
					}
				}
			}
		}
		
		if (!set) {
			set = context.getElementsByTagName("*");
		}
		
		return {
			set: set,
			expr: expr
		};
	};
	
	Sizzle.filter = function(expr, set, inplace, not){
		var old = expr, result = [], curLoop = set, match, anyFound, isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
		
		while (expr && set.length) {
			for (var type in Expr.filter) {
				if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
					var filter = Expr.filter[type], found, item, left = match[1];
					anyFound = false;
					
					match.splice(1, 1);
					
					if (left.substr(left.length - 1) === "\\") {
						continue;
					}
					
					if (curLoop === result) {
						result = [];
					}
					
					if (Expr.preFilter[type]) {
						match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
						
						if (!match) {
							anyFound = found = true;
						}
						else 
							if (match === true) {
								continue;
							}
					}
					
					if (match) {
						for (var i = 0; (item = curLoop[i]) != null; i++) {
							if (item) {
								found = filter(item, match, i, curLoop);
								var pass = not ^ !!found;
								
								if (inplace && found != null) {
									if (pass) {
										anyFound = true;
									}
									else {
										curLoop[i] = false;
									}
								}
								else 
									if (pass) {
										result.push(item);
										anyFound = true;
									}
							}
						}
					}
					
					if (found !== undefined) {
						if (!inplace) {
							curLoop = result;
						}
						
						expr = expr.replace(Expr.match[type], "");
						
						if (!anyFound) {
							return [];
						}
						
						break;
					}
				}
			}
			
			// Improper expression
			if (expr === old) {
				if (anyFound == null) {
					Sizzle.error(expr);
				}
				else {
					break;
				}
			}
			
			old = expr;
		}
		
		return curLoop;
	};
	
	Sizzle.error = function(msg){
		throw "Syntax error, unrecognized expression: " + msg;
	};
	
	var Expr = {
		order: ["ID", "NAME", "TAG"],
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
		},
		leftMatch: {},
		attrMap: {
			"class": "className",
			"for": "htmlFor"
		},
		attrHandle: {
			href: function(elem){
				return elem.getAttribute("href");
			}
		},
		relative: {
			"+": function(checkSet, part){
				var isPartStr = typeof part === "string", isTag = isPartStr && !/\W/.test(part), isPartStrNotTag = isPartStr && !isTag;
				
				if (isTag) {
					part = part.toLowerCase();
				}
				
				for (var i = 0, l = checkSet.length, elem; i < l; i++) {
					if ((elem = checkSet[i])) {
						while ((elem = elem.previousSibling) && elem.nodeType !== 1) {
						}
						
						checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
					}
				}
				
				if (isPartStrNotTag) {
					Sizzle.filter(part, checkSet, true);
				}
			},
			">": function(checkSet, part){
				var isPartStr = typeof part === "string", elem, i = 0, l = checkSet.length;
				
				if (isPartStr && !/\W/.test(part)) {
					part = part.toLowerCase();
					
					for (; i < l; i++) {
						elem = checkSet[i];
						if (elem) {
							var parent = elem.parentNode;
							checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
						}
					}
				}
				else {
					for (; i < l; i++) {
						elem = checkSet[i];
						if (elem) {
							checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
						}
					}
					
					if (isPartStr) {
						Sizzle.filter(part, checkSet, true);
					}
				}
			},
			"": function(checkSet, part, isXML){
				var doneName = done++, checkFn = dirCheck, nodeCheck;
				
				if (typeof part === "string" && !/\W/.test(part)) {
					part = part.toLowerCase();
					nodeCheck = part;
					checkFn = dirNodeCheck;
				}
				
				checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
			},
			"~": function(checkSet, part, isXML){
				var doneName = done++, checkFn = dirCheck, nodeCheck;
				
				if (typeof part === "string" && !/\W/.test(part)) {
					part = part.toLowerCase();
					nodeCheck = part;
					checkFn = dirNodeCheck;
				}
				
				checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
			}
		},
		find: {
			ID: function(match, context, isXML){
				if (typeof context.getElementById !== "undefined" && !isXML) {
					var m = context.getElementById(match[1]);
					return m ? [m] : [];
				}
			},
			NAME: function(match, context){
				if (typeof context.getElementsByName !== "undefined") {
					var ret = [], results = context.getElementsByName(match[1]);
					
					for (var i = 0, l = results.length; i < l; i++) {
						if (results[i].getAttribute("name") === match[1]) {
							ret.push(results[i]);
						}
					}
					
					return ret.length === 0 ? null : ret;
				}
			},
			TAG: function(match, context){
				return context.getElementsByTagName(match[1]);
			}
		},
		preFilter: {
			CLASS: function(match, curLoop, inplace, result, not, isXML){
				match = " " + match[1].replace(/\\/g, "") + " ";
				
				if (isXML) {
					return match;
				}
				
				for (var i = 0, elem; (elem = curLoop[i]) != null; i++) {
					if (elem) {
						if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0)) {
							if (!inplace) {
								result.push(elem);
							}
						}
						else 
							if (inplace) {
								curLoop[i] = false;
							}
					}
				}
				
				return false;
			},
			ID: function(match){
				return match[1].replace(/\\/g, "");
			},
			TAG: function(match, curLoop){
				return match[1].toLowerCase();
			},
			CHILD: function(match){
				if (match[1] === "nth") {
					// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
					var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test(match[2]) && "0n+" + match[2] ||
					match[2]);
					
					// calculate the numbers (first)n+(last) including if they are negative
					match[2] = (test[1] + (test[2] || 1)) - 0;
					match[3] = test[3] - 0;
				}
				
				// TODO: Move to normal caching system
				match[0] = done++;
				
				return match;
			},
			ATTR: function(match, curLoop, inplace, result, not, isXML){
				var name = match[1].replace(/\\/g, "");
				
				if (!isXML && Expr.attrMap[name]) {
					match[1] = Expr.attrMap[name];
				}
				
				if (match[2] === "~=") {
					match[4] = " " + match[4] + " ";
				}
				
				return match;
			},
			PSEUDO: function(match, curLoop, inplace, result, not){
				if (match[1] === "not") {
					// If we're dealing with a complex expression, or a simple one
					if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
						match[3] = Sizzle(match[3], null, null, curLoop);
					}
					else {
						var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
						if (!inplace) {
							result.push.apply(result, ret);
						}
						return false;
					}
				}
				else 
					if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
						return true;
					}
				
				return match;
			},
			POS: function(match){
				match.unshift(true);
				return match;
			}
		},
		filters: {
			enabled: function(elem){
				return elem.disabled === false && elem.type !== "hidden";
			},
			disabled: function(elem){
				return elem.disabled === true;
			},
			checked: function(elem){
				return elem.checked === true;
			},
			selected: function(elem){
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				elem.parentNode.selectedIndex;
				return elem.selected === true;
			},
			parent: function(elem){
				return !!elem.firstChild;
			},
			empty: function(elem){
				return !elem.firstChild;
			},
			has: function(elem, i, match){
				return !!Sizzle(match[3], elem).length;
			},
			header: function(elem){
				return (/h\d/i).test(elem.nodeName);
			},
			text: function(elem){
				return "text" === elem.type;
			},
			radio: function(elem){
				return "radio" === elem.type;
			},
			checkbox: function(elem){
				return "checkbox" === elem.type;
			},
			file: function(elem){
				return "file" === elem.type;
			},
			password: function(elem){
				return "password" === elem.type;
			},
			submit: function(elem){
				return "submit" === elem.type;
			},
			image: function(elem){
				return "image" === elem.type;
			},
			reset: function(elem){
				return "reset" === elem.type;
			},
			button: function(elem){
				return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
			},
			input: function(elem){
				return (/input|select|textarea|button/i).test(elem.nodeName);
			}
		},
		setFilters: {
			first: function(elem, i){
				return i === 0;
			},
			last: function(elem, i, match, array){
				return i === array.length - 1;
			},
			even: function(elem, i){
				return i % 2 === 0;
			},
			odd: function(elem, i){
				return i % 2 === 1;
			},
			lt: function(elem, i, match){
				return i < match[3] - 0;
			},
			gt: function(elem, i, match){
				return i > match[3] - 0;
			},
			nth: function(elem, i, match){
				return match[3] - 0 === i;
			},
			eq: function(elem, i, match){
				return match[3] - 0 === i;
			}
		},
		filter: {
			PSEUDO: function(elem, match, i, array){
				var name = match[1], filter = Expr.filters[name];
				
				if (filter) {
					return filter(elem, i, match, array);
				}
				else 
					if (name === "contains") {
						return (elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0;
					}
					else 
						if (name === "not") {
							var not = match[3];
							
							for (var j = 0, l = not.length; j < l; j++) {
								if (not[j] === elem) {
									return false;
								}
							}
							
							return true;
						}
						else {
							Sizzle.error("Syntax error, unrecognized expression: " + name);
						}
			},
			CHILD: function(elem, match){
				var type = match[1], node = elem;
				switch (type) {
					case 'only':
					case 'first':
						while ((node = node.previousSibling)) {
							if (node.nodeType === 1) {
								return false;
							}
						}
						if (type === "first") {
							return true;
						}
						node = elem;
					case 'last':
						while ((node = node.nextSibling)) {
							if (node.nodeType === 1) {
								return false;
							}
						}
						return true;
					case 'nth':
						var first = match[2], last = match[3];
						
						if (first === 1 && last === 0) {
							return true;
						}
						
						var doneName = match[0], parent = elem.parentNode;
						
						if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
							var count = 0;
							for (node = parent.firstChild; node; node = node.nextSibling) {
								if (node.nodeType === 1) {
									node.nodeIndex = ++count;
								}
							}
							parent.sizcache = doneName;
						}
						
						var diff = elem.nodeIndex - last;
						if (first === 0) {
							return diff === 0;
						}
						else {
							return (diff % first === 0 && diff / first >= 0);
						}
				}
			},
			ID: function(elem, match){
				return elem.nodeType === 1 && elem.getAttribute("id") === match;
			},
			TAG: function(elem, match){
				return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
			},
			CLASS: function(elem, match){
				return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) >
				-1;
			},
			ATTR: function(elem, match){
				var name = match[1], result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name), value = result + "", type = match[2], check = match[4];
				
				return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
			},
			POS: function(elem, match, i, array){
				var name = match[2], filter = Expr.setFilters[name];
				
				if (filter) {
					return filter(elem, i, match, array);
				}
			}
		}
	};
	Sizzle.selectors = Expr;
	
	var origPOS = Expr.match.POS, fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};
	
	for (var type in Expr.match) {
		Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
		Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
	}
	
	var makeArray = function(array, results){
		array = Array.prototype.slice.call(array, 0);
		
		if (results) {
			results.push.apply(results, array);
			return results;
		}
		
		return array;
	};
	
	// Perform a simple check to determine if the browser is capable of
	// converting a NodeList to an array using builtin methods.
	// Also verifies that the returned array holds DOM nodes
	// (which is not the case in the Blackberry browser)
	try {
		Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
		
		// Provide a fallback method if it does not work
	} 
	catch (e) {
		makeArray = function(array, results){
			var ret = results || [], i = 0;
			
			if (toString.call(array) === "[object Array]") {
				Array.prototype.push.apply(ret, array);
			}
			else {
				if (typeof array.length === "number") {
					for (var l = array.length; i < l; i++) {
						ret.push(array[i]);
					}
				}
				else {
					for (; array[i]; i++) {
						ret.push(array[i]);
					}
				}
			}
			
			return ret;
		};
	}
	
	var sortOrder;
	
	if (document.documentElement.compareDocumentPosition) {
		sortOrder = function(a, b){
			if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
				if (a == b) {
					hasDuplicate = true;
				}
				return a.compareDocumentPosition ? -1 : 1;
			}
			
			var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
			if (ret === 0) {
				hasDuplicate = true;
			}
			return ret;
		};
	}
	else 
		if ("sourceIndex" in document.documentElement) {
			sortOrder = function(a, b){
				if (!a.sourceIndex || !b.sourceIndex) {
					if (a == b) {
						hasDuplicate = true;
					}
					return a.sourceIndex ? -1 : 1;
				}
				
				var ret = a.sourceIndex - b.sourceIndex;
				if (ret === 0) {
					hasDuplicate = true;
				}
				return ret;
			};
		}
		else 
			if (document.createRange) {
				sortOrder = function(a, b){
					if (!a.ownerDocument || !b.ownerDocument) {
						if (a == b) {
							hasDuplicate = true;
						}
						return a.ownerDocument ? -1 : 1;
					}
					
					var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
					aRange.setStart(a, 0);
					aRange.setEnd(a, 0);
					bRange.setStart(b, 0);
					bRange.setEnd(b, 0);
					var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
					if (ret === 0) {
						hasDuplicate = true;
					}
					return ret;
				};
			}
	
	// Utility function for retreiving the text value of an array of DOM nodes
	Sizzle.getText = function(elems){
		var ret = "", elem;
		
		for (var i = 0; elems[i]; i++) {
			elem = elems[i];
			
			// Get the text from text nodes and CDATA nodes
			if (elem.nodeType === 3 || elem.nodeType === 4) {
				ret += elem.nodeValue;
				
				// Traverse everything else, except comment nodes
			}
			else 
				if (elem.nodeType !== 8) {
					ret += Sizzle.getText(elem.childNodes);
				}
		}
		
		return ret;
	};
	
	// Check to see if the browser returns elements by name when
	// querying by getElementById (and provide a workaround)
	(function(){
		// We're going to inject a fake input element with a specified name
		var form = document.createElement("div"), id = "script" + (new Date()).getTime();
		form.innerHTML = "<a name='" + id + "'/>";
		
		// Inject it into the root element, check its status, and remove it quickly
		var root = document.documentElement;
		root.insertBefore(form, root.firstChild);
		
		// The workaround has to do additional checks after a getElementById
		// Which slows things down for other browsers (hence the branching)
		if (document.getElementById(id)) {
			Expr.find.ID = function(match, context, isXML){
				if (typeof context.getElementById !== "undefined" && !isXML) {
					var m = context.getElementById(match[1]);
					return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
				}
			};
			
			Expr.filter.ID = function(elem, match){
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return elem.nodeType === 1 && node && node.nodeValue === match;
			};
		}
		
		root.removeChild(form);
		root = form = null; // release memory in IE
	})();
	
	(function(){
		// Check to see if the browser returns only elements
		// when doing getElementsByTagName("*")
		
		// Create a fake element
		var div = document.createElement("div");
		div.appendChild(document.createComment(""));
		
		// Make sure no comments are found
		if (div.getElementsByTagName("*").length > 0) {
			Expr.find.TAG = function(match, context){
				var results = context.getElementsByTagName(match[1]);
				
				// Filter out possible comments
				if (match[1] === "*") {
					var tmp = [];
					
					for (var i = 0; results[i]; i++) {
						if (results[i].nodeType === 1) {
							tmp.push(results[i]);
						}
					}
					
					results = tmp;
				}
				
				return results;
			};
		}
		
		// Check to see if an attribute returns normalized href attributes
		div.innerHTML = "<a href='#'></a>";
		if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
		div.firstChild.getAttribute("href") !== "#") {
			Expr.attrHandle.href = function(elem){
				return elem.getAttribute("href", 2);
			};
		}
		
		div = null; // release memory in IE
	})();
	
	if (document.querySelectorAll) {
		(function(){
			var oldSizzle = Sizzle, div = document.createElement("div");
			div.innerHTML = "<p class='TEST'></p>";
			
			// Safari can't handle uppercase or unicode characters when
			// in quirks mode.
			if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
				return;
			}
			Sizzle = function(query, context, extra, seed){
				context = context || document;
				
				// Only use querySelectorAll on non-XML documents
				// (ID selectors don't work in non-HTML documents)
				if (!seed && context.nodeType === 9 && !Sizzle.isXML(context)) {
					try {
						return makeArray(context.querySelectorAll(query), extra);
					} 
					catch (e) {
					}
				}
				
				return oldSizzle(query, context, extra, seed);
			};
			
			for (var prop in oldSizzle) {
				Sizzle[prop] = oldSizzle[prop];
			}
			
			div = null; // release memory in IE
		})();
	}
	
	(function(){
		var div = document.createElement("div");
		
		div.innerHTML = "<div class='test e'></div><div class='test'></div>";
		
		// Opera can't find a second classname (in 9.6)
		// Also, make sure that getElementsByClassName actually exists
		if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
			return;
		}
		
		// Safari caches class attributes, doesn't catch changes (in 3.2)
		div.lastChild.className = "e";
		
		if (div.getElementsByClassName("e").length === 1) {
			return;
		}
		
		Expr.order.splice(1, 0, "CLASS");
		Expr.find.CLASS = function(match, context, isXML){
			if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
				return context.getElementsByClassName(match[1]);
			}
		};
		
		div = null; // release memory in IE
	})();
	
	function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML){
		for (var i = 0, l = checkSet.length; i < l; i++) {
			var elem = checkSet[i];
			if (elem) {
				elem = elem[dir];
				var match = false;
				
				while (elem) {
					if (elem.sizcache === doneName) {
						match = checkSet[elem.sizset];
						break;
					}
					
					if (elem.nodeType === 1 && !isXML) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					
					if (elem.nodeName.toLowerCase() === cur) {
						match = elem;
						break;
					}
					
					elem = elem[dir];
				}
				
				checkSet[i] = match;
			}
		}
	}
	
	function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML){
		for (var i = 0, l = checkSet.length; i < l; i++) {
			var elem = checkSet[i];
			if (elem) {
				elem = elem[dir];
				var match = false;
				
				while (elem) {
					if (elem.sizcache === doneName) {
						match = checkSet[elem.sizset];
						break;
					}
					
					if (elem.nodeType === 1) {
						if (!isXML) {
							elem.sizcache = doneName;
							elem.sizset = i;
						}
						if (typeof cur !== "string") {
							if (elem === cur) {
								match = true;
								break;
							}
							
						}
						else 
							if (Sizzle.filter(cur, [elem]).length > 0) {
								match = elem;
								break;
							}
					}
					
					elem = elem[dir];
				}
				
				checkSet[i] = match;
			}
		}
	}
	
	Sizzle.contains = document.compareDocumentPosition ? function(a, b){
		return !!(a.compareDocumentPosition(b) & 16);
	}
 : function(a, b){
		return a !== b && (a.contains ? a.contains(b) : true);
	};
	
	Sizzle.isXML = function(elem){
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833) 
		var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	var posProcess = function(selector, context){
		var tmpSet = [], later = "", match, root = context.nodeType ? [context] : context;
		
		// Position selectors must be done after the filter
		// And so must :not(positional) so we move all PSEUDOs to the end
		while ((match = Expr.match.PSEUDO.exec(selector))) {
			later += match[0];
			selector = selector.replace(Expr.match.PSEUDO, "");
		}
		
		selector = Expr.relative[selector] ? selector + "*" : selector;
		
		for (var i = 0, l = root.length; i < l; i++) {
			Sizzle(selector, root[i], tmpSet);
		}
		
		return Sizzle.filter(later, tmpSet);
	};
	return Sizzle;
});


STK.register('core.dom.builder', function($){
	function autoDeploy(sHTML, oSelector){
		// 如果有传入的选择器,使用传入的选择器,而不仅仅使用内置的node-type这样的选择方式
		if (oSelector) {
			return oSelector;
		}
		// 匹配'<input node-type='input1' />中的
		// input跟input1
		var result, re = /\<(\w+)[^>]*\s+node-type\s*=\s*([\'\"])?(\w+)\2.*?>/g;
		var selectorList = {};
		var node, tag, selector;
		// 遍历所有符合条件的
		while ((result = re.exec(sHTML))) {
			tag = result[1];
			node = result[3];
			selector = tag + '[node-type=' + node + ']';
			selectorList[node] = selectorList[node] == null ? [] : selectorList[node];
			// 产生多条选择器
			if (!$.core.arr.inArray(selector, selectorList[node])) {
				selectorList[node].push(tag + '[node-type=' + node + ']');
			}
		}
		return selectorList;
	}
	return function(sHTML, oSelector){
		
		var _isHTML = $.core.func.getType(sHTML) == "string";
		// 自动配置
		var selectorList = autoDeploy( _isHTML ? sHTML : sHTML.innerHTML, oSelector);
		
		// 写入HTML
		var container = sHTML;
		
		if(_isHTML) {
			container = $.C('div');
			container.innerHTML = sHTML;
		}
		
		// 通过选择器产生domList
		// 默认产生的是数组,所以需要转化下
		
		// modify by Robin Young 
		// 用core.dom.sizzle.matches来提高性能.
		var key, domList, totalList;
		totalList = $.core.dom.sizzle('[node-type]', container);
		domList = {};
		for(key in selectorList){
			domList[key] = $.core.dom.sizzle.matches(selectorList[key].toString(), totalList);
		}
		//end modify
		
		
		// 把结果放入到文档碎片中
		var domBox = sHTML;
		
		if (_isHTML) {
			domBox = $.C('buffer');
			while (container.children[0]) {
				domBox.appendChild(container.children[0]);
			}
		}
		
		// 返回文档碎片跟节点列表
		return {
			'box': domBox,
			'list': domList
		};
	};
});

/**
 * return a cascaded object for on element
 * @id STK.core.dom.cascadeNode
 * @alias STK.core.dom.cascadeNode
 * @param {Element} node
 * @return {CascadedNode} that = {
		setStyle
		insertAfter
		insertBefore
		addClassName
		removeClassName
		trimNode
		removeNode
		on
		unon
		fire
		appendChild
		removeChild
		toggle
		show
		hide
		scrollTo
		replaceChild
		position
		getPosition
		setPosition
		html
		getHTML
		setHTML
		text
		getText
		setText
		get
		getStyle
		getOriginNode
		destroy
	}
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
	var cn = STK.core.dom.cascadeNode($.E('test'));
 */

/**
 * 对象继承函数
 * @id STK.core.obj.beget
 * @alias STK.core.obj.beget
 * @param {Object} o
 * @return {Object} result
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var obj = STK.core.obj.beget({'test':'test'});
 */
STK.register('core.obj.beget',function($){
	var F = function(){};
	return function(o){
		F.prototype = o;
		return new F();
	};
});
/**
 * set Elements style
 * @id STK.core.dom.setStyle
 * @alias STK.core.dom.setStyle
 * @param {Element} node
 * @param {String} property
 * @param {String} val
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.setStyle($.E('test'),'display','none');
 */
STK.register('core.dom.setStyle', function($){
	return function(node, property, val){
		if ($.IE) {
			switch (property) {
				case "opacity":
					node.style.filter = "alpha(opacity=" + (val * 100) + ")";
					if (!node.currentStyle || !node.currentStyle.hasLayout) {
						node.style.zoom = 1;
					}
					break;
				case "float":
					property = "styleFloat";
				default:
					node.style[property] = val;
			}
		}
		else {
			if (property == "float") {
				property = "cssFloat";
			}
			node.style[property] = val;
		}
	};
});

/**
 * insert after
 * @id STK.core.dom.insertAfter
 * @alias STK.core.dom.insertAfter
 * @param {Element} node
 * @param {Element} target
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.insertAfter($.E('test'),$.E('target'));
 */
STK.register('core.dom.insertAfter', function($){
	return function(node, target){
		var parent = target.parentNode;
		if (parent.lastChild == target) {
			parent.appendChild(node);
		}
		else {
			parent.insertBefore(node, target.nextSibling);
		}
	};
});

/**
 * insert before
 * @id STK.core.dom.insertBefore
 * @alias STK.core.dom.insertBefore
 * @param {Element} node
 * @param {Element} target
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.insertBefore($.E('test'),$.E('target'));
 */
STK.register('core.dom.insertBefore', function($){
	return function(node, target){
		var parent = target.parentNode;
		parent.insertBefore(node, target);
	};
});

/**
 * remove a classname for an Element
 * @id STK.core.dom.removeClassName
 * @alias STK.core.dom.removeClassName
 * @param {Element} node
 * @param {String} className
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.removeClassName($.E('test'),'classname1');
 */
STK.register('core.dom.removeClassName',function($){
	return function(node,className){
		if(node.nodeType === 1){
			if($.core.dom.hasClassName(node,className)){
				node.className = node.className.replace(new RegExp('\\b' + className + '\\b'),' ');
			}
		}
	};
});
/**
 * clear Element's children which is textNode
 * @id STK.core.dom.trimNode
 * @alias STK.core.dom.trimNode
 * @param {Element} node
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.trimNode($.E('test'));
 */
STK.register('core.dom.trimNode', function($){
	return function(node){
		var cn = node.childNodes;
		for (var i = 0; i < cn.length; i++) {
			if (cn[i].nodeType == 3 || cn[i].nodeType == 8) 
				node.removeChild(cn[i]);
		}
	};
});

/**
 * 返回指定ID或者DOM的节点句柄
 * @param {String | Element} node 节点ID或者节点的DOM
 * @example
 * var node = STK.E('input');
 * STK.core.dom.removeNode(node);
 */
STK.register('core.dom.removeNode', function($){
	return function(node){
		node = $.E(node) || node;
		try {
			node.parentNode.removeChild(node);
		} 
		catch (e) {
		}
	};
});

/**
 * Add event for a node
 * @id STK.core.evt.addEvent
 * @alias STK.core.evt.addEvent
 * @param {Node} sNode
 * @param {String} sEventType
 * @param {Function} oFunc
 * @return {Boolean} TRUE/FALSE
 * @author Robin Young | yonglin@staff.sina.com.cn
 *         FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * STK.core.evt.addEvent($.E('id'),'click',function(e){
 * 	console.log(e);
 * });
 */
STK.register('core.evt.addEvent', function($) {
    return function(sNode, sEventType, oFunc) {
        var oElement = $.E(sNode);
        if (oElement == null) {
            return false;
        }
        sEventType = sEventType || 'click';
        if ((typeof oFunc).toLowerCase() != "function") {
            return;
        }
        if (oElement.attachEvent) {
            oElement.attachEvent('on' + sEventType, oFunc);
        }
        else if (oElement.addEventListener) {
            oElement.addEventListener(sEventType, oFunc, false);
        }
        else {
            oElement['on' + sEventType] = oFunc;
        }
        return true;
    };
});

/**
 * Remove event for a node
 * @id STK.core.evt.removeEvent
 * @alias STK.core.evt.removeEvent
 * @param {Node} el
 * @param {Function} func
 * @param {String} evType
 * @param {Boolean} useCapture
 * @return {Boolean} TRUE/FALSE
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var hock= function(e){console.log(e);}
 * STK.core.evt.removeEvent($.E('id'), hock, 'click');
 */
STK.register('core.evt.removeEvent', function($) {
    return function(el, evType, func, useCapture) {
        var _el = $.E(el);
        if (_el == null) {
            return false;
        }
        if (typeof func != "function") {
            return false;
        }
        if (_el.removeEventListener) {
            _el.removeEventListener(evType, func, useCapture);
        } else if (_el.detachEvent) {
            _el.detachEvent("on" + evType, func);
        } else {
            _el['on' + evType] = null;
        }
        return true;
    };
});
/**
 * Fire a node's event
 * @id STK.core.evt.fireEvent
 * @alias STK.core.evt.fireEvent
 * @param {Node} el
 * @param {String} sEvent
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.evt.fireEvent($.E('id'),'click');
 */
STK.register('core.evt.fireEvent', function($){
	return function(el, sEvent){
		_el = $.E(el);
		if ($.IE) {
			_el.fireEvent('on' + sEvent);
		}
		else {
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent(sEvent, true, true);
			_el.dispatchEvent(evt);
		}
	};
});

/**
 * set Element position
 * @id STK.core.dom.setXY
 * @alias STK.core.dom.setXY
 * @param {Element} node
 * @param {Object} pos
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.setXY($.E('test'),{'t':100,'l':100});
 */

/**
 * get element's position
 * @id STK.core.dom.position
 * @alias STK.core.dom.position
 * @param {Element} node
 * @return {Object} {l:number,t:number}
 * @author Robin Young | yonglin@staff.sina.com.cn
 *         FlashSoft | fangchao@staff.sina.com.cn
 * @modify
 * 使用getXY替代,原因是考虑safari跟opera的元素,以及对于inline的处理
 * @example
 * STK.core.dom.position($.E('test')) == {l:100,t:100};
 */
/**
 * 获取滚动条的上下位置
 * @id STK.core.util.scrollPos
 * @alias STK.core.util.scrollPos
 * @param {Document} oDocument 可以指定文档，比如Ifm.docuemnt
 * @return {Object} {top:x,left:x}
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * var scrollPos = STK.core.util.scrollPos();
 * alert(scrollPos.top);// 距顶位置
 */
STK.register('core.util.scrollPos', function($){
	return function(oDocument) {
		oDocument = oDocument || document;
		var dd = oDocument.documentElement;
		var db = oDocument.body;
		return {
			top: Math.max(window.pageYOffset || 0, dd.scrollTop, db.scrollTop),
			left: Math.max(window.pageXOffset || 0, dd.scrollLeft, db.scrollLeft)
		};
	};
});
/**
 * browser test
 * @id STK.core.util.bLength
 * @alias STK.core.util.bLength
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.browser.IE = true;
 * STK.core.util.browser.MOZ = true;
 */
STK.register('core.util.browser', function($){
	var ua = navigator.userAgent.toLowerCase();
	var external = window.external || '';
	var core, m, extra, version, os;

	var numberify = function(s) {
		var c = 0;
		return parseFloat(s.replace(/\./g, function() {
			return (c++ == 1) ? '' : '.';
		}));
	};
	try{
        if ((/windows|win32/i).test(ua)) {
            os = 'windows';
        } else if ((/macintosh/i).test(ua)) {
            os = 'macintosh';
        } else if ((/rhino/i).test(ua)) {
            os = 'rhino';
        }

		if((m = ua.match(/applewebkit\/([^\s]*)/)) && m[1]){
			core = 'webkit';
			version = numberify(m[1]);
		}else if((m = ua.match(/presto\/([\d.]*)/)) && m[1]){
			core = 'presto';
			version = numberify(m[1]);
		}else if(m = ua.match(/msie\s([^;]*)/)){
			core = 'trident';
			version = 1.0;
			if ((m = ua.match(/trident\/([\d.]*)/)) && m[1]) {
				version = numberify(m[1]);
			}
		}else if(/gecko/.test(ua)){
			core = 'gecko';
			version = 1.0;
			if((m = ua.match(/rv:([\d.]*)/)) && m[1]){
				version = numberify(m[1]);
			}
		}

		if(/world/.test(ua)){
			extra = 'world';
		}else if(/360se/.test(ua)){
			extra = '360';
		}else if((/maxthon/.test(ua)) || typeof external.max_version == 'number'){
			extra = 'maxthon';
		}else if(/tencenttraveler\s([\d.]*)/.test(ua)){
			extra = 'tt';
		}else if(/se\s([\d.]*)/.test(ua)){
			extra = 'sogou';
		}
	}catch(e){}
	
	var ret = {
		'OS':os,
		'CORE':core,
		'Version':version,
		'EXTRA':(extra?extra:false),
		'IE': /msie/.test(ua),
		'OPERA': /opera/.test(ua),
		'MOZ': /gecko/.test(ua) && !/(compatible|webkit)/.test(ua),
		'IE5': /msie 5 /.test(ua),
		'IE55': /msie 5.5/.test(ua),
		'IE6': /msie 6/.test(ua),
		'IE7': /msie 7/.test(ua),
		'IE8': /msie 8/.test(ua),
		'IE9': /msie 9/.test(ua),
		'SAFARI': !/chrome\/([\d.]*)/.test(ua) && /\/([\d.]*) safari/.test(ua),
		'CHROME': /chrome\/([\d.]*)/.test(ua),
		'IPAD':/\(ipad/i.test(ua),
		'IPHONE':/\(iphone/i.test(ua),
		'ITOUCH':/\(itouch/i.test(ua),
		'MOBILE':/mobile/i.test(ua)
	};
	return ret;
});

STK.register('core.dom.position', function($){
	
	var generalPosition = function(el){
		var box, scroll, body, docElem, clientTop, clientLeft;
		box = el.getBoundingClientRect();
		scroll = $.core.util.scrollPos();
		body = el.ownerDocument.body;
		docElem = el.ownerDocument.documentElement;
		clientTop = docElem.clientTop || body.clientTop || 0;
		clientLeft = docElem.clientLeft || body.clientLeft || 0;
		return {
			l: parseInt(box.left + scroll['left']- clientLeft, 10) || 0,
			t: parseInt(box.top + scroll['top'] - clientTop, 10) || 0
		};
	};
	
	var countPosition = function(el, shell){
		var pos;
		pos = [el.offsetLeft, el.offsetTop];
		parent = el.offsetParent;
		if (parent !== el && parent !== shell) {
			while (parent) {
				pos[0] += parent.offsetLeft;
				pos[1] += parent.offsetTop;
				parent = parent.offsetParent;
			}
		}
		
		//解决特殊浏览器的问题，今后可删除
		if ($.core.util.browser.OPERA != -1 || ($.core.util.browser.SAFARI != -1 && el.style.position == 'absolute')) {
			pos[0] -= document.body.offsetLeft;
			pos[1] -= document.body.offsetTop;
		}
		if (el.parentNode) {
			parent = el.parentNode;
		}
		else {
			parent = null;
		}
		while (parent && !/^body|html$/i.test(parent.tagName) && parent !== shell) { // account for any scrolled ancestors
			if (parent.style.display.search(/^inline|table-row.*$/i)) {
				pos[0] -= parent.scrollLeft;
				pos[1] -= parent.scrollTop;
			}
			parent = parent.parentNode;
		}
		return {
			l: parseInt(pos[0], 10),
			t: parseInt(pos[1], 10)
		};
	};
	return function(oElement,spec){
		if (oElement == document.body) {
			return false;
		}
		if (oElement.parentNode == null) {
			return false;
		}
		if (oElement.style.display == 'none') {
			return false;
		}
		
		var conf = $.core.obj.parseParam({
			'parent' : null
		},spec);
	
		if (oElement.getBoundingClientRect) {// IE6+  FF3+ chrome9+ safari5+ opera11+
			if(conf.parent){
				var o = generalPosition(oElement);
				var p = generalPosition(conf.parent);
				return {
					'l' : o.l - p.l,
					't' : o.t - p.t
				};
			}else{
				return generalPosition(oElement);
			}
		}else { //old browser
			return countPosition(oElement, conf.parent || document.body);
		}
	};
});

STK.register('core.dom.setXY', function($){
	return function(node, pos){
		var pos_style = $.core.dom.getStyle(node, "position");
		if (pos_style == "static") {
			$.core.dom.setStyle(node, "position", "relative");
			pos_style = "relative";
		}
		var page_xy = $.core.dom.position(node);
		if (page_xy == false) {
			return;
		}
		var delta = {
			'l': parseInt($.core.dom.getStyle(node, "left"), 10),
			't': parseInt($.core.dom.getStyle(node, "top"), 10)
		};
		
		if (isNaN(delta['l'])) {
			delta['l'] = (pos_style == "relative") ? 0 : node.offsetLeft;
		}
		if (isNaN(delta['t'])) {
			delta['t'] = (pos_style == "relative") ? 0 : node.offsetTop;
		}
		
		if (pos['l'] != null) {
			node.style.left = pos['l'] - page_xy['l'] + delta['l'] + "px";
		}
		if (pos['t'] != null) {
			node.style.top = pos['t'] - page_xy['t'] + delta['t'] + "px";
		}
	};
});

/**
 * encode HTML
 * @id STK.core.str.encodeHTML
 * @alias STK.core.str.encodeHTML
 * @param {String} str
 * @return {String} str
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.str.encodeHTML('&<>" ') === '&amp;&lt;&gt;&quot;$nbsp;';
 */
STK.register('core.str.encodeHTML', function($){
	return function(str){
		// var div = document.createElement('div');
		// 		div.appendChild(document.createTextNode(str));
		// 		return div.innerHTML.replace(/\s/g, '&nbsp;').replace(/"/g, "&quot;");
		//	modify by Robin Young | yonglin@staff.sina.com.cn
		if(typeof str !== 'string'){
			throw 'encodeHTML need a string as parameter';
		}
		return str.replace(/\&/g,'&amp;').
			replace(/"/g,'&quot;').
			replace(/\</g,'&lt;').
			replace(/\>/g,'&gt;').
			replace(/\'/g,'&#39').
			replace(/\u00A0/g,'&nbsp;').
			replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g,'&#32');
	};
});

/**
 * decode HTML
 * @id STK.core.str.decodeHTML
 * @alias STK.core.str.decodeHTML
 * @param {String} str
 * @return {String} str
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.str.decodeHTML('&amp;&lt;&gt;&quot;$nbsp;') === '&<>" ';
 */
STK.register('core.str.decodeHTML', function($){
	return function(str){
		// var div = document.createElement('div');
		// 		div.innerHTML = str;
		// 		return div.innerText == undefined ? div.textContent : div.innerText;
		//	modify by Robin Young | yonglin@staff.sina.com.cn
		if(typeof str !== 'string'){
			throw 'decodeHTML need a string as parameter';
		}
		return str.replace(/&quot;/g,'"').
			replace(/&lt;/g,'<').
			replace(/&gt;/g,'>').
			replace(/&#39/g,'\'').
			replace(/&nbsp;/g,'\u00A0').
			replace(/&#32/g,'\u0020').
			replace(/&amp;/g,'\&');
	};
});

STK.register('core.dom.cascadeNode', function($){
	return function(node){
	
		var that = {};
		var display = node.style.display || '';
		display = (display === 'none' ? '' : display);
		
		var eventCache = [];
		
		//method of cascade
		that.setStyle = function(property, value){
			$.core.dom.setStyle(node, property, value);
			if (property === 'display') {
				display = (value === 'none' ? '' : value);
			}
			return that;
		};
		that.insertAfter = function(el){
			$.core.dom.insertAfter(el, node);
			return that;
		};
		that.insertBefore = function(el){
			$.core.dom.insertBefore(el, node);
			return that;
		};
		that.addClassName = function(cn){
			$.core.dom.addClassName(node, cn);
			return that;
		};
		that.removeClassName = function(cn){
			$.core.dom.removeClassName(node, cn);
			return that;
		};
		that.trimNode = function(){
			$.core.dom.trimNode(node);
			return that;
		};
		that.removeNode = function(){
			$.core.dom.removeNode(node);
			return that;
		};
		that.on = function(type, func){
			for(var i = 0, len = eventCache.length; i < len; i += 1){
				if(eventCache[i]['fn'] === func && eventCache[i]['type'] === type){
					return that;
				}
			}
			eventCache.push({'fn':func,'type':type});
			$.core.evt.addEvent(node, type, func);
			return that;
		};
		that.unon = function(type, func){
			for(var i = 0, len = eventCache.length; i < len; i += 1){
				if(eventCache[i]['fn'] === func && eventCache[i]['type'] === type){
					$.core.evt.removeEvent(node, func, type);
					eventCache.splice(i,1);
					break;
				}
			}
			return that;
		};
		that.fire = function(type){
			$.core.evt.fireEvent(type, node);
			return that;
		};
		that.appendChild = function(el){
			node.appendChild(el);
			return that;
		};
		that.removeChild = function(el){
			node.removeChild(el);
			return that;
		};
		that.toggle = function(){
			if (node.style.display === 'none') {
				node.style.display = display;
			}
			else {
				node.style.display = 'none';
			}
			return that;
		};
		that.show = function(){
			if (node.style.display === 'none') {
				if (display === 'none') {
					node.style.display = '';
				}
				else {
					node.style.display = display;
				}
			}
			return that;
		};
		that.hidd = function(){
			if (node.style.display !== 'none') {
				node.style.display = 'none';
			}
			return that;
		};
		that.hide = that.hidd;
		that.scrollTo = function(type, value){
			if (type === 'left') {
				node.scrollLeft = value;
			}
			if (type === 'top') {
				node.scrollTop = value;
			}
			return that;
		};
		that.replaceChild = function(newNode, oldNode){
			node.replaceChild(newNode, oldNode);
			return that;
		};
		
		
		//gands:get and set
		that.position = function(args){
			if (args !== undefined) {
				$.core.dom.setXY(node, args);
			}
			return $.core.dom.position(node);
		};
		
		that.setPosition = function(args){
			if (args !== undefined) {
				$.core.dom.setXY(node, args);
			}
			return that;
		};
		
		that.getPosition = function(args){
			return $.core.dom.position(node);
		};
		
		that.html = function(html){
			if (html !== undefined) {
				node.innerHTML = html;
			}
			return node.innerHTML;
		};
		
		that.setHTML = function(html){
			if (html !== undefined) {
				node.innerHTML = html;
			}
			return that;
		};
		
		that.getHTML = function(){
			return node.innerHTML;
		};
		
		that.text = function(text){
			if (text !== undefined) {
				node.innerHTML = $.core.str.encodeHTML(text);
			}
			return $.core.str.decodeHTML(node.innerHTML);
		};
		
		that.ttext = that.text;
		
		that.setText = function(text){
			if (text !== undefined) {
				node.innerHTML = $.core.str.encodeHTML(text);
			}
			return that;
		};
		
		that.getText = function(){
			return $.core.str.decodeHTML(node.innerHTML);
		};
		
		//getter
		that.get = function(key){
			if (key === 'node') {
				return node;
			}
			return $.core.dom.getStyle(node, key);
		};
		
		that.getStyle = function(key){
			return $.core.dom.getStyle(node, key);
		};
		
		that.getOriginNode = function(){
			return node;
		};
		
		that.destroy = function(){
			for(var i = 0, len = eventCache; i < len; i += 1){
				$.core.evt.removeEvent(node, eventCache[i]['fn'], eventCache[i]['type']);
			}
			display = null;
			eventCache = null;
			node = null;
		};
		return that;
	};
});

/**
 * to decide whether Element A contains Element B;
 * @id STK.core.dom.contains
 * @alias STK.core.dom.contains
 * @param {Element} parent
 * @param {Element} node
 * @return {Boolean} true/false
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.contains($.E('parent'),$.E('child')) === true;
 */
STK.register('core.dom.contains', function($) {
    return function(parent, node) {

        if (parent === node) {
            return false;

        } else if (parent.compareDocumentPosition) {
			return ((parent.compareDocumentPosition(node) & 16) === 16);

        } else if (parent.contains && node.nodeType === 1) {
			return   parent.contains(node);

        }else {
			while (node = node.parentNode) {
				if (parent === node){
					return true;
				}
			}
		}
        return false;
    };
});

/**
 * 获取dom的宽高
 * @id STK.core.dom.getSize
 * @params {Element} dom 被计算的dom节点
 * @return {Object} 
 * 		{
 * 			'width' : 0
 * 			'height' : 0
 * 		}
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example 
 */
/**
 * 页面统一隐藏容器工具
 * @id STK.core.util.hideContainer
 * @author Finrila | wangzheng4@staff.sina.com.cn
 * @example 
 * STK.core.util.hideContainer.appendChild(STK.E('test'));
 * STK.core.util.hideContainer.removeChild(STK.E('test'));
 * @import STK.core.dom.isNode
 */

STK.register('core.util.hideContainer', function($) {
	
	 var hideDiv;
	 
	 var initDiv = function() {
	 	if(hideDiv) return;
		hideDiv = $.C("div");
		hideDiv.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
		document.getElementsByTagName("head")[0].appendChild(hideDiv);
	 };
	 
	 var that = {
	 	/**
	 	 * 向隐藏容器添加节点
	 	 * @method appendChild
	 	 * @param {Element} el 节点
	 	 */
	 	appendChild: function(el) {
			if($.core.dom.isNode(el)) {
				initDiv();
				hideDiv.appendChild(el);
			}
		},
		/**
	 	 * 向隐藏容器添加节点
	 	 * @method removeChild
	 	 * @param {Element} el 节点
	 	 */
	 	removeChild: function(el) {
			if($.core.dom.isNode(el)) {
				hideDiv && hideDiv.removeChild(el);
			}
		}
	 };
	 
	 return that;
	 
});


STK.register('core.dom.getSize', function($){
	var size = function(dom){
		if(!$.core.dom.isNode(dom)){
			throw 'core.dom.getSize need Element as first parameter';
		}
		return {
			'width' : dom.offsetWidth,
			'height' : dom.offsetHeight
		};
	};
	/*
		为隐藏元素
	*/
	var getSize = function(dom){
		var ret = null;
		if (dom.style.display === 'none') {
			dom.style.visibility = 'hidden';
			dom.style.display = '';
			ret = size(dom);
			dom.style.display = 'none';
			dom.style.visibility = 'visible';
		}else {
			ret = size(dom);
		}
		return ret;
	};
	return function(dom){
		var ret = {};
		if(!dom.parentNode){
			$.core.util.hideContainer.appendChild(dom);
			ret = getSize(dom);
			$.core.util.hideContainer.removeChild(dom);
		}else{
			ret = getSize(dom);
		}
		return ret;
	};
});
/**
 * get input/textarea selection
 * @id STK.core.dom.getSelectText
 * @alias STK.core.dom.getSelectText
 * @param {Element} input
 * @return {Object} {'start':[Number],'len':[Number]}
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var area STK.core.dom.getSelectText($.E('input'));
 * //{'start':1,'len':3}
 */
STK.register('core.dom.textSelectArea', function($){
	return function(input){
		var ret = {
			'start' : 0,
			'len' : 0
		};
		if(typeof input.selectionStart === 'number'){
			ret.start = input.selectionStart;
			ret.len = input.selectionEnd - input.selectionStart;
		}else if(typeof document.selection !== undefined){
			var workRange = document.selection.createRange();
			//去他妈的IE6，傻逼浏览器，行为一直能死啊！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			if(input.tagName === 'INPUT'){
				var surveyRange = input.createTextRange();
			}else if(input.tagName === 'TEXTAREA'){
				var surveyRange = workRange.duplicate();
				surveyRange.moveToElementText(input);
			}
			//end fuck IE6
			surveyRange.setEndPoint('EndToStart', workRange);
			ret.start = surveyRange.text.length;
			ret.len = workRange.text.length;
			workRange = null;
			surveyRange = null;
		}
		return ret;
	};
});
/**
 * insert html
 * @id STK.core.dom.insertHTML
 * @alias STK.core.dom.insertHTML
 * @param {Element} node
 * @param {String} target
 * @param {String} where beforebegin/afterbegin/beforeend/afterend
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.insertHTML($.E('test'),'<div></div>','beforebegin');
 */
STK.register('core.dom.insertHTML', function($){
	return function(node, html, where){
		node = $.E(node) || document.body;
		where = where? where.toLowerCase(): "beforeend";
		if (node.insertAdjacentHTML) {
			switch (where) {
				case "beforebegin":
					node.insertAdjacentHTML('BeforeBegin', html);
					return node.previousSibling;
				case "afterbegin":
					node.insertAdjacentHTML('AfterBegin', html);
					return node.firstChild;
				case "beforeend":
					node.insertAdjacentHTML('BeforeEnd', html);
					return node.lastChild;
				case "afterend":
					node.insertAdjacentHTML('AfterEnd', html);
					return node.nextSibling;
			}
			throw 'Illegal insertion point -> "' + where + '"';
		}
		else {
			var range = node.ownerDocument.createRange();
			var frag;
			switch (where) {
				case "beforebegin":
					range.setStartBefore(node);
					frag = range.createContextualFragment(html);
					node.parentNode.insertBefore(frag, node);
					return node.previousSibling;
				case "afterbegin":
					if (node.firstChild) {
						range.setStartBefore(node.firstChild);
						frag = range.createContextualFragment(html);
						node.insertBefore(frag, node.firstChild);
						return node.firstChild;
					}
					else {
						node.innerHTML = html;
						return node.firstChild;
					}
					break;
				case "beforeend":
					if (node.lastChild) {
						range.setStartAfter(node.lastChild);
						frag = range.createContextualFragment(html);
						node.appendChild(frag);
						return node.lastChild;
					}
					else {
						node.innerHTML = html;
						return node.lastChild;
					}
					break;
				case "afterend":
					range.setStartAfter(node);
					frag = range.createContextualFragment(html);
					node.parentNode.insertBefore(frag, node.nextSibling);
					return node.nextSibling;
			}
			throw 'Illegal insertion point -> "' + where + '"';
		}
	};
});

/**
 * 在指定位置写入dom对象
 * 注意,使用此方法进行写入时,使用的是appendChild方法,所以不会存在两份dom元素
 * @id STK.core.dom.insertElement
 * @alias STK.core.dom.insertElement
 * @param {Element} node 
 * @param {Element} element 需要写入的节点
 * @param {String} where beforebegin/afterbegin/beforeend/afterend
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * STK.core.dom.insertElement($.E('test'),document.createElement('input'),'beforebegin');
 */
STK.register('core.dom.insertElement', function($){
	return function(node, element, where){
		node = $.E(node) || document.body;
		
		where = where ? where.toLowerCase() : "beforeend";
		switch (where) {
			case "beforebegin":
				node.parentNode.insertBefore(element, node);
				break;
			case "afterbegin":
				node.insertBefore(element, node.firstChild);
				break;
			case "beforeend":
				node.appendChild(element);
				break;
			case "afterend":
				if (node.nextSibling) {
					node.parentNode.insertBefore(element, node.nextSibling);
				}
				else {
					node.parentNode.appendChild(element);
				}
				break;
		}
	};
});

/**
 * next node
 * @id STK.core.dom.next
 * @alias STK.core.dom.next
 * @param {Element} node
 * @return {Element} node
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.next($.E('test')) == Element;
 */
STK.register('core.dom.next', function($){
	return function(node){
		var next = node.nextSibling;
		if (!next) {
			return null;
		}
		else 
			if (next.nodeType !== 1) {
				next = arguments.callee(next);
			}
		return next;
	};
});

/**
 * previous node
 * @id STK.core.dom.prev
 * @alias STK.core.dom.prev
 * @param {Element} node
 * @return {Element} node
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.prev($.E('test')) == Element;
 */
STK.register('core.dom.prev', function($){
	return function(node){
		var prev = node.previousSibling;
		if (!prev) 
			return null;
		else 
			if (prev.nodeType !== 1) {
				prev = arguments.callee(prev);
			}
		return prev;
	};
});

/**
 * replace one Element as other
 * @id STK.core.dom.replaceNode
 * @alias STK.core.dom.replaceNode
 * @param {Element} node
 * @param {Element} original
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.replaceNode($.C('div'),$.E('test'));
 */
STK.register('core.dom.replaceNode', function($){
	return function(node, original){
		if (node == null || original == null) {
			throw 'replaceNode need node as paramster';
		}
		original.parentNode.replaceChild(node, original);
	};
});

STK.register('core.dom.ready', function($){
	var funcList = [];
	var inited = false;
	var getType = $.core.func.getType;
	var browser = $.core.util.browser;
	var addEvent = $.core.evt.addEvent;
	
	var checkReady = function(){
		if(!inited){
			if(document.readyState === 'complete'){
				return true;
			}
		}
		return inited;
	};
	// 执行数组里的函数列表
	var execFuncList = function() {
		if (inited == true) {return;}
		inited = true;
		
		for (var i = 0, len = funcList.length; i < len; i++) {
			if (getType(funcList[i]) === 'function') {
				try{
					funcList[i].call();
				}catch(exp){
				
				}
			}
		}
		funcList = [];
	};
	
	
	var scrollMethod = function() {
		if(checkReady()){
			execFuncList();
			return;
		}
		try {
			document.documentElement.doScroll("left");
		}catch(e) {
			setTimeout(arguments.callee, 25);
			return;
		}
		execFuncList();
	};
	
	var readyStateMethod = function(){
		if(checkReady()){
			execFuncList();
			return;
		}
		setTimeout(arguments.callee, 25);
	};
	
	
	
	
	var domloadMethod = function() {
		addEvent(document, 'DOMContentLoaded', execFuncList);
	};
	var windowloadMethod = function(){
		addEvent(window, 'load', execFuncList);
	};
	
	if(!checkReady()){
		if($.IE && window === window.top){
			scrollMethod();
		}
		domloadMethod();
		readyStateMethod();
		windowloadMethod();
	}
	
	return function(oFunc) {// 如果已经DOMLoad了, 则直接调用
		if (checkReady()) {
			if (getType(oFunc) === 'function') {
				oFunc.call();
			}
		} else {// 如果还没有DOMLoad, 则把方法传入数组
			funcList.push(oFunc);
		}
	};
});

STK.register('core.dom.selector', function($) {
	var getDomList = function(selector, context, results, seed) {
		var res = [];
		if (typeof selector === 'string') {
			lis = $.core.dom.sizzle(selector,context,results,seed);
			for (var i = 0, len = lis.length; i < len; i += 1){
				res[i] = lis[i];
			}
		} else if ($.core.dom.isNode(selector)) {
			if (context) {
				if ($.core.dom.contains(context, selector)){
					res = [selector];
				}
			} else {
				res = [selector];
			}
			
		} else if ($.core.arr.isArray(selector)) {
			if (context) {
				for (var i = 0, len = selector.length; i < len; i += 1) {
					if ($.core.dom.contains(context, selector[i])) {
						res.push(selector[i]);
					}
				}
			} else {
				res = selector;
			}
		}
		return res;
	};
	return function(selector, context, results, seed){
		var that = getDomList.apply(window,arguments);
		that.on = function(etype,efun){
			for (var i = 0, len = that.length; i < len; i += 1) {
				$.core.evt.addEvent(that[i], etype, efun);
			}
			return that;
		};
		that.css = function(cssKey,cssValue){
			for (var i = 0, len = that.length; i < len; i += 1) {
				$.core.dom.setStyle(that[i], cssKey, cssValue);
			}
			return that;
		};
		that.show = function(){
			for (var i = 0, len = that.length; i < len; i += 1) {
				that[i].style.display = '';
			}
			return that;
		};
		that.hidd = function(){
			for (var i = 0, len = that.length; i < len; i += 1) {
				that[i].style.display = 'none';
			}
			return that;
		};
		that.hide = that.hidd;
		return that;
	};
	
});
/**
 * set input/textarea selection
 * @id STK.core.dom.selectText
 * @alias STK.core.dom.selectText
 * @param {Element} input
 * @param {Object} {'start':[Number],'len':[Number]}
 * @return {void} 
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.dom.selectText($.E('input'),{'start':1,'len':3});
 */
STK.register('core.dom.selectText', function(){
	return function(input,area){
		var start = area.start;
		var len = area.len || 0;
		input.focus();
		if(input.setSelectionRange){
			input.setSelectionRange(start,start + len);
		}else if(input.createTextRange){
			var range = input.createTextRange();
			range.collapse(1);
			range.moveStart('character', start);
			range.moveEnd('character', len);
			range.select();
		}
	};
});
/**
 * set Elements style
 * @id STK.core.dom.setStyles
 * @alias STK.core.dom.setStyles
 * @param {array} node
 * @param {String} property
 * @param {String} val
 * @author WK | wukan@staff.sina.com.cn
 * @example
 * STK.core.dom.setStyles(nodesArray,'display','none');
 */
STK.register('core.dom.setStyles', function($){
	return function(nodes, property, val){
		if(!$.core.arr.isArray(nodes))
			var nodes = [nodes];
		for(i=0,l=nodes.length;i<l;i++){
			$.core.dom.setStyle(nodes[i],property,val);
		}
		return nodes;
	};
});

/**
 * 返回node的唯一编号 
 * @id STK.core.dom.unipueID
 * @param {Element} node
 * @return {String} uniqueString
 * @author Finrila | wangzheng4@staff.sina.com.cn
 * @example
 * STK.core.dom.uniqueID($.E('test'));
 * 
 * @import STK.core.util.getUniqueKey
 */
/**
 * Get unique key
 * @id STK.core.util.getUniqueKey
 * @alias STK.core.util.getUniqueKey
 * @return {Number} n
 * @author Robin Young | yonglin@staff.sina.com.cn
 *		Finrila | wangzheng4@staff.sina.com.cn
 * @example
 * STK.core.util.getUniqueKey('') === '141281425000671';
 * @history
 * 2010.12.03 Finrila 修改随机数获取方式，解决性能问题以及不唯一的情况
 */
STK.register('core.util.getUniqueKey', function($) {
	var _loadTime = (new Date()).getTime().toString(), _i = 1;
	return function() {
		return _loadTime + (_i++);
	};
});

STK.register('core.dom.uniqueID', function($){
	return function(node) {
		return node && (node.uniqueID || (node.uniqueID = $.core.util.getUniqueKey()));
	};
});


/**
 * 自定义对象事件 注意：使用属性  __custEventKey__ 污染自定义对象
 * 事件添加或绑定前应该先定义事件，定义事件方法为 custEvent.define(obj, type)
 * 约定：事件处理函数的第一个参数为event对象其结构为：
 * 	{
 * 		type:"click",//{String}绑定时的自定义事件类型
 * 		data:{}//{Any}绑定时的扩展属性 可以是任意类型
 *  }
 * @id STK.core.evt.custEvent
 * @author Finrila|wangzheng4@staff.sina.com.cn
 * @version 1.0
 * @example
 * var a = {};
 * var f = function(event) {
 * 	console.log(event.data);
 * 	console.log(event.type);
 * 	console.log(arguments[1]);
 * };
 * STK.core.evt.custEvent.define(a, "click");
 * STK.core.evt.custEvent.add(a, "click", f,{aaa:0});
 * STK.core.evt.custEvent.fire(a, "click", 5);
 * STK.core.evt.custEvent.fire(a, "click", 33);
 * STK.core.evt.custEvent.remove(a, "click", f);
 * STK.core.evt.custEvent.fire(a, "click", 22);
 * STK.core.evt.custEvent.remove(a, "click");
 * STK.core.evt.custEvent.remove(a);
 * STK.core.evt.custEvent.undefine(a, "click");
 * STK.core.evt.custEvent.undefine(a);
 * @import STK.core.arr.isArray
 */

STK.register("core.evt.custEvent", function($) {
	
	var _custAttr = "__custEventKey__",
		_custKey = 1,
		_custCache = {},
		/**
		 * 从缓存中查找相关对象 
		 * 当已经定义时 
		 * 	有type时返回缓存中的列表 没有时返回缓存中的对象
		 * 没有定义时返回false
		 * @param {Object|number} obj 对象引用或获取的key
		 * @param {String} type 自定义事件名称
		 */
		_findObj = function(obj, type) {
			var _key = (typeof obj == "number") ? obj : obj[_custAttr];
			return (_key && _custCache[_key]) && {
				obj: (typeof type == "string" ? _custCache[_key][type] : _custCache[_key]),
				key: _key
			};
		};
		
	return {
		/**
		 * 对象自定义事件的定义 未定义的事件不得绑定
		 * @method define
		 * @static
		 * @param {Object|number} obj 对象引用或获取的下标(key); 必选 
		 * @param {String|Array} type 自定义事件名称; 必选
		 * @return {number} key 下标
		 */
		define: function(obj, type) {
			if(obj && type) {
				var _key = (typeof obj == "number") ? obj : obj[_custAttr] || (obj[_custAttr] = _custKey++),
					_cache = _custCache[_key] || (_custCache[_key] = {});
				type = [].concat(type);
				for(var i = 0; i < type.length; i++) {
					_cache[type[i]] || (_cache[type[i]] = []);
				}
				return _key;
			}
		},
		
		/**
		 * 对象自定义事件的取消定义 
		 * 当对象的所有事件定义都被取消时 删除对对象的引用
		 * @method define
		 * @static
		 * @param {Object|number} obj 对象引用或获取的(key); 必选
		 * @param {String} type 自定义事件名称; 可选 不填可取消所有事件的定义
		 */
		undefine: function(obj, type) {
			if (obj) {
				var _key = (typeof obj == "number") ? obj : obj[_custAttr];
				if (_key && _custCache[_key]) {
					if (type) {
						type = [].concat(type);
						for(var i = 0; i < type.length; i++) {
							if (type[i] in _custCache[_key]) delete _custCache[_key][type[i]];
						}
					} else {
						delete _custCache[_key];
					}
				}
			}
		},
		
		/**
		 * 事件添加或绑定
		 * @method add
		 * @static
		 * @param {Object|number} obj 对象引用或获取的(key); 必选
		 * @param {String} type 自定义事件名称; 必选
		 * @param {Function} fn 事件处理方法; 必选
		 * @param {Any} data 扩展数据任意类型; 可选
		 * @return {number} key 下标
		 */
		add: function(obj, type, fn, data) {
			if(obj && typeof type == "string" && fn) {
				var _cache = _findObj(obj, type);
				if(!_cache || !_cache.obj) {
					throw "custEvent (" + type + ") is undefined !";
				}
				_cache.obj.push({fn: fn, data: data});
				return _cache.key;
			}
		},
		
		once: function(obj, type, fn, data) {
			if(obj && typeof type == "string" && fn) {
				var _cache = _findObj(obj, type);
				if(!_cache || !_cache.obj) {
					throw "custEvent (" + type + ") is undefined !";
				}
				_cache.obj.push({fn: fn, data: data, once:true});
				return _cache.key;
			}
		},
		/**
		 * 事件删除或解绑
		 * @method remove
		 * @static
		 * @param {Object|number} obj 对象引用或获取的(key); 必选
		 * @param {String} type 自定义事件名称; 可选; 为空时删除对象下的所有事件绑定
		 * @param {Function} fn 事件处理方法; 可选; 为空且type不为空时 删除对象下type事件相关的所有处理方法
		 * @return {number} key 下标
		 */
		remove: function(obj, type, fn) {
			if (obj) {
				var _cache = _findObj(obj, type), _obj, index;
				if (_cache && (_obj = _cache.obj)) {
					if ($.core.arr.isArray(_obj)) {
						if (fn) {
							//for (var i = 0; i < _obj.length && _obj[i].fn !== fn; i++);
							var i = 0;
							while(_obj[i]) {
								if(_obj[i].fn === fn) {
									break;
								}
								i++;
							}
							_obj.splice(i, 1);
						} else {
							_obj.splice(0, _obj.length);
						}
					} else {
						for (var i in _obj) {
							_obj[i] = [];
						}
					}
					return _cache.key;
				}
			}
		},
		
		/**
		 * 事件触发
		 * @method fire
		 * @static
		 * @param {Object|number} obj 对象引用或获取的(key); 必选
		 * @param {String} type 自定义事件名称; 必选
		 * @param {Any|Array} args 参数数组或单个的其他数据; 可选
		 * @return {number} key 下标
		 */
		fire: function(obj, type, args) {
			if(obj && typeof type == "string") {
				var _cache = _findObj(obj, type), _obj;
				if (_cache && (_obj = _cache.obj)) {
					if(!$.core.arr.isArray(args)) {
						args = args != undefined ? [args] : [];
					}
					for(var i = _obj.length - 1; i > -1 && _obj[i]; i--) {
						var fn = _obj[i].fn;
						var isOnce = _obj[i].once;
						if(fn && fn.apply) {
							//try{
								fn.apply(obj, [{type: type, data: _obj[i].data}].concat(args));
								if(isOnce){
									_obj.splice(i,1);
								}

							//} catch(e) {
								//$.log("[error][custEvent]" + e.message);
							//}

						}
					}
					return _cache.key;
				}
			}
		},
		/**
		 * 销毁
		 * @method destroy
		 * @static
		 */
		destroy: function() {
			_custCache = {};
			_custKey = 1;
		}
	};
});

/**
 * 通过冒泡的方式做的事件代理对象
 * 
 * @id STK.core.evt.delegatedEvent
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @version 1.0
 * @import STK.core.dom.isNode
 * @import STK.core.dom.contains
 * @import STK.evt.addEvent
 * @import STK.evt.fixEvent
 * @param {Element} actEl
 * @param {Array} expEls
 * @return {delegatedEvent Object}
 * 	{
 * 		add : function,
 * 		remove : function
 * 		pushExcept : function
 * 		destory : function
 * 	}
 */
/**
 * query to json
 * @id STK.core.json.queryToJson
 * @alias STK.core.json.queryToJson
 * @param {Json} JSON
 * @param {Boolean} isEncode
 * @return {String} querystring
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var q1 = 'a=1&b=2&c=3';
 * STK.core.json.queryToJson(q1) === {'a':1,'b':2,'c':3};
 */
/**
 * trim
 * @id STK.core.str.trim
 * @alias STK.core.str.trim
 * @param {String} str
 * @return {String} str
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * STK.core.str.trim(' stk ') === 'stk';
 */
STK.register('core.str.trim', function($){
	return function(str){
		if(typeof str !== 'string'){
			throw 'trim need a string as parameter';
		}
		var len = str.length;
		var s = 0;
		var reg = /(\u3000|\s|\t|\u00A0)/;
		
		while(s < len){
			if(!reg.test(str.charAt(s))){
				break;
			}
			s += 1;
		}
		while(len > s){
			if(!reg.test(str.charAt(len - 1))){
				break;
			}
			len -= 1;
		}
		return str.slice(s, len);
		// if(typeof str.trim === 'function'){
		// 	return str.trim();
		// }else{
			// return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, '');
		// }
		
	};
});

STK.register('core.json.queryToJson',function($){
	return function(QS, isDecode){
		var _Qlist = $.core.str.trim(QS).split("&");
		var _json  = {};
		var _fData = function(data){
			if(isDecode){
				return decodeURIComponent(data);
			}else{
				return data;
			}
		};
		for(var i = 0, len = _Qlist.length; i < len; i++){
			if(_Qlist[i]){
				var _hsh = _Qlist[i].split("=");
				var _key = _hsh[0];
				var _value = _hsh[1];
				
				// 如果只有key没有value, 那么将全部丢入一个$nullName数组中
				if(_hsh.length < 2){
					_value = _key;
					_key = '$nullName';
				}
				// 如果缓存堆栈中没有这个数据
				if(!_json[_key]) {
					_json[_key] = _fData(_value);
				}
				// 如果堆栈中已经存在这个数据，则转换成数组存储
				else {
					if($.core.arr.isArray(_json[_key]) != true) {
						_json[_key] = [_json[_key]];
					}
					_json[_key].push(_fData(_value));
				}
			}
		}
		return _json;
	};
});
/**
 * Fix the difference of event in each browser
 * @id STK.core.evt.fixEvent
 * @alias STK.core.evt.fixEvent
 * @param {Event} e
 * @return {Event} e
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var ev = STK.core.evt.fixEvent(window.event);
 */
/**
 * Get event object
 * @id STK.core.evt.getEvent
 * @alias STK.core.evt.getEvent
 * @return {Event} e
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var ev = STK.core.evt.getEvent();
 */
STK.register('core.evt.getEvent', function($){
	return function(){
		if ($.IE) {
			return window.event;
		}
		else {
			if (window.event){
				return window.event;
			}
			var o = arguments.callee.caller;
			var e;
			var n = 0;
			while (o != null && n < 40) {
				e = o.arguments[0];
				if (e && (e.constructor == Event || e.constructor == MouseEvent || e.constructor == KeyboardEvent)) {
					return e;
				}
				n++;
				o = o.caller;
			}
			return e;
		}
	};
});

STK.register('core.evt.fixEvent', function($){
	return function(e){
		e = e || $.core.evt.getEvent();
		if (!e.target) {
			e.target = e.srcElement;
			e.pageX = e.x;
			e.pageY = e.y;
		}
		if (typeof e.layerX == 'undefined') 
			e.layerX = e.offsetX;
		if (typeof e.layerY == 'undefined') 
			e.layerY = e.offsetY;
		return e;
	};
});

/**
 * 合并参数
 * @id STK.core.obj.isEmpty
 * @alias STK.core.obj.isEmpty
 * @param {Object} o
 * @param {Object} isprototype
 * @return {Boolean} ret
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.obj.isEmpty({}) === true;
 * STK.core.obj.isEmpty({'test':'test'}) === false;
 */
STK.register('core.obj.isEmpty',function($){
	return function(o,isprototype){
		var ret = true;
		for(var k in o){
			if(isprototype){
				ret = false;
				break;
			}else{
				if(o.hasOwnProperty(k)){
					ret = false;
					break;
				}
			}
		}
		return ret;
	};
});
STK.register('core.evt.delegatedEvent',function($){
	
	var checkContains = function(list,el){
		for(var i = 0, len = list.length; i < len; i += 1){
			if($.core.dom.contains(list[i],el)){
				return true;
			}
		}
		return false;
	};
	
	return function(actEl,expEls){
		if(!$.core.dom.isNode(actEl)){
			throw 'core.evt.delegatedEvent need an Element as first Parameter';
		}
		if(!expEls){
			expEls = [];
		}
		if($.core.arr.isArray(expEls)){
			expEls = [expEls];
		}
		var evtList = {};
		var bindEvent = function(e){
			var evt = $.core.evt.fixEvent(e);
			var el = evt.target;
			var type = e.type;
			var changeTarget = function(){
				var path, lis, tg;
				path = el.getAttribute('action-target');
				if(path){
					lis = $.core.dom.sizzle(path, actEl);
					if(lis.length){
						tg = evt.target = lis[0];
					}
				};
				changeTarget = $.core.func.empty;
				return tg;
			};
			var checkBuble = function(){
				var tg = changeTarget() || el;
				if(evtList[type] && evtList[type][actionType]){
					return evtList[type][actionType]({
						'evt' : evt,
						'el' : tg,
						'box' : actEl,
						'data' : $.core.json.queryToJson(tg.getAttribute('action-data') || '')
					});
				}else{
					return true;
				}
			};
			if(checkContains(expEls,el)){
				return false;
			}else if(!$.core.dom.contains(actEl, el)){
				return false;
			}else{
				var actionType = null;
				while(el && el !== actEl){
					actionType = el.getAttribute('action-type');
					if(actionType && checkBuble() === false){
						break;
					}
					el = el.parentNode;
				}
				
			}
		};
		var that = {};
		/**
		 * 添加代理事件
		 * @method add
		 * @param {String} funcName
		 * @param {String} evtType
		 * @param {Function} process
		 * @return {void}
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		var a = STK.core.evt.delegatedEvent($.E('outer'),$.E('inner'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 *
		 */
		that.add = function(funcName, evtType, process){
			if(!evtList[evtType]){
				evtList[evtType] = {};
				$.core.evt.addEvent(actEl, evtType, bindEvent);
			}
			var ns = evtList[evtType];
			ns[funcName] = process;
		};
		/**
		 * 移出代理事件
		 * @method remove
		 * @param {String} funcName
		 * @param {String} evtType
		 * @return {void}
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		var a = STK.core.evt.delegatedEvent($.E('outer'),$.E('inner'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.remove('alert','click');
		 */
		that.remove = function(funcName, evtType){
			if(evtList[evtType]){
				delete evtList[evtType][funcName];
				if($.core.obj.isEmpty(evtList[evtType])){
					delete evtList[evtType];
					$.core.evt.removeEvent(actEl, evtType, bindEvent);
				}
			}
		};
		
		/**
		 * 添加略过节点
		 * @method pushExcept
		 * @param {Node} el
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		var a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.pushExcept($.E('inner'));
		 */
		that.pushExcept = function(el){
			expEls.push(el);
		};
		
		/**
		 * 移出略过节点
		 * @method removeExcept
		 * @param {Node} el
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		var a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.pushExcept($.E('inner'));
		 * 		a.removeExcept($.E('inner'));
		 */
		that.removeExcept = function(el){
			if(!el){
				expEls = [];
			}else{
				for(var i = 0, len = expEls.length; i < len; i += 1){
					if(expEls[i] === el){
						expEls.splice(i,1);
					}
				}
			}
			
		};
		/**
		 * 晴空略过节点
		 * @method clearExcept
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		var a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.pushExcept($.E('inner'));
		 * 		a.clearExcept();
		 */
		that.clearExcept = function(el){
			expEls = [];
		};
		
		that.destroy = function(){
			for(k in evtList){
				for(l in evtList[k]){
					delete evtList[k][l];
				}
				delete evtList[k];
				$.core.evt.removeEvent(actEl, k, bindEvent);
			}
		};
		return that;
	};
});
STK.register('core.evt.getActiveElement', function($) {
    return function () {
	    try {
	        var evt = $.core.evt.getEvent();
	        return document.activeElement? document.activeElement: evt.explicitOriginalTarget;
	    }
	    catch (e) {
	        return document.body;
	    }
	};
});

/**
 * 进行物体碰撞检测，支持跟鼠标和对象做碰撞检测
 * @id STK.core.evt.hitTest
 * @alias STK.core.evt.hitTest
 * @param {Element} oNode 需要碰撞检测的节点
 * @param {Null | Event | Element} oEvent 需要跟上个节点做碰撞检测的event对象或者节点，非比选参数，默认为event对象
 * @return {Boolean} 是否碰撞
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * 
 * 	STK.core.evt.addEvent(document.body, 'click', function() {
 * 		var ipt1 = STK.E('input1');
 * 		var ipt2 = STK.E('input2');
 * 		var ev = STK.core.evt.getEvent();
 * 		
 * 		console.log(STK.core.evt.hitTest(ipt1));// true or false
 * 		console.log(STK.core.evt.hitTest(ipt1, ev));// true or false
 * 			
 * 		console.log(STK.core.evt.hitTest(ipt1, ipt2));// true or false
 * 			
 * 		console.log(STK.core.evt.hitTest(ipt1, 1));//error
 * 	});
 */
STK.register('core.evt.hitTest', function($){
	
	function getNodeInfo(oNode) {
		var node = STK.E(oNode);
		var pos = $.core.dom.position(node);
		var area = {
			left: pos.l,
			top: pos.t,
			right: pos.l + node.offsetWidth,
			bottom: pos.t + node.offsetHeight
		};
		return area;
	}
	return function(oNode, oEvent){
	
		var node1Area = getNodeInfo(oNode);
		
		if (oEvent == null) {
			oEvent = $.core.evt.getEvent();
		}
		else if (oEvent.nodeType == 1) {
			var node2Area = getNodeInfo(oEvent);
			
			if (node1Area.right > node2Area.left && node1Area.left < node2Area.right &&
				node1Area.bottom > node2Area.top && node1Area.top < node2Area.bottom) {
				return true;
			}
			return false;
		}
		else if (oEvent.clientX == null) {
			throw 'core.evt.hitTest: [' + oEvent + ':oEvent] is not a valid value';
		}
		
		var scrollPos = $.core.util.scrollPos();
		
		var evtX = oEvent.clientX + scrollPos.left;
		var evtY = oEvent.clientY + scrollPos.top;
		
		
		return (evtX >= node1Area.left && evtX <= node1Area.right) &&
		(evtY >= node1Area.top && evtY <= node1Area.bottom) ? true : false;
		
		
		
	};
});

/**
 * stop event
 * @id STK.core.evt.stopEvent
 * @alias STK.core.evt.stopEvent
 * @return {Event} e
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.evt.stopEvent();
 */
STK.register('core.evt.stopEvent', function($){
	return function(e){
		var ev = e ? e : $.core.evt.getEvent();
		if ($.IE) {
			ev.cancelBubble = true;
			ev.returnValue = false;
		}
		else {
			ev.preventDefault();
			ev.stopPropagation();
		}
		return false;
	};
});

/**
 * preventDefault
 * @id STK.core.evt.preventDefault
 * @return {Event} e 
 * @author Finrila | wangzheng4@staff.sina.com.cn
 * @example
 * STK.core.evt.preventDefault();
 */
STK.register('core.evt.preventDefault', function($){
	return function(e){
		var ev = e ? e : $.core.evt.getEvent();
		if ($.IE) {
			ev.returnValue = false;
		}
		else {
			ev.preventDefault();
		}
	};
});
/**
 * 快捷键操作对象
 * 说明：可打印字符键：除了Esc、F1-12、Tab、 CapsLock、Shift、Ctrl、{开始键}、{菜单键}
 * 		、Alt、Backspace、PrintScreen、ScrollLock、Pause、Insert、 Home、PageUp、
 * 		Delete、End、PageDown、NumLock和方向键（Left、Up、Right、Down）外的所有键;
 * 		键值范围: 13回车 32 - 126
 * 连续键、控制组合键、单键在keydown事件的互斥触发：优先级(连续键>控制组合键>单键)
 * 当当前键盘操作结果为 (可触发连续键或可做为触发连续键的必要条件) 时屏蔽掉 (能够触发的控制组合键和单键);
 * 其他类推.
 * 
 * @id STK.core.evt.hotKey
 * @author Finrila|wangzheng4@staff.sina.com.cn
 * @version 1.0
 * @import STK.core.evt.addEvent
 * @import STK.core.evt.removeEvent
 * @import STK.core.dom.isNode
 * @import STK.core.str.trim
 * @import STK.core.arr.isArray
 * @import STK.core.dom.uniqueID
 */


STK.register('core.evt.hotKey', function($) {
	
	var $uniqueID = $.core.dom.uniqueID;
	
	var F = {
		reg1: /^keypress|keydown|keyup$/
		//特殊键的对照
		,keyMap: { 27: 'esc', 9: 'tab', 32:'space', 13: 'enter', 8:'backspace', 145: 'scrollclock', 
            20: 'capslock', 144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'delete',
            35:'end', 33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down', 
            112:'f1',113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8', 
            120:'f9', 121:'f10', 122:'f11', 123:'f12', 191: '/', 17:'ctrl', 16:'shift',
			109:'-',107:'=',219:'[',221:']',220:'\\',222:'\'',187:'=',188:',',189:'-',190:'.',191:'/',
			96: '0', 97:'1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7',
			104: '8', 105: '9', 106: '*', 110: '.', 111 : '/'}
		//事件组织结构
		,keyEvents: {}
	};
	
	//阻止默认行为
	F.preventDefault = function() {
		//for IE
		this.returnValue = false;
	};
	
	//中间事件处理函数
	F.handler = function(event) {
		event = event || window.event;
		if ( !event.target ) {
			event.target = event.srcElement || document;
		}
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) ) {
			event.which = event.charCode || event.keyCode;
		}
		if(!event.preventDefault) event.preventDefault = F.preventDefault;
		
		var uid = $uniqueID(this), uidO, typeO;
		if(uid && (uidO = F.keyEvents[uid]) && (typeO = uidO[event.type])) {
			var _key;
			switch(event.type) {
				case 'keypress':
					if(event.ctrlKey || event.altKey) return;
					if(event.which == 13) _key = F.keyMap[13];
					if(event.which == 32) _key = F.keyMap[32];
					if(event.which >= 33 && event.which <= 126) _key = String.fromCharCode(event.which);
					break;
				case 'keyup':
				case 'keydown':
					//特殊情况下
					if (F.keyMap[event.which]) {
						_key = F.keyMap[event.which];
					}
					//数字和大写字母键情况下
					if(!_key) {
						if((event.which >= 48 && event.which <= 57)) {//数字
							_key = String.fromCharCode(event.which);
						} else if((event.which >= 65 && event.which <= 90)) {//大写字母 时关联到其小写
							_key = String.fromCharCode(event.which + 32);
						}
					}
					if(_key && event.type == "keydown") {//处理组合键和连续键
						uidO.linkedKey += uidO.linkedKey ? (">" + _key):_key;
						if (event.altKey) _key = "alt+" + _key;
						if (event.shiftKey) _key = "shift+" + _key;
						if (event.ctrlKey) _key = "ctrl+" + _key;
					}
					break;
			}
			var _isInput = /^select|textarea|input$/.test(event.target.nodeName.toLowerCase());
			//从dom事件快捷键列表中回调
			if (_key) {
				var _fns = [], _shield = false;
				if(uidO.linkedKey && uidO.linkKeyStr) {
					if (uidO.linkKeyStr.indexOf(" " + uidO.linkedKey) != -1) {
						if(uidO.linkKeyStr.indexOf(" " + uidO.linkedKey + " ") != -1) {
							_fns = _fns.concat(typeO[uidO.linkedKey]);
							uidO.linkedKey = "";
						}
						_shield = true;
					} else {
						uidO.linkedKey = "";
					}
				}
				if(!_shield) _fns = _fns.concat(typeO[_key]);
				for (var i = 0; i < _fns.length; i++) {
					if(_fns[i] && (!_fns[i].disableInInput || !_isInput))_fns[i].fn.apply(this, [event, _fns[i].key]);
				}
			}
		}
	};
	
	/**
	 * 检验并统一绑定和解绑的参数
	 */
	var checkArgs = function(node, keys, fn, opt) {
		var ret = {};
		//对节点和处理函数验证
		if (!$.core.dom.isNode(node) || $.core.func.getType(fn) !== "function") {
			return ret;
		}
		if(typeof keys !== "string" || !(keys = keys.replace(/\s*/g, ""))) {
			return ret;
		}
		
		if(!opt) opt = {};
		if(!opt.disableInInput) opt.disableInInput = false;
		if(!opt.type) opt.type = 'keypress';
		opt.type = opt.type.replace(/\s*/g, "");
		if(!F.reg1.test(opt.type) || (opt.disableInInput && /^select|textarea|input$/.test(node.nodeName.toLowerCase()))) {
			return ret;
		}
		//当为特殊键、组合键、连续键时把客户键转换成小写
		if(keys.length > 1 || opt.type != "keypress") keys = keys.toLowerCase();
		if(!/(^(\+|>)$)|(^([^\+>]+)$)/.test(keys)) {
			var newKeys = "";
			if(/((ctrl)|(shift)|(alt))\+(\+|([^\+]+))$/.test(keys)) { //2.组合键 将控制键排序 ctrl shift alt
				if(keys.indexOf("ctrl+") != -1) newKeys += "ctr+";
				if(keys.indexOf("shift+") != -1) newKeys += "shift+";
				if(keys.indexOf("alt+") != -1) newKeys += "alt+";
				newKeys += keys.match(/\+(([^\+]+)|(\+))$/)[1];
			} else if(!/(^>)|(>$)|>>/.test(keys) && keys.length > 2) { //3.连续键 
				ret.linkFlag = true;
			} else {
				return ret;
			}
			opt.type = "keydown";
		}//1.单个键
		ret.keys = keys;
		ret.fn = fn;
		ret.opt = opt;
		return ret;
	}
	
	var that = {
		/** 
		 * 添加快捷键
		 * @method add
		 * @public 
		 * @static
		 * @param {Node} node 节点
		 * @param {String/Array} keys 
		 * 		按键组合 如:ctrl+9或A
		 * 		单个键说明: 当opt.type为keypress时区分英文字母大小写，
		 * 				   区分上下键如+=是不同的键；并且只能处理可打印字符；
		 * 				  当opt.type为keydown或keyup时所有字符强制转换成小写;有上下关联的键只能使用下键.
		 * 		组合键说明:（ctrl、shift、alt 不区分组合顺序即：ctrl+shift+alt <=> shift+ctrl+alt）
		 * 		加单个键的组合，注：所有字符强制转换成小写,有上下关联的键只能使用下键.
		 * 		连续键说明: 键用>号隔开如a>ctrl；注: 所有字符强制转换成小写；有上下关联的键只能使用下键; 
		 * 		同一节点上:如果一个连续键左边的部分内容与另一个连续键相同，则该连续键将被屏蔽,即：同时绑定g>h和g>h>i 将只会触发g>h;
		 * 
		 * @param {Function} fn 
		 * 		事件处理函数
		 * 		事件处理函数回调说明：
		 * 	    fn = function(event,key) {
		 * 			event的说明
		 * 				which: 键值
		 * 				target: 事件源
		 * 				type: 事件类型
		 * 				preventDefault(): 阻止默认行为方法
		 * 			key的说明: 快捷键的组合(小写)
		 * 		}
		 * @param {Object} opt 
		 * 		选项 
		 * 		{
		 * 			disableInInput:false //Boolean true：当焦点为input textarea时事件无效 false：反之
		 * 			,type:'keypress'//设置单个键时的事件类型(keydown,keypress,keyup只选其一,默认为keypress);注：该值只在单个键的事件绑定时有效 
		 * 		}
		 * @return {undefined}
		 * @example 
		 * 	    var f1 = function(event, key) {
		 * 	    	console.log(event.type + " " + key);
		 * 	    	event.preventDefault();//阻止默认行为
		 * 	    };
		 * 	    STK.core.evt.hotKey.add(document.body, ["0","ctrl+9"], f1);
		 */
		add: function(node, keys, fn, opt) {
			//当为快捷键列表时 逐个元素进行处理
			if($.core.arr.isArray(keys)) {
				for(var i = 0; i < keys.length; i++) {
					that.add(node, keys[i], fn, opt);
				}
				return;
			}
			var newArg = checkArgs(node, keys, fn, opt);
			if(!newArg.keys) return;
			keys = newArg.keys;
			fn = newArg.fn;
			opt = newArg.opt;
			var linkFlag = newArg.linkFlag;
			
			var uid = $uniqueID(node);
			//生成结构
			if(!F.keyEvents[uid]) F.keyEvents[uid] = {linkKeyStr:"", linkedKey:""};
			//包装事件处理函数
			if(!F.keyEvents[uid].handler) {
				F.keyEvents[uid].handler = function() {
					F.handler.apply(node, arguments);
				};
			}
			if(linkFlag && F.keyEvents[uid].linkKeyStr.indexOf(" "+keys + " ") == -1) {
				F.keyEvents[uid].linkKeyStr += " "+keys + " ";
			}
			var _type = opt.type;
			if(!F.keyEvents[uid][_type]) {
				F.keyEvents[uid][_type] = {};
				$.core.evt.addEvent(node, _type, F.keyEvents[uid].handler);
			}
			if(!F.keyEvents[uid][_type][keys]) F.keyEvents[uid][_type][keys] = [];
			F.keyEvents[uid][_type][keys].push({fn:fn, disableInInput:opt.disableInInput, key: keys});
		}
		/** 
		 * 删除快捷键的绑定
		 * @method remove
		 * @public 
		 * @static
		 * @param {Node} node 
		 * @param {String/Array} keys 同add方法的该属性
		 * @param {Function} fn 同add方法的该属性
		 * @param {Object} opt 选项  同add方法的该属性
		 * @example 
		 * 		var f1 = function(event, key) {
		 *			console.log(event.type + " " + key);
		 *	    	event.preventDefault();//阻止转为行为
		 *		};
		 * 		STK.core.evt.hotKey.remove(document.body, ["0","ctrl+9"], f1);
		 * @return {void}
		 */
		,remove: function(node, keys, fn, opt) {
			//当为快捷键列表时 逐个元素进行处理
			if($.core.arr.isArray(keys)) {
				for(var i = 0; i < keys.length; i++) {
					that.remove(node, keys[i], fn, opt);
				}
				return;
			}
			var newArg = checkArgs(node, keys, fn, opt);
			if(!newArg.keys) return;
			keys = newArg.keys;
			fn = newArg.fn;
			opt = newArg.opt;
			linkFlag = newArg.linkFlag;
			
			var uid = $uniqueID(node), uidO, typeO, _fnList;
			var _type = opt.type;
			if(uid && (uidO = F.keyEvents[uid]) && (typeO = uidO[_type]) && uidO.handler && (_fnList = typeO[keys])) {
				for(var i = 0; i < _fnList.length;) {
					if(_fnList[i].fn === fn) {
						_fnList.splice(i, 1);
					} else {
						i++
					}
				}
				if(_fnList.length < 1) {
					delete typeO[keys];
				}
				var _flag = false;
				for(var a in typeO) {
					_flag = true;
					break;
				}
				if(!_flag) {
					$.core.evt.removeEvent(node, _type, uidO.handler);
					delete uidO[_type];
				}
				if (linkFlag && uidO.linkKeyStr) {
					uidO.linkKeyStr = uidO.linkKeyStr.replace(" "+keys + " ", "");
				}
			}
		}
	};
    return that; 
});


/**
 * Bind a function on an object
 * @id STK.core.func.bind
 * @alias STK.core.func.bind
 * @param {Object} obj
 * @param {Function} fun
 * @param {Array} args
 * @return {Function} fun
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @changlog 新增第三个参数，用来传递函数参数
 * @example
 * var f2 = STK.core.func.bind(window,function(){alert(this)});
 */
STK.register('core.func.bind',function($){
	return function(obj,fun, args){
		args = $.core.arr.isArray(args)? args: [args];
		return function(){
			return fun.apply(obj,args);
		};
	};
});
/**
 * Memorize the function result
 * @id STK.core.func.memorize
 * @alias STK.core.func.memorize
 * @param {Function} fun
 * @param {Object} args
 * 			timeout : 毫秒为单位
 * 			context	: 函数执行时被绑定的对象
 * @return {Function} function
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var f2 = STK.core.func.memorize(function(a,b){return a+b},{'timeout':10});
 */
STK.register('core.func.memorize', function($){
	return function(fun, args){
		if(typeof fun !== 'function'){
			throw 'core.func.memorize need a function as first parameter';
		}
		args = args || {};
		var cache = {};
		
		if (args.timeout) {
			setInterval(function(){
				cache = {};
			}, args.timeout);
		};
		
		return function(){
			var key = Array.prototype.join.call(arguments, '_');
			if (!(key in cache)) {
				cache[key] = fun.apply((args.context || {}), arguments);
			}
			return cache[key];
		};
	};
});


STK.register('core.func.methodBefore', function($){
	return function(){
		var started = false;
		var methodList = [];
		var that = {};
		that.add = function(oFunc, oOpts){
			var opts = $.core.obj.parseParam({
				args: [],
				pointer: window,
				top: false
			}, oOpts);
			// 插到最前
			if (opts.top == true) {
				methodList.unshift([oFunc, opts.args, opts.pointer]);
			}
			// 插到最后
			else {
				methodList.push([oFunc, opts.args, opts.pointer]);
			}
			return !started;
		};
		that.start = function(){
			var i, len, method, args, pointer;
			if (started == true) {
				return;
			}
			started = true;
			for (i = 0, len = methodList.length; i < len; i++) {
				method = methodList[i][0];
				args = methodList[i][1];
				pointer = methodList[i][2];
				method.apply(pointer, args);
			}
		};
		that.reset = function(){
			methodList = [];
			started = false;
		};
		that.getList = function(){
			return methodList;
		};
		return that;
	};
});

/**
 * 分时处理,从"Nicholas C. Zakas"处移植
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @see http://www.nczonline.net/blog/2009/08/11/timed-array-processing-in-javascript/
 * @param {Array} items
 * @param {Object} args
 * 	{
 * 		process : {function},//执行函数
 * 		context : {Object},//上下文
 * 		callback : {function},//返回函数
 * 		delay : {Number},
 * 		execTime : {Number}
 * 	}
 * @return void
 * @example
 * 	STK.core.func.timedChunk([function(){alert(1)},function(){alert(2)},function(){alert(3)}]);
 *  // 1
 *  // 2
 *  // 3
 * 	
 * 	STK.core.func.timedChunk([1,2,3],{
 * 		'process' : function(item){alert(item)},
 * 		'callback': function(items){alert(items)}
 * 	});
 *  // 1
 *  // 2
 *  // 3
 *  // [1, 2, 3]
 */

STK.register('core.func.timedChunk', function($){
	var default_opts = {
			'process'	: function(func){
				if(typeof func === 'function'){
					func();
				}
			},
			'context'	: {},
			'callback'	: null,
			'delay'		: 25,
			'execTime'	: 50
		};
	return function(items, args){
		if(!$.core.arr.isArray(items)){
			throw 'core.func.timedChunk need an array as first parameter';
		}
		var todo = items.concat();
		var conf = $.core.obj.parseParam(default_opts, args);
		
		var timer = null;
		var loop = function(){
			var start = +new Date();
			
			do {
				conf.process.call(conf.context, todo.shift());
			}while (todo.length > 0 && (+new Date() - start < conf.execTime));
			
			if (todo.length <= 0) {
				if (conf.callback) {
					conf.callback(items);
				}
			}else{
				setTimeout(arguments.callee, conf.delay);
			}
		};
		
		timer = setTimeout(loop, conf.delay);
	};
});


/**
 * make an ajax request
 * @id STK.core.io.ajax
 * @alias STK.core.io.ajax
 * @param {Object} 	{
		'url': '',
		'charset': 'UTF-8',
		'timeout': 30 * 1000,
		'args': {},
		'onComplete': null,
		'onTimeout': null,
		
		'onFail': null,
		'method': 'get', // post or get
		'asynchronous': true,
		'contentType': 'application/x-www-form-urlencoded',
		'responseType': 'text'// xml or text or json
	};
 * @return {Void} 
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.io.ajax({
	'url':'/ajax.php',
	'args':{'id':123,'test':'true'},
	});
 */

/**
 * make a xmlhttprequest object
 * @id STK.core.io.getXHR
 * @alias STK.core.io.getXHR
 * @return {xmlhttprequest} XHR 
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var xhr = STK.core.io.getXHR();
 */
STK.register('core.io.getXHR', function($){
	return function(){
		var _XHR = false;
		try {
			_XHR = new XMLHttpRequest();
		} 
		catch (try_MS) {
			try {
				_XHR = new ActiveXObject("Msxml2.XMLHTTP");
			} 
			catch (other_MS) {
				try {
					_XHR = new ActiveXObject("Microsoft.XMLHTTP");
				} 
				catch (failed) {
					_XHR = false;
				}
			}
		}
		return _XHR;
	};
});

/**
 * parse URL
 * @id STK.core.str.parseURL
 * @alias STK.core.str.parseURL
 * @param {String} str
 * @return {Object} that
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.str.parseURL('http://t.sina.com.cn/profile?beijing=huanyingni') === 
	{
		hash : ''
		host : 't.sina.com.cn'
		path : 'profile'
		port : ''
		query : 'beijing=huanyingni'
		scheme : http
		slash : '//'
		url : 'http://t.sina.com.cn/profile?beijing=huanyingni'
	}
 */
STK.register('core.str.parseURL', function($){
	return function(url){
		var parse_url = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
		var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
		var results = parse_url.exec(url);
		var that = {};
		for (var i = 0, len = names.length; i < len; i += 1) {
			that[names[i]] = results[i] || '';
		}
		return that;
	};
});

/**
 * json to query
 * @id STK.core.json.jsonToQuery
 * @param {Json} JSON
 * @param {Boolean} isEncode
 * @return {String} querystring
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var j1 = {'a':1,'b':2,'c':3};
 * STK.core.json.jsonToQuery(j1) === 'a=1&b=2&c=3';
 */
STK.register('core.json.jsonToQuery',function($){
	var _fdata   = function(data,isEncode){
		data = data == null? '': data;
		data = $.core.str.trim(data.toString());
		if(isEncode){
			return encodeURIComponent(data);
		}else{
			return data;
		}
	};
	return function(JSON,isEncode){
		var _Qstring = [];
		if(typeof JSON == "object"){
			for(var k in JSON){
				if(k === '$nullName'){
					_Qstring = _Qstring.concat(JSON[k]);
					continue;
				}
				if(JSON[k] instanceof Array){
					for(var i = 0, len = JSON[k].length; i < len; i++){
						_Qstring.push(k + "=" + _fdata(JSON[k][i],isEncode));
					}
				}else{
					if(typeof JSON[k] != 'function'){
						_Qstring.push(k + "=" +_fdata(JSON[k],isEncode));
					}
				}
			}
		}
		if(_Qstring.length){
			return _Qstring.join("&");
		}else{
			return "";
		}
	};
});
STK.register('core.util.URL', function($){
	/**
	 * @example
	 *	alert(
	 *		STK.core.util.URL('http://abc.com/a/b/c.php?a=1&b=2#a=1').
	 *		setParam('a', 'abc').
	 *		setHash('a', 67889).
	 *		setHash('a1', 444444)
	 *	);
	 *	// http://abc.com/a/b/c.php?a=abc&b=2#a=67889&a1=444444
	 * @author FlashSoft | fangchao@staff.sina.com.cn
	 */
	return function(sURL,args){
		var opts = $.core.obj.parseParam({
			'isEncodeQuery'	 : false,
			'isEncodeHash'	 : false
		},args||{});
		var that = {};
		var url_json = $.core.str.parseURL(sURL);
		
		
		var query_json = $.core.json.queryToJson(url_json.query);
		
		var hash_json = $.core.json.queryToJson(url_json.hash);
		
		
		
		that.setParam = function(sKey, sValue){
			query_json[sKey] = sValue;
			return this;
		};
		that.getParam = function(sKey){
			return query_json[sKey];
		};
		that.setParams = function(oJson){
			for (var key in oJson) {
				that.setParam(key, oJson[key]);
			}
			return this;
		};
		that.setHash = function(sKey, sValue){
			hash_json[sKey] = sValue;
			return this;
		};
		that.getHash = function(sKey){
			return hash_json[sKey];
		};
		that.valueOf = that.toString = function(){
			var url = [];
			var query = $.core.json.jsonToQuery(query_json, opts.isEncodeQuery);
			var hash = $.core.json.jsonToQuery(hash_json, opts.isEncodeQuery);
			if (url_json.scheme != '') {
				url.push(url_json.scheme + ':');
				url.push(url_json.slash);
			}
			if (url_json.host != '') {
				url.push(url_json.host);
				if(url_json.port != ''){
					url.push(':');
					url.push(url_json.port);
				}
			}
			url.push('/');
			url.push(url_json.path);
			if (query != '') {
				url.push('?' + query);
			}
			if (hash != '') {
				url.push('#' + hash);
			}
			return url.join('');
		};
		
		return that;
	};
});

STK.register('core.io.ajax', function($){
	return function(oOpts){
		var opts = $.core.obj.parseParam({
			'url': '',
			'charset': 'UTF-8',
			'timeout': 30 * 1000,
			'args': {},
			'onComplete': null,
			'onTimeout': $.core.func.empty,
			'uniqueID': null,
			
			'onFail': $.core.func.empty,
			'method': 'get', // post or get
			'asynchronous': true,
			'header' : {},
			'isEncode' : false,
			'responseType': 'json'// xml or text or json
		}, oOpts);
		
		if (opts.url == '') {
			throw 'ajax need url in parameters object';
		}
		
		var tm;
		
		var trans = $.core.io.getXHR();
		
		var cback = function(){
			if (trans.readyState == 4) {
				clearTimeout(tm);
				var data = '';
				if (opts['responseType'] === 'xml') {
						data = trans.responseXML;
				}else if(opts['responseType'] === 'text'){
						data = trans.responseText;
				}else {
					try{
						if(trans.responseText && typeof trans.responseText === 'string'){
							data = eval('(' + trans.responseText + ')');
						}else{
							data = {};
						}
					}catch(exp){
						data = opts['url'] + 'return error : data error';
						// throw opts['url'] + 'return error : syntax error';
					}

				}
				if (trans.status == 200) {
					if (opts['onComplete'] != null) {
						opts['onComplete'](data);
					}
				}else if(trans.status == 0){
					//for abort;
				} else {
					if (opts['onFail'] != null) {
						opts['onFail'](data, trans);
					}
				}
			}
			else {
				if (opts['onTraning'] != null) {
					opts['onTraning'](trans);
				}
			}
		};
		trans.onreadystatechange = cback;
		
		if(!opts['header']['Content-Type']){
			opts['header']['Content-Type'] = 'application/x-www-form-urlencoded';
		}
		if(!opts['header']['X-Requested-With']){
			opts['header']['X-Requested-With'] = 'XMLHttpRequest';
		}
		
		if (opts['method'].toLocaleLowerCase() == 'get') {
			var url = $.core.util.URL(opts['url'],{
				'isEncodeQuery' : opts['isEncode']
			});
			url.setParams(opts['args']);
			url.setParam('__rnd', new Date().valueOf());
			trans.open(opts['method'], url, opts['asynchronous']);
			try{
				for(var k in opts['header']){
					trans.setRequestHeader(k, opts['header'][k]);
				}
			}catch(exp){
			
			}
			trans.send('');
			
		}
		else {
			trans.open(opts['method'], opts['url'], opts['asynchronous']);
			try{
				for(var k in opts['header']){
					trans.setRequestHeader(k, opts['header'][k]);
				}
			}catch(exp){
			
			}
			trans.send($.core.json.jsonToQuery(opts['args'],opts['isEncode']));
		}
		if(opts['timeout']){
			tm = setTimeout(function(){
				try{
					trans.abort();
				}catch(exp){
					
				}
				opts['onTimeout']({}, trans);
				opts['onFail'](data, trans);
			}, opts['timeout']);
		}
		return trans;
	};
});

/**
 * make an jsonp request
 * @id STK.core.io.jsonp
 * @alias STK.core.io.jsonp
 * @param {Object} 	{
		'url': '',
		'charset': 'UTF-8',
		'timeout': 30 * 1000,
		'args': {},
		'onComplete': null,
		'onTimeout': null,
		'responseName': null,
		'varkey':null
		'onFail': null
		
	};
 * @return {Void} 
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.io.jsonp({
	'url':'/jsonp.php',
	'args':{'id':123,'test':'true'},
	});
 */
/**
 * 加载js并监听结果
 * @id STK.core.io.scriptLoader
 * @alias STK.core.io.scriptLoader
 * @param {Object} oOpts 附加参数
 * @return {Element} scriptLoader的句柄对象
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * STK.core.io.scriptLoader('http://js.wcdn.cn/t3/platform/_html/json.js', {
 * 'onComplete': function(oData, sVarName){
 * console.dir(oData);
 * },
 * 'varname': 'json'
 * });
 */

STK.register('core.io.scriptLoader', function($){
	var entityList = {};
	var default_opts = {
		'url': '',
		'charset': 'UTF-8',
		'timeout': 30 * 1000,
		'args': {},
		'onComplete': $.core.func.empty,
		'onTimeout': null,
		'isEncode' : false,
		'uniqueID': null
	};
	
	return function(oOpts){
		var js, requestTimeout;
		var opts = $.core.obj.parseParam(default_opts, oOpts);
		
		if (opts.url == '') {
			throw 'scriptLoader: url is null';
		}
		
		
		var uniqueID = opts.uniqueID || $.core.util.getUniqueKey();
		
		
		js = entityList[uniqueID];
		if (js != null && $.IE != true) {
			$.core.dom.removeNode(js);
			js = null;
		}
		if (js == null) {
			js = entityList[uniqueID] = $.C('script');
		}
		
		js.charset = opts.charset;
		js.id = 'scriptRequest_script_' + uniqueID;
		js.type = 'text/javascript';
		if (opts.onComplete != null) {
			if ($.IE) {
				js['onreadystatechange'] = function(){
					if (js.readyState.toLowerCase() == 'loaded' || js.readyState.toLowerCase() == 'complete') {
						try{
							clearTimeout(requestTimeout);
							document.getElementsByTagName("head")[0].removeChild(js);
							js['onreadystatechange'] = null;
						}catch(exp){
							
						}
						opts.onComplete();
					}
				};
			}
			else {
				js['onload'] = function(){
					try{
						clearTimeout(requestTimeout);
						$.core.dom.removeNode(js);
					}catch(exp){}
					opts.onComplete();
				};
				
			}
			
		}
		
		js.src = STK.core.util.URL(opts.url,{
			'isEncodeQuery' : opts['isEncode']
		}).setParams(opts.args);
		
		document.getElementsByTagName("head")[0].appendChild(js);
		
		if (opts.timeout > 0 && opts.onTimeout != null) {
			requestTimeout = setTimeout(function(){
				try{
					document.getElementsByTagName("head")[0].removeChild(js);
				}catch(exp){
					
				}
				opts.onTimeout();
			}, opts.timeout);
		}
		return js;
	};
});

STK.register('core.io.jsonp', function($){
	
	return function(oOpts){
		var opts = $.core.obj.parseParam({
			'url': '',
			'charset': 'UTF-8',
			'timeout': 30 * 1000,
			'args': {},
			'onComplete': null,
			'onTimeout': null,
			'responseName': null,
			'isEncode' : false,
			'varkey': 'callback'
		}, oOpts);
		// -1为默认, 1为完成, 2为超时
		var funcStatus = -1;
		
		var uniqueID = opts.responseName || ('STK_' + $.core.util.getUniqueKey());
		
		opts.args[opts.varkey] = uniqueID;
		
		var completeFunc = opts.onComplete;
		var timeoutFunc = opts.onTimeout;
		
		
		window[uniqueID] = function(oResult) {
			if(funcStatus != 2 && completeFunc != null) {
				funcStatus = 1;
				completeFunc(oResult);
			}
		};
		opts.onComplete = null;
		opts.onTimeout = function() {
			if(funcStatus != 1 && timeoutFunc != null) {
				funcStatus = 2;
				timeoutFunc();
			};
		};
		
		return $.core.io.scriptLoader(opts);
	};
});

/**
 * 模板引擎
 * @id STK.core.util.templet
 * @alias STK.core.util.templet
 * @param {String} template
 * @param {Object} data
 * @return {String} ret
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.templet('#{city||default:天津}欢迎你',{'city':'北京'}) === '北京欢迎你';
 */
STK.register('core.util.templet', function($){
	return function(template, data){
		return template.replace(/#\{(.+?)\}/ig, function(){
			var key = arguments[1].replace(/\s/ig, '');
			var ret = arguments[0];
			var list = key.split('||');
			for (var i = 0, len = list.length; i < len; i += 1) {
				if (/^default:.*$/.test(list[i])) {
					ret = list[i].replace(/^default:/, '');
					break;
				}
				else 
					if (data[list[i]] !== undefined) {
						ret = data[list[i]];
						break;
					}
			}
			return ret;
		});
	};
});


STK.register('core.io.getIframeTrans', function($){
	var TEMP = '<iframe id="#{id}" name="#{id}" height="0" width="0" frameborder="no"></iframe>';
	return function(spec){
		var box, conf, that;
		conf = $.core.obj.parseParam({
			'id' : 'STK_iframe_' + $.core.util.getUniqueKey()
		}, spec);
		that = {};
		
		box = $.C('DIV');
		box.innerHTML = $.core.util.templet(TEMP, conf);
		$.core.util.hideContainer.appendChild(box);
		
		that.getId = function(){
			return conf['id'];
		};
		
		that.destroy = function(){
			box.innerHTML = '';
			try{
				box.getElementsByTagName('iframe')[0].src = "about:blank";
			}catch(exp){
			
			}
			$.core.util.hideContainer.removeChild(box);
			box = null;
		};
		
		return that;
	};
});
/**
 *	author Robin Young |yonglin@staff.sina.com.cn
 */


STK.register('core.io.require', function($){
	var baseURL = 'http://js.t.sinajs.cn/STK/js/';
	
	var checkNS = function(obj, NS){
		var NSList = NS.split('.');
		var step = obj;
		var k = null;
		while(k = NSList.shift()){
			step = step[k];
			if(step === undefined){
				return false;
			}
		}
		return true;
	};
	
	var loadingList = [];
	
	var loadSource = function(url){
		if($.core.arr.indexOf(url, loadingList) !== -1){
			return false;
		}
		loadingList.push(url);
		$.core.io.scriptLoader({'url' : url, 'callback' : function(){
			$.core.arr.foreach(loadingList, function(value, index){
				if(value === url){
					loadingList.splice(index, 1);
					return false;
				}
			});
		}});
		return false;
	};
	
	var require = function(dependList, fn, data){
		var tm = null;
		
		for(var i = 0, len = dependList.length; i < len; i += 1){
			var item = dependList[i];
			if(typeof item === 'string'){
				if(!checkNS($, item)){
					loadSource(baseURL + item.replace(/\./ig,'/') + '.js');
				}
			} else {
				if(!checkNS(window, item['NS'])){
					loadSource(item['url']);
				}
			}
		}
		var checkDepend = function(){
			for(var i = 0, len = dependList.length; i < len; i += 1){
				var item = dependList[i];
				if(typeof item === 'string'){
					if(!checkNS($, item)){
						tm = setTimeout(checkDepend, 25);
						return false;
					}
				} else {
					if(!checkNS(window, item['NS'])){
						tm = setTimeout(checkDepend, 25);
						return false;
					}
				}
			}
			clearTimeout(tm);
			fn.apply({},[].concat(data));
		};
		tm = setTimeout(checkDepend, 25);
		
	};
	
	require.setBaseURL = function(url){
		if(typeof url !== 'string'){
			throw '[STK.kit.extra.require.setBaseURL] need string as frist parameter';
		}
		baseURL = url;
	};
	return require;
	
});

STK.register('core.io.ijax', function($){
	return function(spec){
		var conf, trans, uniqueID, timer, destroy, getData, that;
		
		conf = $.core.obj.parseParam({
			'url'			: '',
			'form'			: null,
			'args'			: {},
			'uniqueID'		: null,
			'timeout'		: 30 * 1000,
			'onComplete'	: $.core.func.empty,
			'onTimeout'		: $.core.func.empty,
			'onFail'		: $.core.func.empty,
			'asynchronous'	: true,
			'isEncode'		: true,
			'abaurl'		: null,
			'responseName'	: null,
			'varkey'		: 'callback',
			'abakey'		: 'callback'
		}, spec);
		
		that = {};
		
		if (conf.url == '') {
			throw 'ijax need url in parameters object';
		}
		if(!conf.form){
			throw 'ijax need form in parameters object';
		}
		
		trans = $.core.io.getIframeTrans();
		
		
		/*----parameters ball shit----*/
		uniqueID = conf.responseName || ('STK_ijax_' + $.core.util.getUniqueKey());
		getData = {};
		getData[conf['varkey']] = uniqueID;
		if(conf.abaurl){
			conf.abaurl = $.core.util.URL(conf.abaurl).setParams(getData);
			getData = {};
			getData[conf['abakey']] = conf.abaurl;
		}
		conf.url = $.core.util.URL(conf.url,{
			'isEncodeQuery' : conf['isEncode']
		}).setParams(getData).setParams(conf.args);
		/*----end parameters ball shit----*/
		
		
		destroy = function(){
			window[uniqueID] = null;
			trans.destroy();
			trans = null;
			clearTimeout(timer);
		};
		
		timer = setTimeout(function(){
			destroy();
			conf.onTimeout();
			conf.onFail();
		}, conf.timeout);
		
		
		window[uniqueID] = function(oResult, query) {
			destroy();
			conf.onComplete(oResult, query);
		};
		
		
		conf.form.action = conf.url;
		conf.form.target = trans.getId();
		conf.form.submit();
		
		that.abort = destroy;
		
		return that;
		
	};
});

/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 * @author FlashSoft | fangchao@staff.sian.com.cn
 */
STK.register('core.json.clone', function($) {
	function clone(jsonObj) {
		var buf;
		if (jsonObj instanceof Array) {
			buf = [];
			var i = jsonObj.length;
			while (i--) {
				buf[i] = clone(jsonObj[i]);
			}
			return buf;
		} else if (jsonObj instanceof Object) {
			buf = {};
			for (var k in jsonObj) {
				buf[k] = clone(jsonObj[k]);
			}
			return buf;
		} else {
			return jsonObj;
		}
	}
	return clone;
});
/**
 * compare two json whether equal.
 * @id STK.core.json.compare
 * @alias STK.core.json.compare
 * @param {Json} json2
 * @param {Json} json1
 * @return {Boolean} TRUE/FALSE
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var j1 = {'a':1,'b':2,'c':3};
 * var j2 = {'a':1,'b':2,'c':3};
 * STK.core.json.compare(j1,j2) === TRUE;
 */
/**
 * Judge a json is part of other json.
 * @id STK.core.json.include
 * @alias STK.core.json.include
 * @param {Json} json2
 * @param {Json} json1
 * @return {Boolean} TRUE/FALSE
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var j1 = {'a':1,'b':2,'c':3};
 * var j2 = {'a':1}
 * STK.core.json.include(j1,j2) === TRUE;
 */
STK.register('core.json.include',function($){
	return function(json2,json1){
		for ( var k in json1 ){
			if (typeof json1[k] === 'object'){
				if ( json1[k] instanceof Array ) {
					if ( json2[k] instanceof Array ){
						if ( json1[k].length === json2[k].length ){
							for ( var i = 0, len = json1[k].length; i < len; i += 1 ){
								if ( !arguments.callee( json1[k][i], json2[k][i] ) ){
									return false;
								}
							}
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					if ( typeof json2[k] === 'object' ) {
						if ( !arguments.callee( json1[k], json2[k] ) ){
							return false;
						}
					} else {
						return false;
					}
				}
			} else if ( typeof json1[k] === 'number' || typeof json1[k] === 'string' ) {
				if ( json1[k] !== json2[k] ){
					return false;
				}
			} else if ( json1[k] !== undefined && json1[k] !== null ) {
				if ( json2[k] !== undefined && json2[k] !== null ){
					if ( !json1[k].toString || !json2[k].toString ) {
						throw 'json1[k] or json2[k] do not have toString method';
					}
					if ( json1[k] .toString() !== json2[k].toString()) {
						return false;
					}
				} else {
					return false;
				}
			}
		}
		return true;
	};
});
STK.register('core.json.compare',function($){
	return function(json1,json2){
		if($.core.json.include(json1,json2) && $.core.json.include(json2,json1)){
			return true;
		}else{
			return false;
		}
	};
});
/**
 * from json.org
 * @id STK.core.json.jsonToStr
 * @alias STK.core.json.jsonToStr
 * @param {Object|Json} value
 * @param {Function} replacer
 * @param {Number|String} space
 * @return {String} json字符串
 * @author Json.org
 * @example
	var b = STK.core.json.jsonToStr({test:test},null,4);
 */
STK.register('core.json.jsonToStr', function($){
	function f(n){
		// Format integers to have at least two digits.
		return n < 10 ? '0' + n : n;
	}
	
	if (typeof Date.prototype.toJSON !== 'function') {
	
		Date.prototype.toJSON = function(key){
		
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
		};
		
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key){
			return this.valueOf();
		};
	}
	
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { // table of character substitutions
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	}, rep;
	
	
	function quote(string){
	
		// If the string contains no control characters, no quote characters, and no
		// backslash characters, then we can safely slap some quotes around it.
		// Otherwise we must also replace the offending characters with safe escape
		// sequences.
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' +
		string.replace(escapable, function(a){
			var c = meta[a];
			return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}) +
		'"' : '"' + string + '"';
	}
	
	
	function str(key, holder){
	
		// Produce a string from holder[key].
		var i, // The loop counter.
 k, // The member key.
 v, // The member value.
 length, mind = gap, partial, value = holder[key];
		
		// If the value has a toJSON method, call it to obtain a replacement value.
		if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}
		
		// If we were called with a replacer function, then call the replacer to
		// obtain a replacement value.
		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}
		
		// What happens next depends on the value's type.
		switch (typeof value) {
			case 'string':
				return quote(value);
				
			case 'number':
				
				// JSON numbers must be finite. Encode non-finite numbers as null.
				return isFinite(value) ? String(value) : 'null';
				
			case 'boolean':
			case 'null':
				
				// If the value is a boolean or null, convert it to a string. Note:
				// typeof null does not produce 'null'. The case is included here in
				// the remote chance that this gets fixed someday.
				return String(value);
				
			// If the type is 'object', we might be dealing with an object or an array or
			// null.
			case 'object':
				
				// Due to a specification blunder in ECMAScript, typeof null is 'object',
				// so watch out for that case.
				if (!value) {
					return 'null';
				}
				
				// Make an array to hold the partial results of stringifying this object value.
				gap += indent;
				partial = [];
				
				// Is the value an array?
				if (Object.prototype.toString.apply(value) === '[object Array]') {
				
					// The value is an array. Stringify every element. Use null as a placeholder
					// for non-JSON values.
					length = value.length;
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || 'null';
					}
					
					// Join all of the elements together, separated with commas, and wrap them in
					// brackets.
					v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
					gap = mind;
					return v;
				}
				
				// If the replacer is an array, use it to select the members to be stringified.
				if (rep && typeof rep === 'object') {
					length = rep.length;
					for (i = 0; i < length; i += 1) {
						k = rep[i];
						if (typeof k === 'string') {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}
				else {
				
					// Otherwise, iterate through all of the keys in the object.
					for (k in value) {
						if (Object.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}
				
				// Join all of the member texts together, separated with commas,
				// and wrap them in braces.
				v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
				gap = mind;
				return v;
		}
	}
	return function(value, replacer, space){
	
		// The stringify method takes a value and an optional replacer, and an optional
		// space parameter, and returns a JSON text. The replacer can be a function
		// that can replace values, or an array of strings that will select the keys.
		// A default replacer method can be provided. Use of the space parameter can
		// produce text that is more easily readable.
		var i;
		gap = '';
		indent = '';
		
		// If the space parameter is a number, make an indent string containing that
		// many spaces.
		if (typeof space === 'number') {
			for (i = 0; i < space; i += 1) {
				indent += ' ';
			}
			
			// If the space parameter is a string, it will be used as the indent string.
		}
		else 
			if (typeof space === 'string') {
				indent = space;
			}
		
		// If there is a replacer, it must be a function or an array.
		// Otherwise, throw an error.
		rep = replacer;
		if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
			throw new Error('JSON.stringify');
		}
		
		// Make a fake root object containing our value under the key of ''.
		// Return the result of stringifying the value.
		return str('', {
			'': value
		});
	};
});

/**
 * from json.org
 * @id STK.core.json.strToJson
 * @alias STK.core.json.strToJson
 * @param {String} source
 * @param {Function} reviver
 * @return {Object|Json} value
 * @author Json.org
 * @example
	var b = STK.core.json.strToJson('{"test":"test"}');
 */
STK.register('core.json.strToJson', function($){
	/*
	 http://www.JSON.org/json_parse.js
	 2009-05-31
	 Public Domain.
	 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 This file creates a json_parse function.
	 json_parse(text, reviver)
	 This method parses a JSON text to produce an object or array.
	 It can throw a SyntaxError exception.
	 The optional reviver parameter is a function that can filter and
	 transform the results. It receives each of the keys and values,
	 and its return value is used instead of the original value.
	 If it returns what it received, then the structure is not modified.
	 If it returns undefined then the member is deleted.
	 Example:
	 // Parse the text. Values that look like ISO date strings will
	 // be converted to Date objects.
	 myData = json_parse(text, function (key, value) {
	 var a;
	 if (typeof value === 'string') {
	 a =
	 /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
	 if (a) {
	 return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
	 +a[5], +a[6]));
	 }
	 }
	 return value;
	 });
	 This is a reference implementation. You are free to copy, modify, or
	 redistribute.
	 This code should be minified before deployment.
	 See http://javascript.crockford.com/jsmin.html
	 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	 NOT CONTROL.
	 */
	/*members "", "\"", "\/", "\\", at, b, call, charAt, f, fromCharCode,
	 hasOwnProperty, message, n, name, push, r, t, text
	 */
	// This is a function that can parse a JSON text, producing a JavaScript
	// data structure. It is a simple, recursive descent parser. It does not use
	// eval or regular expressions, so it can be used as a model for implementing
	// a JSON parser in other languages.
	
	// We are defining the function inside of another function to avoid creating
	// global variables.
	
	var at, // The index of the current character
 ch, // The current character
 escapee = {
		'"': '"',
		'\\': '\\',
		'/': '/',
		b: '\b',
		f: '\f',
		n: '\n',
		r: '\r',
		t: '\t'
	}, text, error = function(m){
	
		// Call error when something is wrong.
		
		throw {
			name: 'SyntaxError',
			message: m,
			at: at,
			text: text
		};
	}, next = function(c){
	
		// If a c parameter is provided, verify that it matches the current character.
		
		if (c && c !== ch) {
			error("Expected '" + c + "' instead of '" + ch + "'");
		}
		
		// Get the next character. When there are no more characters,
		// return the empty string.
		
		ch = text.charAt(at);
		at += 1;
		return ch;
	}, number = function(){
	
		// Parse a number value.
		
		var number, string = '';
		
		if (ch === '-') {
			string = '-';
			next('-');
		}
		while (ch >= '0' && ch <= '9') {
			string += ch;
			next();
		}
		if (ch === '.') {
			string += '.';
			while (next() && ch >= '0' && ch <= '9') {
				string += ch;
			}
		}
		if (ch === 'e' || ch === 'E') {
			string += ch;
			next();
			if (ch === '-' || ch === '+') {
				string += ch;
				next();
			}
			while (ch >= '0' && ch <= '9') {
				string += ch;
				next();
			}
		}
		number = +string;
		if (isNaN(number)) {
			error("Bad number");
		}
		else {
			return number;
		}
	}, string = function(){
	
		// Parse a string value.
		
		var hex, i, string = '', uffff;
		
		// When parsing for string values, we must look for " and \ characters.
		
		if (ch === '"') {
			while (next()) {
				if (ch === '"') {
					next();
					return string;
				}
				else 
					if (ch === '\\') {
						next();
						if (ch === 'u') {
							uffff = 0;
							for (i = 0; i < 4; i += 1) {
								hex = parseInt(next(), 16);
								if (!isFinite(hex)) {
									break;
								}
								uffff = uffff * 16 + hex;
							}
							string += String.fromCharCode(uffff);
						}
						else 
							if (typeof escapee[ch] === 'string') {
								string += escapee[ch];
							}
							else {
								break;
							}
					}
					else {
						string += ch;
					}
			}
		}
		error("Bad string");
	}, white = function(){
	
		// Skip whitespace.
		
		while (ch && ch <= ' ') {
			next();
		}
	}, word = function(){
	
		// true, false, or null.
		
		switch (ch) {
			case 't':
				next('t');
				next('r');
				next('u');
				next('e');
				return true;
			case 'f':
				next('f');
				next('a');
				next('l');
				next('s');
				next('e');
				return false;
			case 'n':
				next('n');
				next('u');
				next('l');
				next('l');
				return null;
		}
		error("Unexpected '" + ch + "'");
	}, value, // Place holder for the value function.
 array = function(){
	
		// Parse an array value.
		
		var array = [];
		
		if (ch === '[') {
			next('[');
			white();
			if (ch === ']') {
				next(']');
				return array; // empty array
			}
			while (ch) {
				array.push(value());
				white();
				if (ch === ']') {
					next(']');
					return array;
				}
				next(',');
				white();
			}
		}
		error("Bad array");
	}, object = function(){
	
		// Parse an object value.
		
		var key, object = {};
		
		if (ch === '{') {
			next('{');
			white();
			if (ch === '}') {
				next('}');
				return object; // empty object
			}
			while (ch) {
				key = string();
				white();
				next(':');
				if (Object.hasOwnProperty.call(object, key)) {
					error('Duplicate key "' + key + '"');
				}
				object[key] = value();
				white();
				if (ch === '}') {
					next('}');
					return object;
				}
				next(',');
				white();
			}
		}
		error("Bad object");
	};
	
	value = function(){
	
		// Parse a JSON value. It could be an object, an array, a string, a number,
		// or a word.
		
		white();
		switch (ch) {
			case '{':
				return object();
			case '[':
				return array();
			case '"':
				return string();
			case '-':
				return number();
			default:
				return ch >= '0' && ch <= '9' ? number() : word();
		}
	};
	
	// Return the json_parse function. It will have access to all of the above
	// functions and variables.
	
	return function(source, reviver){
		var result;
		
		text = source;
		at = 0;
		ch = ' ';
		result = value();
		white();
		if (ch) {
			error("Syntax error");
		}
		
		// If there is a reviver function, we recursively walk the new structure,
		// passing each name/value pair to the reviver function for possible
		// transformation, starting with a temporary root object that holds the result
		// in an empty key. If there is not a reviver function, we simply return the
		// result.
		
		return typeof reviver === 'function' ? (function walk(holder, key){
			var k, v, value = holder[key];
			if (value && typeof value === 'object') {
				for (k in value) {
					if (Object.hasOwnProperty.call(value, k)) {
						v = walk(value, k);
						if (v !== undefined) {
							value[k] = v;
						}
						else {
							delete value[k];
						}
					}
				}
			}
			return reviver.call(holder, key, value);
		}({
			'': result
		}, '')) : result;
	};
});


/**
 * make the object's function be cascaded
 * @id STK.core.obj.cascade
 * @alias STK.core.obj.cascade
 * @param {Object} obj
 * @param {Array} fList
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
	var obj = {'f1':function(){},'f2':function(){}};
	STK.core.obj.cascade(obj,['f1','f2']);
	obj.f1().f2()
 */
STK.register('core.obj.cascade', function($){
	return function(obj, fList){
		for (var i = 0, len = fList.length; i < len; i += 1) {
			if (typeof obj[fList[i]] !== 'function') {
				throw 'cascade need function list as the second paramsters';
			}
			obj[fList[i]] = (function(fun){
				return function(){
					fun.apply(obj, arguments);
					return obj;
				};
			})(obj[fList[i]]);
		}
	};
});

/**
 * 产生清理value为null的数据,不修改原始传入的Object对象
 * @param {Object} 未清理前的Object数据
 * @return {Object} 清理后的Object数据
 * @author FlashSoft | fangchao@staff.sina.com.cn
 */
STK.register('core.obj.clear', function($){
	return function(oHash){
		var key, newHash = {};
		for(key in oHash) {
			if(oHash[key] != null) {
				newHash[key] = oHash[key];
			}
		}
		return newHash;
	};
});

/**
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @id STK.core.obj.cut
 * @alias STK.core.obj.cut
 * @param {Object} obj 原对象
 * @param {Array} list 删除列表
 * @return {Object} 被剪切后的新对象
 * @example
 * var cfg = {
 *  name: '123',
 *  value: 'aaa',
 *  test: true
 * };
 * var cfg2 = $.core.obj.cut(cfg,['test']);
 * //cfg2 == {name:'123','value':'aaa'};
 */


STK.register('core.obj.cut',function($){
	return function(obj, list){
		var ret = {};
		if(!$.core.arr.isArray(list)){
			throw 'core.obj.cut need array as second parameter';
		}
		for(var k in obj){
			if(!$.core.arr.inArray(k,list)){
				ret[k] = obj[k];
			}
		}
		return ret;
	};
});
/**
 * 暂存对象的函数
 * @id STK.core.obj.sup
 * @alias STK.core.obj.sup
 * @param {Object} obj
 * @param {Array} fList
 * @return {Object}
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
	var obj = {'f1':function(){},'f2':function(){}};
	var sup = STK.core.obj.sup(obj,['f1','f2']);
	sup.f1();
	sup.f2();
 */
STK.register('core.obj.sup', function($){
	return function(obj, fList){
		var that = {};
		for (var i = 0, len = fList.length; i < len; i += 1) {
			if (typeof obj[fList[i]] !== 'function') {
				throw 'super need function list as the second paramsters';
			}
			that[fList[i]] = (function(fun){
				return function(){
					return fun.apply(obj, arguments);
				};
			})(obj[fList[i]]);
		}
		return that;
	};
});


/**
 * Get byte length
 * @id STK.core.str.bLength
 * @alias STK.core.str.bLength
 * @param {String} str
 * @return {Number} n
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.str.bLength('aabbcc') === 6;
 */
STK.register('core.str.bLength', function($){
	return function(str){
		if (!str) {
			return 0;
		}
		var aMatch = str.match(/[^\x00-\xff]/g);
		return (str.length + (!aMatch ? 0 : aMatch.length));
	};
});

/**
 * 全角字转半角字
 * @id STK.core.str.dbcToSbc
 * @alias STK.core.str.dbcToSbc
 * @param {String} str
 * @return {String} str
 * @author yuwei | yuwei@staff.sina.com.cn
 * @example
 * STK.core.str.dbcToSbc('ＳＡＡＳＤＦＳＡＤＦ') === 'SAASDFSADF';
 */
STK.register('core.str.dbcToSbc',function($){
	return function(str){
		return str.replace(/[\uff01-\uff5e]/g,function(a){
			return String.fromCharCode(a.charCodeAt(0)-65248);
		}).replace(/\u3000/g," ");
	};
});
/**
 * parse HTML
 * @id STK.core.str.parseHTML
 * @alias STK.core.str.parseHTML
 * @param {String} str
 * @return {Array} ret
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.str.parseHTML('<div></div>') === [["<div>", "", "div", ""], ["</div>", "/", "div", ""]];
 */
STK.register('core.str.parseHTML', function($){
	return function(htmlStr){
		var tags = /[^<>]+|<(\/?)([A-Za-z0-9]+)([^<>]*)>/g;
		var a, i;
		var ret = [];
		while ((a = tags.exec(htmlStr))) {
			var n = [];
			for (i = 0; i < a.length; i += 1) {
				n.push(a[i]);
			}
			ret.push(n);
		}
		return ret;
	};
});

/**
 * 从左到右取字符串，中文算两个字符.
 * @id STK.core.str.leftB
 * @alias STK.core.str.leftB
 * @param {String} str
 * @param {Number} lens
 * @return {String} str
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.str.leftB( '世界真和谐'， 6 ) === '世界真';//向汉编致敬
 */
STK.register('core.str.leftB', function($){
	return function(str, lens){
		var s = str.replace(/\*/g, ' ').replace(/[^\x00-\xff]/g, '**');
		str = str.slice(0, s.slice(0, lens).replace(/\*\*/g, ' ').replace(/\*/g, '').length);
		if ($.core.str.bLength(str) > lens && lens > 0) {
			str = str.slice(0, str.length - 1);
		}
		return str;
	};
});

/**
 * get querykey's value
 * @id STK.core.str.queryString
 * @alias STK.core.str.queryString
 * @param {String} sKey
 * @param {Object} oOpts
 * @return {String} str
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * STK.core.str.queryString('author',{'source':'http://t.sina.com.cn/profile?author=flashsoft'}) === 'flashsoft';
 */
STK.register('core.str.queryString', function($){
	return function(sKey, oOpts){
		var opts = $.core.obj.parseParam({
			source: window.location.href.toString(),
			split: '&'
		}, oOpts);
		var rs = new RegExp("(^|)" + sKey + "=([^\\" + opts.split + "]*)(\\" + opts.split + "|$)", "gi").exec(opts.source), tmp;
		if (tmp = rs) {
			return tmp[2];
		}
		return null;
	};
});


/**
 * cookie manager [static]
 * @id STK.core.util.cookie
 * @alias STK.core.util.cookie
 * @method {void} set(sKey,sValue,oOpts)
 * @method {String} get(sKey)
 * @method {void} remove(sKey,oOpts)
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.cookie.set('id','test');
 * STK.core.util.cookie.get('id') === 'test';
 */
STK.register('core.util.cookie', function($){
	var that = {
		set: function(sKey, sValue, oOpts){
			var arr = [];
			var d, t;
			var cfg = $.core.obj.parseParam({
				'expire': null,
				'path': '/',
				'domain': null,
				'secure': null,
				'encode': true
			}, oOpts);
			
			if (cfg.encode == true) {
				sValue = escape(sValue);
			}
			arr.push(sKey + '=' + sValue);

			if (cfg.path != null) {
				arr.push('path=' + cfg.path);
			}
			if (cfg.domain != null) {
				arr.push('domain=' + cfg.domain);
			}
			if (cfg.secure != null) {
				arr.push(cfg.secure);
			}
			if (cfg.expire != null) {
				d = new Date();
				t = d.getTime() + cfg.expire * 3600000;
				d.setTime(t);
				arr.push('expires=' + d.toGMTString());
			}
			document.cookie = arr.join(';');
		},
		get: function(sKey){
			sKey = sKey.replace(/([\.\[\]\$])/g, '\\\$1');
			var rep = new RegExp(sKey + '=([^;]*)?;', 'i');
			var co = document.cookie + ';';
			var res = co.match(rep);
			if (res) {
				return res[1] || "";
			}
			else {
				return '';
			}
		},
		remove: function(sKey, oOpts){
			oOpts = oOpts || {};
			oOpts.expire = -10;
			that.set(sKey, '', oOpts);
		}
	};
	return that;
});

/**
 * 拖拽分发坐标的函数
 * @id STK.core.util.drag
 * @alias STK.core.util.drag
 * @param {Element} actEl
 * @param {Object} spec
 * @return {Object} drag Object
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * var a = STK.core.util.drag(STK.E('outer'));
 * STK.core.evt.custEvent.add(a.getActObj(),'dragStart',function(e,data){console.log(e,data)});
 * STK.core.evt.custEvent.add(a.getActObj(),'dragEnd',function(e,data){console.log(e,data)});
 * STK.core.evt.custEvent.add(a.getActObj(),'draging',function(e,data){console.log(e,data)});
 */

STK.register('core.util.drag',function($){
	
	var stopClick = function(e){
		e.cancelBubble = true;
		return false;
	};
	
	var getParams = function(args,evt){
		args['clientX'] = evt.clientX;
		args['clientY'] = evt.clientY;
		args['pageX'] = evt.clientX + $.core.util.scrollPos()['left'];
		args['pageY'] = evt.clientY + $.core.util.scrollPos()['top'];
		return args;
	};
	
	return function(actEl,spec){
		if(!$.core.dom.isNode(actEl)){
			throw 'core.util.drag need Element as first parameter';
		}
		var conf = $.core.obj.parseParam({
			'actRect' : [],
			'actObj' : {}
		},spec);
		var that = {};
		
		var dragStartKey = $.core.evt.custEvent.define(conf.actObj,'dragStart');
		var dragEndKey = $.core.evt.custEvent.define(conf.actObj,'dragEnd');
		var dragingKey = $.core.evt.custEvent.define(conf.actObj,'draging');
		
		var startFun = function(e){
			var args = getParams({},e);
			document.body.onselectstart = function(){return false;};
			$.core.evt.addEvent(document,'mousemove',dragFun);
			$.core.evt.addEvent(document,'mouseup',endFun);
			$.core.evt.addEvent(document,'click',stopClick,true);
			if(!$.IE){
				e.preventDefault();
				e.stopPropagation();
			}
			//custEvent fire
			$.core.evt.custEvent.fire(dragStartKey,'dragStart',args);
			//end custEvent fire
			return false;
		};
		
		var dragFun = function(e){
			var args = getParams({},e);
			e.cancelBubble = true;
			//custEvent fire
			$.core.evt.custEvent.fire(dragStartKey,'draging',args);
			//end custEvent fire
		};
		
		var endFun = function(e){
			var args = getParams({},e);
			document.body.onselectstart = function(){return true;};
			$.core.evt.removeEvent(document,'mousemove',dragFun);
			$.core.evt.removeEvent(document,'mouseup',endFun);
			$.core.evt.removeEvent(document,'click',stopClick,true);
			//custEvent fire
			$.core.evt.custEvent.fire(dragStartKey,'dragEnd',args);
			//end custEvent fire
		};
		
		$.core.evt.addEvent(actEl,'mousedown',startFun);
		
		that.destroy = function(){
			$.core.evt.removeEvent(actEl,'mousedown',startFun);
			conf = null;
		};
		
		that.getActObj = function(){
			return conf.actObj;
		};
		
		return that;
	};
	
});
/**
 * get html's name value
 * @id STK.core.util.htmlToJson
 * @alias STK.core.util.htmlToJson
 * @param {Element} mainBox
 * @param {Array} tagNameList
 * @param {Boolean} isClear
 * @return {JSON} _retObj
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.htmlToJson($E('login')) === {'username':'robin','password':'123qwe'};
 */

/**
 * Get name value
 * @id STK.core.util.nameValue
 * @alias STK.core.util.nameValue
 * @param {Element} node
 * @param {Boolean} isClear
 * @return {Object} _value
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.nameValue($.E('input')) === {'test':'test'};
 */

STK.register('core.util.nameValue', function($){
	return function(node){
		var _name = node.getAttribute("name");
		var _type = node.getAttribute("type");
		var _el = node.tagName;
		var _value = {
			"name": _name,
			"value": ""
		};
		var _setVl = function(vl){
			if(vl === false){
				_value = false;
			}else if (!_value["value"]) {
				_value["value"] = $.core.str.trim((vl || ""));
			} else {
				_value["value"] = [$.core.str.trim((vl || ""))].concat(_value["value"]);
			}
		};
		if (!node.disabled && _name) {
			switch (_el) {
				case "INPUT":
					if (_type == "radio" || _type == "checkbox") {
						if (node.checked) {
							_setVl(node.value);
						}
						else {
							_setVl(false);
						}
					} else if (_type == "reset" || _type == "submit" || _type == "image") {
						_setVl(false);
					} else {
						_setVl(node.value);
					}
					break;
				case "SELECT":
					if (node.multiple) {
						var _ops = node.options;
						for (var i = 0, len = _ops.length; i < len; i++) {
							if (_ops[i].selected) {
								_setVl(_ops[i].value);
							}
						}
					} else {
						_setVl(node.value);
					}
					break;
				case "TEXTAREA":
					_setVl(node.value || node.getAttribute("value") || false);
					break;
				case "BUTTON":
				default:
					_setVl(node.value || node.getAttribute("value") || node.innerHTML || false);
			}
		} else{
			return false;
		}
		return _value;
	};
});

STK.register('core.util.htmlToJson', function($){
	return function(mainBox, tagNameList, isClear){
		var _retObj = {};
		tagNameList = tagNameList || ["INPUT", "TEXTAREA", "BUTTON", "SELECT"];
		if (!mainBox || !tagNameList) {
			return false;
		}
		var _opInput = $.core.util.nameValue;
		for (var i = 0, len = tagNameList.length; i < len; i++) {
			var _tags = mainBox.getElementsByTagName(tagNameList[i]);
			for (var j = 0, lenTag = _tags.length; j < lenTag; j++) {
				var _info = _opInput(_tags[j]);
				if (!_info || (isClear && (_info.value === '')) ) {
					continue;
				}
				if (_retObj[_info.name]) {
					if (_retObj[_info.name] instanceof Array) {
						_retObj[_info.name] = _retObj[_info.name].concat(_info.value);
					}
					else {
						_retObj[_info.name] = [_retObj[_info.name]].concat(_info.value);
					}
				}
				else {
					_retObj[_info.name] = _info.value;
				}
			}
		}
		return _retObj;
	};
});

STK.register('core.util.jobsM', function($){
	return (function(){
		var jobList = [];
		var usedHash = {};
		var running = false;
		
		var that = {};
		
		var startOneJob = function(job){
			var jobName = job['name'];
			var jobFunc = job['func'];
			var staTime = +new Date();
			if(!usedHash[jobName]){
				//try{
					jobFunc($);
					jobFunc[jobName] = true;

				//}catch(exp){
					//$.log('[error][jobs]' + jobName);
				//}

			}
		};
		
		var loop = function(items){
			if(items.length){
				$.core.func.timedChunk(items, {
					'process' : startOneJob,
					'callback': arguments.callee
				});
				items.splice(0, items.length);
			}else{
				running = false;
			}
			
		};
		
		
		that.register = function(sJobName, oFunc){
			jobList.push({
				'name': sJobName,
				'func': oFunc
			});
		};
		
		that.start = function(){
			if (running) {
				return true;
			} else {
				running = true;
			}
			loop(jobList);
		};
		
		that.load = function(){
		};
		
		
		$.core.dom.ready(that.start);
		
		return that;
		
	})();
});

/**
 * 多语言引擎
 * @id STK.core.util.language
 * @alias STK.core.util.language
 * @param {String} template
 * @param {Object} data
 * @return {String} ret
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.language('#L{beijing}欢迎你',{'beijing':'北京'}) === '北京欢迎你';
 */

STK.register('core.util.language', function($){
	return function(template, data){
		return template.replace(/#L\{((.*?)(?:[^\\]))\}/ig, function(){
			var key = arguments[1];
			var ret;
			if (data && data[key] !== undefined) {
				ret = data[key];
			}else{
				ret = key;
			}
			return ret;
		});
	};
});
/**
 * 事件广播类
 * @id STK.core.util.listener
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @version 1.0
 * @example
 * STK.core.util.listener.register('topBar', 'popup', function(a, b) {console.log(a, b)});
 * STK.core.util.listener.fire('topBar', 'popup', [1, 2]);// print 1, 2
 * 
 * STK.core.util.listener.register('topBar', 'popup', function(a, b) {console.log(a, b)});
 * STK.core.util.listener.fire('topBar', 'popup', [[1, 2]]);// print [1, 2], null
 */



STK.register('core.util.listener', function($){
	return (function(){
		var dispatchList = {};
		var topWindow;
		
		
		var fireTaskList = [];
		var fireTaskTimer;
		
		function runFireTaskList(){
			if (fireTaskList.length == 0) {
				return;
			}
			clearTimeout(fireTaskTimer);
			var curFireTask = fireTaskList.splice(0, 1)[0];
			//try{
				curFireTask['func'].apply(curFireTask['func'], [].concat(curFireTask['data']));

			//}catch(exp){
				//$.log('[error][listener]: One of ' + curFireTask + '-' + curFireTask + ' function execute error.');
			//}

			
			
			fireTaskTimer = setTimeout(runFireTaskList, 25);
		}
		
		var dispatch = {
			conn: function(){
				var win = window;
				while (win != top) {
					win = win['parent'];
					if (win['STK'] && win['STK']['core'] && win['STK']['core']['util'] && win['STK']['core']['util']['listener'] != null) {
						topWindow = win;
					}
				}
			},
			register: function(sChannel, sEventType, fCallBack){
				if (topWindow != null) {
					topWindow['STK']['core']['util']['listener'].register(sChannel, sEventType, fCallBack);
				}
				else {
					dispatchList[sChannel] = dispatchList[sChannel] || {};
					dispatchList[sChannel][sEventType] = dispatchList[sChannel][sEventType] || [];
					dispatchList[sChannel][sEventType].push(fCallBack);
				}
			},
			fire: function(sChannel, sEventType, oData){
				if (topWindow != null) {
					topWindow.listener.fire(sChannel, sEventType, oData);
				}
				else {
					var funcArray;
					var i, len;
					if (dispatchList[sChannel] && dispatchList[sChannel][sEventType] && dispatchList[sChannel][sEventType].length > 0) {
						funcArray = dispatchList[sChannel][sEventType];
						funcArray.data_cache = oData;
						for (i = 0, len = funcArray.length; i < len; i++) {
							fireTaskList.push({
								channel: sChannel,
								evt:sEventType,
								func: funcArray[i],
								data: oData
							});
						}
						runFireTaskList();
					}
				}
			},
			remove: function(sChannel, sEventType, fCallBack){
				if (topWindow != null) {
					topWindow['STK']['core']['util']['listener'].remove(sChannel, sEventType, fCallBack);
				}
				else {
					if (dispatchList[sChannel]) {
						if (dispatchList[sChannel][sEventType]) {
							for (var i = 0, len = dispatchList[sChannel][sEventType].length; i < len; i++) {
								if (dispatchList[sChannel][sEventType][i] === fCallBack) {
									dispatchList[sChannel][sEventType].splice(i, 1);
									break;
								}
							}
						}
					}
				}
			},
			list: function(){
				return dispatchList;
			},
			cache: function(sChannel, sEventType){
				if (topWindow != null) {
					return topWindow.listener.cache(sChannel, sEventType);
				}
				else {
					if (dispatchList[sChannel] && dispatchList[sChannel][sEventType]) {
						return dispatchList[sChannel][sEventType].data_cache;
					}
				}
			}
		};
		return dispatch;
	})();
});

/**
 * Get page size
 * @id STK.core.util.pageSize
 * @alias STK.core.util.pageSize
 * @param {Element} _target
 * @return {Array} n
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.pageSize(t) === [pageWidth, pageHeight, windowWidth, windowHeight];
 */
/**
 * Get window's size
 * @id STK.core.util.winSize
 * @alias STK.core.util.winSize
 * @param {Element} _target
 * @return {Object} n
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.winSize(t) === {'width':100,'height':100};
 */
STK.register('core.util.winSize', function($){
	return function(_target){
		var w, h;
		if (_target) {
			target = _target.document;
		}
		else {
			target = document;
		}
		
		if(target.compatMode === "CSS1Compat") {
			w = target.documentElement[ "clientWidth" ];
			h = target.documentElement[ "clientHeight" ];
		}else if (self.innerHeight) { // all except Explorer
			if (_target) {
				target = _target.self;
			}
			else {
				target = self;
			}
			w = target.innerWidth;
			h = target.innerHeight;
			
		}else if (target.documentElement && target.documentElement.clientHeight) { // Explorer 6 Strict Mode
			w = target.documentElement.clientWidth;
			h = target.documentElement.clientHeight;
				
		}else if (target.body) { // other Explorers
			w = target.body.clientWidth;
			h = target.body.clientHeight;
		}
		return {
			width: w,
			height: h
		};
	};
});

STK.register('core.util.pageSize', function($){
	return function(_target){
		if (_target) {
			target = _target.document;
		}
		else {
			target = document;
		}
		var _rootEl = (target.compatMode == "CSS1Compat" ? target.documentElement : target.body);
		var xScroll, yScroll;
		var pageHeight,pageWidth;
		if (window.innerHeight && window.scrollMaxY) {
			xScroll = _rootEl.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		}
		else 
			if (_rootEl.scrollHeight > _rootEl.offsetHeight) {
				xScroll = _rootEl.scrollWidth;
				yScroll = _rootEl.scrollHeight;
			}
			else {
				xScroll = _rootEl.offsetWidth;
				yScroll = _rootEl.offsetHeight;
			}
		var win_s = $.core.util.winSize(_target);
		if (yScroll < win_s.height) {
			pageHeight = win_s.height;
		}
		else {
			pageHeight = yScroll;
		}
		if (xScroll < win_s.width) {
			pageWidth = win_s.width;
		}
		else {
			pageWidth = xScroll;
		}
		return {
			'page':{
				width: pageWidth,
				height: pageHeight
			},
			'win':{
				width: win_s.width,
				height: win_s.height
			}
		};
	};
});

/**
 * queue [static]
 * @id STK.core.util.queue
 * @alias STK.core.util.queue
 * @return {
		'add':
		'get':
	}
 * @example
	var test = STK.core.util.queue();
	test.add('test');
	test.get() === 'test';
 */
STK.register('core.util.queue', function($){
	return function(){
		var that = {};
		var que = [];
		that.add = function(item){
			que.push(item);
			return that;
		};
		that.get = function(){
			if (que.length > 0) {
				return que.shift();
			}
			else {
				return false;
			}
		};
		return that;
	};
});

/**
 * 获取滚动条的上下位置
 * @id STK.core.util.scrollTo
 * @alias STK.core.util.scrollTo
 * @param {Element} target 需要现实的元素
 * @param {Object} spec {
 * 			'box' : 滚动条所在元素,默认页面滚动条,
			'top' : 距顶高度,默认0,
			'step' : 速度10为一次到目标,默认2,
			'onMoveStop' : 移动执行完的函数
 * 		}
 * @return {void}
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
 * STK.core.util.scrollTo($('test'));
 */

/**
 * timer manager [static]
 * @id STK.core.util.timer
 * @alias STK.core.util.timer
 * @method {String} add(fun)
 * @method {Timer} remove(key)
 * @method {Timer} pause(key)
 * @method {Timer} play(key)
 * @method {Timer} stop(key)
 * @method {Timer} start(key)
 * @method {Timer} loop(key)
 * @method {String} get(sKey)
 * @method {String} set(sKey,value)
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example
	var key = STK.core.util.timer.add(function(){console.log('test')});
	STK.core.util.timer.pause(key);
	STK.core.util.timer.play(key);
	STK.core.util.timer.stop(key);
	STK.core.util.timer.start(key);
	STK.core.util.timer.loop(key);
	STK.core.util.timer.remove(key);
 */
STK.register('core.util.timer', function($){
	return (function(){
		var that = {};
		
		
		var list = {};
		
		var refNum = 0;
		var clock = null;
		var allpause = false;
		
		var delay = 25;
		
		var loop = function(){
			for (var k in list) {
				if (!list[k]['pause']) {
					list[k]['fun']();
				}
			}
			return that;
		};
		
		that.add = function(fun){
			if (typeof fun != 'function') {
				throw ('The timer needs add a function as a parameters');
			}
			var key = '' +
			(new Date()).getTime() +
			(Math.random()) * Math.pow(10, 17);
			
			list[key] = {
				'fun': fun,
				'pause': false
			};
			if (refNum <= 0) {
				that.start();
			}
			refNum++;
			return key;
		};
		
		that.remove = function(key){
			if (list[key]) {
				delete list[key];
				refNum--;
			}
			if (refNum <= 0) {
				that.stop();
			}
			return that;
		};
		
		that.pause = function(key){
			if (list[key]) {
				list[key]['pause'] = true;
			}
			return that;
		};
		
		that.play = function(key){
			if (list[key]) {
				list[key]['pause'] = false;
			}
			return that;
		};
		
		that.stop = function(){
			clearInterval(clock);
			clock = null;
			return that;
		};
		
		that.start = function(){
			clock = setInterval(loop, delay);
			return that;
		};
		
		that.loop = loop;
		that.get = function(key){
			if (key === 'delay') {
				return delay;
			}
			if (key === 'functionList'){
				return list;
			}
		};
		
		that.set = function(key,value){
			if(key === 'delay'){
				if(typeof value === 'number'){
					delay = Math.max(25,Math.min(value,200));
				}
			}
		};
		return that;
	})();
});

STK.register('core.util.scrollTo',function($){
	return function(target,spec){
		if(!$.core.dom.isNode(target)){
			throw 'core.dom.isNode need element as the first parameter';
		}
		var conf = $.core.obj.parseParam({
			'box' : document.documentElement,
			'top' : 0,
			'step' : 2,
			'onMoveStop' : null
		},spec);
		conf.step = Math.max(2,Math.min(10,conf.step));
		var orbit = [];
		var targetPos = $.core.dom.position(target);
		var boxPos;
		if(conf['box'] == document.documentElement){
			boxPos = {'t':0};
		}else{
			boxPos = $.core.dom.position(conf['box']);
		}
		
		var pos = Math.max(0, (targetPos ? targetPos['t'] : 0) - (boxPos ? boxPos['t'] : 0) - conf.top);
		var cur = conf.box === document.documentElement ? (conf.box.scrollTop || document.body.scrollTop || window.pageYOffset) : conf.box.scrollTop;
		while(Math.abs(cur - pos) > conf.step && cur !== 0){
			orbit.push(Math.round(cur + (pos - cur)*conf.step/10));
			cur = orbit[orbit.length - 1];
		}
		if(!orbit.length){
			orbit.push(pos);
		}
		var tm = $.core.util.timer.add(function(){
			if(orbit.length){
				if(conf.box === document.documentElement){
					window.scrollTo(0,orbit.shift());
				}else{
					conf.box.scrollTop = orbit.shift();
				}
				
			}else{
				if(conf.box === document.documentElement){
					window.scrollTo(0,pos);
				}else{
					conf.box.scrollTop = pos;
				}
				$.core.util.timer.remove(tm);
				if(typeof conf.onMoveStop === 'function'){
					conf.onMoveStop();
				}
			}
		});
	};
});
/**
 * queue [static]
 * @id STK.core.util.stack
 * @alias STK.core.util.stack
 * @return {
		'add':
		'get':
	}
 * @example
	var test = STK.core.util.stack();
	test.add('test');
	test.get() === 'test';
 */
STK.register('core.util.stack', function($){
	return function(){
		var that = {};
		var stak = [];
		that.add = function(item){
			stak.push(item);
			return that;
		};
		that.get = function(){
			if (stak.length > 0) {
				return stak.pop();
			}
			else {
				return false;
			}
		};
		return that;
	}
});

/**
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * STK.core.util.swf.create(STK.E('box'), 'x.swf', 详见getSWF里的cfg);
 */
STK.register('core.util.swf', function($){
	function getSWF(sURL, oOpts){
		
		var cfg = $.core.obj.parseParam({
			'id': 'swf_' + parseInt(Math.random() * 10000, 10),
			'width': 1,
			'height': 1,
			'attrs': {},
			'paras': {},
			'flashvars': {},
			'html': ''
		}, oOpts);
		
		if (sURL == null) {
			throw 'swf: [sURL] 未定义';
			return;
		}
		var key;
		var html = [];
		var attrs = [];
		for (key in cfg.attrs) {
			attrs.push(key + '="' + cfg.attrs[key] + '" ');
		}
		
		var flashvars = [];
		for (key in cfg.flashvars) {
			flashvars.push(key + '=' + cfg.flashvars[key]);
		}
		cfg.paras['flashvars'] = flashvars.join('&');
		
		if ($.IE) {
			// 头部
			html.push('<object width="' +
			cfg.width +
			'" height="' +
			cfg.height +
			'" id="' +
			cfg.id +
			'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ');
			
			// 属性写入
			html.push(attrs.join(''));
			
			// 结束属性标签并为IE写入url(兼容)
			html.push('><param name="movie" value="' + sURL + '" />');
			
			// 参数写入(FlashVars已经在前文填入到参数里了)
			for (key in cfg.paras) {
				html.push('<param name="' + key + '" value="' + cfg.paras[key] + '" />');
			}
			html.push('</object>');
			
		}
		else {
			// 头部
			html.push('<embed width="' +
			cfg.width +
			'" height="' +
			cfg.height +
			'" id="' +
			cfg.id +
			'" src="' +
			sURL +
			'" type="application/x-shockwave-flash" ');
			
			// 属性写入
			html.push(attrs.join(''));
			
			// 参数写入(FlashVars已经在前文填入到参数里了)
			for (key in cfg.paras) {
				html.push(key + '="' + cfg.paras[key] + '" ');
			}
			
			html.push(' />');
		}
		cfg.html = html.join('');
		return cfg;
	}
	var that = {};
	that.create = function(sNode, sURL, oOpts){
		var oElement = $.E(sNode);
		if (oElement == null) {
			throw 'swf: [' + sNode + '] 未找到';
			return;
		}
		var swf_info = getSWF(sURL, oOpts);
		
		oElement.innerHTML = swf_info.html;
		
		return $.E(swf_info.id);
	};
	that.html = function(sURL, oOpts){
		var swf_info = getSWF(sURL, oOpts);
		return swf_info.html;
	};
	that.check = function() {
		var description = -1;
		if ($.IE) {
			try{
				var flash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
				description = flash.GetVariable('$version');
			}catch(exp){
				
			}
		}
		else {
			if (navigator.plugins["Shockwave Flash"]){
				description = navigator.plugins["Shockwave Flash"]['description'];
			}
		}
		return description;
	};
	return that;
});

/**
 * 类Freemarker风格的模版
 * @id STK.core.util.easyTemplate
 * @param {Object} s
 * @param {Object} d
 * @author dh20156
 * @see http://www.w3cgroup.com/article.asp?id=300
 * <#et tname dataname> //模板开始标签，tname为此模板的名称，dataname为此模板中用到的数据名称
 * <#if (condition)>
 * <#elseif (condition)>
 * <#else>
 * </#if>
 * ${x?a:b} //三元表达式，最后不能加分号"；" 注意：在所有的 {} 中都不能出现分号！
 * <#list List as list> //遍历一个数组对象
 * ${list_index} //在此次遍历中的当前索引
 * ${list.xxx} //取值
 * </#list> //结束遍历
 * </#et> //模板结束标签
 * 
 * 
 * @example：
 * var x = easyTemplate(sTemplate,oData);
 * 或者当一个模板不变，数据经常变动时可以这样使用：
 * //先将模板解析好以备用
 * var tp = easyTemplate(sTemplate);
 * //在需要用新的数据渲染该模板时调用：
 * var shtml = tp(oData);
 */
STK.register('core.util.easyTemplate', function($){
	var easyTemplate = function(s,d){
		if(!s){return '';}
		if(s!==easyTemplate.template){
			easyTemplate.template = s;
			easyTemplate.aStatement = easyTemplate.parsing(easyTemplate.separate(s));
		}
		var aST = easyTemplate.aStatement;
		var process = function(d2){
			if(d2){d = d2;}
			return arguments.callee;
		};
		process.toString = function(){
			return (new Function(aST[0],aST[1]))(d);
		};
		return process;
	};
	easyTemplate.separate = function(s){
		var r = /\\'/g;
		var sRet = s.replace(/(<(\/?)#(.*?(?:\(.*?\))*)>)|(')|([\r\n\t])|(\$\{([^\}]*?)\})/g,function(a,b,c,d,e,f,g,h){
			if(b){return '{|}'+(c?'-':'+')+d+'{|}';}
			if(e){return '\\\'';}
			if(f){return '';}
			if(g){return '\'+('+h.replace(r,'\'')+')+\'';}
		});
		return sRet;
	};
	easyTemplate.parsing = function(s){
		var mName,vName,sTmp,aTmp,sFL,sEl,aList,aStm = ['var aRet = [];'];
		aList = s.split(/\{\|\}/);
		var r = /\s/;
		while(aList.length){
			sTmp = aList.shift();
			if(!sTmp){continue;}
			sFL = sTmp.charAt(0);
			if(sFL!=='+'&&sFL!=='-'){
				sTmp = '\''+sTmp+'\'';aStm.push('aRet.push('+sTmp+');');
				continue;
			}
			aTmp = sTmp.split(r);
			switch(aTmp[0]){
				case '+et':mName = aTmp[1];vName = aTmp[2];aStm.push('aRet.push("<!--'+mName+' start--\>");');break;
				case '-et':aStm.push('aRet.push("<!--'+mName+' end--\>");');break;
				case '+if':aTmp.splice(0,1);aStm.push('if'+aTmp.join(' ')+'{');break;
				case '+elseif':aTmp.splice(0,1);aStm.push('}else if'+aTmp.join(' ')+'{');break;
				case '-if':aStm.push('}');break;
				case '+else':aStm.push('}else{');break;
				case '+list':aStm.push('if('+aTmp[1]+'.constructor === Array){with({i:0,l:'+aTmp[1]+'.length,'+aTmp[3]+'_index:0,'+aTmp[3]+':null}){for(i=l;i--;){'+aTmp[3]+'_index=(l-i-1);'+aTmp[3]+'='+aTmp[1]+'['+aTmp[3]+'_index];');break;
				case '-list':aStm.push('}}}');break;
				default:break;
			}
		}
		aStm.push('return aRet.join("");');
		return [vName,aStm.join('')];
	};
	
	return easyTemplate;
});

//$Import('core.util.storage');
﻿/**
 * PageLet资源管理器
 * 1.PageLet模块的注册
 * 2.PageLet模块的显示
 * 3.对PageLet模块css+js资源的加载及缓存
 * 4.对单个或所有PageLet模块的启动
 * 5.对单个或所有PageLet模块的清理
 * 6.统一启动模块
 * @id STK.core.util.pageletM
 * @author Finrila | wangzheng4@staff.sina.com.cn
 * @import STK.core.dom.ready
 * @import STK.core.util.hideContainer
 * @import STK.core.dom.getStyle
 * @import STK.core.io.scriptLoader
 * @import STK.core.func.timedChunk
 */

STK.register('core.util.pageletM', function($) {
    var JSHOST = "http://js.t.sinajs.cn/t4/";
    var CSSHOST = "http://img.t.sinajs.cn/t4/";

    if (typeof $CONFIG != "undefined") {
        JSHOST = $CONFIG.jsPath || JSHOST;
        CSSHOST = $CONFIG.cssPath || CSSHOST;
    }
    var arrIndexOf = $.core.arr.indexOf;
    //缓存
    var fileCache = {},//{url:{loaded:true, list:[]}}
 		nowFilterTarget,
		nsCache = {},
		nsThatCache = {},
		cssIDInBodyCache = {},//{cssID: {cssURL, styleID}}
		pidCache = {};//{pid:{js:{jsURL: 1},css:{cssURL: 1}}}
	
	var styleCache,//｛styleID->cssID Array[]｝
		getStyleSheetObject;
	if($.IE) {
		styleCache = {};
		
		/**
		 * 得到一个有空闲的style节点
		 * @return {Object} {
		 * 	styleID:
		 *  styleSheet:
		 * }
		 */
		getStyleSheetObject = function() {
			var styleID, styleSheet, styleElement;
			for(styleID in styleCache) {
				if(styleCache[styleID].length < 31) {
					styleElement = $.E(styleID);
					break;
				}
			}
			if(!styleElement) {
				styleID = 'style_' + $.core.util.getUniqueKey(),
				styleElement = document.createElement('style');
				styleElement.setAttribute('type', 'text/css');
				styleElement.setAttribute('id', styleID);
				document.getElementsByTagName('head')[0].appendChild(styleElement);
				styleCache[styleID] = [];
			}
			return {
				'styleID': styleID,
				'styleSheet': styleElement.styleSheet || styleElement.sheet
			};
		};
	}

	var createLinkAndCache = function(cssID, cssURL) {
		cssIDInBodyCache[cssID] = {cssURL: cssURL};
		if($.IE) {//ie下使用styleSheet addImport方法加载css
			var sheetObj = getStyleSheetObject();
			sheetObj.styleSheet.addImport(cssURL);
			styleCache[sheetObj.styleID].push(cssID);
			cssIDInBodyCache[cssID].styleID = sheetObj.styleID;
		} else {//css下载模块 非ie下
			var link = $.C('link');
			link.setAttribute('rel', 'Stylesheet');
			link.setAttribute('type', 'text/css');
			link.setAttribute('charset', 'utf-8');
			link.setAttribute('href', cssURL);
			link.setAttribute('id', cssID);
			document.getElementsByTagName('head')[0].appendChild(link);
		}
	};
	
	//pl依赖等待对象 pid->fn
	var noBoxPageletCheckCache = {};
	/**
	 * 检测pl是否在页面上存在，如果不存在将其设置到pl依赖等待对象
	 * 如果存在回调fn(box)
	 * @param {Object} pid
	 * @param {Object} fn 
	 */
	var checkPageletBox = function(pid, fn) {
		var box = $.E(pid);
		if(box) {
			fn(box);
			noBoxPageletCheckCache[pid] && delete noBoxPageletCheckCache[pid];
			for(var i in noBoxPageletCheckCache) {
				checkPageletBox(i, noBoxPageletCheckCache[i]);
			}
		} else {
			noBoxPageletCheckCache[pid] = fn;
		}
	};
	
	/**
	 * @param {Object} cssID
	 */
	var deleteLinkAndCache = function(cssID) {
		if($.IE) {
			var styleID = cssIDInBodyCache[cssID].styleID;
			var sheetArray = styleCache[styleID];
			var styleElement = $.E(styleID);
			if((sheetID = arrIndexOf(cssID, sheetArray)) > -1) {
				(styleElement.styleSheet || styleElement.sheet).removeImport(sheetID);
				sheetArray.splice(sheetID, 1);
			}
		} else {
			$.core.dom.removeNode($.E(cssID));
		}
		delete fileCache[cssIDInBodyCache[cssID].cssURL];
		delete cssIDInBodyCache[cssID];
	};
	
	
	
	/**
	 * 检测pid在页面上的存在性及添加新的pid到cache
	 * @param {Object} pid
	 */
	var checkPidCache = function(pid, jsArray, cssArray) {
		for(var i in pidCache) {
			if(!$.E(i)) {
				delete pidCache[i];
			}
		}
		pidCache[pid] = {
			js: {},
			css: {}
		};
		if(cssArray) {
			for(var i = 0, len = cssArray.length; i < len; ++i) {
				pidCache[pid].css[CSSHOST + cssArray[i]] = 1;
			}
		}
	};
	
	var deleteUselessLinks = function() {
		for(var cssID in cssIDInBodyCache) {
			var iUsed = false,
				cssURL = cssIDInBodyCache[cssID].cssURL;
			for(var pid in pidCache) {
				if(pidCache[pid].css[cssURL]) {
					iUsed = true;
					break;
				}
			}
			if(!iUsed) {
				deleteLinkAndCache(cssID);
			}
		}
	};

    /**
     * 在缓存中检查该地址是否已经下载或正在下载
     * 已经下载接回调， 正在下载加入队列 第一次下载需要启动文件下载模块
     * @param {Object} url
     * @param {Object} complete
     * @return {boolean} true/false //是否需要启动文件下载模块
     */
    var checkFileCache = function(url, complete) {
        var theFileCache = fileCache[url] || (fileCache[url] = {
            loaded: false,
            list: []
        });
        if (theFileCache.loaded) {
            complete(url);
            return false;
        }
        theFileCache.list.push(complete);
        if (theFileCache.list.length > 1) {
            return false;
        }
        return true;
    };
    
    /**
     * 从缓存方法列表中回调文件加载完成事件
     * @method callbackFileCacheList
     * @private
     * @param {String} url 文件地址
     */
    var callbackFileCacheList = function(url) {
        var cbList = fileCache[url].list;
		if (cbList) {
			for (var i = 0; i < cbList.length; i++) {
				cbList[i](url);
			}
			fileCache[url].loaded = true;
			delete fileCache[url].list;
		}
    };
    
    /**
     * css加载 超时处理30秒为超时时间
     * @method cssLoader
     * @private
     * @param {Object} spec
     * {
     * 	url: {String}  css地址
     *  load_ID: {String} 约定的css加载检测ID
     *  complete: {Function} 加载完成时的事件回调
     *  pid: {String} 该css应用的模块容器id
     * }
     */
    var cssLoader = function(spec) {
		var url = spec.url,
			load_ID = spec.load_ID,
			complete = spec.complete,
			pid = spec.pid,
			cssURL = CSSHOST + url,
			cssID = 'css_' + $.core.util.getUniqueKey();
        if (!checkFileCache(cssURL, complete)) {
            return;
		}
		
		createLinkAndCache(cssID, cssURL);
        
		var load_div = $.C('div');
        load_div.id = load_ID;
        $.core.util.hideContainer.appendChild(load_div);
		
        var _rTime = 3000;//3000*10
        var timer = function() {
            if (parseInt($.core.dom.getStyle(load_div, 'height')) == 42) {
                $.core.util.hideContainer.removeChild(load_div);
				callbackFileCacheList(cssURL);
                return;
            }
            if (--_rTime > 0) {
                setTimeout(timer, 10);
            }
            else {
                $.log(cssURL + "timeout!");
                $.core.util.hideContainer.removeChild(load_div);
				callbackFileCacheList(cssURL);
                //加载失败清除缓存
                deleteLinkAndCache(cssID);
				createLinkAndCache(cssID, cssURL);
            }
        };
        setTimeout(timer, 50);
    };
    
    /**
     * js加载 超时处理60秒为超时时间
     * @method jsLoader
     * @private
     * @param {String} url js地址
     * @param {Function} complete 加载完成时的事件回调
     */
    var jsLoader = function(url, complete) {
		var jsRUL = JSHOST + url;
        if (!checkFileCache(jsRUL, complete)) {
			return;
		}
        //js下载模块
        $.core.io.scriptLoader({
            'url': jsRUL,
            onComplete: function() {
                callbackFileCacheList(jsRUL);
            },
            onTimeout: function() {
                $.log(jsRUL + "timeout!");
                //加载失败清除缓存
                delete fileCache[jsRUL];
            }
        });
    };
    
    /**
     * 注册
     * @method register
     * @static
     * @param {Object} ns
     * @param {Object} fn
     */
    var register = function(ns, fn){
        if (!nsCache[ns]) {
            nsCache[ns] = fn;
        }
    };
    
    /**
     * 启动
     * @method start
     * @static
     * @param {String} ns 
     */
    var start = function(ns){
        if (ns) {
            if (nsCache[ns]) {
				//try {
					nsThatCache[ns] || (nsThatCache[ns] = nsCache[ns]($));
				//}catch(e){
					//$.log(ns, e);
				//}
            } else {
                $.log("start:ns=" + ns + " ,have not been registed");
            }
            return;
        }
        var nsArray = [];
        for (ns in nsCache) {
            nsArray.push(ns);
        }
        $.core.func.timedChunk(nsArray, {
            'process': function(ns){
				//try {
					nsThatCache[ns] || (nsThatCache[ns] = nsCache[ns]($));
				//}catch(e) {
					//$.log(ns, e);
				//}
            }
        });
    };
    
    /**
     * 响应管道的动态加载模块
     * pid在页面上存在或不存在并且无html
     * @method view
     * @static
     * @param {Object} opts
     * {
     * 	pid:"pl_xxx",//plc的ID属性 必选
     * 	html:"",//将要写到plc的html内容 如果不想替换原plc的内容请不要写该属性(""视为对plc的清空) 可选
     *  js:["xxx.js", "xxx.js"],//plc依赖的js文件的地址列表  可选
     *  css:["xxx.css", "xxx.css"]//plc依赖的css文件的地址列表  可选
     * }
     */
    var view = function(opts) {
		
        var cssLoadNum = 1, ns, pid, html, cssArray, jsArray, cssComplete, jsComplete;
        
		opts = opts || {};
		pid = opts.pid;
		html = opts.html;
        jsArray = opts.js ? [].concat(opts.js) : [];
		cssArray = opts.css ? [].concat(opts.css) : [];
		
		if(pid == undefined) {
			$.log("node pid["+pid+"] is undefined");
			return;
		}
		checkPidCache(pid, jsArray, cssArray);
		
        cssComplete = function() {
            if (--cssLoadNum > 0)
                return;
			
			checkPageletBox(pid, function(box) {
				//css完成 页面渲染
				(html != undefined) && (box.innerHTML = html);
				if (jsArray.length > 0) {
					jsComplete();
				}
				deleteUselessLinks();
			});
			
        };
        jsComplete = function(url) {
            if (jsArray.length > 0) {
                jsLoader(jsArray.shift(), jsComplete);
            }
            if (url && url.indexOf("/pl/") != -1) {
                var ns = url.replace(/^.*?\/(pl\/.*)\.js\??.*$/, "$1").replace(/\//g, ".");
				clear(ns);
				start(ns);
            }
        };
        if (cssArray.length > 0) {
            cssLoadNum += cssArray.length;
            for (var i = 0, cssI; (cssI = cssArray[i]); i++) {
                cssLoader({
					url: cssI,
					load_ID: "js_" + cssI.replace(/^\/?(.*)\.css\??.*$/i, "$1").replace(/\//g, "_"),
					complete: cssComplete,
					pid: pid
				});
            }
        }
        cssComplete();
		
    };
    
    /**
     * 清理
     * @method clear
     * @static
     * @param {Object} ns
     */
    var clear = function(ns) {
        if (ns) {
            if (nsThatCache[ns]) {
				$.log("destroy:"+ ns);
				try {
					nsThatCache[ns].destroy();
				} catch(e) {
					$.log(e);
				}
				delete nsThatCache[ns];
            }
            return;
        }
        for (ns in nsThatCache) {
			$.log("destroy:"+ ns);
			try {
				nsThatCache[ns] && nsThatCache[ns].destroy && nsThatCache[ns].destroy();
			} catch(e) {
				$.log(ns, e);
			}
        }
        nsThatCache = {};
    };
    
    var that = {
        register: register,
        start: start,
        view: view,
        clear: clear,
		/**
		 * 销毁
		 * @method destroy
		 * @static
		 */
		destroy: function() {
			that.clear();
			fileCache = {};
			nsThatCache = {};
			nsCache = {};
 			nowFilterTarget = undefined;
		}
    };
	$.core.dom.ready(function() {
		$.core.evt.addEvent(window, "unload", function() {
			$.core.evt.removeEvent(window, "unload", arguments.callee);
			that.destroy();
		});
	});
    return that;
});



(function(){
	var $ = STK.core;
	var hash = {

		'tween'			: $.ani.tween,
		'tweenArche'	: $.ani.tweenArche,

		'arrCopy'		: $.arr.copy,
		'arrClear'		: $.arr.clear,
		'hasby'			: $.arr.hasby,
		'unique'		: $.arr.unique,
		'foreach'		: $.arr.foreach,
		'isArray'		: $.arr.isArray,
		'inArray'		: $.arr.inArray,
		'arrIndexOf'	: $.arr.indexOf,
		'findout'		: $.arr.findout,
		
		'domNext'		: $.dom.next,
		'domPrev'		: $.dom.prev,
		'isNode'		: $.dom.isNode,
		'addHTML'		: $.dom.addHTML,
		'insertHTML'	: $.dom.insertHTML,
		'setXY'			: $.dom.setXY,
		'contains'		: $.dom.contains,
		'position'		: $.dom.position,
		'trimNode'		: $.dom.trimNode,
		'insertAfter'	: $.dom.insertAfter,
		'insertBefore'	: $.dom.insertBefore,
		'removeNode'	: $.dom.removeNode,
		'replaceNode'	: $.dom.replaceNode,
		'Ready'			: $.dom.ready,
		'setStyle'		: $.dom.setStyle,
		'setStyles'		: $.dom.setStyles,
		'getStyle'		: $.dom.getStyle,
		'addClassName'	: $.dom.addClassName,
		'hasClassName'	: $.dom.hasClassName,
		'removeClassName'	: $.dom.removeClassName,
		'builder'		: $.dom.builder,
		'cascadeNode'	: $.dom.cascadeNode,
		'selector'		: $.dom.selector,
		'sizzle'		: $.dom.sizzle,

		'addEvent'		: $.evt.addEvent,
		'custEvent'		: $.evt.custEvent,
		'removeEvent'	: $.evt.removeEvent,
		'fireEvent'		: $.evt.fireEvent,
		'fixEvent'		: $.evt.fixEvent,
		'getEvent'		: $.evt.getEvent,
		'stopEvent'		: $.evt.stopEvent,
		'delegatedEvent': $.evt.delegatedEvent,
		'preventDefault': $.evt.preventDefault,
		'hotKey'		: $.evt.hotKey,
		
		'memorize'		: $.func.memorize,
		'bind'			: $.func.bind,
		'getType'		: $.func.getType,
		'methodBefore'	: $.func.methodBefore,
		'timedChunk'	: $.func.timedChunk,
		'funcEmpty'		: $.func.empty,
		
		'ajax'			: $.io.ajax,
		'jsonp'			: $.io.jsonp,
		'ijax'			: $.io.ijax,
		'scriptLoader'	: $.io.scriptLoader,
		'require'		: $.io.require,
				
		'jsonInclude'	: $.json.include,
		'jsonCompare'	: $.json.compare,
		'jsonClone'		: $.json.clone,
		'jsonToQuery'	: $.json.jsonToQuery,
		'queryToJson'	: $.json.queryToJson,
		'jsonToStr'		: $.json.jsonToStr,
		'strToJson'		: $.json.strToJson,
		
		'objIsEmpty'	: $.obj.isEmpty,
		'beget'			: $.obj.beget,
		'cascade'		: $.obj.cascade,
		'objSup'		: $.obj.sup,
		'parseParam'	: $.obj.parseParam,
		
		'bLength'		: $.str.bLength,
		'dbcToSbc'		: $.str.dbcToSbc,
		'leftB'			: $.str.leftB,
		'trim'			: $.str.trim,
		'encodeHTML'	: $.str.encodeHTML,
		'decodeHTML'	: $.str.decodeHTML,
		'parseURL'		: $.str.parseURL,
		'parseHTML'		: $.str.parseHTML,
		'queryString'	: $.str.queryString,
		
		'htmlToJson'	: $.util.htmlToJson,
		'cookie'		: $.util.cookie,
		'drag'			: $.util.drag,
		'timer'			: $.util.timer,
		'jobsM'			: $.util.jobsM,
		'listener'		: $.util.listener,
		'winSize'		: $.util.winSize,
		'pageSize'		: $.util.pageSize,
		'templet'		: $.util.templet,
		'queue'			: $.util.queue,
		'stack'			: $.util.stack,
		'swf'			: $.util.swf,
		'URL'			: $.util.URL,
		'scrollPos'		: $.util.scrollPos,
		'scrollTo'		: $.util.scrollTo,
		'getUniqueKey'	: $.util.getUniqueKey,
		'storage'		: $.util.storage,
		'pageletM'		: $.util.pageletM
	};
	for(var k in hash){
		STK.regShort(k,hash[k]);
	}
})();
