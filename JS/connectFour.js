const spaceCollections=document.querySelectorAll(".space");
const gridCollections=document.querySelectorAll(".gameBoard div");

let chipCollections=document.querySelectorAll(".chip");
let currentPlayer=1;
let currentId=null;
let clicked=false;
let activeChip=null;
let currentPlayerChip=document.querySelector(".playerRepresentation");
let gameSound=new Audio("Audio/chipFallingSound.mp3");
let radioCheck=document.querySelector("#radioButton");
let radioCheckSML=document.querySelector("#radioButtonSML");

//Game restart 
function restart(){
	location.reload();
}

//
chipCollections.forEach(arg=>{
		arg.addEventListener("click",classAssignment);
		arg.addEventListener("click",soundBox);
})

//
function soundBox(){
	if(radioButton.checked===true && radioCheckSML.checked===true){
		gameSound.play();
	}
}

//
function colorSelection(){
	chipCollections.forEach(arg=>{
		if(!arg.classList.contains('selected')){
			if(currentPlayer===1){
				arg.classList.remove('blue');
				arg.classList.add('red');
			}
			else if(currentPlayer===2){
				arg.classList.remove('red');
				arg.classList.add('blue');
			}
		}
	})
}
colorSelection();

//
function colorSelection2(){
	if(currentPlayer===1){
		currentPlayerChip.classList.remove('blue');
		currentPlayerChip.classList.add('red');
	}
	else if(currentPlayer===2){
		currentPlayerChip.classList.remove('red');
		currentPlayerChip.classList.add('blue');
	}
}
colorSelection2();

//
function idAssignment(){
	chipCollections.forEach((arg,i)=>{
		arg.id=i;
	})
}

//
function classAssignment(){
	if(clicked===false){
		idAssignment();
		currentId=this.id;
		if(!gridCollections[currentId].classList.contains('taken')){
			this.classList.remove('chip');
			this.classList.add('unclickable','selected');
			let newDiv=document.createElement('div');
			newDiv.classList.add('chip');
			spaceCollections[currentId].appendChild(newDiv);
			chipCollections=document.querySelectorAll(".chip");
			idAssignment();
			let newNodeList=chipCollections;
			newNodeList.forEach(arg=>{
				arg.addEventListener("click",classAssignment);
				arg.addEventListener("click",soundBox);
			})
			activeChip=this;
			clicked=true;
			slideDownChips(1);
		}
		else{
			alert("You cannot select this region");
		}
	}
}

//Recursive algorithm for gravity
function slideDownChips(i){

	if(gridCollections[parseInt(currentId)+7*i].classList.contains('taken')){
		let downDistance=null;
		if(window.scrollY===0){
			downDistance=parseInt(parseInt(gridCollections[parseInt(currentId)+7*(i-1)].getBoundingClientRect().top)-95);
		}
		else{
			downDistance=parseInt(parseInt(gridCollections[parseInt(currentId)+7*(i-1)].getBoundingClientRect().top)-95)+parseInt(window.scrollY);
		}
		activeChip.style.transition="1s ease-in-out";
		activeChip.style.transform="translateY("+downDistance+"px)";
		gridCollections[parseInt(currentId)+7*(i-1)].classList.add('taken');
		//Toggler
		activeChip.addEventListener("transitionend",()=>{
			clicked=false;
			checkWinner();
		})
		if(currentPlayer===1){
			gridCollections[parseInt(currentId)+7*(i-1)].classList.add("player-one");
			currentPlayer=2;
			colorSelection();
			colorSelection2();
		}
		else if(currentPlayer===2){
			gridCollections[parseInt(currentId)+7*(i-1)].classList.add("player-two");
			currentPlayer=1;
			colorSelection();
			colorSelection2();
		}

	}
	else{
		slideDownChips(++i);
	}
}

//Array of winning positions
function checkWinner(){
	const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ]
  for(let y=0,len=winningArrays.length;y<len;y++){
  	let winnerSpace1=gridCollections[winningArrays[y][0]];
  	let winnerSpace2=gridCollections[winningArrays[y][1]];
  	let winnerSpace3=gridCollections[winningArrays[y][2]];
  	let winnerSpace4=gridCollections[winningArrays[y][3]];
 	if(winnerSpace1.classList.contains('player-one') && winnerSpace2.classList.contains('player-one')&&winnerSpace3.classList.contains('player-one') && winnerSpace4.classList.contains('player-one')){
 		alert("Red wins");
 		disable();
 	}
 	else if(winnerSpace1.classList.contains('player-two') && winnerSpace2.classList.contains('player-two') && winnerSpace3.classList.contains('player-two') && winnerSpace4.classList.contains('player-two')){
 		alert("Blue wins");
 		disable();
 	}
  }
}

//
function disable(){
	document.querySelectorAll("#gridContainer div").forEach(arg=>{
		arg.classList.add('unclickable');
	})
}