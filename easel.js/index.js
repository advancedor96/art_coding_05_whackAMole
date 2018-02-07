function init() {
   var stage = new createjs.Stage("WhackAWorm");

   // stage.mouseEventsEnabled = true;
   createjs.Touch.enable( stage );


   /* Title View */

   var titleBgImg = new Image();
   var titleBg;

   var gameBgImg = new Image();
   var gameBg;

   var playBtnImg = new Image();
   var playBtn;

   var creditsBtnImg = new Image();
   var creditsBtn;
   var titleView = new createjs.Container();
   var creditsViewImg = new Image();
   var creditsView;

   var alertBgImg = new Image();
   var alertBg;

   var score;

   var wormImg = new Image();
   var worm;

   var wormsX = [80, 198, 338, 70, 225, 376, 142, 356];
   var wormsY = [11, 51, 34, 110, 136, 96, 211, 186];
   var currentWorms = 0; //worms already shown 
   var wormsHit = 0;
   var totalWorms = 3; //total of worms to display
   var lastWorm;


   var centerX = 240;
   var centerY = 160;
   var gfxLoaded = 0; //used as a preloader 

   var timerSource;




   /* 準備 GFS */
   titleBgImg.src = 'titleBg.png';
   titleBgImg.name = 'titleBg';
   titleBgImg.onload = loadGfx;

   gameBgImg.src = 'gameBg.png';
   gameBgImg.name = 'gameBg';
   gameBgImg.onload = loadGfx;

   playBtnImg.src = 'playBtn.png';
   playBtnImg.name = 'playBtn';
   playBtnImg.onload = loadGfx;

   creditsBtnImg.src = 'creditsBtn.png';
   creditsBtnImg.name = 'creditsBtn';
   creditsBtnImg.onload = loadGfx;

   creditsViewImg.src = 'creditsView.png';
   creditsViewImg.name = 'credits';
   creditsViewImg.onload = loadGfx;

   alertBgImg.src = 'alertBg.png';
   alertBgImg.name = 'alertBg';
   alertBgImg.onload = loadGfx;

   wormImg.src = 'worm.png';
   wormImg.name = 'worm';
   wormImg.onload = loadGfx;


   createjs.Ticker.setFPS(30);
   createjs.Ticker.addEventListener("tick", stage);

   function loadGfx(e) {
      console.log('呼叫 loadGfx, gfxLoaded:', gfxLoaded);
      if (e.target.name = 'titleBg') {
         titleBg = new createjs.Bitmap(titleBgImg.src);
      }
      if (e.target.name = 'gameBg') { gameBg = new createjs.Bitmap(gameBgImg.src); }
      if (e.target.name = 'playBtn') { playBtn = new createjs.Bitmap(playBtnImg.src); }
      if (e.target.name = 'creditsBtn') { creditsBtn = new createjs.Bitmap(creditsBtnImg.src); }
      if (e.target.name = 'alertBg') { alertBg = new createjs.Bitmap(alertBgImg.src); }
      /* --CreditsView 
         --Worms */

      gfxLoaded++;

      if (gfxLoaded == 7) {
         addTitleView();
      }
   }

   function addTitleView() {
      stage.addChild(gameBg);
      /* Title Screen */

      playBtn.x = centerX - 25;
      playBtn.y = centerY + 35;

      creditsBtn.x = centerX - 40;
      creditsBtn.y = centerY + 80;

      titleView.addChild(titleBg, playBtn, creditsBtn);

      stage.addChild(titleView);

      startButtonListeners('add');

      stage.update();
   }

   function startButtonListeners(action) {
      if (action == 'add') {
         titleView.getChildAt(1).addEventListener('click',showGameView);
         titleView.getChildAt(2).addEventListener('click',showCredits);
      }
      else {
         titleView.getChildAt(1).removeAllEventListeners("click");
         titleView.getChildAt(2).removeAllEventListeners("click");
      }
   }
   function showGameView() {
      createjs.Tween.get(titleView).to({ x: -480 }, 200).call(
         function () {
            startButtonListeners('rmv');
            stage.removeChild(titleView);
            titleView = null;

            score = new createjs.Text('0' + '/' + totalWorms, 'bold 15px Arial', '#EEE');
            score.maxWidth = 1000;
            score.x = 58;
            score.y = 21;
            stage.addChild(score);

            showWorm();
         }
      );
   }
   function showWorm(){
      if(currentWorms == totalWorms){
         showAlert();
      }else{
         // 把上一個worm 拿掉事件
         if(lastWorm != null){
            lastWorm.removeAllEventListeners('click');
            stage.removeChild(lastWorm);
            stage.update();
            lastWorm = null;
         }
         var randomPos = Math.floor(Math.random() * 8);
         var worm = new createjs.Bitmap('worm.png'); 
  
         worm.x = wormsX[randomPos]; 
         worm.y = wormsY[randomPos]; 
         stage.addChild(worm); 
         worm.addEventListener('click', wormHit); 
         lastWorm = worm;


         lastWorm.scaleY = 0.3; 
         lastWorm.y += 42; 
         stage.update(); 

         createjs.Tween.get(lastWorm).to({ scaleY: 1, y: wormsY[randomPos] }, 200)
         .wait(3000)
         .call(function () { currentWorms++; showWorm() });

      }
   }
   function wormHit(){
      console.log('打擊到，');
      wormsHit++;
      console.log('wormHit:',wormsHit);
      score.text = wormsHit + '/' + totalWorms; 
      lastWorm.removeAllEventListeners('click');
      stage.removeChild(lastWorm);
      lastWorm = null;
      stage.update();
   }

   function showAlert() {
      alertBg.x = centerX - 120;
      alertBg.y = -80;
      stage.addChild(alertBg);

      createjs.Tween.get(alertBg).to({ y: centerY - 80 }, 200).call(function () {
         createjs.Ticker.removeAllEventListeners();
         var score = new createjs.Text(wormsHit + '/' + totalWorms, 'bold 20px Arial', '#EEE');
         score.maxWidth = 1000;    //fix for Chrome 17 
         score.x = 220;
         score.y = 205;
         stage.addChild(score);
         stage.update();
      });
   }






   function showCredits() {
      playBtn.visible = false;
      creditsBtn.visible = false;
      creditsView = new createjs.Bitmap('creditsView.png');
      stage.addChild(creditsView);
      creditsView.x = -203;
      createjs.Tween.get(creditsView).to({ x: 0 }, 200).call(function () { 
         creditsView.addEventListener('click', hideCredits) 
      });
   }
   function hideCredits() {
      playBtn.visible = true;
      creditsBtn.visible = true;
      createjs.Tween.get(creditsView).to({ x: -203 }, 200).call(function () { 
         creditsView.removeAllEventListeners("click"); 
         stage.removeChild(creditsView); 
         creditsView = null; 
      });
   }
}
