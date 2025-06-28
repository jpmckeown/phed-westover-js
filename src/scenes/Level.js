
// You can write more code here

/* START OF COMPILED CODE */

import FoodPrefab from "../FoodPrefab.js";
import BurgerPrefab from "../BurgerPrefab.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// up_key
		const up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

		// down_key
		const down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

		// left_key
		const left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// right_key
		const right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// layer_1
		const layer_1 = this.add.layer();

		// welcome
		const welcome = this.add.text(757, 684, "", {});
		welcome.setOrigin(0.5, 0.5);
		welcome.text = "Phaser 3 + Phaser Editor v4";
		welcome.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });
		layer_1.add(welcome);

		// scoreText
		const scoreText = this.add.text(719, 11, "", {});
		scoreText.text = "Score: 0";
		scoreText.setStyle({ "fontSize": "42px" });
		layer_1.add(scoreText);

		// dino
		const dino = this.physics.add.image(0, 0, "dino");
		dino.setInteractive(new Phaser.Geom.Rectangle(0, 0, 250, 250), Phaser.Geom.Rectangle.Contains);
		dino.scaleX = 0.7;
		dino.scaleY = 0.5;
		dino.setOrigin(0, 0);
		dino.body.immovable = true;
		dino.body.setSize(250, 250, false);

		// dino_1
		const dino_1 = this.physics.add.image(344, 258, "dino");
		dino_1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 250, 250), Phaser.Geom.Rectangle.Contains);
		dino_1.body.collideWorldBounds = true;
		dino_1.body.setSize(250, 250, false);

		// fruit_1
		const fruit_1 = new FoodPrefab(this, 508, 376);
		this.add.existing(fruit_1);

		// fruit_2
		const fruit_2 = new FoodPrefab(this, 131, 414);
		this.add.existing(fruit_2);

		// fruit_3
		const fruit_3 = new FoodPrefab(this, 305, 556);
		this.add.existing(fruit_3);
		fruit_3.scaleX = 0.35;
		fruit_3.scaleY = 0.25;

		// burgerPrefab
		const burgerPrefab = new BurgerPrefab(this, 582, 159);
		this.add.existing(burgerPrefab);

		// lists
		const food = [fruit_1, fruit_2, fruit_3, burgerPrefab];

		// collider
		this.physics.add.collider(dino, dino_1);

		// collider_1
		this.physics.add.overlap(dino_1, food, this.eatFruit, undefined, this);

		this.welcome = welcome;
		this.scoreText = scoreText;
		this.dino = dino;
		this.dino_1 = dino_1;
		this.fruit_1 = fruit_1;
		this.up_key = up_key;
		this.down_key = down_key;
		this.left_key = left_key;
		this.right_key = right_key;
		this.food = food;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	welcome;
	/** @type {Phaser.GameObjects.Text} */
	scoreText;
	/** @type {Phaser.Physics.Arcade.Image} */
	dino;
	/** @type {Phaser.Physics.Arcade.Image} */
	dino_1;
	/** @type {FoodPrefab} */
	fruit_1;
	/** @type {Phaser.Input.Keyboard.Key} */
	up_key;
	/** @type {Phaser.Input.Keyboard.Key} */
	down_key;
	/** @type {Phaser.Input.Keyboard.Key} */
	left_key;
	/** @type {Phaser.Input.Keyboard.Key} */
	right_key;
	/** @type {Array<FoodPrefab|BurgerPrefab>} */
	food;

	/* START-USER-CODE */

	// Write more your code here
   dinoSpeed = 100;
   score = 0;

	create() {
		this.editorCreate();

		this.dino.on("pointerdown", () => {
			this.welcome.text = "Hello, World!";
		});
      this.dino_1.on("pointerdown", () => {
			this.welcome.text = "Dino1 bigger also has a hitarea";
		});
	}

   update(){
      if(this.up_key.isDown){
         this.dino_1.setVelocityY(-1*this.dinoSpeed);
      }
      else if(this.down_key.isDown){
         this.dino_1.setVelocityY(this.dinoSpeed);
      }
      else{
         this.dino_1.setVelocityY(0);
      }
      if(this.left_key.isDown){
         this.dino_1.setVelocityX(-1*this.dinoSpeed);
      }
      else if(this.right_key.isDown){
         this.dino_1.setVelocityX(this.dinoSpeed);
      }
      else {
         this.dino_1.setVelocityX(0);
      }
   }

   eatFruit(dino, food) {
      console.log(this);
      food.disableBody();
      food.destroy();
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score); 
   }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
