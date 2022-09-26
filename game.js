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
      debug: true,
    },
  }
};
const game = new Phaser.Game(config);
function preload() {
  this.load.image('background', 'assets/images/background.png');
  this.load.image('spike', 'assets/images/lava.png');
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
  const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
  const platforms2 = map.createDynamicLayer('Platforms2', tileset, 0, 200);
  const platforms3 = map.createStaticLayer('Platforms3', tileset, 0, 200);

  platforms.setCollisionByExclusion(-1, true);
  platforms2.setCollisionByExclusion(-1, true);
  platforms3.setCollisionByExclusion(-1, true);
  // Player
  this.player = this.physics.add.sprite(2492, 100, 'player');
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.player.setSize(50, 99)
  this.physics.add.collider(this.player, platforms);
  this.physics.add.collider(this.player, platforms2);
  this.physics.add.collider(this.player, platforms3);

  platforms2.alpha = 0;
  platforms3.alpha = 0;
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
  // Let's get the spike objects, these are NOT sprites
  // We'll create spikes in our sprite group for each object in our map



  // Puerta amarilla
  this.door1 = this.physics.add.staticImage(670, 490, 'yellowdoor'); // Listo
  this.door2 = this.physics.add.staticImage(1310, 424, 'bluedoor'); // List
  this.door3 = this.physics.add.staticImage(1950, 360, 'reddoor'); // Listo
  this.door4 = this.physics.add.staticImage(2592, 296, 'greendoor'); // Listo
  this.door4.body.setSize(64, 64, true);

  console.log(this.door4);
  this.door5 = this.physics.add.staticImage(2786, 296, 'bluedoor');// Listo
  this.door6 = this.physics.add.staticImage(3296, 296, 'reddoor'); // Listo
  this.door7 = this.physics.add.staticImage(3808, 296, 'greendoor'); // Listo
  this.door8 = this.physics.add.staticImage(4066, 360, 'yellowdoor'); // Listo



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
  this.physics.world.collide(this.player, [this.door4, this.door5, this.door6, this.door7, this.door8]);
}