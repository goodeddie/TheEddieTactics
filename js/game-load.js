/*************************************************************************************************/
/* LOADING SCRIPTS                                                                               */
/*************************************************************************************************/
var ResourceLoader = {
	_totalNumber: 0,
	_loadedNumber: 0,
	loadScript:
				function (filePath) {
					if (filePath) {
						var scriptObj = document.createElement('script'); // Create script object
						scriptObj.type = 'text/javascript'; // Set type of script object
						scriptObj.onload =	function () {
																	ResourceLoader._loadedNumber++; // Increment number of resources loaded if onload
																	ResourceLoader.updateProgress();
																	
																	if (ResourceLoader.isLoadingComplete()) {
																		finished(); // Do whatever is left for loading
																	}
																}
						scriptObj.src = filePath; // Set src to the path of the file
						
						var head = document.getElementsByTagName('head')[0]; // Retrieve head element
						head.appendChild(scriptObj); // Append element to the head
					}
				},
	loadImage:
				function (filePath) {
					if (filePath) {
						var imageObj = new Image();
						imageObj.onload =	function () {
																ResourceLoader._loadedNumber++; // Increment number of resources loaded if onload
																ResourceLoader.updateProgress();
																
																if (ResourceLoader.isLoadingComplete()) {
																	finished(); // Do whatever is left for loading
																}
															}
						imageObj.src = filePath; // Set src to the path of the file
					}
				},
	loadAudio:
				function (filePath) {
					if (filePath) {
						var audio = new Audio();
						// audio.onload doesn't work!
						audio.addEventListener('canplaythrough',
																		function () {
																			ResourceLoader._loadedNumber++; // Increment number of resources loaded if onload
																			ResourceLoader.updateProgress();
																			
																			if (ResourceLoader.isLoadingComplete()) {
																				finished(); // Do whatever is left for loading
																			}
																		},
																		false);
						audio.src = filePath;
					}
				},
	isLoadingComplete:
				function () {//alert(ResourceLoader._loadedNumber + " loaded. " + ResourceLoader._totalNumber + " total.")
					// Check if all scripts are loaded
					if (ResourceLoader._loadedNumber == ResourceLoader._totalNumber) {
						return true;
					}
					else {
						return false;
					}
				},
	loadResources:
				function () {
					ResourceLoader._totalNumber = arguments.length; // Update number of resources
					
					for (var i = 0; i < arguments.length; i++) {
						var element = arguments[i];
						if ((/^js/).test(element)) {
							ResourceLoader.loadScript(element);
						}
						else if ((/^images/).test(element)) {
							ResourceLoader.loadImage(element);
						}
						else if ((/^audio/).test(element)) {
							ResourceLoader.loadAudio(element);
						}
					}
				},
	loadInitial:
				function () {
					ResourceLoader.setUpLoadingDisplay();
					ResourceLoader.loadResources(
																				"js/lib/game-engine.js",
																				"js/lib/game-engine.jsp",
																				"js/spritejs/sprite.js",
																				"images/grass.png"
																			);
				},
	setUpLoadingDisplay:
				function () {
					var progressBarHTML = '<progress id="LoadingBar" max="100" value="0"><strong>Loading...</strong></progress>';
					var loadingTextHTML = '<div id="LoadingText">Loading <span id="LoadingNumbers">0% (0/0)</span></div>';
					
					document.getElementById("TheEddieTactics").innerHTML = progressBarHTML + loadingTextHTML;
				},
	updateProgress:
				function () {
					var percentLoaded = ((ResourceLoader._loadedNumber / ResourceLoader._totalNumber) * 100);
					document.getElementById("LoadingBar").setAttribute("value", percentLoaded);
					document.getElementById("LoadingNumbers").innerHTML = percentLoaded + '% (' + ResourceLoader._loadedNumber + '/' + ResourceLoader._totalNumber + ')';
				},
	finished:
				function () {
							// Call the next function
							LoadResources(); // Continue to loading other resource files - this method should be in another js file
						},
}

function finished() {//alert("finished");
} 

/*************************************************************************************************/
/* START INITIALIZING                                                                            */
/*************************************************************************************************/
window.onload = function () {
	ResourceLoader.loadInitial();
}