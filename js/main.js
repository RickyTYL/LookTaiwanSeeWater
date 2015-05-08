var reservoirData;
// Closes the sidebar menu
$("#menu-close").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

//ajax get water reservoir data
$(function () {
    $.ajax({
        type: "GET",
        url: "http://128.199.223.114:10080/today",
        dataType: "jsonp",
        success: function (data) {
            
            reservoirData = data.data;
            //reservoirData[0] 石門水庫
            //reservoirData[1] 新山水庫
            //reservoirData[2] 翡翠水庫
            //reservoirData[3] 寶山水庫
            //reservoirData[4] 寶山第二水庫
            //reservoirData[5] 永和山水庫
            //reservoirData[6] 明德水庫 
            //reservoirData[7] 鯉魚潭水庫
            //reservoirData[8] 德基水庫
            //reservoirData[9] 石岡壩
            //reservoirData[10] 霧社水庫
            //reservoirData[11] 日月潭水庫
            //reservoirData[12] 仁義潭水庫
            //reservoirData[13] 蘭潭水庫
            //reservoirData[14] 烏山頭水庫
            //reservoirData[15] 曾文水庫
            //reservoirData[16] 南化水庫
            //reservoirData[17] 阿公店水庫
            //reservoirData[18] 阿公店水庫(洩洪至二仁溪)
            //reservoirData[19] 牡丹水庫
            //reservoirData[20] 成功水庫
            
            var config1 = liquidFillGaugeDefaultSettings();
            config1.circleColor = "#FF7777";
            config1.textColor = "#FF4444";
            config1.waveTextColor = "#FFAAAA";
            config1.waveColor = "#FFDDDD";
            config1.circleThickness = 0.2;
            config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;
            loadLiquidFillGauge("fillgauge1", Number(reservoirData[0].immediatePercentage.replace('%','')), config1);
            
            var config2 = liquidFillGaugeDefaultSettings();
            config2.circleColor = "#D4AB6A";
            config2.textColor = "#553300";
            config2.waveTextColor = "#805615";
            config2.waveColor = "#AA7D39";
            config2.circleThickness = 0.1;
            config2.circleFillGap = 0.2;
            config2.textVertPosition = 0.8;
            config2.waveAnimateTime = 2000;
            config2.waveHeight = 0.3;
            config2.waveCount = 1;
            loadLiquidFillGauge("fillgauge2", Number(reservoirData[2].immediatePercentage.replace('%','')), config2);
            
            var config3 = liquidFillGaugeDefaultSettings();
            loadLiquidFillGauge("fillgauge3", Number(reservoirData[3].immediatePercentage.replace('%','')), config3);
            
            var config4 = liquidFillGaugeDefaultSettings();
            config4.circleThickness = 0.15;
            config4.circleColor = "#808015";
            config4.textColor = "#555500";
            config4.waveTextColor = "#FFFFAA";
            config4.waveColor = "#AAAA39";
            config4.textVertPosition = 0.8;
            config4.waveAnimateTime = 1000;
            config4.waveHeight = 0.05;
            config4.waveAnimate = true;
            config4.waveRise = false;
            config4.waveOffset = 0.25;
            config4.textSize = 0.75;
            config4.waveCount = 3;
            loadLiquidFillGauge("fillgauge4", Number(reservoirData[14].immediatePercentage.replace('%','')), config4);
            
            var config5 = liquidFillGaugeDefaultSettings();
            config5.circleThickness = 0.4;
            config5.circleColor = "#6DA398";
            config5.textColor = "#0E5144";
            config5.waveTextColor = "#6DA398";
            config5.waveColor = "#246D5F";
            config5.textVertPosition = 0.52;
            config5.waveAnimateTime = 5000;
            config5.waveHeight = 0;
            config5.waveAnimate = false;
            config5.waveCount = 2;
            config5.waveOffset = 0.25;
            config5.textSize = 1.2;
            config5.minValue = 30;
            config5.maxValue = 150
            config5.displayPercent = false;
            loadLiquidFillGauge("fillgauge5", Number(reservoirData[15].immediatePercentage.replace('%','')), config5);
        }
    });
});