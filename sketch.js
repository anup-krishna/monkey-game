var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;


function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
   obstaclesGroup = new Group();
   bananaGroup = new Group();
}


function draw() {
 background("white");
  
  if (gameState===PLAY){
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    stroke("white")
    fill("white")
    textSize(20)
    text("Score: "+ score, 500,50);
    
    stroke("black")
    fill("black")
    textSize(20)
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time: "+ survivalTime, 100,50);
  
    
     
  if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -17;
      //jumpSound.play();
      
    }
    
    monkey.velocityY = monkey.velocityY + 0.7;
  
  monkey.collide(ground);
  
  spawnObstacles();
  spawnbanana();
  
  if(obstaclesGroup.isTouching(monkey)){
     gameState=END
     
     }
  }
  if(gameState===END){
   // banana.velocity
    monkey.collide(ground);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    ground.velocityX = 0;
    monkey.velocityY= 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
      
     }
      
  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,320,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -4;
   
   obstacle.scale = 0.15;
   obstacle.lifetime = 100;
   obstaclesGroup.add(obstacle); 
 }
}

function spawnbanana(){
 if (frameCount % 80 === 0){
   banana = createSprite(400,200,20,20);
   banana.addImage(bananaImage);
   banana.scale=0.1;
   banana.y=Math.round(random(120,200));
   banana.velocityX = -4;
   banana.lifetime=100;
   monkey.depth=banana.depth+1;
   
   bananaGroup.add(banana);
 }

}




