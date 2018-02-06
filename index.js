let f1 = anime.timeline({
	autoplay: false,
	complete: function() { 
		//隨機等待0.5秒到 5秒再出現。
		let random = anime.random(500, 5000);
		setTimeout(()=>{
			f1.restart()}, 
			random);
	}
});

f1.add({
	targets: '#frog_1',
	delay: anime.random(500, 2000),
	top: 0,
	duration: 500,
	easing: 'easeInOutSine',
 })
 .add({
	targets: '#frog_1',
	duration: 1000,	//停多久
 })
 .add({
	targets: '#frog_1',
	top: 200,
	duration: 500,
	easing: 'easeInOutSine',
 })


 let f2 = anime.timeline({
	autoplay: false,
	complete: function() { 
		//隨機等待0.5秒到 5秒再出現。
		let random = anime.random(500, 5000);
		setTimeout(()=>{
			f2.restart()}, 
			random);
	}
});

f2.add({
	targets: '#frog_2',
	top: 0,
	delay: anime.random(500, 2000),
	duration: 500,
	easing: 'easeInOutSine',
 })
 .add({
	targets: '#frog_2',
	duration: 1000,	//停多久
 })
 .add({
	targets: '#frog_2',
	top: 200,
	duration: 500,
	easing: 'easeInOutSine',
 })

 let f3 = anime.timeline({
	autoplay: false,
	complete: function() { 
		//隨機等待0.5秒到 5秒再出現。
		let random = anime.random(500, 5000);
		setTimeout(()=>{
			f3.restart()}, 
			random);
	}
});

f3.add({
	targets: '#frog_3',
	top: 0,
	delay: anime.random(500, 2000),
	duration: 500,
	easing: 'easeInOutSine',
 })
 .add({
	targets: '#frog_3',
	duration: 1000,	//停多久
 })
 .add({
	targets: '#frog_3',
	top: 200,
	duration: 500,
	easing: 'easeInOutSine',
 })



 let btn = document.querySelector('#startBtn');
 btn.addEventListener('click', (e)=>{
	f1.play();
	f2.play();
	f3.play();
})
let score = 0;
let frog1 = document.querySelector('#frog_1');
frog1.addEventListener('click', (e)=>{
	score += 1;
	console.log('score:',score);
})
let frog2 = document.querySelector('#frog_2');
frog2.addEventListener('click', (e)=>{
	score += 1;
	console.log('score:',score);
})
let frog3 = document.querySelector('#frog_3');
frog3.addEventListener('click', (e)=>{
	score += 1;
	console.log('score:',score);
})