
var cols=40;
var rows=40;
var p = 0;
var dropsize = 25;
var drops = [];
var currentround = 0;
var spawning = false;
var score= 0;
var levens=20;

function setup() {
    frameRate(30);
    createCanvas(800, 800);
}
let paused = false;
let world = { enemies:[  ]};

const timePassed = (() => {
    let lastTick = Date.now();

    return (() => {
        const now = Date.now();
        const delta = now - lastTick;
        lastTick = now;
        return delta / 1000;
    });
})();


function draw() {
    onTick(timePassed());
    render();
    rondetext();
    naam();
    instructies();
    commands();
    toonScore();
    toonLevens();
}
function toonScore() {

    s = "Score: "+score;
    textSize(28);
    fill(0);
    textAlign(CENTER);
    text(s, 300, 20, 300, 100);


}
function toonLevens(){

    s = "Levens: "+levens;
    textSize(20);
    fill(0);
    textAlign(CENTER);
    text(s, 600, 100, 300, 100);
    for (var i = 0; i < world.enemies.length; i++) {
        const enemy = world.enemies[i];
        if(enemy.x<0 && enemy.y >700 && enemy.y <750 && levens != 0){
            levens--;
        }



    }
    if(levens <= 0){
        fill(255);
        rect(0, 0, 800, 800);
        s = "GAME OVER";
        textSize(80);
        fill(0);
        textAlign(CENTER);
        text(s, 400, 400, 300, 200);
    }

    return levens;

}

function naam(){
    s = "Tower Invaders";
    textSize(40);
    fill(0);
    textAlign(CENTER);
    text(s, 10, 10, 300, 100);
}

function instructies(){
    s = "Het doel is om al de rode bollekes dood te schieten aan de hand van je muis";
    textSize(28);
    fill(0);
    textAlign(CENTER);
    text(s, 10, 350, 300, 150);
}

function commands(){
    s = "esc om te pauzeren, refresh om opnieuw te beginnen";
    textSize(28);
    fill(0);
    textAlign(CENTER);
    text(s, 400, 350, 300, 100);
}

    function rondetext(){
    if (currentround==1){ s ="ronde 1";}
    if (currentround==2){ s ="ronde 2";}
    if (currentround==3){ s ="ronde 3";}
    if (currentround==4){ s ="ronde 4";}
    if (currentround==5){ s ="ronde 5";}
    if (currentround==6){ s ="ronde 6";}
    if (currentround==7){ s ="ronde 7";}
    if (currentround==8){ s ="ronde 8";}
    if (currentround==9){ s ="ronde 9";}
    if (currentround==10){ s ="ronde 10";}
    if (currentround==11){ s ="einde";}
    textSize(40);
    fill(0);
    textAlign(CENTER);
    text(s, 600, 10, 200, 200);
}

function onTick(dt)
{
    if ( !paused ) {
        for (const enemy of world.enemies) {
            moveEnemy(enemy, dt);
        }
    }
}

function moveEnemy(enemy, dt)
{
    const dx = dt*10;
    //console.log(dx);

    if ( enemy.x < 0 )
    {
        enemy.x = 0;
        enemy.y = 270;
    }
    if ( enemy.y > 730 )
    {
        enemy.x -= enemy.speed * dx;
    }
    else if ( enemy.x > 730 )
    {
        enemy.y += enemy.speed * dx;
    }
    else
    {
        enemy.x += enemy.speed * dx;
    }

}

function render() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            let x = i * 20;
            let y = j * 20;
            stroke(0);
            fill(157, 193, 131);
            rect(x, y, 20, 20);
        }
    }
    createRoad();

    for ( const enemy of world.enemies )
    {
        drawEnemy(enemy);
    }

    for (let drop of drops) {
        drawDrop(drop);
        if (drop.lifespan > 0) drop.lifespan--;
        else drops.splice(drops.indexOf(drop), 1)
    }
    tower()

}
function drawEnemy(enemy){
    fill(211, 55, 55);
    ellipse(enemy.x, enemy.y, 20, 20);



}
function createRoad(){
    for (let i = 0; i < 38; i++) {
        for (let j = 0; j < cols; j++) {
            let x = i * 20;
            let y = j * 20;
            if (j >= 12 && j <= 14 || j>=35 && j<=37) {
                stroke(0);
                fill(194, 178, 128);
                rect(x, y, 20, 20);
            }
            if(i>=35 && i<=37 && j>=12 && j<=37){
                stroke(0);
                fill(194, 178, 128);
                rect(x, y, 20, 20);
            }

        }
    }
    var tower= {
        x: -70,
        y: 240,
        display: function () {
            fill(70,70,70);
            rect(this.x, this.y, 40,120);
            fill(0);
            rect(this.x-20,this.y-40,80,40);
            fill(60,70,70);
            rect(this.x-20,this.y-60,20,20);
            fill(60,70,70);
            rect(this.x+10,this.y-60,20,20);
            fill(60,70,70);
            rect(this.x+40,this.y-60,20,20);

        }
    };
    tower.y = 120;
    for (var i = 0; i<7;i++){
        tower.x += 100;
        tower.display();
    }
    tower.display();

    var tower2={
        x: -70,
        y: 240,
        display: function () {
            fill(70,70,70);
            rect(this.x, this.y, 40,120);
            fill(0);
            rect(this.x-20,this.y-40,80,40);
            fill(60,70,70);
            rect(this.x-20,this.y-60,20,20);
            fill(60,70,70);
            rect(this.x+10,this.y-60,20,20);
            fill(60,70,70);
            rect(this.x+40,this.y-60,20,20);
        }
    };
    tower2.y = 580;
    for (var i = 0; i<7;i++){
        tower2.x += 100;
        tower2.display();
    }
    tower2.display();


}
function tower(){
    let x= -70;
    let y= 240;
    function display(){
        fill(70,70,70);
        rect(this.x, this.y, 40,120);
        fill(0);
        rect(this.x-20,this.y-40,80,40);
        fill(60,70,70);
        rect(this.x-20,this.y-60,20,20);
        fill(60,70,70);
        rect(this.x+10,this.y-60,20,20);
        fill(60,70,70);
        rect(this.x+40,this.y-60,20,20);
    }

}

