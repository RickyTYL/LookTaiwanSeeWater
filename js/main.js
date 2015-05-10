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

            //data.data[0] 石門水庫(新北、桃園、新竹)
            //data.data[1] 新山水庫(基隆)
            //data.data[2] 翡翠水庫(台北、新北)
            //data.data[3] 寶山水庫(新竹)
            //data.data[4] 寶山第二水庫(新竹)
            //data.data[5] 永和山水庫(新竹、苗栗)
            //data.data[6] 明德水庫(苗栗)
            //data.data[7] 鯉魚潭水庫(苗栗、台中)
            //data.data[8] 德基水庫(台中)
            //data.data[9] 石岡壩(台中)
            //data.data[10] 霧社水庫(南投)
            //data.data[11] 日月潭水庫(南投)
            //data.data[12] 仁義潭水庫(嘉義)
            //data.data[13] 蘭潭水庫(嘉義)
            //data.data[14] 烏山頭水庫(台南)
            //data.data[15] 曾文水庫(嘉義、台南)
            //data.data[16] 南化水庫(台南、高雄)
            //data.data[17] 阿公店水庫(高雄)
            //data.data[18] 阿公店水庫(高雄、洩洪至二仁溪)
            //data.data[19] 牡丹水庫(屏東)
            //data.data[20] 成功水庫(澎湖)

            var config0 = liquidFillGaugeDefaultSettings();
            loadLiquidFillGauge("fillgauge0", Number(data.data[0].immediatePercentage.replace('%','')), config0);
            var config1 = liquidFillGaugeDefaultSettings();
            loadLiquidFillGauge("fillgauge1", Number(data.data[1].immediatePercentage.replace('%','')), config1);
            var config2 = liquidFillGaugeDefaultSettings();
            loadLiquidFillGauge("fillgauge2", Number(data.data[2].immediatePercentage.replace('%','')), config2);
            var config3 = liquidFillGaugeDefaultSettings();
            loadLiquidFillGauge("fillgauge3", Number(data.data[3].immediatePercentage.replace('%','')), config3);
            var config4 = liquidFillGaugeDefaultSettings();
            loadLiquidFillGauge("fillgauge4", Number(data.data[4].immediatePercentage.replace('%','')), config4);


            var config10 = liquidFillGaugeDefaultSettings();
            config10.circleColor = "#FF7777";
            config10.textColor = "#FF4444";
            config10.waveTextColor = "#FFAAAA";
            config10.waveColor = "#FFDDDD";
            config10.circleThickness = 0.2;
            config10.textVertPosition = 0.2;
            config10.waveAnimateTime = 1000;
            loadLiquidFillGauge("fillgauge10", Number(data.data[0].immediatePercentage.replace('%','')), config10);

            var config20 = liquidFillGaugeDefaultSettings();
            config20.circleColor = "#D4AB6A";
            config20.textColor = "#553300";
            config20.waveTextColor = "#805615";
            config20.waveColor = "#AA7D39";
            config20.circleThickness = 0.1;
            config20.circleFillGap = 0.2;
            config20.textVertPosition = 0.8;
            config20.waveAnimateTime = 2000;
            config20.waveHeight = 0.3;
            config20.waveCount = 1;
            loadLiquidFillGauge("fillgauge20", Number(data.data[2].immediatePercentage.replace('%','')), config20);

            var config30 = liquidFillGaugeDefaultSettings();
            config30.textVertPosition = 0.8;
            config30.waveAnimateTime = 5000;
            config30.waveHeight = 0.15;
            config30.waveAnimate = false;
            config30.waveOffset = 0.25;
            config30.valueCountUp = false;
            config30.displayPercent = false;
            loadLiquidFillGauge("fillgauge30", Number(data.data[3].immediatePercentage.replace('%','')), config30);

            var config40 = liquidFillGaugeDefaultSettings();
            config40.circleThickness = 0.15;
            config40.circleColor = "#808015";
            config40.textColor = "#555500";
            config40.waveTextColor = "#FFFFAA";
            config40.waveColor = "#AAAA39";
            config40.textVertPosition = 0.8;
            config40.waveAnimateTime = 1000;
            config40.waveHeight = 0.05;
            config40.waveAnimate = true;
            config40.waveRise = false;
            config40.waveOffset = 0.25;
            config40.textSize = 0.75;
            config40.waveCount = 3;
            loadLiquidFillGauge("fillgauge40", Number(data.data[14].immediatePercentage.replace('%','')), config40);

            var config50 = liquidFillGaugeDefaultSettings();
            config50.circleThickness = 0.4;
            config50.circleColor = "#6DA398";
            config50.textColor = "#0E5144";
            config50.waveTextColor = "#6DA398";
            config50.waveColor = "#246D5F";
            config50.textVertPosition = 0.52;
            config50.waveAnimateTime = 5000;
            config50.waveHeight = 0;
            config50.waveAnimate = false;
            config50.waveCount = 2;
            config50.waveOffset = 0.25;
            config50.textSize = 1.2;
            config50.minValue = 30;
            config50.maxValue = 150
            config50.displayPercent = false;
            loadLiquidFillGauge("fillgauge50", Number(data.data[15].immediatePercentage.replace('%','')), config50);
        }
    });
});
