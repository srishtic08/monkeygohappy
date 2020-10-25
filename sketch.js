  //variables
  var banana,bananaImage;
  var obstacle,obstacleImage,obstacleGroup;
  var Background,backImage;
  var score;
  var monkey,player_running;
  var ground; 
  var bananaGroup

  function preload(){

    //load image for background
    backImage = loadImage("jungle.jpg")


    // load animation for the monkey or player
    player_running =       loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");


    // load image for banana and obstacles
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("stone.png");
  }


  function setup() {
    createCanvas(800, 400);

    // Creating sprite for background and adding the image
    Background = createSprite(0,0,800,400);
    Background.addImage(backImage);
    //adding velocity to the background
    Background.velocityX = -3;
    Background.scale = 1.5;

    //Create sprite for monkey
    monkey = createSprite(100,340,20,50);
    monkey.addAnimation("running",player_running);
    monkey.scale = 0.1;

    //Create sprite for ground
    ground = createSprite(400,350,800,10);
    ground.visible = false;

    //Create groups for obstacle and banana
    obstacleGroup = new Group();
    bananaGroup = new Group();

    //Giving score a value of 0
    score = 0;

  }

  function draw() {
    background(220);

    //move the ground
    if (ground.x<0) {
    ground.x = ground.width/2;  
    }

    Background.velocityX = -2;
  if (Background.x < 0) {
   Background.x = Background.width/2;
  }

    //if condition for monkey
    if (keyDown("space")) {
    monkey.velocityY = -12;    
    }

   // add gravity
   monkey.velocityY = monkey.velocityY+0.8;  
  
  // monkey to collide with the ground
  monkey.collide(ground);

  
  if(obstacleGroup.isTouching(monkey)){
  monkey.scale = 0.2
  }
    
  //switch case  
  switch(score){
      case 10: monkey.scale = 0.12;
              break;
      case 20: monkey.scale = 0.14;
              break;
      case 30: monkey.scale = 0.16;
              break;
      case 40: monkey.scale = 0.18;
              break;
      default: break;
    }

    // namng the function
    obstacles();
    food();
    drawSprites();

  //displaying the survival time
  stroke("white");
  textSize(20);
  fill("white");
  score = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+score, 450, 50);

  }


  function food() {
  
  if (frameCount % 80 === 0) {
  var banana = createSprite(400,320,40,10);
  banana.scale = 0.05;
  banana.y = random(120,200);
  banana.addImage(bananaImage);

  banana.velocityX = -3;

  banana.lifetime = 134;

  //adjust the depth
  monkey.depth = banana.depth + 1;

  //add each banana to the group
  bananaGroup.add(banana);
    }

  }


  function obstacles() {
    if (frameCount % 100 === 0) {
      var obstacle = createSprite(100,340,20,50);
      obstacle.x = random(280,320);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.15;
      obstacle.velocityX = -3;

       //assigned lifetime to the variable
      obstacle.lifetime = 134;


      //add each obstacle to the group
      obstacleGroup.add(obstacle);
  }
  }