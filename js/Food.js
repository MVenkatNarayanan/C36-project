class Food{
    constructor(x,y){
        
        var options={
            isStatic:false
        }
        this.body = Bodies.rectangle(x, y,options);
      
      this.image=loadImage("images/Milk.png");
      
      World.add(world, this.body);
    }

    getFoodstock(){
        var foodRef = database.ref('playerCount');
        foodRef.on("value",(data)=>{
          food = data.val();
        })
      }
      updateFoodstock(count){
        database.ref('/').update({
          food: count
        });
      }
      update(){
       
        database.ref(foods).set({
          food:this.food,
          
        });
      }
      display(){
          
          var x=80;
          var y=100;

          imageMode(CENTER);
          image(this.image,411,302,70,70);

          if(this.Foodstock!=0){
              for(var i=0;i<this.Foodstock;i++){
                  if(i%10==0){
                      x=80;
                      y=y+50;
                  }
                  image(this.image,x,y,50,50);
                  x=x+30;
              }
          }
           
           
           if(keyDown(addFood)){
             image(this.image,720,220,70,70);
           }

      }
      bedroom(){
        background(bedroomImg,550,500);
       }
       garden(){
        background(bedroomImg,550,500);
      }
      washroom(){
        background(washroomImg,550,500);
      }
      
    }
