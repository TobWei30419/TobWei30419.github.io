/*global console, document, setTimeout, window, Blob, */ 
/*global alert */
/*global $ */
console.log('hello world');



//init variables
var cam_status = 0;
var sample = 0;
var sampleClean = 0;
var sampleActiv = 0;
var samplePos = 0;
var timeIn = 0;
var timeMes = 0;
timeMes = document.getElementById("count_rate").value
var background = 0
var i = 0
var numberCount = 0;
var countRate = 0;
var mesLength = 2500;
var videoLength = 2500;
var kIron = 0.3
var loc1 = 0 
var loc2 = 0
var vidName = 'stock.mp4'
function time(time) {
	//takes Date object and returns corresponding time as HH:MM:SS
	var t = [time.getHours(), time.getMinutes(), time.getSeconds()];
	var result = "";
	for(i = 0; i < 3; i++) {
		if (t[i] < 10) {
			result += ":0" + t[i];
		} else {
			result += ":" + t[i];
		}
	}
	return result.substring(1);
}

//init log
var log = document.getElementById('log_text');
add_log("Experiment started");

$('#button_cam').click(function() {
    $('#cam_feed').toggle();
});

$('#button_copper').click(function() {
    disableControl()
   sample = 'copper'; 
    sampleClean = 1;
    samplePos = 0;
    sampleActiv = 0;
    timeIn = 0;
    $('#cam_feed').attr('src','PaulaCopperSelected.jpg')
});

$('#button_iron').click(function() {
    disableControl()
   sample = 'iron'; 
    sampleClean = 1;
    sampleActiv = 0;
    samplePos = 0;
    timeIn = 0;
    $('#cam_feed').attr('src','PaulaIronSelected.jpg')
});

$('#button_putIn').click(function() {
   if (sample == 0) {
       alert('No sample selected!')
   }  else if (sample == 'copper' && sampleActiv == 0) {
       disableControl()
        sampleClean = 0;
       sampleActiv = 1;
       timeIn =  document.getElementById("select_putInTime").value
       $('#cam_feed').attr('src','PaulaCopperInSolution.jpg');
       samplePos = 1
       
    } else if (sample == 'iron' && sampleActiv == 0) {
        disableControl()
        sampleClean = 0;
        sampleActiv = 1;
        timeIn =  document.getElementById("select_putInTime").value
       $('#cam_feed').attr('src','PaulaIronInSolution.jpg');
       samplePos = 1
        
    } else if (sampleActiv == 1) {
        alert('The sample was already in solution!')
    }
});

$('#button_clean').click(function() {
   if (sample == 0) {
       alert('No sample selected');
       
   }   else if (sample == 'copper') {
        disableControl()
        sampleClean = 1;
       $('#cam_feed').attr('src','PaulaCopperCleaning.jpg');
       samplePos = 2;
       
   }   else if (sample == 'iron') {
        disableControl()
        sampleClean = 1;
       $('#cam_feed').attr('src','PaulaIronCleaning.jpg');
       samplePos = 2
    }
});

$('#button_bring').click(function() {
   if (sample == 0) {
       alert('No sample selected');
       
   }   else if (sample == 'copper' && sampleClean == 1) {
        disableControl()
       $('#cam_feed').attr('src','PaulaCopperMeasuring.jpg');
       samplePos = 3
       
   }   else if (sample == 'iron' && sampleClean == 1) {
        disableControl()
       $('#cam_feed').attr('src','PaulaIronMeasuring.jpg');
       samplePos = 3
       
    } else if (sampleClean == 0) {
        alert('Please clean the sample first')
    }
});

$('#button_bin').click(function() {
   if (sample == 0) {
       alert('No sample selected');
       
   }   else if (sample == 'copper' && sampleClean == 1) {
        disableControl()
       $('#cam_feed').attr('src','PaulaCopperDiscarding.jpg');
       samplePos = 4
       sample = 0
       
   }   else if (sample == 'iron' && sampleClean == 1) {
        disableControl()
       $('#cam_feed').attr('src','PaulaIronDiscarding.jpg');
       samplePos = 4
       sample = 0  
       
    } else if (sampleClean == 0) {
        alert('Please clean the sample first!')
    }
});
var mesTimer;

$('#button_startCount').click(function() {
    timeMes = document.getElementById("count_rate").value
    createBackground()
    waitButton("button_startCount")
   if (samplePos != 3 || sampleActiv == 0) {
       $('#LED').attr('src','rot.png');
       mesTimer = setTimeout(mesBlank, mesLength)
       
   }   else if (sample == 'copper' && sampleActiv == 1 && samplePos == 3) {
      $('#LED').attr('src','rot.png');
       mesTimer = setTimeout(mesCopper, mesLength);
       
       
   }   else if (sample == 'iron' && sampleActiv == 1 && samplePos == 3) {$('#LED').attr('src','rot.png');
       mesTimer = setTimeout(mesIron, mesLength);
       
    }   
});

