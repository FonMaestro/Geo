var flvplayerjs_listener = new Object();

flvplayerjs_listener.onFinished=function() {
    alert("fin");
};

(function($){
$.fn.flvplayer = function(customOptions) {

    var options = {
        // General properties
        flv: "",                        // Movie url
        title: "",                      // Movie title
        startimage: "",                 // URL of jpeg
        volume: 100,                    // Initial volume
        autoplay: 0,                    // Autoplay, 0 or 1
        loop: 0,                        // Loop, 0 or 1
        autoload: 1,                    // Autoload, 0 or 1
        width: 320,                     // Initial width
        height: 200,                    // Initial height
        // Border
        margin: 1,                      // Margin, in px
        bgcolor: "ffffff",              // Background-color
        bgcolor1: "000000",             // The first color of the background gradient
        bgcolor2: "000000",             // The second color of the background gradient
        // Buttons of the player bar
        showstop: 0,                    // 1 to show the stop button
        showvolume: 0,                  // 1 to show the volume button
        showtime: 0,                    // 1 to show the time button, 2 to show the remaining time by default
        showplayer: "autohide",         // Player bar display mode: autohide, always or never
        showloading: "autohide",        // Loading bar display mode: autohide, always or never
        showfullscreen: 1,              // 1 to show fullscreen button
        showswitchsubtitles: 0,         // 1 to show the button show/hide subtitles
        playertimeout: 1500,            // The timeout in milliseconds before the player hides
        // Colors of the player bar
        playercolor: "000000",          // Background color of the player bar
        playeralpha: 100,               // Transparency of the player bar (0-100)
        loadingcolor: "cccccc",         // The color of loading bar
        buttoncolor: "cccccc",          // The color of the buttons
        buttonovercolor: "888888",      // Hover color of buttons
        slidercolor1: "cccccc",         // The first color of the bar gradient
        slidercolor2: "888888",         // The second color of the bar gradient
        sliderovercolor: "888888",      // Hover color of the bar
        //Buffer display
        buffer: 5,                      // Buffer seconds
//        buffermessage: t('flvplayer.buffering'),            // Buffering message
        buffercolor: "ffffff",          // The color of the buffering message
        bufferbgcolor: "000000",        // The background color of the buffering message
        buffershowbr: 1,                // 0 to hide the background of the buffering message
        // Title
        titlecolor: "ffffff",           // The color of title
        titlesize: 20,                  // The size of the title's font
        // Subtitles
        srt: 0,                         // 1 to load subtitles (the file in the same place with the same name as the video, srt extension)
        srtcolor: "ffffff",             // Subtitle color
        srtbgcolor: "000000",           // Subtitle bg color
        srtsize: 11,                    // Subtitle font size
        srturl: "",                     // Subtitle url, if you don't want the automatic detection
        // Mouse control
        onclick: "playpause",           // playpause or none
        ondoubleclick: "fullscreen",    // playpause, fullscreen or none
        // Video icons
        showiconplay: 1,                // 1 to show the play icon in the middle of the video
        iconplaycolor: "ffffff",        // The color of play icon
        iconplaybgcolor: "000000",      // The bg color of play icon
        iconplaybgalpha: 75,            // Transparency of play icon, 0-100
        //Miscelaneous
        showmouse: "autohide",          // always, never, autohide
        videobgcolor: "000000",         // Background color of the flash, when no video is loaded
        loadonstop: 0,                  // 0 to stop the video loading when click the stopo button
        netconnection: ""              // RTMP server url
    };

    $.extend(options, customOptions);

    return this.each(function() {
        var obj = $(this);
        var html ="";
        var fv ="";
        for(var key in options) {
            if (options[key]!="") {
                fv += "&" + key + "=" + options[key];
            }                
        }
        fv = fv.substr(1);
        html += "<object type=\"application/x-shockwave-flash\" data=\"/swf/flvplayer.swf\" width=\"" + options["width"] +  "\" height=\"" + options["height"] +  "\">";
        html += "<param name=\"movie\" value=\"/swf/flvplayer.swf\"/>";
        html += "<param name=\"allowFullScreen\" value=\"true\"/>";
        html += "<param name=\"FlashVars\" value=\"" + encodeURI(fv) + "\"/>";
        html += "</object>";
        obj.html(html);
    });

};
})(jQuery);


(function($){
$.fn.flvplayerjs = function(customOptions) {
    var pid;                            // Player id
    var options = {
        listener: "flvplayerjs_listener", // Event listener
//        useexternalinterface: 1,        // 1 to use the External Interface to update the javascript listener
        // General properties
        useHandCursor: 0,               // 0 to hide the hand when hovering the video
        width: 320,                     // Initial width
        height: 200,                    // Initial height
        bgcolor: "ffffff",              // Background-color
        //Buffer display
        buffer: 5                      // Buffer seconds
    };
    $.extend(options, customOptions);
    return this.each(function() {
        var obj = $(this);
        var html ="";
        var fv ="";
        var t = new Date();
        for(var key in options) {
            if (options[key]!="") {
                if (key!="width" && key!="height") {
                    fv += "&" + key + "=" + options[key];
                }
            }
        }
        pid = t.getTime() + Math.floor(Math.random()*10001);
        fv = fv.substr(1);
        html += "<object id=\"pjs" + pid + "\" type=\"application/x-shockwave-flash\" data=\"/swf/flvplayerjs.swf\" width=\"" + options["width"] +  "\" height=\"" + options["height"] +  "\">";
        html += "<param name=\"movie\" value=\"/swf/flvplayerjs.swf\"/>";
        html += "<param name=\"FlashVars\" value=\"" + encodeURI(fv).replace(/&/ig,"&amp;") + "\"/>";
        html += "</object>";
        obj.html(html);
    });
};
})(jQuery);

function flvplayerjs_setUrl(player,url) {
    player.get(0).SetVariable("method:setUrl",url);
}

function flvplayerjs_play(player) {
    player.get(0).SetVariable("method:play","");
}

function flvplayerjs_stop(player) {
    player.get(0).SetVariable("method:stop","");
}

//function flvplayerjs_listener(player) {
//    flvplayerjs_listener.onInit=f;
//}
