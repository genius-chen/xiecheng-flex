window.addEventListener('load',function(){
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var w = focus.offsetWidth;
    var index = 0; //图片轮播索引号
    var ol = focus.children[1];
    var flag = false ;
    //定时器部分
    var timer = setInterval(function(){
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX('+ translatex +'px)';
    },2000);
    //移动轮播图
    ul.addEventListener('transitionend',function(){
        if(index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX('+ translatex +'px)';
        }else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX('+ translatex +'px)';
        }
        ol.querySelector('li.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    //手指拖动部分
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].pageX; 
        clearInterval(timer);
    })
    ul.addEventListener('touchmove',function(e){
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX('+ translatex +'px)';
        flag = true;
        e.preventDefault();//阻止滚动屏幕
    });
    ul.addEventListener('touchend',function(){
        if(flag){
            if(Math.abs(moveX) > 50){
                if(moveX > 0){
                    index--;
                }else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX('+ translatex +'px)';
            }else {
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX('+ translatex +'px)';
            }
        }
        //清除及重启定时器
        clearInterval(timer);
        var timer = setInterval(function(){
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX('+ translatex +'px)';
        },2000)
    });
    //返回顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll',function(){
        if(window.pageYOffset >= nav.offsetTop){
            goBack.style.display = 'block';
        }else {
            goBack.style.display = 'none';
        }
    })
    goBack.addEventListener('click',function(){
        window.scroll(0,0)
    });
    
})