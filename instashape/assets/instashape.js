jQuery(function($) {
    var AnimationInProgress = false;
    $(".content-content").css("opacity", 0).css("display", "none");

    function stageHeader() {
        var Element = $("#stage-header-tagline");
        $(Element).children("span").css("opacity", 0);
        $(Element).children("span:first-child").css("opacity", 1).addClass("current");
        $(window).resize(resizeHandler);
        resizeHandler();

        setInterval(Change, 6000);

        function Change() {
            var NextElement = $(Element).children("span.current").eq(0).next();
            $(Element).children("span.current").eq(0).animate({
                opacity: 0
            }, 300).removeClass("current");
            if (NextElement.length == 0) {
                setTimeout(function() {
                    $(Element).children("span:first-child").animate({
                        opacity: 1
                    }, 300).addClass("current");
                }, 500);
            } else {
                setTimeout(function() {
                    $(NextElement).animate({
                        opacity: 1
                    }, 300).addClass("current");
                }, 500);
            }
        }

        function resizeHandler() {
            $(Element).height(Element.children("span:first-child").height()).css("overflow", "hidden");
        }

    }

    function initMap() {
        var customMapType = new google.maps.StyledMapType(InstashapeConfig.Map.Style);
        var customMapTypeId = 'custom_style';

        var map = new google.maps.Map(document.getElementById('contact-map'), {
            zoom: 12,
            center: {
                lat: InstashapeConfig.Map.Latitude,
                lng: InstashapeConfig.Map.Longtitude
            },
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
            }
        });

        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);
    }

    function gradient() {
        function generateGradient() {
            var canvas = $('#backgroundStack-gradient')[0];
            var ctx = canvas.getContext('2d');

            canvas.height = $('#backgroundStack-gradient').parent().height();
            canvas.width = $('#backgroundStack-gradient').parent().width();

            var alphaA = 1;
            var alphaB = 0;
            var x = 0;
            var xx = canvas.width;
            var xTrend = true;
            var xxTrend = true;
            var trendA = true;
            var trendB = false;
            var draw = function draw() {
                if (trendA) {
                    alphaA += 0.003 + Math.random() * 0.005;
                } else {
                    alphaA -= 0.003 + Math.random() * 0.005;
                }
                if (trendB) {
                    alphaB += 0.003 + Math.random() * 0.005;
                } else {
                    alphaB -= 0.003 + Math.random() * 0.005;
                }
                if (alphaA <= 0.4) {
                    trendA = true;
                }
                if (alphaB <= 0.4) {
                    trendB = true;
                }
                if (alphaA >= 1) {
                    trendA = false;
                }
                if (alphaB >= 1) {
                    trendB = false;
                }
                if (xTrend) {
                    x += 0.51 + Math.random() * 0.1;
                } else {
                    x -= 0.51 + Math.random() * 0.1;
                }
                if (x < 0) {
                    xTrend = true;
                }
                if (x > canvas.width / 4) {
                    xTrend = false;
                }
                if (xxTrend) {
                    xx += 0.51 + Math.random() * 0.1;
                } else {
                    xx -= 0.51 + Math.random() * 0.1;
                }
                if (xx < canvas.width / 4 * 3) {
                    xxTrend = true;
                }
                if (xx > canvas.width) {
                    xxTrend = false;
                }
                var gradient = ctx.createLinearGradient(Math.floor(x), 0, Math.floor(xx), canvas.height);
                gradient.addColorStop(0, "rgba(" + InstashapeConfig.Background.Gradient.StopAColor + "," + alphaA + ")");
                gradient.addColorStop(0.4, "rgba(" + InstashapeConfig.Background.Gradient.StopAColor + ",0)");
                gradient.addColorStop(0.6, "rgba(" + InstashapeConfig.Background.Gradient.StopBColor + ",0)");
                gradient.addColorStop(1, "rgba(" + InstashapeConfig.Background.Gradient.StopBColor + "," + alphaB + ")");

                ctx.save();
                ctx.fillStyle = gradient;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
                window.requestAnimationFrame(draw);
            };

            draw();

            window.addEventListener('resize', function() {
                canvas.height = window.innerHeight;
                canvas.width = window.innerWidth;
            });
        }

        if (InstashapeConfig.Background.Gradient.Enabled) {
            generateGradient();
        } else {
            $("#backgroundStack-gradient").remove();
        }
    }

    function menu() {
        $("#stage-nav a").click(function() {
            if (!AnimationInProgress) {
                AnimationInProgress = true;
                var It = this;
                $("#stage-nav a").removeClass("hover");
                $(this).addClass("hover");
                $("#backgroundStack").addClass("contentOn");
                $("#content-title").html($(this).html());
                $("#content-close").addClass("active");
                if ($("#content").hasClass("contentOn")) {
                    $(".content-content").animate({
                        opacity: 0
                    }, 300);
                    setTimeout(function() {
                        $(".content-content").css("display", "none");
                    }, 300);
                } else {
                    $(".content-content").css("opacity", 0);
                    $(".content-content").css("display", "none");
                    $("#content").addClass("contentOn");
                }
                setTimeout(function() {
                    $("#content-title").animate({
                        opacity: 1
                    }, 300);
                }, 500);
                setTimeout(function() {
                    $("#content-title").animate({
                        opacity: 0
                    }, 300);
                }, 1300);
                setTimeout(function() {
                    $("#content-content--" + $(It).attr("data-page")).css("display", "flex");
                    $("#content-content--" + $(It).attr("data-page")).animate({
                        opacity: 1
                    }, 300);
                }, 1700);
                setTimeout(function() {
                    AnimationInProgress = false;
                }, 2000);

            }
        });
        $("#content-close").click(function() {
            if (!AnimationInProgress) {
                AnimationInProgress = true;
                $("#content-close").removeClass("active");
                $("#backgroundStack").removeClass("contentOn");
                $("#content").removeClass("contentOn");
                $("#stage-nav a").removeClass("hover");
                setTimeout(function() {
                    $(".content-content").css("opacity", 0).css("display", "none");
                    AnimationInProgress = false;
                }, 300);
            }
        });
    }

    function config() {
        $("#backgroundStack-solidColor").css("background", InstashapeConfig.Background.SolidBg.Color);
        $("#backgroundStack-gradient").css("opacity", InstashapeConfig.Background.Gradient.Opacity);

        if (InstashapeConfig.Background.Picture.Enabled) {
            $("#backgroundStack-pic").css("opacity", InstashapeConfig.Background.Picture.Opacity);
        } else {
            $("#backgroundStack-pic").remove();
        }

        if (InstashapeConfig.Background.Noise.Enabled) {
            $("#backgroundStack-noise").css("opacity", InstashapeConfig.Background.Noise.Opacity);
        } else {
            $("#backgroundStack-noise").remove();
        }

        if (InstashapeConfig.Colors.JSOverride) {
            var CSS = '<style type="text/css">.stage > .stage-header h1 { color:' + InstashapeConfig.Colors.Tagline.FirstLine + ';} .stage > .stage-header h2 { color:' + InstashapeConfig.Colors.Tagline.SecondLine + ';} a.nice-link { color:' + InstashapeConfig.Colors.Buttons.Text + '; } a.nice-link > .hover > span { background:' + InstashapeConfig.Colors.Buttons.Outline + '; } a.nice-link:hover, a.nice-link.hover { color:' + InstashapeConfig.Colors.Buttons.TextHover + '; } .content { background:' + InstashapeConfig.Colors.SideContent.Background + '; color:' + InstashapeConfig.Colors.SideContent.Text + '; } .content .content-content.content-content--contact .contact-grid > li .fa { color:' + InstashapeConfig.Colors.SideContent.ContactIcons + '}</style>';
            $("head").append(CSS);
        }
    }

    config();
    stageHeader();
    menu();
    gradient();

    $(window).load(function() {
        if ($("#backgroundStack-3d").length) {
            $("#backgroundStack-3d").Instashape3DAnim(InstashapeConfig.Background.Sphere3D);
        }

        $("#preloader").animate({
            opacity: 0
        }, 1000);
        setTimeout(function() {
            $("#preloader").css("display", "none");
        }, 1000);
    });

});