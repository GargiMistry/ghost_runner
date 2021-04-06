var door,climber,tower,d1,c1,t1,spooky;
var ghost,gh,inv_cli,inv_clig,doorg,climberg;
var play=0,end=1,gs=play; 

function preload(){
  d1=loadImage("door.png")
  c1=loadImage("climber.png")
  t1=loadImage("tower.png")
  gh=loadAnimation("ghost-standing.png","ghost-jumping.png")
  
}

function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300,600,600);
  tower.addImage("tower1",t1);
  tower.scale=1
  tower.velocityY=2;
  
  ghost=createSprite(300,300,20,20);
  ghost.addAnimation("g1",gh);
  ghost.scale=0.4
  
  doorg= new Group();
  climberg= new Group();
  inv_clig= new Group();
  
}

function draw(){
  background(0);

  if(gs===play){

    if(tower.y>500){
      tower.y=tower.width/2;
    }

    if(keyDown("space")){
      ghost.velocityY=-6;
    }
    ghost.velocityY=ghost.velocityY+0.4;

    if(keyDown("right")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("left")){
      ghost.x = ghost.x - 3;
    }

    spawnObstacle();

    if(ghost.isTouching(inv_clig) || ghost.y>595){

      gs=end;

    }
  
  }

  if (gs===end){

    doorg.setVelocityYEach(0);
    climberg.setVelocityYEach(0);
    inv_clig.setVelocityYEach(0);
    ghost.velocityY=0;
    tower.velocityY=0;

    inv_clig.destroyEach();
    climberg.destroyEach();
    doorg.destroyEach();
    ghost.destroy();
    tower.destroy();

    textSize(30);
    text("Game Over",250,300);
  }
  
  
  
  drawSprites();
}

function spawnObstacle(){
  if(frameCount % 200===1){
    door=createSprite(random(100,500),0,10,10)
    door.addImage("do1",d1);
    door.velocityY=2;
    doorg.add(door);

    ghost.depth = door.depth;
    ghost.depth +=1;
    
    climber=createSprite(door.x,59,20,20);
    climber.addImage("g2",c1);
    climber.velocityY=2;
    climberg.add(climber);
    
    inv_cli=createSprite(climber.x,70,85,5);
    inv_cli.visible=false;
    inv_cli.velocityY=2;
    inv_clig.add(inv_cli);
  }
}
