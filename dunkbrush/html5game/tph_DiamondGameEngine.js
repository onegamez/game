// main
var canvas                    = document.getElementById('canvas');
var gm4html5_div              = document.getElementById('gm4html5_div_id');
var game_width                = canvas.width;
var game_height               = canvas.height;
var is_mobile                 = isMobile();
var is_app_focused            = document.hasFocus();
var show_rotate_device_screen = true;
var show_loading_screen       = true;

// preloader
var loadingProgress           = 0;

var preloader_bar_x           = game_width*0.5;
var preloader_bar_y           = game_height*0.8;
var preloader_bar_width       = game_width * 0.5;
var preloader_bar_height      = 20;

function js_isIE() {

    var ua = window.navigator.userAgent;
  var isIE = /MSIE|Trident/.test(ua);

  return isIE;
}


function js_isMobileOrTablet() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  
  var touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
  var supportOrientChange = (typeof window.orientation !== 'undefined');

  if (!check)
  {
    return (touchDevice || supportOrientChange);
  }

  return check;
}
//dg_initialize();

//////////////////// Functionality ////////////////////

/**
 * Detects if WebGL is enabled.
 * Inspired from http://www.browserleaks.com/webgl#howto-detect-webgl
 *
 * @return { number } -1 for not Supported,
 *                    0 for disabled
 *                    1 for enabled
 */


function dg_trace(text)
{
  console.log(text);
}

function dg_detectWebGL()
{
    // Check for the WebGL rendering context
    if ( !! window.WebGLRenderingContext) 
    {
        var thisCanvas = canvas,
            names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
            context = false;

        for (var i in names) {
            try {
                context = thisCanvas.getContext(names[i]);
                if (context && typeof context.getParameter === "function") {
                    // WebGL is enabled.
                    return 1;
                }
            } catch (e) {}
        }

        // WebGL is supported, but disabled.
        return 0;
    }

    // WebGL not supported.
    return -1;
};

// SITELOCKS

function dg_iframed( )
{
  if(window.self != window.top)
      return 1; else
      return 0;
}

function dg_getParentDomain()
{
  return window.top.location.href;
}

function dg_getDomainOfSubDomain()
{
  var siteName;
  if (dg_iframed())
    siteName = window.top.location.host; else
    siteName = window.location.host;
  //window.location.host is subdomain.domain.com


  var parts   = siteName.split('.');

  if (parts.length >= 2)
  {
    //var sub  = parts[parts.length-3]
    var domain  = parts[parts.length-2]
    var type    = parts[parts.length-1]
    //sub is 'subdomain', 'domain', type is 'com'
    return domain + "." + type;
  } else
  {
    return siteName;
  }
}

//



function dg_initialize(gameWidth, gameHeight)
{
  game_width  = gameWidth;
  game_height = gameHeight;

  /*
    // PRELOADER SETUP

    if (!show_loading_screen) dg_hide_loading(); else
    resizeLoadingImg();

    // SCROLL GAME TO THE TOP OF THE BROWSER

    window.addEventListener('scroll', function () 
    {
    // Do not scroll when keyboard is visible 
    if (document.activeElement === document.body && window.scrollY > 3) {
        document.body.scrollTop = 0;
        }
    }, true);    */

    // GAME BROWSER FOCUS CONTROL

  window.onfocus = function()
  {
    is_app_focused = true;
  }

  window.onblur = function()
  {
    is_app_focused = false;
  }

}


function isMobile() 
{
    var no_mobile = false;

    if (true)
    {
      testExp = new RegExp('Android|webOS|iPhone|iPad|' +
                 'BlackBerry|Windows Phone|'  +
                 'Opera Mini|IEMobile|Mobile' , 
                'i');
      if (testExp.test(navigator.userAgent)) return true; else return false;
    }
}


function getDocWidth() 
{
  if (self.innerHeight) {
      return self.innerWidth;
      }

  if (document.documentElement && document.documentElement.clientHeight) {
      return document.documentElement.clientWidth;
  }

  if (document.body) {
      return document.body.clientWidth;
  }
}

function getDocHeight() 
{
  if (self.innerHeight) {
      return self.innerHeight;
    }

  if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  }

  if (document.body) {
    return document.body.clientHeight; 
  }
}

