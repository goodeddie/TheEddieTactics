/*************************************************************************************************/
/* LOADING SCRIPTS                                                                               */
/*************************************************************************************************/
var ScriptsLoader = {
	librariesPath: "lib/",
	numLibraries: 0, // index for number of libraries
	numLibrariesLoaded: 0, // index for number of libraries loaded
	
	javascriptsPath: "js/",
	numJavascripts: 0, // index for number of javascripts
	numJavascriptsLoaded: 0, // index for number of javascripts loaded

	libraryLoaded:	function (scriptObj, fileName) {
										var head = document.getElementsByTagName('head')[0];
										head.appendChild(scriptObj);

										alert("Library loaded: " + fileName + ".");
										
										ScriptsLoader.numLibrariesLoaded++;
									},
	javascriptLoaded:	function (scriptObj, fileName) {
											var head = document.getElementsByTagName('head')[0];
											head.appendChild(scriptObj);

											//alert("Script loaded: " + fileName + ".");
											
											ScriptsLoader.numJavascriptsLoaded++;
										},
	loadingComplete:	function () {
											// If number of scripts loaded is equal to total number of scripts
											if ((ScriptsLoader.numLibrariesLoaded == ScriptsLoader.numLibraries) &&
													(ScriptsLoader.numJavascriptsLoaded == ScriptsLoader.numJavascripts)) {
												return true;
											}
											else {
												return false;
											}
										},
										
	loadScripts:	function () {
									// Adding the script tag to the head
									var scriptObj = document.createElement('script');
									scriptObj.type = 'text/javascript';
									
									// Set libraries list
									var libraries = new Array();
									libraries.push("game-engine.js");
									libraries.push("tile-engine.js");
									libraries.push("spritejs/sprite.js");
									// Update numLibraries
									ScriptsLoader.numLibraries = libraries.length;
									
									// Set javascripts list
									javascripts = new Array();
									// Update numLibraries
									ScriptsLoader.numJavascripts = javascripts.length;
									
									// Start loading libraries
									var index = 0;
									for (index = 0; index <= (libraries.length - 1); index++) {
										scriptObj.src = ScriptsLoader.librariesPath + libraries[index];
										
										//scriptObj.onreadystatechange = ScriptsLoader.libraryLoaded(); // There are several events for cross browser compatibility
										scriptObj.onload = ScriptsLoader.libraryLoaded(scriptObj, libraries[index]);
									}
									
									// Start loading javascripts
									for (index = 0; index <= (javascripts.length - 1); index++) {
										scriptObj.src = ScriptsLoader.javascriptsPath + javascripts[index];
										
										//scriptObj.onreadystatechange = ScriptsLoader.javascriptLoaded(); // There are several events for cross browser compatibility
										scriptObj.onload = ScriptsLoader.javascriptLoaded(scriptObj, javascripts[index]);
									}
									
									// Check if everything is loaded
									if (ScriptsLoader.loadingComplete()) {
										return true;
									}
									else {
										return false;
									}
								}
}

/*************************************************************************************************/
/* STARTING THE GAME                                                                             */
/*************************************************************************************************/
window.onload = function () {
	var loadingComplete = true;
	
	// Load all required javascripts
	loadingComplete = ScriptsLoader.loadScripts();

	if (loadingComplete == true) {
		// Display canvas to show loading screen

		// create the Scene object
		var scene = sjs.Scene({w:640, h:480});
		
		// load the images in parallel. When all the images are
		// ready, the callback function is called.
		scene.loadImages(['character.png'], function() {

				// create the Sprite object;
				var sp = scene.Sprite('character.png');

				// change the visible size of the sprite
				sp.size(55, 30);

				// apply the latest visual changes to the sprite
				// (draw if canvas, update attribute if DOM);
				sp.update();

				// change the offset of the image in the sprite
				// (this works the opposite way of a CSS background)
				sp.offset(50, 50);

				// various transformations
				sp.move(100, 100);
				sp.rotate(3.14 / 4);
				sp.scale(2);
				sp.setOpacity(0.8);

				sp.update();
		});
		
		// Append only when everything is done loading
		//document.getElementById('TheEddieTactics').appendChild(canvas);
	}
	else {
		alert("Loading has not completed.");
	}
}