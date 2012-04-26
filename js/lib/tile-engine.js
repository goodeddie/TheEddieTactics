var TileEngine = {
	_tilesMap: null, // tiles[x][y]
	_tilesZOrder: null, // Order tiles by z-index
	init: function(map) {
				this._tilesMap = new Array();
				this._tilesZOrder + new Array();
				
				// Create the tiles and store them in the tiles map
				for (var mapX = 0; mapX < map._tiles.length; mapX++) {
					this._tilesMap[mapX] = new Array();
					for (var mapY = 0; mapY < map._tiles[mapX].length; mapY++) {
						var tileObj = this.createTile(map[mapX][mapY]);
						
						// Define variables to position tile
						var position = {};
						position.x = map.startPosition.x - (mapX * (map._tileDimension.width / 2)) + (mapY * (map._tileDimension.width / 2));
						position.y = map.startPosition.y - (mapX * (map._tileDimension.height / 2)) + (mapY * (map._tileDimension.height / 2));
						
						var dimensions = {width: map.tileDimensions.width, height: map.tileDimensions.height};
						if (world._tiles[h][v]._height != world._tileDimension.height) { // If tile has custom height
							dimension.height = world._tiles[h][v]._height; // Set the height to the custom height
						}
						
						var coordinates = {x: mapX, y: mapY};
						
						tileObj.positionTile(position, dimension, coordinates);
						this._tilesMap[mapX][mapY] = tileObj;
						
						// Push tiles in order of zIndex for rendering purposes
						if (!(this._tilesZOrder[tileObj._zIndex] instanceof Array)) {
							this._tilesZOrder[tileObj._zIndex] = new Array();
						}
						this._tilesZOrder[tileObj._zIndex].push(tileObj);
					}
				}
	},
	createTile: function (tileInfo) { // Create tile using tileInfo. The rest of the values are defaulted.
				var Tile = {
					_imageObj: tileInfo.imageObj, // Object that holds all image info such as the source
					_dimensions: {width: 0, height: 0}, // Width and height of tile
					_position: {x: 0, y: 0}, // Position of the tile on a regular map
					_coordinates: {x: 0, y: 0}, // Coordinates of the tile on a grid/map array
					_center: {x: 0, y: 0}, // Center of the tile
					_offset: {x: 0, y: 0},
					_zIndex: 0,
					_isBlock: tileInfo.isBlock,
					
					positionTile: function (position, dimensions, coordinates) {
						this._position = position;
						this._dimensions = dimensions;
						this._coordinates = coordinates;
						this._zIndex = coordinates.x + coordinates.y;
						
						this._center.x = this._position.x + (this._dimensions.width / 2);
						this._center.y = this._position.y + (this._dimensions.height / 2);
					},
				}
				
				return Tile;
	},
	getTile: function (x, y) {
				return TileEngine._tilesMap[x][y];
	},
}