let f1 = anime.timeline({
	autoplay: false,
	complete: function() { 
		//隨機等待0.5秒到 5秒再出現。
		console.log('f1 等2秒準備重生:');
		// let random = anime.random(500, 5000);
		let random = anime.random(2000, 2000);
		setTimeout(()=>{
			f1.restart()}, 
			random);
	}
});

f1.add({
	targets: '#frog_1',
	delay: 0,
	// delay: anime.random(500, 2000),
	top: 0,
	duration: 500,
	easing: 'easeInOutSine',
 })
 .add({
	targets: '#frog_1',
	duration: 5000,	//停多久
 })
 .add({
	targets: '#frog_1',
	top: 200,
	duration: 500,
	easing: 'easeInOutSine',
 })


//  let f2 = anime.timeline({
// 	autoplay: false,
// 	complete: function() { 
// 		//隨機等待0.5秒到 5秒再出現。
// 		let random = anime.random(499, 5000);
// 		setTimeout(()=>{
// 			f2.restart()}, 
// 			random);
// 	}
// });

// f2.add({
// 	targets: '#frog_2',
// 	top: 0,
// 	delay: anime.random(500, 2000),
// 	duration: 500,
// 	easing: 'easeInOutSine',
//  })
//  .add({
// 	targets: '#frog_2',
// 	duration: 1000,	//停多久
//  })
//  .add({
// 	targets: '#frog_2',
// 	top: 200,
// 	duration: 500,
// 	easing: 'easeInOutSine',
//  })

//  let f3 = anime.timeline({
// 	autoplay: false,
// 	complete: function() { 
// 		//隨機等待0.5秒到 5秒再出現。
// 		let random = anime.random(500, 5000);
// 		setTimeout(()=>{
// 			f3.restart()}, 
// 			random);
// 	}
// });

// f3.add({
// 	targets: '#frog_3',
// 	top: 0,
// 	delay: anime.random(498, 2000),
// 	duration: 500,
// 	easing: 'easeInOutSine',
//  })
//  .add({
// 	targets: '#frog_3',
// 	duration: 1000,	//停多久
//  })
//  .add({
// 	targets: '#frog_3',
// 	top: 200,
// 	duration: 500,
// 	easing: 'easeInOutSine',
//  })

let hit = anime.timeline({autoplay: false,});

hit.add({
	targets: '#frog_1',
	translateY: [0, 200],
	// backgroundColor: "#0F0000",
	duration: 500,
	autoplay:false,
	elasticity: 0,
	complete: function(){
		console.log('效果結束，讓f1過5秒後重生:');
		let random = anime.random(5000, 5000);
		// let random = anime.random(1000, 5000);
		setTimeout(()=>{
			f1.restart()}, 
			random);
	}
})


 let btn = document.querySelector('#startBtn');
 btn.addEventListener('click', (e)=>{
	f1.play();
	// f2.play();
	// f3.play();
})
let score = 0;
let frog1 = document.querySelector('#frog_1');
frog1.addEventListener('click', (e)=>{
	score += 1;
	console.log('打到f1, 讓f1暫停:');
	f1.pause();
	console.log('啟動打擊效果:',);
	hit.play();
	// console.log('score:',score);
})
// let frog2 = document.querySelector('#frog_2');
// frog2.addEventListener('click', (e)=>{
// 	score += 1;
// 	console.log('score:',score);
// })
// let frog3 = document.querySelector('#frog_3');
// frog3.addEventListener('click', (e)=>{
// 	score += 1;
// 	console.log('score:',score);
// })