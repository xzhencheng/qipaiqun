/**
 * Created by lxr on 2017/7/12.
 */
var swiper = new Swiper('.swiper-container1', {
    loop: true,
    autoplay: 3000,
    parallax : true,
    pagination : '.swiper-pagination',
    paginationClickable :true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
$(function(){
    $('.swiper-button-prev').on('click', function(e) {
        e.preventDefault();
        swiper.swipePrev();
    });
    $('.swiper-button-next').on('click', function(e) {
        e.preventDefault();
        swiper.swipeNext();
    });
    /*今日推荐、最新最热*/
    $('.new-hot>a,.rec-ul>li').hover(function () {
        var _i = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).closest('.item-title').next('.list,.today-rec').find('ul').eq(_i).show().siblings().hide();
    });
    /*排行、资讯*/
    $('.rank-list>li,.news2>li').hover(function(){
        $(this).addClass('hover').siblings().removeClass('hover');
    });
    $('.news1>li').hover(function(){
        var _index = $(this).index();
        $(this).addClass('hover').siblings().removeClass('hover');
        $('.img-box>a').eq(_index).addClass('active').siblings().removeClass('active');
    });
    /*楼层定位*/
    $(window).scroll(function(){
        var top = $(document).scrollTop();          //定义变量，获取滚动条的高度
        var menu = $("#f_menu");                      //定义变量，抓取#menu
        var items = $("#content").find(".row-item");    //定义变量，查找.item

        var curId = "";                             //定义变量，当前所在的楼层item #id

        items.each(function(){
            var m = $(this);                        //定义变量，获取当前类
            var itemsTop = m.offset().top;        //定义变量，获取当前类的top偏移量
            if(top < 600){
                menu.find('.cur').removeClass('cur');
            }
            if(top > itemsTop-100){
                curId = "#" + m.attr("id");
            }else{
                return false;
            }
        });

        //给相应的楼层设置cur,取消其他楼层的cur
        var curLink = menu.find(".cur");
        if( curId && curLink.attr("data-id") != curId ){
            curLink.removeClass("cur");
            menu.find( "[data-id=" + curId + "]" ).addClass("cur");
        }
    });
});
function _scrollTo(id){
    var _id = document.getElementById(id);
    $('html,body').animate({ scrollTop: _id.offsetTop }, 300);
}