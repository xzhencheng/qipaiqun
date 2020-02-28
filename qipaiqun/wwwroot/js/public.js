/**
 * Created by lxr on 2017/7/10.
 */

var baseHost = getHost();
var apiBaseUrl = 'https://api.' + baseHost;
var wwwBaseUrl = 'https://www.' + baseHost;
var skinBaseUrl = 'https://skin.' + baseHost;
var iBaseUrl = 'https://i.' + baseHost;
var mBaseUrl = 'https://m.' + baseHost;

function getHost(url) {
    var host = "null";
    if (typeof url == "undefined"
        || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/|:]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined"
        && null != match) {
        host = match[1];
    }
    if (typeof host != "undefined"
        && null != host) {
        var strAry = host.split(".");
        if (strAry.length > 1) {
            host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
        }
    }
    return host;
}

(function($){
    $.fn.myScroll = function(options){
        //默认配置
        var defaults = {
            speed:40,  //滚动速度,值越大速度越慢
            rowHeight:24 //每行的高度
        };

        var opts = $.extend({}, defaults, options),intId = [];

        function marquee(obj, step){

            obj.find("ul").animate({
                marginTop: '-=1'
            },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });
        });
    }
})(jQuery);

jQuery.extend({
    getContent: function (url, data, callback) {
        $.ajax({
            async: false,
            url: url,
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: data,
            cache: false,
            jsonpCallback: "success_" + callback,
            success: function (json) {
            }
        });
    }
});

try{
    var swiper2 = new Swiper('.swiper-container2', {
        loop: true,
        autoplay: 3000,
        direction: 'vertical',
        pagination : '.swiper-pagination',
        paginationClickable :true,
        preventClicks : false,
        autoplayDisableOnInteraction: false
    });
    var size = $('.scroll-list li').length;
    /*实时发布、我的关注大于3条时才可滚*/
    if(size > 3){
        $('.scroll-list').myScroll({
            speed: 40,
            rowHeight: 57
        });
    }
}catch(e){}

$(window).scroll(function() {
    var top = $(document).scrollTop();
    top > 600 ? $('.panel-r').show() : $('.panel-r').hide();
})
$('.search-ul>li').click(function(){
    $(this).addClass('cur').siblings().removeClass('cur');
    $('#selected').text($(this).html());
});
$('.backTop').click(function(){
    $('body,html').animate({ scrollTop: 0 }, 500);
});

/*提示框*/
function showTip(tip, url) {
    $('.showTip').remove();
    var $tip = '<div class="showTip"><div id="tip"></div></div>';
    $('body').append($tip);
    $('#tip').text(tip).css('margin-left', - $('#tip').outerWidth() / 2)
        .fadeIn(500).delay(1000).fadeOut(500,function(){
        $('.showTip').remove();
        if (url != '') {
            window.location.href = url;
        }
    });
}

function getCookie(name){
    if (document.cookie.length > 0){
        var c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1){
            c_start = c_start + name.length + 1;
            var c_end = document.cookie.indexOf(";",c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
function setCookie(name,value,expiredays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function delCookie(name) {
    setCookie(name, "", -1);
}

var prevUrl = document.referrer;
if(prevUrl.indexOf('weixinqun') > 0){
    setCookie('prevUrl','wxq',null);
}
console.log(getCookie('prevUrl'));
var c_name = getCookie('prevUrl');
if(c_name == 'wxq'){
    $('.back2Wxq').show();
}