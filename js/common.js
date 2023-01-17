AOS.init({
    once: true,
    delay: 200,
    duration: 1200
})


$(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        center: true,
        margin: 35,
        autoWidth:true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                margin: 10,
            },
            1200: {
                items: 3,
            }
        }
    });
});


$(function () {
    $(".floating").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.floating').fadeIn();
                $('.scrollDown').fadeOut();
            } else {
                $('.floating').fadeOut();
                $('.scrollDown').fadeIn();
            }
        });
    });
});


$(document).on("keyup", ".phoneNumber", function () {
    $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-"));
});


$(window).on('scroll', function () {
    $('section').each(function () {
        if ($(window).scrollTop() >= $(this).offset().top - 500) {
            var id = $(this).attr('id');
            $('nav ul li a').removeClass('actives');
            $('nav ul li a[href=#' + id + ']').addClass('actives');
        }
    });
});


$(function () {
    $('.logo, .logo-w, nav ul li a, .askBtn, .p-text a').click(function (e) {
        $.scrollTo(this.hash || 0, 500);
        e.preventDefault();
    });
});


$('.menuBtns').click(function () {
    $(this).toggleClass('change')
})

$('nav ul li a').click(function () {
    $('#check').prop('checked', false)
    $('.menuBtns').removeClass('change')
})

$('.overlay').click(function () {
    $('#check').prop('checked', false)
    $('.menuBtns').removeClass('change')
})


var isVisible = false;

$(window).on('scroll', function () {
    if (checkVisible($('.a3-box-wrapper')) && !isVisible) {
        $(function () {
            var idx = 0;
            setInterval(time, 800);
            function time() {
                var box = $('.a3-box-num');
                box.removeClass('on');
                box.eq(idx).addClass('on');
                idx++;
                if (idx >= 7) idx = 0;
            }
        });

        $(function () {
            var idx = 0;
            setInterval(time, 800);
            function time() {
                var box2 = $('.a3-box');
                box2.removeClass('on');
                box2.eq(idx).addClass('on');
                idx++;
                if (idx >= 7) idx = 0;
            }
        });

        isVisible = true;
    }
});

function checkVisible(elm, eval) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}


$('.f-personal-text').click(function () {
    if ($('#cb').is(':checked')) {
        $('.f-personal').removeClass('f-personal-no');
        $('.f-personal-text label p').html('개인정보취급방침을 읽었으며, 이에 동의합니다.');
        $('.gform .f-submit').attr('disabled', false);
    } else {
        $('.f-personal').addClass('f-personal-no');
        $('.f-personal-text label p').html('개인정보취급방침에 동의하셔야 문의하실 수 있습니다.');
        $('.gform .f-submit').attr('disabled', true);
    }
})

$('.f-personalBtn').click(function () {
    $('.f-popup-wrapper').fadeIn().css('display','flex');
})

$('.f-popup-wrapper').click(function () {
    $(this).fadeOut();
})


if (navigator.userAgent.indexOf("Trident") > 0) {
    alert("이 사이트에 대한 Internet Explorer 지원이 종료되었습니다. " +
        "확인 버튼을 누르면 Edge 브라우저로 이동합니다.")
    window.location = 'microsoft-edge:' + window.location.href;
}


(function () {
    var w = window;
    if (w.ChannelIO) {
        return (window.console.error || window.console.log || function () { })('ChannelIO script included twice.');
    }
    var ch = function () {
        ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
        ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
        if (w.ChannelIOInitialized) {
            return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        s.charset = 'UTF-8';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
        l();
    } else if (window.attachEvent) {
        window.attachEvent('onload', l);
    } else {
        window.addEventListener('DOMContentLoaded', l, false);
        window.addEventListener('load', l, false);
    }
})();
ChannelIO('boot', {
    "pluginKey": "fb8a571f-05b8-44ff-96f1-937222fa69f1"
});