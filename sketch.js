const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

 var engine,world;

//Create variables here
var dog,happyDog;
var database;
var foods,foodStock;
var food;
var lastFed,fedTime;
var Foodstock;
var changingGameState,readingGameState;

function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  happyImg=loadImage("happydog.png");

  gardenImg=loadImage("images/Garden.png");
  bedroomImg=loadImage("images/Bed Room.png");
  washroomImg=loadImage("images/Wash Room.png");
  
}

function setup() {
  database=firebase.database();
  createCanvas(1100, 800);

  engine = Engine.create();
  world = engine.world;
  
  dog=createSprite(624,374,10,10);
  dog.addImage("standing",dogImg);

  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(addFoods);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    foodObj=new Food();
}


function draw() {  
background(46,139,87);

Engine.update(engine)

  foodObj.display();

  if(keyWentDown(UP_ARROW)){
       feedPet();
    
  }
  fill(255,255,254);
          textSize(15);
          if(lastFed>=12){
              text("Last Feed:"+lastFed%12+"PM",350,30);
    
          }else if(lastFed===0){
              text("Last Feed:12 AM",350,30);
          }else {
              text("Last Feed:"+lastFed+"AM",350,30)
          }

          currentTime=hour();
          if(currentTime==(lastFed+1)){
            update("Playing");
            foodObj.garden();
          }else if(currentTime==(lastFed+2)){
            update("Sleeping");
            foodObj.bedroom();
          }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
            foodObj.washroom();
            update("Bathing");
          }else{
            update("Hungry");
            foodObj.display();
          }
          addFoods();
          feedDog();
          
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  readingGameState=datbase.ref('gameState');
  readingGameState.on("value",function(data){
    gameState=data.val();
  });

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage("Lazy.png");
  }
  drawSprites();

  textSize(25);
  stroke("white");
  text(mouseX + "," + mouseY, 10,30);
  //add styles here
textSize(23);
fill("white");
stroke("green");
//text("Note:Press UP_ARROW Key To Feed Drago Milk",500,100);
}
 
function readStock(data){
  foods=data.val();
}

function writeStock(data){

 foodStock.set(data)
}
function feedPet(){
  if(foods>0){
    writeStock(food-1);
    
  }
  else{
    dog.addImage(dogImg);
  }
}
function feedDog(){
  dog.addImage("happy",happyImg);

  foodObj.updateFoodstock(foodObj.getFoodstock()-1);
  database.ref('/').update({
    foods:foodObj.getFoodstock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  });
}