var InAppBrowserHandle = null;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady()
{
	init();
	//navigator.splashscreen.show();
}

function init()
{
	document.addEventListener("backbutton", backbuttonPress, false);
	 ComponentFolder	=	'partials';
	 index				=	$('#index');
	 indexBackUp		= 	$('#indexBackUp');
	 errorMessages		= 	$("#errorMessages");
	 successMessage		= 	$("#successMessage");
	 AtHome 			= true;
	 body				= 	$('body');
 	 homeButton			= 	$('#home');

 	 if(navigator.connection)
 	 {
 	 	var network = checkConnection();
 	 	if(network != 'No network connection')
 	 		$('#dynamicImage').html("<img src='http://www.spiritnbride.tv/GoBoxApp/banner.jpg'>");
 	 	else
 	 		$('#dynamicImage').html("<img src='img/HomeIcons/Banner.jpg'>");
 	 }else
 	 		$('#dynamicImage').html("<img src='img/HomeIcons/Banner.jpg'>");
	homeButton.click(function(){
		if(!AtHome)
			index.html( indexBackUp.html() );	
		AtHome = true;
		$('#appNav').html("<img  src='img/ove.png'>");
	});
	
	$('footer').html("<div id='center'>&copy; 2015. Isaiah Wealth Ministries</div>");
	 indexBackUp.html( index.html() ).css({display:'none'});
	body.delegate('.BrowserLink','click',function(){

	 	InAppBrowser($(this).attr('url'));
	 });
	 body.delegate('.p_Submit','click',function(e)
	 {
	 	e.preventDefault();
	 	var errors = [];
	 		var p_FullName 		=  $('.p_FullName');
	 		var p_Email 		=  $('.p_Email');
			var p_Country 		=  $('.p_Country');
			var p_PhoneNumber 	=  $('.p_PhoneNumber');
			var p_Message 		=  $('.p_Message');

		if (p_FullName[0].value.length < 3)
			errors.push('Enter your full name');

		if(p_Country[0].value.toLowerCase() == 'country')
			errors.push('Select a country');

		if ( !validateEmail(p_Email[0].value) )
			errors.push('Email address is not valid');

		if ( !validatePhone(p_PhoneNumber[0].value) && p_PhoneNumber[0].value.length < 5)
			errors.push('Phone number is not correct');

		if (p_Message[0].value.length < 3)
			errors.push('Enter your prayer request');

		if(errors.length > 0)
			showFormErrors( errors );

		else
		{
			var p_Data = 
			{
				prayer_req 	: true,
				FullName 	: p_FullName[0].value,
				Email 		: p_Email[0].value,
				Country 	: p_Country[0].value,
				PhoneNumber	: p_PhoneNumber[0].value,
				Message 	: p_Message[0].value
			};

			sendForm( p_Data );
		}
	 });

	body.delegate('.s_Submit','click',function(e)
	 {
	 	e.preventDefault();
	 	var errors = [];
	 		var s_FullName 		=  $('.s_FullName');
	 		var s_Email 		=  $('.s_Email');
			var s_Country 		=  $('.s_Country');
			var s_PhoneNumber 	=  $('.s_PhoneNumber');
			var s_Message 		=  $('.s_Message');

		if (s_FullName[0].value.length < 3)
			errors.push('Enter your full name');

		if(s_Country[0].value.toLowerCase() == 'country')
			errors.push('Select a country');

		if ( !validateEmail(s_Email[0].value) )
			errors.push('Email address is not valid');

		if ( !validatePhone(s_PhoneNumber[0].value) && s_PhoneNumber[0].value.length < 5)
			errors.push('Phone number is not correct');

		if (s_Message[0].value.length < 3)
			errors.push('Enter your testimony');

		if(errors.length > 0)
			showFormErrors( errors );

		else
		{
			var s_Data = 
			{
				testimony 	: true,
				FullName 	: s_FullName[0].value,
				Email 		: s_Email[0].value,
				Country 	: s_Country[0].value,
				PhoneNumber	: s_PhoneNumber[0].value,
				Message 	: s_Message[0].value
			};

			sendForm( s_Data );
		}
	 });
	body.delegate('a','click',function(e){
		e.preventDefault();
		loadComponent( $(this).attr('href') );

	});
	//I want God to love me more and uncoditionally
}

function showFormErrors( errorArray )
{
	var list= '<b>Sorry please fix this errors</b>';

	for(var c = 0; c < errorArray.length; c++)
		list+= '<li>' + errorArray[c] + '</li>';

	$('body').animate({scrollTop: 0}, 10,'swing');
	$('body').scroll(function(){$(this).stop()});
	$("#errorMessages").html('<ul>'+list+'</ul>')
	.fadeIn(500);
}
function sendForm( dataObj )
{
	say ('About to send form');
	var serverLink = 'http://www.spiritnbride.tv/GoBoxApp/index.php';
	loadResource(serverLink, $("#successMessage"), dataObj);
}
function loadComponent( component_link )
{
	AtHome = false;
	$('#appNav').html("<img  src='img/goBack.png'>");
	loadResource(ComponentFolder+'/'+component_link+'.html', index);
}
function InAppBrowser( link )
{
	 InAppBrowserHandle = window.open( link, '_blank', 'location=no');
}

function loadResource(link, dest)
{
	if(typeof arguments[2] == 'object')
		dataTosend = arguments[2];
	else
		dataTosend = {};

	$.ajax(
	{
		url	 		: link,
		type 		: 'POST',
		data 		: dataTosend,
		dataType	: 'html',
		success		:function( responseText ){
			say ('success');
			dest.html('');
			dest.html( responseText ).show();

		},
		error		:function(){
			say('Failed to load resource from '+link);
		},
		beforeSend	:function(){
			say("Tryig to load resource");
		}
	});
}
function say(string)
{
	console.log( string );
}
function validateEmail(emailAddrs)
{
	var re = /[a-z,A-Z,0-9]/;
	var dotPos = emailAddrs.lastIndexOf('.');
	var atPos	 = emailAddrs.lastIndexOf('@');
	var wsp		 = emailAddrs.lastIndexOf(' ');
	var atPos_minus	 = emailAddrs.substring(atPos -1, atPos);
	if(atPos > 0 && dotPos > atPos && wsp < 0 && re.test(atPos_minus) )
		return true;
	else
		return false;
}
function validatePhone(phone)
{
	var re = /[a-z,A-Z]/;
	if(phone.indexOf('0') == 0 || phone.lastIndexOf('+') == 0)
		return !re.test( phone.substring(1));
	else
		return false;
}

function backbuttonPress()
{
	if(AtHome)
	{
		navigator.app.exitApp();
	}
	else
	{
		homeButton.click();

	}	
}
function shareApp()
{
	var message = "Now you can access and enjoy God's word on a whole new level. Download GoBox app now !";
	window.plugins.socialsharing.share( message , null, null, 'http://spiritnbride.tv/GoBoxApp/downloads.php');
}
function onConfirm(index)
{
	if(index == 2)
		navigator.app.exitApp();
}
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    return states[networkState];
}
