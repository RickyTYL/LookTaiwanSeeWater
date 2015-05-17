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
		url: "http://128.199.223.114:10080",
		dataType: "jsonp",
		success: function (data) {

            //data.data[0] 石門水庫(新北、桃園、新竹)
            ////data.data[1] 新山水庫(基隆)
            //data.data[1] 翡翠水庫(台北、新北)
            ////data.data[3] 寶山水庫(新竹)
            //data.data[2] 寶山第二水庫(新竹)
            //data.data[3] 永和山水庫(新竹、苗栗)
            //data.data[4] 明德水庫(苗栗)
            //data.data[5] 鯉魚潭水庫(苗栗、台中)
            //data.data[6] 德基水庫(台中)
            //data.data[7] 石岡壩(台中)
            //data.data[8] 霧社水庫(南投)
            //data.data[9] 日月潭水庫(南投)
            //data.data[10] 集集攔河堰(南投)
            //data.data[11] 仁義潭水庫(嘉義)
            ////data.data[13] 蘭潭水庫(嘉義)
            //data.data[12] 白河水庫(台南)
            //data.data[13] 烏山頭水庫(台南)
            //data.data[14] 曾文水庫(嘉義、台南)
            //data.data[15] 南化水庫(台南、高雄)
            //data.data[16] 阿公店水庫(高雄)
            //data.data[17] 高屏溪攔河堰(高雄)
            //data.data[18] 牡丹水庫(屏東)

            var config = liquidFillGaugeDefaultSettings();
            for (var i = 0; i < 19; i++) {
                  // if(data.data[i].immediatePercentage.replace('%','') <= 30){
                  if(data.data[i].immediateStorage.replace('%','') <= 30){
            	
            		config.circleColor = "#FF7777";
            		config.textColor = "#FF4444";
            		config.waveTextColor = "#FFAAAA";
            		config.waveColor = "#FFDDDD";
            	} // else if(data.data[i].immediatePercentage.replace('%','') <= 60){
                  else if(data.data[i].immediateStorage.replace('%','') <= 60){
                        config.circleColor = "#808015";
                        config.textColor = "#555500";
                        config.waveTextColor = "#FFFFAA";
                        config.waveColor = "#AAAA39";
                  }
                  else {
                        config = liquidFillGaugeDefaultSettings();
                  }
                    config.waveAnimateTime = 2000;
                    config.waveHeight = 0.2;
                    config.waveCount = 1;
                  // loadLiquidFillGauge('fillgauge'+i, Number(data.data[i].immediatePercentage.replace('%','')), config);
                  loadLiquidFillGauge('fillgauge'+i, Number(data.data[i].immediateStorage.replace('%','')), config);
                /*  document.getElementById("demo").innerHTML = data.data[i].reservoirName; */
                
                if(data.data[i].immediateStorage.replace('%','') <= 30){
		  $('.normalclass').on('click', function(){
		  // 把下面內容塞進 DOM
		  var picture = 'fillgauge'+i;
		  
		  $('<div class="col-md-3 col-sm-6"><svg id="fillgauge3" height="200"></svg><h4><strong>' + data.data[i].reservoirName + '</strong></h4></div>').appendTo('#tab_d');
		  });
                }
            };
        	}
});
});