function resizeLoadingImg()
{
  var imgLoad       = document.getElementById("GM4HTML5_loadingscreen");
  var imgBar        = document.getElementById("GM4HTML5_loadingbar");
  var wbr           = getDocWidth();
  var hbr           = getDocHeight();

  // loading screen
  if (show_loading_screen)
  if (imgLoad && imgBar)
  if (game_width > game_height)
  { 
    imgLoad.style.width = wbr +"px";
    imgLoad.style.height = wbr/game_width * game_height +"px";
    imgLoad.style.left = 0 + "px";
    imgLoad.style.top  = 0 + "px";
  } else
  {
    imgLoad.style.height = hbr +"px";
    imgLoad.style.width = hbr/game_height * game_width + "px";
    imgLoad.style.left  = (wbr-hbr/game_height * game_width)/2 +"px";
    imgLoad.style.top     = 0 + "px";

    imgBar.style.height = hbr/game_height*preloader_bar_height +"px";
    imgBar.style.width = loadingProgress * preloader_bar_width * hbr/game_height + "px";
    imgBar.style.left  = (wbr-hbr/game_height * preloader_bar_width)/2 +"px";
    imgBar.style.top     = hbr*preloader_bar_y/game_height + "px";
  }

  // rotate screen
  if (show_rotate_device_screen) 
  if (is_mobile == true)
  {
    var imgRotate       = document.getElementById("rotatescreen");
    if (imgRotate)
    if (game_width > game_height)
    {
      if (hbr > wbr) 
      {
        imgRotate.style.left          = 0 +"px";
        imgRotate.style.top           = 0 + "px";
        imgRotate.style.height        = hbr +"px";
        imgRotate.style.width         = wbr + "px";
        imgRotate.style.display       ="block";
        imgRotate.style.pointerEvents = 'auto';
      } else
      {
        imgRotate.style.display       ="none";
        imgRotate.style.pointerEvents = 'none';
      }
    } else
    {
      if (hbr < wbr) 
      {
        imgRotate.style.left          = 0 +"px";
        imgRotate.style.top           = 0 + "px";
        imgRotate.style.height        = hbr +"px";
        imgRotate.style.width         = wbr + "px";
        imgRotate.style.display       ="block";
        imgRotate.style.pointerEvents = 'auto';
      } else
      {
      imgRotate.style.display       ="none";
      imgRotate.style.pointerEvents = 'none';
      }
    }
  }

  // run again in 0.5 sec
  setTimeout(resizeLoadingImg, 500);
}

// Based on FMS loading
function dg_loading_function(_graphics, _width, _height, _total, _current, _loadingscreen) 
{
  loadingProgress = 1/_total * _current;

}

function dg_hide_loading()
{
    return 0;
    var imgBar        = document.getElementById("GM4HTML5_loadingscreen");
    if (imgBar)
    {
      imgBar.style.display        ="none";
      imgBar.style.visibility     ="hidden";
      imgBar.style.pointerEvents  = 'none';
      imgBar.parentNode.removeChild(imgBar);
    }

    imgBar        = document.getElementById("GM4HTML5_loadingbar");
    if (imgBar)
    {
      imgBar.style.display        ="none";
      imgBar.style.visibility     ="hidden";
      imgBar.style.pointerEvents  = 'none';
      imgBar.parentNode.removeChild(imgBar);
    }

}

function dg_eval(code)
{
  eval(code);
}

function dg_set_document_body_color(newColor)
{
  document.body.style.backgroundColor = newColor;
}

function dg_set_document_title(newTitle)
{
  document.title = newTitle;
}
/*
function dg_set_button_params(buttonID, _x, _y, _width, _height )
{
  var b = document.getElementById(buttonID);
  if (b)
  {
    var wbr           = getDocWidth();
    var hbr           = getDocHeight();
    var scale_scr     = hbr/game_height;

    b.style.left = (wbr-scale_scr * game_width)/2 + _x - _width * 0.5 + "px";
    b.style.top = (hbr-scale_scr * game_height)/2 + _y - _height * 0.5 + "px";
    b.style.width = _width * scale_scr + "px";
    b.style.height = _height * scale_scr + "px";
    b.style.pointerEvents = "auto";
  }
}

function dg_disable_button( buttonID )
{
  var b = document.getElementById(buttonID);
  if (b) b.style.pointerEvents = 'none';
}*/

//js_CreateInvisibleButton('nullID', 'http://google.com');
function js_CreateInvisibleButton( buttonID, link )
{
  var btn = document.createElement('invisible_button');

  btn.id = buttonID;
  btn.link = ' ';
  btn.draggable = false;

  if (link == 'fullscreen')
  btn.onclick = function(){ // FULLSCREEN BUTTON
	if (screenfull.enabled)
	    screenfull.toggle();//toggle(document.getElementById("canvas"));
  }; else
  btn.onclick = function(){ // OPEN LINK BUTTON
  	window.open(this.link)
  };

  btn.onmousedown = function(){return false};
  document.body.appendChild(btn);
}

function js_UpdateInvisibleButton( buttonID, x1, y1, x2, y2, link, active )
{
  var btn = document.getElementById(buttonID);

  btn.link = link;

  var scale_scr     = getDocHeight()/game_height;

  btn.style.left    = parseInt(canvas.style.left, 10) + x1*scale_scr + "px";//(wbr-scale_scr * game_width)/2 + x - width * 0.5 + "px";
  btn.style.top     = parseInt(canvas.style.top, 10) + y1*scale_scr + "px";//(hbr-scale_scr * game_height)/2 + y - height * 0.5 + "px";

  btn.style.width   = (x2-x1) * scale_scr + "px";
  btn.style.height  = (y2-y1) * scale_scr + "px";

  if (active) 
  {
    btn.style.pointerEvents = 'auto';
  } else
  {
    btn.style.pointerEvents = 'none';
  }

}

function js_DestroyInvisibleButton( buttonID )
{
  var btn = document.getElementById(buttonID);
  btn.parentNode.removeChild(btn);
}
