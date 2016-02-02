$(document).ready(function() {
  var SCROLL_TRIGGER_STEP = 30;
  var UNLOCKTIME = 500;
  var scrollStart = 0,
    scrollEnd = 0;

  var scrollock = false;

  var isVideoEnded = false;

  // 上翻页
  function prevPage() {
    var $current = $(".wps_page-current");
    // 多场景页面scroll触发更换场景
    if ($current.hasClass("wps_page_multiple") && $current.hasClass("wps_page-ready")) {
      prevSence();
      $current.removeClass("wps_page-ready");
    } else {
      var curpage = parseInt($current.attr("page"));
      curpage--;
      var $prevpage = $(".wps_page[page=\"" + curpage + "\"]");
      if ($prevpage.length === 0) {
        return;
      }
      $current.removeClass("wps_page-current");
      $prevpage.removeClass("wps_page-prev").addClass("wps_page-current");
      switch (curpage) {
        case 1:
          prevPage();
          break;
        case 2:
          showPage2();
          break;
        case 3:
          showPage3();
          break;
        case 4:
          showPage4();
          break;
        case 5:
          showPage5();
          break;
      }
    }
  }
  // 下翻页
  function nextPage() {
    var $current = $(".wps_page-current");
    if ($current.hasClass("wps_page_multiple") && !$current.hasClass("wps_page-ready")) {
      nextSence();
      $current.addClass("wps_page-ready");
    } else {
      var curpage = parseInt($current.attr("page"));
      curpage++;
      var $nextpage = $(".wps_page[page=\"" + curpage + "\"]");
      if ($nextpage.length === 0) {
        return;
      }
      $current.removeClass("wps_page-current").addClass("wps_page-prev");
      $nextpage.addClass("wps_page-current");
      switch (curpage) {
        case 2:
          showPage2();
          break;
        case 3:
          showPage3();
          break;
        case 4:
          showPage4();
          break;
        case 5:
          showPage5();
          break;
        case 6:
          showPage6();
          break;
      }
    }
  }

  // 第一页下翻页
  function nextSence() {
    var $current = $(".wps_page-current");
    if ($current.hasClass("wps_page_1")) {
      var $nav = $(".wps_page_1 .wps_nav");
      var $foreground = $(".wps_page_1 .wps_foreground");
      var $pager1 = $foreground.find(".wps_foreground_pager_1");
      var $pager2 = $foreground.find(".wps_foreground_pager_2");

      $nav.addClass("wps_nav_hidden");
      $foreground.addClass("wps_foreground_second");
      $pager1.addClass("wps_foreground_pager_1_hidden");
      $pager2.removeClass("wps_foreground_pager_2_hidden");
    }
    setTimeout(function() {
      scrollock = false;
    }, UNLOCKTIME);

  }
  // 第一页上翻页
  function prevSence() {
    var $current = $(".wps_page-current");
    if ($current.hasClass("wps_page_1")) {
      var $nav = $(".wps_page_1 .wps_nav");
      var $foreground = $(".wps_page_1 .wps_foreground");
      var $pager1 = $foreground.find(".wps_foreground_pager_1");
      var $pager2 = $foreground.find(".wps_foreground_pager_2");

      $nav.removeClass("wps_nav_hidden");
      $foreground.removeClass("wps_foreground_second");
      $pager1.removeClass("wps_foreground_pager_1_hidden");
      $pager2.addClass("wps_foreground_pager_2_hidden");
    }
    setTimeout(function() {
      scrollock = false;
    }, UNLOCKTIME);
  }
  // 第一页
  function showPage1() {

    var $v = $("#wps_v");
    function resize() {
      // 获取浏览器window尺寸
      var winWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth,
        winHeight = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
      $v.css({
        width: winWidth,
        height: winHeight
      });
    }

    resize();
    $(window).on("resize", resize);
    
    $v[0].play();
    $v[0].addEventListener("ended", function() {
      isVideoEnded = true;
      $(this).animate({
        opacity: 0
      }, 500);
      $(".wps_page_1 .wps_foreground_bak").animate({
        opacity: 1
      }, 500);
    });
    $v[0].addEventListener("play", function() {
      setTimeout(prevSence, 3000);
    });
  }
  // 第二页
  function showPage2() {
    var step_line = 500,
      step_wireframe = 1000,
      step_mac = 800;

    var $page2 = $(".wps_page_2");
    var $part1 = $page2.find(".wps_page_2_content_part1");
    var $part2 = $page2.find(".wps_page_2_content_part2");
    var $frame = $page2.find(".frame");
    var $line_left = $frame.find(".line_left");
    var $line_bottom = $frame.find(".line_bottom");
    var $line_right = $frame.find(".line_right");
    var $line_top = $frame.find(".line_top");
    var $wireframe = $frame.find(".wireframe");
    var $mac = $frame.find(".mac");
    var $macdesk = $frame.find(".macdesk");

    if (!$page2.hasClass("wps_page-ready")) {
      $line_left.show().delay(400).animate({
        top: 0
      }, step_line, function() {
        $line_bottom.show().animate({
          left: 0
        }, step_line, function() {
          $line_right.show().animate({
            top: 0
          }, step_line, function() {
            $line_top.show().animate({
              left: 0
            }, step_line, function() {
              $wireframe.animate({
                opacity: 1
              }, step_wireframe, function() {
                $wireframe.addClass("wireframe-hidden").css("opacity", "0");
                $mac.animate({
                  opacity: 1
                }, step_mac, function() {
                  $macdesk.animate({
                    opacity: 1
                  }, 800, function() {
                    $part1.addClass("wps_page_2_content_part1-top");
                    $part2.addClass("wps_page_2_content_part2-bottom");
                    $page2.addClass("wps_page-ready");
                    setTimeout(function() {
                      scrollock = false;
                    }, UNLOCKTIME);
                  })
                });
              });
            });
          });
        });
      });
    } else {
      setTimeout(function() {
        scrollock = false;
      }, UNLOCKTIME);
    }
  }
  // 第三页
  function showPage3() {
    var $page3 = $(".wps_page_3");
    var $part1 = $page3.find(".wps_page_3_content_part1");
    var $part2 = $page3.find(".wps_page_3_content_part2");
    if (!$page3.hasClass("wps_page-ready")) {
      setTimeout(function() {
        $part1.addClass("wps_page_3_content_part1-active");
        $part2.addClass("wps_page_3_content_part2-active");
        $page3.addClass("wps_page-ready");
        setTimeout(function() {
          scrollock = false;
        }, UNLOCKTIME);
      }, 400);
    } else {
      setTimeout(function() {
        scrollock = false;
      }, UNLOCKTIME);
    }

  }
  // 第四页
  function showPage4() {
    var _count = 1;
    var $page4 = $(".wps_page_4");
    var $content = $page4.find(".wps_page_4_content");
    var $maclist = $page4.find(".maclist");
    var $loading = $page4.find(".loading");
    var $count = $page4.find(".count");
    if (!$page4.hasClass("wps_page-ready")) {
      stage1();
    } else {
      setTimeout(function() {
        scrollock = false;
      }, UNLOCKTIME);
    }
    function stage1() {
      // 第一幕：loading计时
      var timer = setInterval(function() {
        var random = Math.floor(Math.random() * 10);
        _count += random;
        if (_count >= 100) {
          clearInterval(timer);
          _count = 100;
          $count.html(_count + "%");
          stage2();
        } else {
          $count.html(_count + "%");
        }
      }, 100);
    }

    // 第二幕：loading完成
    function stage2() {
      $loading.addClass("loading-ready");
      setTimeout(function() {
        stage3();
      }, 500);
    }
    // 第三幕：mac列表
    function stage3() {
      $maclist.addClass("maclist-transition");
      setTimeout(function() {
        $maclist.addClass("maclist-ready");
        setTimeout(function() {
          stage4();
        }, 800);
      }, 1000);
    }
    // 第四幕：end并解锁scroll
    function stage4() {
      $content.addClass("wps_page_4_content-ready");
      $page4.addClass("wps_page-ready");
      setTimeout(function() {
        scrollock = false;
      }, UNLOCKTIME);
    }
  }
  // 第五页
  function showPage5() {
    //【important】 背景图片尺寸，如更换图片需更新此数据
    var imgWidth = 1600,
      imgHeight = 760;
    //【important】 脸部距离中心点的偏移坐标，如更换图片需更新此数据
    var faceTop = 240,
      faceLeft = 480;

    var imgTop, imgLeft, cameraTop, cameraLeft;
    var cameraSize = 244;
    var $page5 = $(".wps_page_5");
    var $background = $page5.find(".wps_background");
    var $background_drama = $page5.find(".wps_background_drama");
    var $background_img = $page5.find(".wps_background_img");
    var $foreground = $page5.find(".wps_foreground");
    var $camera = $page5.find(".camera_list");
    if ($page5.hasClass("wps_page-ready")) {
     setTimeout(function() {
        scrollock = false;
      }, UNLOCKTIME);
     return;
    } 
    // 自适应图片定位
    function reLocate() {
      // 获取浏览器window尺寸
      var winWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth,
        winHeight = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
      if (winHeight <= imgHeight) {
        imgTop = -imgHeight / 2;
        imgLeft = -imgWidth / 2;
        cameraTop = -faceTop;
        cameraLeft = -faceLeft;
        cameraSize = 244;
      } else {
        imgTop = -winHeight / 2;
        imgLeft = -(winHeight * (imgWidth / imgHeight)) / 2;
        cameraTop = -(winHeight * (faceTop / imgHeight));
        cameraLeft = -(winHeight * (imgWidth / imgHeight)) * (faceLeft / imgWidth);
        cameraSize = 244 * (winHeight / imgHeight);
      }

      $background_img.css({
        "top": imgTop,
        "left": imgLeft
      });
      $camera.css({
        "marginTop": cameraTop,
        "marginLeft": cameraLeft,
        "width": cameraSize,
        "height": cameraSize
      });
    }

    $(window).on("resize", reLocate);
    reLocate();

    stage1();

    // 第一幕：面部识别
    function stage1() {
      setTimeout(function() {
        $background.addClass("wps_background-ready");
        setTimeout(function() {
          stage2();
        }, 800);
      }, 500);
    }
    // 第二幕：前景划出
    function stage2() {
      $foreground.addClass("wps_foreground-transition");
      setTimeout(function() {
        stage3();
      }, 400);
    }
    // 第三幕：前景遮罩，并解锁scroll
    function stage3() {
      $foreground.addClass("wps_foreground-ready");
      $page5.addClass("wps_page-ready");
      setTimeout(function() {
        scrollock = false;
      }, UNLOCKTIME);
    }
  }
  // 第六页
  function showPage6() {
    setTimeout(function() {
      scrollock = false;
    }, UNLOCKTIME);
  }

  function onScrolling(e) {
    var event = e || window.event;
    var step = event.originalEvent.wheelDeltaY || -event.originalEvent.detailY;
    // 如果滚动距离小于阈值则不做响应
    if (Math.abs(step) < SCROLL_TRIGGER_STEP) {
      return;
    }

    if (!scrollock) {
      scrollock = true;
      if (step < 0) {
        nextPage();
      } else {
        prevPage();
      }
    }

  }

  $(document).on("click", ".wps_page .wps_pager_arrow_down", nextPage)
    .on("mousewheel DOMMouseScroll MozMousePixelScroll", onScrolling);

  showPage1();
});