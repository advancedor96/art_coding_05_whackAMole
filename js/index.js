let gfxLoaded = 0; //will server as preloader flag
let titleBgImg = new Image();
let titleBg;

let gameBgImg = new Image();
let gameBg;

let playBtnImg = new Image();
let playBtn;

let alertBgImg = new Image();
let alertBg;

let wormImg = new Image();
let worm;

let frogImg = new Image();
let frog;
let lastFrog;
let numFrogHit = 0;
let currentFrog= 0; //worms already shown 
let FrogsHit = 0;
let totalFrogs = 3; //total of worms to display


let stage;
let titleView = new createjs.Container();

let centerX = 240;
let centerY = 160;
var score;

var wormsX = [80, 198, 338, 70, 225, 376, 142, 356];
var wormsY = [11, 51, 34, 110, 136, 96, 211, 186];



var timerSource;


init = ()=>{
   stage = new createjs.Stage("WhackAWorm");
   createjs.Touch.enable( stage );



   titleBgImg.src = './images/titleBg.png';
   titleBgImg.name = 'titleBg';
   titleBgImg.onload = loadGfx;

   gameBgImg.src = './images/gameBg.png';
   gameBgImg.name = 'gameBg';
   gameBgImg.onload = loadGfx;

   playBtnImg.src = './images/playBtn.png';
   playBtnImg.name = 'playBtn';
   playBtnImg.onload = loadGfx;

   alertBgImg.src = './images/alertBg.png';
   alertBgImg.name = 'alertBg';
   alertBgImg.onload = loadGfx;

   wormImg.src = './images/worm.png';
   wormImg.name = 'worm';
   wormImg.onload = loadGfx;

   //沒有這行，看不到動畫！
   createjs.Ticker.setFPS(60);
   createjs.Ticker.addEventListener("tick", stage);
}

loadGfx = (e)=>{
   if(e.target.name = 'titleBg'){
      titleBg = new createjs.Bitmap(titleBgImg.src);
   }
   if(e.target.name = 'gameBg'){
      gameBg = new createjs.Bitmap(gameBgImg.src);
   }
   if(e.target.name = 'playBtn'){
      playBtn = new createjs.Bitmap(playBtnImg.src);
   }
   if(e.target.name = 'alertBg'){
      alertBg = new createjs.Bitmap(alertBgImg.src);
   }
   if(e.target.name = 'worm'){
      worm = new createjs.Bitmap(wormImg.src);
   }
   gfxLoaded++;
   if(gfxLoaded === 5){
      showTitleView();
   }
}

showTitleView = ()=>{
   stage.addChild(gameBg); //stage 底層是 game 主畫面

   playBtn.x = centerX - 25;
   playBtn.y = centerY + 25;

   titleView.addChild(titleBg, playBtn); //選單畫面秀title及 play 按鈕

   // playBtn.addEventListener('click', showGameView);
   stage.addChild(titleView); //選單畫面加入 stage 上層
   
   startButtonListeners('add');

   // showGameView(); //debug 用，跳過play畫面

   stage.update();
}

startButtonListeners = (action)=>{
   if (action == 'add') {
      titleView.getChildAt(1).addEventListener('click',showGameView);
   }
   else {
      titleView.getChildAt(1).removeAllEventListeners("click");
   }
}

showGameView = ()=>{
   createjs.Tween.get(titleView).to({x: -480}, 200).call(
      function (){
         playBtn.removeAllEventListeners('click');
         stage.removeChild(titleView);
         titleView = null;

         score = new createjs.Text('0' + '/' + 3, 'bold 17px Arial', '#EEE');
         // score.maxWidth = 1000;
         score.x = 58;
         score.y = 5;
         stage.addChild(score);
         stage.update();
         showFrog();
      }
   );
}

showFrog = ()=>{
   if(currentFrog === totalFrogs){
      showAlert();
   }else{
      if(lastFrog != null){
         lastFrog.removeAllEventListeners('click');
         stage.removeChild(lastFrog);
         stage.update();
         lastFrog = null;
      }
      var randomPos = Math.floor(Math.random() * 8);
      frog = new createjs.Bitmap('./images/frog.png');
      frog.x = wormsX[randomPos];
      frog.y = wormsY[randomPos];
   
      
      frog.scaleX = 0.5;
      frog.scaleY = 0.5;
   
      stage.addChild(frog);
      frog.addEventListener('click', frogHit);
      lastFrog = frog;
   
      lastFrog.scaleY = 0.2;
      lastFrog.y += 42;
   
      stage.update();
   
      createjs.Tween.get(lastFrog).to({
         scaleY: 0.5,
         y: wormsY[randomPos]
      }, 200)
      .wait(1000)
      .call(function () { currentFrog++; showFrog() });
   }
}

frogHit = ()=>{
   numFrogHit++;
   score.text = numFrogHit + '/' + totalFrogs;

   lastFrog.removeAllEventListeners('click');
   stage.removeChild(lastFrog);
   lastFrog = null;
   stage.update();

}

showAlert = ()=>{
   alertBg.x = centerX - 120;
   alertBg.y = -80;
   stage.addChild(alertBg);

   createjs.Tween.get(alertBg).to({ y: centerY - 80 }, 200).call(function () {
      createjs.Ticker.removeAllEventListeners();
      var score = new createjs.Text(numFrogHit + '/' + totalFrogs, 'bold 20px Arial', '#EEE');
      score.maxWidth = 1000;    //fix for Chrome 17 
      score.x = 220;
      score.y = 205;
      stage.addChild(score);
      stage.update();
   });
}