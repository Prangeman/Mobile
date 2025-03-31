let showmenu = false;
const meny = document.querySelector('.menu');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    console.log("Mobile device detected");
    showmenu = false;
    document.createElement('button').addEventListener('click'), () => {
        showmenu = !showmenu; 
        
    }
} 
    else {
    console.log('Not a mobile device');
    showmenu = true;
}

if (showmenu = true) {
    meny.style.display = 'block';
    meny.style.position = 'absolute';
} 
else {
    meny.style.display = 'none';
    meny.style.position = 'fixed';
}