$('#button_resetCount').click(createBackground)
    
                              
$('#button_stopCount').click(stopCounting);
$('#button_comment').click(add_comment);
$('#button_download_log').click(downloadLog);

var timeofmes = 0

function createBackground() {
    background = 0
    i=0
   // timeMes = document.getElementById("count_rate").value
    while (i < timeMes / 10) {
    background += Math.floor(Math.random() * 10);
    i++;
}
    i=0
    console.log(background)
}

function stopCounting() {
    clearTimout(mesTimer);
}

function changeLED () {
     $('#LED').attr('src','rot.png');
}


function mesBlank() {
    document.getElementById("numberCount").innerHTML = background
       add_log(document.getElementById("numberCount").innerHTML + ' counts were measured.');
    $('#LED').attr('src','gr??n.png');
}

function mesCopper() {
    document.getElementById("numberCount").innerHTML = Math.abs(background - timeMes/10)
       add_log("The copper sample was measured with " + timeIn + ' minutes in solution for ' + timeMes + ' seconds. ' + document.getElementById("numberCount").innerHTML +' counts were measured');
    $('#LED').attr('src','gr??n.png');
}

function mesIron() {
    document.getElementById("numberCount").innerHTML = Math.round(background + timeMes * (1.32-(1.32) * Math.exp(-kIron*timeIn))) ;
       add_log("The iron sample was measured with " + timeIn + ' minutes in solution for ' + timeMes + ' seconds. ' + document.getElementById("numberCount").innerHTML +' counts were measured');
    $('#LED').attr('src','gr??n.png');
}


function resetValues() {
    sample = 0;
    sampleClean = 0;
    samplePos = 0;
    timeIn = 0;
}


// Log
function add_log(text){
		var now = new Date();
		var str = time(now);
		log.innerHTML += str + "\t" + text + "<br>";
}

function downloadCSV(csv, filename) {
	var csvFile;
	var downloadLink;

	// CSV file
	csvFile = new Blob([csv], {type: "text/csv"});

	// Download link
	downloadLink = document.createElement("a");

	// File name
	downloadLink.download = filename;

	// Create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);

	// Hide download link
	downloadLink.style.display = "none";

	// Add the link to DOM
	document.body.appendChild(downloadLink);

	// Click download link
	downloadLink.click();
}

function downloadLog() {
	var text = log.innerHTML.replaceAll("<br>", "\n");
	downloadCSV(text, "PAuLa_log.txt");
	add_log('Logfile has been downloaded.');
}

function add_comment() {
	var comment = $.trim($('#input_comment').val());
	add_log(comment);
}
    
function waitButton(id) {
      document.getElementById(id).disabled = true;
      setTimeout(function(){document.getElementById(id).disabled = false;},mesLength);
  }

function disableControl() {
    document.getElementById("button_copper").disabled = true;
      setTimeout(function(){document.getElementById("button_copper").disabled = false;},videoLength);
    document.getElementById("button_iron").disabled = true;
      setTimeout(function(){document.getElementById("button_iron").disabled = false;},videoLength);
    document.getElementById("button_putIn").disabled = true;
      setTimeout(function(){document.getElementById("button_putIn").disabled = false;},videoLength);
    document.getElementById("button_clean").disabled = true;
      setTimeout(function(){document.getElementById("button_clean").disabled = false;},videoLength);
    document.getElementById("button_bring").disabled = true;
      setTimeout(function(){document.getElementById("button_bring").disabled = false;},videoLength);
    document.getElementById("button_bin").disabled = true;
      setTimeout(function(){document.getElementById("button_bin").disabled = false;},videoLength);
    document.getElementById("button_resetSample").disabled = true;
      setTimeout(function(){document.getElementById("button_resetSample").disabled = false;},videoLength);
}

function playVideo() {
    loc1 = samplePos + 1
    vidName = sample + '_' + loc1 + 'to' + loc2 + '.mp4'
    $('#cam_feed').attr('src',vidName);
}

$('#button_testJS').click(function() {
   console.log(vidName + 'sample:' + sample, 'sampleActiv:' + sampleActiv, 'sampleClean:' + sampleClean, 'samplePos:' + samplePos, 'timeIn:' + timeIn, 'timeMes:' + timeMes, 'numberCount:' + numberCount, 'backg: '); 
    
});