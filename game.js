var CANVAS_HEIGHT = 400;
var CANVAS_WIDTH = 800;
var LEVEL_SPACING = 80; 
var ZERO_THRESHOLD = .1;
var PEPPY_GROWTH_BY_LEVEL = 20;
                          
var peppy;                //the sprite for the character
var peppyDiameter = 40;
var peppyFaceRest;        //resting face for the character 
var peppyFaceBreath;      //face for breathing in
var level = 1;            //current stack level
var background_sprites = [];
var backgroundX = 0;
var backgroundScrollSpeed = 2;

function setup() {
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
    mountain1 = loadImage('assets/mountains1.png'); 
    mountain2 = loadImage('assets/mountains2.png'); 
    mountain3 = loadImage('assets/mountains3.png'); 
    mountain4 = loadImage('assets/mountains4.png'); 
    mountain1.x = 0;
    mountain2.x = 400;
    mountain3.x = 800;
    mountain4.x = 1200;

    background_sprites.push(mountain1,mountain2,mountain3,mountain4);
    peppyFaceRest = loadImage('assets/face.png');
    peppyFaceBreath = loadImage('assets/face2.png');
    peppy = createSprite(CANVAS_WIDTH/4, CANVAS_HEIGHT, peppyDiameter, peppyDiameter);

    peppy.draw = function() {
        //the center of the sprite will be point 0,0
        //"this" in this function will reference the sprite itself
        fill(237, 205, 0);
        
        //make the ellipse stretch in the sprite direction
        //proportionally to its speed
        push();
        rotate(radians(this.getDirection()));
        ellipse(0, 0, peppyDiameter+this.getSpeed()*3, peppyDiameter-this.getSpeed()*3);
        pop();
        
        //this.deltaX and this.deltaY are the position increment
        //since the last frame, move the face image toward the direction
        if (this.deltaY < -ZERO_THRESHOLD){ 
            image(peppyFaceBreath, this.deltaX*2, this.deltaY*2);
        }
        else{ 
            image(peppyFaceRest, this.deltaX*2, this.deltaY*2);
        }
    };
    
    peppy.maxSpeed = 10;

}

function draw() {
    
    clear();
    background(135,206,235);

    //draw background
    try{
        for (var i = 0; i < background_sprites.length; i++)
        {
            background_sprites[i].x -= backgroundScrollSpeed; 
            if (background_sprites[i].x + background_sprites[i].width < 0)
            {
                var len = background_sprites.length;
                var prevI = (len - ((len - (i - 1)) % len))%len;
                background_sprites[i].x = background_sprites[prevI].x + background_sprites[prevI].width;
            }
            image(background_sprites[i], background_sprites[i].x, 0);
        }

    }catch(e){}

    //don't allow movement off the screen
    if (keyWentDown('SPACE') && peppy.position.y - LEVEL_SPACING - peppy.height > 0)
    {
        level++;
        peppyDiameter += PEPPY_GROWTH_BY_LEVEL;
    }
    peppy.velocity.y = (CANVAS_HEIGHT - level * LEVEL_SPACING - peppy.position.y)/20;
    drawSprites();
}