function range(tower,distance) {
    let count = aantalLevens();
    for (let i = tower; i < distance; i++) {
        if (enemy => distante) {
            count--;
        }
    }
    return count;
}

function keyPressed() {
    if ( keyCode === ESCAPE )
        paused = !paused;
}

function mouseClicked() {
    drop(mouseX, mouseY);
}



function drawDrop(drop){
    fill(50, 55, 200);
    ellipse(drop.x, drop.y, dropsize, dropsize);
}

function drop(x, y) {
    drops.push({x:x, y:y, lifespan: 5});
    for (let enemy of world.enemies) {
        // TODO distance between enemy xy and drop xy < dropsize, then dmg
        let b=x-enemy.x;
        let c=y-enemy.y;

        let distance=Math.sqrt(Math.pow(b,2)+Math.pow(c,2));

        if(distance<dropsize){
            if(!paused)enemy.health-=5;
            if(enemy.health<0){
                world.enemies.splice(world.enemies.indexOf(enemy), 1);
                score = score +20;
            }
        }
    }
    if(!spawning && world.enemies.length == 0){
        if(currentround == 1) ronde2();
        else if (currentround == 2) ronde3();
        else if (currentround == 3) ronde4();
        else if (currentround == 4) ronde5();
        else if (currentround == 5) ronde6();
        else if (currentround == 6) ronde7();
        else if (currentround == 7) ronde8();
        else if (currentround == 8) ronde9();
        else if (currentround == 9) ronde10();
        else if (currentround == 10) einde(); console.log("game finished");
    }

}


var spawning = false;

function ronde1() {
    console.log("r1");
    currentround = 1;
    console.log(world.enemies.length);
    let amount = 20;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 10});
        if (--amount == 0) {
            spawning = false;
            clearInterval(interval);
        }
    },1000);

    //while (world.enemies.length <= 20) {};
    //clearInterval(interval)
}

function ronde2() {
    console.log("r2");
    currentround = 2;
    let amount = 20;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 20});
        if (--amount == 0)
        { spawning = false;
        clearInterval(interval);}
    },1000);
}

function ronde3() {
    console.log("r3");
    currentround = 3;
    let amount = 15;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 30});
        if (--amount == 0) {spawning = false;
        clearInterval(interval);}
    },1000);
}

function ronde4() {
    console.log("r4");
    currentround = 4;
    let amount = 10;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 40});
        if (--amount == 0) {spawning = false;
            clearInterval(interval);}
    },1000);
}

function ronde5() {
    console.log("r5");
    currentround = 5;
    let amount = 5;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 50});
        if (--amount == 0) {spawning = false;
            clearInterval(interval);}
    },1000);
}

function ronde6() {
    console.log("r6");
    currentround = 6;
    let amount = 5;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 60});
        if (--amount == 0) {spawning = false;
            clearInterval(interval);}
    },1000);
}

function ronde7() {
    console.log("r7");
    currentround = 7;
    let amount = 5;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 60});
        if (--amount == 0) {spawning = false;
            clearInterval(interval);}
    },1000);
}

function ronde8() {
    console.log("r8");
    currentround = 8;
    let amount = 5;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 70});
        if (--amount == 0) {spawning = false;
            clearInterval(interval);}
    },1000);
}

function ronde9() {
    console.log("r9");
    currentround = 9;
    let amount = 5;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 80});
        if (--amount == 0) {spawning = false;
            clearInterval(interval);}
    },1000);
}

function ronde10() {
    console.log("r10");
    currentround = 10;
    let amount = 5;
    spawning = true;
    let interval = setInterval(() => {
        world.enemies.push({x: 0, y: 270, health: 1, speed: 90});
        if (--amount == 0) {spawning = false;
            clearInterval(interval);}
    },1000);
}

function einde(){
    currentround =11
}
ronde1();