const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1920,
  heigth: 640,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  }
};
const game = new Phaser.Game(config);
function preload() {
  this.load.image('background', 'assets/images/background.png');
  this.load.image('spike', 'assets/images/spike.png');
  this.load.image('bluedoor', 'assets/images/bluedoor.png');
  this.load.image('yellowdoor', 'assets/images/yellowdoor.png');
  this.load.image('reddoor', 'assets/images/reddoor.png');
  this.load.image('greendoor', 'assets/images/greendoor.png');
  // At last image must be loaded with its JSON
  this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
  this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
}
function create() {
  this.cameras.main.setBounds(0, 0, 4498, 640);
  this.physics.world.setBounds(0, 0, 4498, 640);
  const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
  backgroundImage.setScale(20, 0.8);
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');
  this.platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
  this.platforms2 = map.createDynamicLayer('Platforms2', tileset, 0, 200);
  this.platforms3 = map.createStaticLayer('Platforms3', tileset, 0, 200);
  this.platforms.setCollisionByExclusion(-1, true);
  this.platforms2.setCollisionByExclusion(-1, true);
  this.platforms3.setCollisionByExclusion(-1, true);
  // Player
  this.player = this.physics.add.sprite(100, 100, 'player');
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.player.setSize(50, 99)
  this.physics.add.collider(this.player, this.platforms);
  this.physics.add.collider(this.player, this.platforms2);
  this.physics.add.collider(this.player, this.platforms3);
  this.platforms2.alpha = 0;
  this.platforms3.alpha = 1;
  this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'robo_player_',
      start: 2,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'idle',
    frames: [{ key: 'player', frame: 'robo_player_0' }],
    frameRate: 10,
  });
  this.anims.create({
    key: 'jump',
    frames: [{ key: 'player', frame: 'robo_player_1' }],
    frameRate: 10,
  });
  this.cursors = this.input.keyboard.createCursorKeys();
  // Create a sprite group for all spikes, set common properties to ensure that
  // sprites in the group don't move via gravity or by player collisions
  this.spikes = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });
  map.getObjectLayer('Spikes').objects.forEach((spike) => {
    // Add new spikes to our sprite group
    const spikeSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
});
  // Let's get the spike objects, these are NOT sprites
  // We'll create spikes in our sprite group for each object in our map
  // Puerta amarilla
  this.door1 = this.physics.add.staticImage(670, 426, 'yellowdoor'); // Listo
  this.door1.setOrigin(0.5, -0.5)
  this.door1.body.setSize(64, 128, true);
  this.door2 = this.physics.add.staticImage(1310, 360, 'bluedoor'); // List
  this.door2.setOrigin(0.5, -0.5)
  this.door2.body.setSize(64, 128, true);
  this.door3 = this.physics.add.staticImage(1950, 296, 'reddoor'); // Listo
  this.door3.setOrigin(0.5, -0.5)
  this.door3.body.setSize(64, 128, true);
  this.door4 = this.physics.add.staticImage(2592, 232, 'bluedoor'); // Listo
  this.door4.setOrigin(0.5, -0.5)
  this.door4.body.setSize(64, 128, true);
  this.door5 = this.physics.add.staticImage(2786, 232, 'bluedoor');// Listo
  this.door5.setOrigin(0.5, -0.5)
  this.door5.body.setSize(64, 128, true);
  this.door6 = this.physics.add.staticImage(3296, 232, 'reddoor'); // Listo
  this.door6.setOrigin(0.5, -0.5)
  this.door6.body.setSize(64, 128, true);
  this.door7 = this.physics.add.staticImage(3808, 232, 'bluedoor'); // Listo
  this.door7.setOrigin(0.5, -0.5)
  this.door7.body.setSize(64, 128, true);
  this.door8 = this.physics.add.staticImage(4066, 296, 'yellowdoor'); // Listo
  this.door8.setOrigin(0.5, -0.5)
  this.door8.body.setSize(64, 128, true);
  var aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  var sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  var dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  var ref = this;
  aKey.on('down', function (key, event) {
    event.stopPropagation();
    console.log("Presionada a");
    ref.tweens.add({
      targets: [ref.door1.body, ref.door1],
      y: ref.door1.y + 128,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
    ref.tweens.add({
      targets: [ref.door8.body, ref.door8],
      y: ref.door8.y + 128,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
  });
  sKey.on('down', function (key, event) {
    event.stopPropagation();
    console.log("Presionada s");
    ref.tweens.add({
      targets: [ref.door2.body, ref.door2],
      y: ref.door2.y + 128,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
    ref.tweens.add({
      targets: [ref.door4.body, ref.door4],
      y: ref.door4.y + 128,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
    ref.tweens.add({
      targets: [ref.door5.body, ref.door5],
      y: ref.door5.y + 128,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
    ref.tweens.add({
      targets: [ref.platforms2],
      alpha: 1,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
   
    ref.tweens.add({
      targets: [ref.door7.body, ref.door7],
      y: ref.door7.y + 128,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
  });
  dKey.on('down', function (key, event) {
    event.stopPropagation();
    ref.tweens.add({
      targets: [ref.door3.body, ref.door3],
      y: ref.door3.y + 128,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
    ref.tweens.add({
      targets: [ref.door6.body, ref.door6],
      y: ref.door6.y + 128,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
    ref.tweens.add({
      targets: [ref.platforms3],
      alpha: 1,
      duration: 2000,
      ease: 'Power1',
      yoyo: true
    });
  });
  this.physics.add.collider(this.player, this.spikes, playerHit, null, this);
}
function playerHit(player, spike) {
  player.setVelocity(0, 0);
  player.setX(50);
  player.setY(300);
  player.play('idle', true);
  player.setAlpha(0);
  let tw = this.tweens.add({
    targets: player,
    alpha: 1,
    duration: 100,
    ease: 'Linear',
    repeat: 5,
  });
}
function update() {
  // Control the player with left or right keys
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-250);
    if (this.player.body.onFloor()) {
      this.player.play('walk', true);
    }
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(250);
    if (this.player.body.onFloor()) {
      this.player.play('walk', true);
    }
  } else {
    // If no keys are pressed, the player keeps still
    this.player.setVelocityX(0);
    // Only show the idle animation if the player is footed
    // If this is not included, the player would look idle while jumping
    if (this.player.body.onFloor()) {
      this.player.play('idle', true);
    }
  }
  // Player can jump while walking any direction by pressing the space bar
  // or the 'UP' arrow
  if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
    this.player.setVelocityY(-250);
    this.player.play('jump', true);
  }
  if (this.player.body.velocity.x > 0) {
    this.player.setFlipX(false);
  } else if (this.player.body.velocity.x < 0) {
    // otherwise, make them face the other side
    this.player.setFlipX(true);
  }
  this.physics.world.collide(this.player, [this.door1, this.door2, this.door3, this.door4, this.door5, this.door6, this.door7, this.door8]);
}