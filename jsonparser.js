/*
*	Document   : jsonparser.js  
*   Created on : 12.07.2018
*   Author     : aycan.net
*   Github     : github.com/aycanb
*   Twitter    : twitter.com/aycanb
*/
var DOM = '';

$('#parseJSON').on('click',function (){
    var json = $('#json').val();
    $('.jsonText div').html(jsonparser($.parseJSON(json)));
    jsonParserDropDown();
});

function jsonparser(obj) {
	
    for (var i in obj) {

        if (typeof obj[i] === 'string') {

            if (typeof objectKontrol(obj[i]) === 'object') {
                DOM += '<div class="row"><strong>' + i + ':<a href="#" class="dropDownA down"><i class="fa fa-arrow-down"></i> <span>Down</span></a> </strong>' + jsonparser(objectKontrol(obj[i])) + '</div>';
            } else {
                if (obj[i].length > 0 && obj[i].length < 1000) {
                    DOM += '<div class="row"><strong>' + i + ':  </strong>' + htmlSpecialChar(obj[i]) + '</div>';
                }
            }

        } else if (typeof obj[i] === 'object') {

            if (obj[i] != null) {
                DOM += '<div class="row"><strong>' + i + ':<a href="#" class="dropDownA down"><i class="fa fa-arrow-down"></i> <span>Down</span></a> </strong>';
                jsonparser(obj[i]);
                DOM += '</div>';
            }

        } else {
            DOM += '<div class="row"><strong>' + i + ': </strong>' + obj[i] + '</div>';
        }
    }

    return DOM;
}

function objectKontrol(string) {
	
    if ((string.substr(0, 1) == '{' || string.substr(0, 1) == '[') && string != null) {

        try {
            string = $.parseJSON(string);
        } catch (err) {
            console.log(err, string);
        }

    }
    return string;
	
}


function htmlSpecialChar(string) {
	
    return string.toString().replace(/>/g, '&gt;').replace(/</g, '&lt;');
	
}

function jsonParserDropDown() {

    $('.dropDownA').off().on('click', function (e) {
		
        e.preventDefault();
		
        if ($(this).hasClass('down')) {
            $(this).closest('.row').find(' > .row').slideDown(0);
            $(this).find('span').html("Up");
            $(this).addClass('up').removeClass('down');
        } else {
            $(this).closest('.row').find(' > .row').slideUp(0);
            $(this).find('span').html("Down");
            $(this).addClass('down').removeClass('up');
        }
		
    });
    
    $('#allOpen').off().on('click', function (e) {
        $('.row').slideDown(0);
    });

}
