toggletheme = function(){
    themecss = document.getElementById("theme");
    themebutton = document.getElementById("themebutton");
    if(new RegExp(".*light.css").test(themecss.href)){
        themecss.href = "dark.css";
        themebutton.innerHTML = "Light Theme";
    }
    else{
        themecss.href = "light.css";
        themebutton.innerHTML = "Dark Theme";
    }
}