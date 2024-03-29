var board;
var score = 0;
var rows = 4;
var columns = 4;

let h3 = document.getElementById("h3")
window.onload = function(){
    setGame();
}
//done
function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]

    ]

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]

    // ]
    
    for(let r = 0;r<rows;r++){
        for(let c = 0;c<columns;c++){
            //<div id = "0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            //adding tile to our board
            document.getElementById("board").append(tile);
        }
        h3.innerText = "Game Started";
    }
    setTwo();
    setTwo();

}
//done
function hasEmptyTile(){
    let count = 0;
    for(r = 0;r<rows;r++){
        for(c = 0;c<columns;c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

//setting first to tile randomly
function setTwo() {
    if(!hasEmptyTile()){
        return;
    }
    let found = false;
    while(!found) {
        //random r ,c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found =true;
        }
    }
}
//done
function updateTile(tile, num){
    tile.innerText = "";//clearing the tile
    tile.classList.value = "";//clear the classlist 
    tile.classList.add("tile");//adding the new tile
    if(num > 0){
        tile.innerText = num.toString();
        if(num <= 4096) {
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x8192");
        }
    }
}                                      
                                                 
document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }else if(e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})


function filterZero(row){
    return row.filter(num => num != 0); //create a new array without zeroes
}
function slide(row){
    //[0, 2, 2, 2]
    row = filterZero(row);//get rid of zeroes -> [2, 2, 2]

    //slide
    for(let i = 0;i<row.length-1;i++){
        //check every 2
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }//[2,2,2] -> [4, 0, 2]
    }
    row = filterZero(row); //[4, 2]
    
    //add zeroes
    while(row.length < columns) {
        row.push(0);
    }
    return row;
}
function slideLeft(){
    for(let r = 0;r<rows;r++){
        let row = board[r];
        row = slide(row);
        board[r] = row

        for(let c = 0;c < columns; c++){
           let tile = document.getElementById(r.toString() + "-" + c.toString());
           let num = board[r][c];
           updateTile(tile, num); 
        }
    }
}

function slideRight(){
    for(let r = 0;r<rows;r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row

        for(let c = 0;c < columns; c++){
           let tile = document.getElementById(r.toString() + "-" + c.toString());
           let num = board[r][c];
           updateTile(tile, num); 
        }
    }
}

function slideUp(){
    for(let c = 0;c<columns;c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0;r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num); 
         }
    }
}

function slideDown(){
    for(let c = 0;c<columns;c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0;r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num); 
         }
    }
    
}

// Add touch event listeners
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;

function handleTouchStart(evt) {                                         
    const firstTouch = evt.touches[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                              

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            slideLeft();
            setTwo();
        } else {
            /* right swipe */
            slideRight();
            setTwo();
        }                       
    } else {
        if (yDiff > 0) {
            /* up swipe */
            slideUp();
            setTwo();
        } else { 
            /* down swipe */
            slideDown();
            setTwo();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
