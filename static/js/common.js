var $ = require('./jquery-2.2.4.js');
var loadingTemp = require('../../temp/usual/loadingTost');//途径站点模板

var host_name = window.location.hostname;
var environment = '';
var a_href = '';

var cwCommonInit = function()
{
    // ajax请求时loading动画
    $(document).ajaxStart(function()
    {
        ddCommon.loadingFunc('show','loading');
    }).ajaxStop(function()
    {
        ddCommon.loadingFunc('hide');
    });

    // 根据主机名区分开发环境
    switch(host_name)
    {
        // case 'ddcw.com'://测试环境
        case 'ddb.cw.com'://测试环境
            // environment = 'dev';//开发环境
            // break;
        case 'localhost'://测试环境
            environment = 'test';
            a_href = '/public/web';
            break;
        case 'cw.dudubashi.com'://生产环境
            environment = 'production';
            a_href = '/public/web';
            break;
        default:
            environment = 'dev';//开发环境
            a_href = '';
            break;
    }
}();

var ddCommon =
{
    _environment: environment,
    _a_href: a_href,
    /**
     * 位置搜索关键词提示
     * 使用这个函数的时候需要引入
     * <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=b2tdmZtPCKfwW8iwn5svaT03"><\/script>
     * @param {[style]} obj_name [input框 id名]
     */
    BMap_Autocomplete: function(obj_name, type, f_info)
    {
        var type = type || false;
        var f_info = f_info || false;

        // 百度地图API功能
        function G(id)
        {
            return document.getElementById(id);
        }
        // 初始化地图,设置城市和地图级别。
        var _input = $('#'+obj_name);
        var current_val = _input.val();
        _input.after('<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>');

        // 创建
        var myGeo = new BMap.Geocoder();
        // 建立一个自动完成的对象
        var ac = new BMap.Autocomplete(
        {
            "input" : obj_name,
            "location" : null,
            "types" : type
        });
        ac.setInputValue(current_val);
        // 鼠标放在下拉列表上的事件
        ac.addEventListener("onhighlight", function(e)
        {
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1)
            {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1)
            {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        // 鼠标点击下拉列表后的事件
        ac.addEventListener("onconfirm", function(e)
        {
            var _value = e.item.value;
            // 正常关键词提示
            if (type === false)
            {
                myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            }
            else // 自动定位关键词所在区域 省市区
            {
                myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                var _location;
                var t_desc;
                myGeo.getPoint(myValue, function(point)
                {
                    if (point)
                    {
                        myGeo.getLocation(point, function(cr)
                        {
                            _location = cr.addressComponents;
                            //myValue = _location.province +  _location.city +  _location.district;
                            myValue =  _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                            ac.setInputValue(myValue);
                            t_desc = _location.province+','+_location.city+','+_location.district+','+point.lng+','+point.lat;
                            // 省市区放到隐藏域
                            if(obj_name !== false)
                            {
                                $("#"+obj_name).attr('info',t_desc);
                            }
                            return false;
                        });
                    }
                    else
                    {
                        alert('对不起, 该地址无法自动定位, 请手动输入');
                        return false;
                    }
                });
            }
        });
    },

    /**
     * [getQueryString 获取url参数]
     * @param  {[type]} name [参数key]
     */
    getQueryString: function(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    },

    /**
     * [ajaxPost post请求函数]
     * @param  [string] url         [请求url]
     * @param  [object] params      [请求参数]
     * @param  [function] successFunc [成功后的回调函数]
     */
    ajaxPost: function(url, params, successFunc)
    {
        var removeJSFunc = function(fun)
        {
            // 从window移除一个由addEventListenr绑定函数(fun为需要被移除的函数)
            window.removeEventListener('message', fun);
        };
        var response = {};  //返回数据
        switch(ddCommon._environment)
        {
            case 'dev': // 开发环境，走mock假数据
                //完善mack_url
                // var param_url = '/api'+ url;
                // break;

                //获取或者创建iframe元素
                var iframe = document.querySelector('iframe') ? document.querySelector('iframe') : document.createElement('iframe');
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                iframe.src = 'http://cwtest.dudubashi.com/admin/czyAjax';

                // iframe加载完毕时post数据
                iframe.onload = function()
                {
                    var win = iframe.contentWindow;
                    var send_data = {url:url,params:params};
                    win.postMessage(send_data,"http://cwtest.dudubashi.com");
                    window.addEventListener("message",function(res)
                    {
                        successFunc(res.data);
                        // 执行后需要移除事件监听，否则会保留之前请求过的接口，导致接口不停的重复调用
                        // 调用移除绑定的方法，arguments.callee指本函数，即函数自身
                        removeJSFunc(arguments.callee);
                    },false);
                };
                break
            default: //测试环境、生产环境直接本地请求
                var param_url = url
                $.post(param_url,params,function(res)
                {
                    successFunc(res);
                },'json');
                break;
        }
    },

    /**
     * [loadingFunc 显示loading动画]
     * @param  {string} action [显示或者关闭]
     */
    loadingFunc: function(action, remind)
    {
        switch(action)
        {
            case 'show'://显示loading动画
                var loadingHtml = loadingTemp({text:remind});
                $('body').append(loadingHtml);
                break;

            case 'hide'://关闭
                $('#loadingToast').remove();
                break;
        }
    },

    /**
     * [loadingInit 自定义loading初始化，如果要重新定义loading的提示词，可调用该函数]
     */
    loadingInit: function(remind)
    {
        // ajax请求时loading动画
        $(document).ajaxStart(function()
        {
            ddCommon.loadingFunc('show',remind);
        }).ajaxStop(function()
        {
            ddCommon.loadingFunc('hide');
        });
    },

    /**
     * [alertConfirm 自定义alert提示弹框]
     */
    alertConfirm: function(option, callback)
    {
        var dialog_confirm = $(document).find('#dialog_confirm');
        if(dialog_confirm.length <= 0)
        {
            // 确认框 id 不存在，将 html 添加到 body 中
            var structure_html = '<section id="dialog_confirm" class="dd_wid_cover">'
            structure_html += '<div class="dd_wid">';
            structure_html += '<div class="dd_wid_title"><span id="confirm_title" class="dd_wid_title_words"></span></div>';
            structure_html += '<div class="dd_wid_content"><p id="word"></p><p id="text"></p></div>';
            structure_html += '<div class="dd_wid_btns">';
            structure_html += '<button class="dd_btn dd_btn_cancel primary">确定</button>';
            structure_html += '<button class="dd_btn dd_btn_s default">取消</button>';
            structure_html += '</div>';
            structure_html += '</div>';
            structure_html += '</section>';

            $('body').append(structure_html);
            dialog_confirm = $(document).find('#dialog_confirm');
        }

        if (option.hiddenTitle == true)
        {
            $('.dd_wid_title').hide();
        }
        else
        {
            $('.dd_wid_title').show();
        }

        if(option.cancelHide === true)
        {
            $('.default').hide();
            $('.primary').addClass('btn_confirm');
            $('.dd_wid_btns button').css({margin:' 0 30%'});
        }
        else
        {
            $('.default').show();
            $('.primary').removeClass('btn_confirm');
            $('.dd_wid_btns button').css({margin:' 0 10px'});
        }
        $('#confirm_title').html(option.title);
        $('#word').html(option.word);
        $('#text').html(option.text);
        $('.dd_btn_cancel').html(option.cancelBtnText);
        $('.dd_btn_s').html(option.confirmBtnText);
        dialog_confirm.css({display:'block'});
        dialog_confirm.on('click', '.dd_btn', function()
        {
            dialog_confirm.off('click').css({display:'none'});

            //包含 primary 表示“确认”按钮
            var isConfirm = false;
            if($(this).hasClass('primary')){
                isConfirm = true;
            }
            if($(this).hasClass('default')){
                isConfirm = false;
            }
            //用户确认完成，执行回调函数
            (callback && typeof(callback) === "function") && callback(isConfirm);
        });
    },

    /**
     * [promptDialog 自定义提示后自动消失提示弹框]
     */
    promptDialog: function(promptWord)
    {
        var showTime = null;
        var count = 2;      // 弹框显示的时间
        var dialog_1 = $(document).find('#dialog_1');
        if(dialog_1.length <= 0)
        {
            // 确认框 id 不存在，将 html 添加到 body 中
            var structure_html = '<div id="dialog_1" class="weui_dialog_alert">'
            structure_html += '<div class="weui_mask prompt_mask"></div>';
            structure_html += '<div class="weui_dialog prompt_dialog">';
            structure_html += '<div class="promptWord"></div>';
            structure_html += '</div>';
            structure_html += '</div>';

            $('body').append(structure_html);
            dialog_1 = $(document).find('#dialog_1');
        }

        $('.promptWord').html(promptWord);
        $('#dialog_1').css({display: "block"});//调用时显示弹框
        showTime = setInterval(function()
        {
            if(count > 0)
            {
                count--;
            }
            else if (count <= 0)
            {
                clearInterval(showTime);
                count = 2;
                $('#dialog_1').css({display: "none"});//2秒后弹框自动消失
            }
        },1000);
    },
    /**
     * [dateToStamp 日期转换成时间戳]
     * @return {[type]} [description]
     */
    dateToStamp: function(dateStr)
    {
        return new Date(Date.parse(dateStr.replace(/-/g, "/"))).getTime() / 1000;
    },
    /**
     * [formatDate 时间格式化 返回格式化的时间]
     * @param  {[object]} date   [可选参数，要格式化的date对象，没有则为当前时间]
     * @param  {[string]} format [格式化字符串，例如：'YYYY年MM月DD日 hh时mm分ss秒 星期' 'YYYY/MM/DD week' (中文为星期，英文为week)]
     * @return {[string]}        [返回格式化的字符串]
     *
     * 例子:
     * formatDate(new Date("january 01,2012"));
     * formatDate(new Date());
     * formatDate('YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY-MM-DD week');
     * formatDate(new Date("january 01,2012"),'YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY/MM/DD week');
     * formatDate(new Date("2016-11-05 17:27:34"), 'MM月DD日 星期 hh时mm分');
     *
     * 格式：
     * YYYY：4位年,如1993
     * YY：2位年,如93
     * MM：月份
     * DD：日期
     * hh：小时
     * mm：分钟
     * ss：秒钟
     * 星期：星期，返回如 星期二
     * 周：返回如 周二
     * week：英文星期全称，返回如 Saturday
     * www：三位英文星期，返回如 Sat
     */
    formatDate: function(date, format)
    {
        if (arguments.length < 2 && !date.getTime)
        {
            format = date;
            date = new Date();
        }
        typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
        var week =
        [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            '日',
            '一',
            '二',
            '三',
            '四',
            '五',
            '六'
        ];
        return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function(a){
            switch (a)
            {
                case "YYYY":
                    return date.getFullYear();
                case "YY":
                    return (date.getFullYear()+"").slice(2);
                case "MM":
                    return date.getMonth() + 1;
                case "DD":
                    return date.getDate();
                case "hh":
                    return date.getHours();
                case "mm":
                    return date.getMinutes();
                case "ss":
                    return date.getSeconds();
                case "星期":
                    return "星期" + week[date.getDay() + 7];
                case "周":
                    return "周" +  week[date.getDay() + 7];
                case "week":
                    return week[date.getDay()];
                case "www":
                    return week[date.getDay()].slice(0,3);
            }
        });
    }
};

module.exports = ddCommon;