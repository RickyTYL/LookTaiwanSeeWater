var ﻿TheDomesticConsumptionOfWater=[
{'Year':'2013-12-31T00:00:00','ExecutingUnit':'臺北市','TheDomesticConsumptionOfWater':'325023045','PopulationServed':'2672953','TheDailyDomesticConsumptionOfWaterPerPerson':'333','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'基隆市','TheDomesticConsumptionOfWater':'39045875','PopulationServed':'373576','TheDailyDomesticConsumptionOfWaterPerPerson':'286','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'新北市','TheDomesticConsumptionOfWater':'410703453','PopulationServed':'3847661','TheDailyDomesticConsumptionOfWaterPerPerson':'292','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'桃園市','TheDomesticConsumptionOfWater':'183928631','PopulationServed':'1936965','TheDailyDomesticConsumptionOfWaterPerPerson':'260','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'新竹縣','TheDomesticConsumptionOfWater':'37925577','PopulationServed':'428658','TheDailyDomesticConsumptionOfWaterPerPerson':'242','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'新竹市','TheDomesticConsumptionOfWater':'46748569','PopulationServed':'422168','TheDailyDomesticConsumptionOfWaterPerPerson':'303','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'苗栗縣','TheDomesticConsumptionOfWater':'36892271','PopulationServed':'439840','TheDailyDomesticConsumptionOfWaterPerPerson':'230','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'臺中市','TheDomesticConsumptionOfWater':'247056871','PopulationServed':'2513025','TheDailyDomesticConsumptionOfWaterPerPerson':'269','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'彰化縣','TheDomesticConsumptionOfWater':'88091992','PopulationServed':'1203824','TheDailyDomesticConsumptionOfWaterPerPerson':'200','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'南投縣','TheDomesticConsumptionOfWater':'35703409','PopulationServed':'404085','TheDailyDomesticConsumptionOfWaterPerPerson':'242','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'雲林縣','TheDomesticConsumptionOfWater':'58467556','PopulationServed':'666662','TheDailyDomesticConsumptionOfWaterPerPerson':'240','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'嘉義縣','TheDomesticConsumptionOfWater':'39290036','PopulationServed':'475762','TheDailyDomesticConsumptionOfWaterPerPerson':'226','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'嘉義市','TheDomesticConsumptionOfWater':'27255910','PopulationServed':'270470','TheDailyDomesticConsumptionOfWaterPerPerson':'276','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'臺南市','TheDomesticConsumptionOfWater':'171901125','PopulationServed':'1862293','TheDailyDomesticConsumptionOfWaterPerPerson':'253','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'高雄市','TheDomesticConsumptionOfWater':'261115595','PopulationServed':'2652724','TheDailyDomesticConsumptionOfWaterPerPerson':'270','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'屏東縣','TheDomesticConsumptionOfWater':'35831659','PopulationServed':'396319','TheDailyDomesticConsumptionOfWaterPerPerson':'248','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'宜蘭縣','TheDomesticConsumptionOfWater':'39351976','PopulationServed':'429844','TheDailyDomesticConsumptionOfWaterPerPerson':'251','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'花蓮縣','TheDomesticConsumptionOfWater':'26999919','PopulationServed':'281476','TheDailyDomesticConsumptionOfWaterPerPerson':'263','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'臺東縣','TheDomesticConsumptionOfWater':'16040207','PopulationServed':'178858','TheDailyDomesticConsumptionOfWaterPerPerson':'246','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'金門縣','TheDomesticConsumptionOfWater':'4454128','PopulationServed':'110466','TheDailyDomesticConsumptionOfWaterPerPerson':'110','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'連江縣','TheDomesticConsumptionOfWater':'694778','PopulationServed':'11315','TheDailyDomesticConsumptionOfWaterPerPerson':'168','Remarks':'無'}
,{'Year':'2013-12-31T00:00:00','ExecutingUnit':'澎湖縣','TheDomesticConsumptionOfWater':'7467207','PopulationServed':'92888','TheDailyDomesticConsumptionOfWaterPerPerson':'220','Remarks':'無'}
]
var length = TheDomesticConsumptionOfWater.length;

for(var j = 0; j < length; j++)
{
	var newOption = $('<option/>');
	newOption.attr('text', TheDomesticConsumptionOfWater[j].ExecutingUnit);
	newOption.attr('value',j);
    // newOption.attr('domesticConsumption',TheDomesticConsumptionOfWater[j].TheDomesticConsumptionOfWater);
    // newOption.attr('populationServed',TheDomesticConsumptionOfWater[j].PopulationServed);
    newOption.text(TheDomesticConsumptionOfWater[j].ExecutingUnit); // fixed typo
    $('#mySelect').append(newOption);
}
$('#domesticConsumption').text(TheDomesticConsumptionOfWater[0].TheDomesticConsumptionOfWater);
$('#domesticConsumption').attr('value',TheDomesticConsumptionOfWater[0].TheDomesticConsumptionOfWater);
$('#PopulationServed').text(TheDomesticConsumptionOfWater[0].PopulationServed);
$('#dailyDomesticConsumptionOfWaterPerPerson').text(TheDomesticConsumptionOfWater[0].TheDailyDomesticConsumptionOfWaterPerPerson);
$('#mySelect').change(function(){
	$('#domesticConsumption').text(TheDomesticConsumptionOfWater[$(this).val()].TheDomesticConsumptionOfWater);
	$('#domesticConsumption').attr('value',TheDomesticConsumptionOfWater[$(this).val()].TheDomesticConsumptionOfWater);
	$('#PopulationServed').text(TheDomesticConsumptionOfWater[$(this).val()].PopulationServed);
	// console.log($(#mySelect).attr('populationServed'));
	$('#dailyDomesticConsumptionOfWaterPerPerson').text(TheDomesticConsumptionOfWater[$(this).val()].TheDailyDomesticConsumptionOfWaterPerPerson);
	x=parseFloat($('#immediateStorage').attr('value'));
	y=parseFloat($('#domesticConsumption').attr('value'));
	console.log(x+' '+y);
	$('#restDays').text(parseInt(x*0.18*10000/(y/365)));
});
$(function () {
	$.ajax({
		type: "GET",
		url: "/data",
		dataType: "json",
		success: function (data) {
			for(var i=0 ; i<data.data.length;i++){
				var newOption = $('<option/>');
				newOption.text(data.data[i].reservoirName);
				newOption.attr('value',i);
				$('#selectReservoir').append(newOption);				
			}
			$('#immediateStorage').text(data.data[0].immediateStorage);
			$('#immediateStorage').attr('value',data.data[0].immediateStorage.replace(',',''));
			$('#selectReservoir').change(function(){
				$('#immediateStorage').text(data.data[$(this).val()].immediateStorage);
				$('#immediateStorage').attr('value',data.data[$(this).val()].immediateStorage.replace(',',''));
				x=parseFloat($('#immediateStorage').attr('value'));
				y=parseFloat($('#domesticConsumption').attr('value'));
				console.log(x+' '+y);
				$('#restDays').text(parseInt(x*0.18*10000/(y/365)));
			});
			var x=parseFloat($('#immediateStorage').attr('value'));
			var y=parseFloat($('#domesticConsumption').attr('value'));
			console.log(x+' '+y);
			$('#restDays').text(parseInt(x*0.18*10000/(y/365)));

		}
	});
});


// $('#restDays').text(($('#immediateStorage').attr('value'))*0.18/($('#domesticConsumption').attr('value')/365));
