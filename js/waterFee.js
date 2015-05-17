
function TaipeiWaterFee(){
	
	// Total water fee is the sum of 6 items.
	//
	// waterFee1 = 基本費
	// waterFee2 = 用水費
	// waterFee3 = 代徵一般廢棄物清除處理費	
	// waterFee4 = 代徵污水下水道使用費
	// waterFee5 = 水源保育與回饋費
	// waterFee6 = 加壓設備維護費 
	// 
	// 應繳總金額＝基本費＋用水費＋代徵一般廢棄物清除處理費（台北自來水事業處轄區用戶已停徵）＋
	// 代徵污水下水道使用費（接用污水下水道系統用戶）＋水源保育與回饋費＋
	// 加壓設備維護管理費（本處接管集合社區及配合市辦山坡地重劃之自來水用戶）。
	//
	// http://www.water.gov.taipei/ct.asp?xItem=1143979&ctNode=47806&mp=114001
	//
	// Taipei ONLY.
	// Other cities have another algorithm.

	var waterConsumption,waterFee1,waterFee2,waterFee3,waterFee4,waterFee5,waterFee6;

	waterFee2 = parseFloat(document.getElementById("meterSize").value)
	
	waterConsumption = parseFloat(document.getElementById("waterConsumption").value;)
	
	if (waterConsumption <= 20) {
		waterFee1 = waterConsumption * 5;
	}
	else if (waterConsumption >= 21 && waterConsumption <= 60){
		waterFee1 = waterConsumption * 5.2 - 4;
	}
	else if (waterConsumption >= 61 && waterConsumption <= 200){
		waterFee1 = waterConsumption * 5.7 - 34;
	}
	else if (waterConsumption >= 201 && waterConsumption <= 1000){
		waterFee1 = waterConsumption * 6.5 - 194;
	}
	else if (waterConsumption >= 1001){
		waterFee1 = waterConsumption * 7.6 - 1294;
	}
	waterFee4 = waterConsumption * 5;
	waterFee5 = waterFee1 / 1.05 * 0.1;
	document.getElementById("totalWaterFee").innerHTML = waterFee1 + waterFee2 + waterFee4 + waterFee5;

	// Add the following html tags to where we want to calculate water fee.
	//
	// 1.	// input water consumption area      
	//	<input id = "waterConsumption" value = "25" />
	//
	// 2.	// button which call TaipeiWaterFee() function		
	//	<button onclick = "TaipeiWaterFee()">How much did you use? (cubic meter)</button>
	//
	// 3.	// drop-down list, value in there represent meter size
	//	<select id = "meterSize">
	//		<option value = "17" >13</option>
	//		<option value = "68" >20</option>
	//		<option value = "126" >25</option>
	//		<option value = "374" >40</option>
	//		<option value = "680" >50</option>
	//		<option value = "1836" >75</option>
	//		<option value = "3638" >100</option>
	//		<option value = "10098" >150</option>
	//		<option value = "20060" >200</option>
	//		<option value = "35428" >250</option>
	//		<option value = "55590" >300up</option>
	//	</select>
	//
	// 4.	// show total water fee
	//	<p id = "totalWaterFee"></p>
}

