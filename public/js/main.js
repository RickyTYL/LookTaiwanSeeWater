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
/*
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
*/

//ajax get water reservoir data
$(function () {
    $.ajax({
        type: "GET",
        url: "/data",
        dataType: "json",
        success: function (data) {
            var reservoirData = data.data;

            var config = liquidFillGaugeDefaultSettings();
            var j = 100;
            for (var i = 0; i < reservoirData.length; i++) {
                // if(data.data[i].immediatePercentage.replace('%','') <= 30){
                var percentage = reservoirData[i].immediatePercentage;
                if (percentage <= 30) {

                    config.circleColor = "#FF7777";
                    config.textColor = "#FF4444";
                    config.waveTextColor = "#FFAAAA";
                    config.waveColor = "#FFDDDD";
                    $('<div class="col-md-3 col-sm-6"><svg id="fillgauge' + j + '" ;height="200"></svg><h4><strong>' + reservoirData[i].reservoirName + '</strong></h4></div>').appendTo('#tab_f');

                } // else if(data.data[i].immediatePercentage.replace('%','') <= 60){
                else if (percentage <= 60) {
                    config.circleColor = "#808015";
                    config.textColor = "#555500";
                    config.waveTextColor = "#FFFFAA";
                    config.waveColor = "#AAAA39";
                    $('<div class="col-md-3 col-sm-6"><svg id="fillgauge' + j + '" ;height="200"></svg><h4><strong>' + reservoirData[i].reservoirName + '</strong></h4></div>').appendTo('#tab_e');

                } else {
                    config = liquidFillGaugeDefaultSettings();
                    $('<div class="col-md-3 col-sm-6"><svg id="fillgauge' + j + '" ;height="200"></svg><h4><strong>' + reservoirData[i].reservoirName + '</strong></h4></div>').appendTo('#tab_d');

                }
                config.waveAnimateTime = 2000;
                config.waveHeight = 0.2;
                config.waveCount = 1;
                // loadLiquidFillGauge('fillgauge'+i, Number(data.data[i].immediatePercentage.replace('%','')), config);
                loadLiquidFillGauge('fillgauge' + i, Number(percentage), config);
                loadLiquidFillGauge('fillgauge' + j++, Number(percentage), config);

                /*  document.getElementById("demo").innerHTML = data.data[i].reservoirName; */


            }
        }
    });
});