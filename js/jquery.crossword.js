
/**
* Jesse Weisbeck's Crossword Puzzle (for all 3 people left who want to play them)
*/
(function($){
	$.fn.crossword = function(opts) {
			/*
				Qurossword Puzzle: a javascript + jQuery crossword puzzle
				"light" refers to a white box - or an input

				DEV NOTES: 
				- activePosition and activeClueIndex are the primary vars that set the ui whenever there's an interaction
				- 'Entry' is a puzzler term used to describe the group of letter inputs representing a word solution
				- This puzzle isn't designed to securely hide answerers. A user can see answerers in the js source
					- An xhr provision can be added later to hit an endpoint on keyup to check the answerer
				- The ordering of the array of problems doesn't matter. The position & orientation properties is enough information
				- Puzzle authors must provide a starting x,y coordinates for each entry
				- Entry orientation must be provided in lieu of provided ending x,y coordinates (script could be adjust to use ending x,y coords)
				- Answers are best provided in lower-case, and can NOT have spaces - will add support for that later
			*/
			
			var puzz = {}; // put data array in object literal to namespace it into safety
			puzz.data = opts.entryData;
			
			// append clues markup after puzzle wrapper div
			// This should be moved into a configuration object
			this.after('<div id="puzzle-clues"><div class="across"><h2>Across</h2><ul></ul></div><div class="down"><h2>Down</h2><ul></ul></div></div>');
			
			// initialize some variables
			var tbl = ['<table id="puzzle">'],
			    puzzEl = this,
				clues = $('#puzzle-clues'),
				clueLiEls,
				coords,
				entryCount = puzz.data.length,
				entries = [], 
				rows = [],
				cols = [],
				solved = [],
				tabindex,
				$actives,
				activePosition = 0,
				activeClueIndex = 0,
				hintsRemaining = 10,
				currOri,
				targetInput,
				mode = 'interacting',
				solvedToggle = false,
				z = 0,
				showAnswers=opts.showAnswers || false;

			var puzInit = {
				
				init: function() {
					puzz.data = util.calculateCluePositions(puzz.data);
					currOri = 'across'; // app's init orientation could move to config object
					// Set keyup handlers for the 'entry' inputs that will be added presently
					puzzEl.delegate('input', 'keyup', function(e){
						mode = 'interacting';
						
						// need to figure out orientation up front, before we attempt to highlight an entry
						switch(e.which) {
							case 39:
							case 37:
								currOri = 'across';
								break;
							case 38:
							case 40:
								currOri = 'down';
								break;
							default:
								break;
						}
						
						if ( e.keyCode === 9) {
							return false;
						} else if (e.keyCode === 8 || e.keyCode === 46){
							if(currOri === 'across'){
								nav.nextPrevNav(e, 37);
							} else {
								nav.nextPrevNav(e, 38);
							}
						} else if(
							e.keyCode === 37 ||
							e.keyCode === 38 ||
							e.keyCode === 39 ||
							e.keyCode === 40
						){
							nav.nextPrevNav(e);
						} else {
							puzInit.checkAnswer(e);
							if(currOri === 'across'){
								nav.nextPrevNav(e, 39);
							} else {
								nav.nextPrevNav(e, 40);
							}
						}

						e.preventDefault();
						return false;					
					});
			
					// tab navigation handler setup
					puzzEl.delegate('input', 'keydown', function(e) {
						if ( e.keyCode === 9) {
							
							mode = "setting ui";
							if (solvedToggle) solvedToggle = false;

							//puzInit.checkAnswer(e)
							nav.updateByEntry(e);
							
						} else {
							return true;
						}
												
						e.preventDefault();
									
					});
					
					// tab navigation handler setup
					puzzEl.delegate('input', 'click', function(e) {
						mode = "setting ui";
						if (solvedToggle){
							solvedToggle = false;
						}
						nav.updateByEntry(e);
						e.preventDefault();
									
					});
					
					
					// click/tab clues 'navigation' handler setup
					clues.delegate('li', 'click', function(e) {
						mode = 'setting ui';
						if (!e.keyCode) {
							nav.updateByNav(e);
						} 
						e.preventDefault(); 
					});
					
					
					// highlight the letter in selected 'light' - better ux than making user highlight letter with second action
					puzzEl.delegate('#puzzle', 'click', function(e) {
						$(e.target).focus();
						$(e.target).select();
					});
					
					// DELETE FOR BG
					puzInit.calcCoords();
					
					// Puzzle clues added to DOM in calcCoords(), so now immediately put mouse focus on first clue
					clueLiEls = $('#puzzle-clues li');
					$('.' + currOri + ' li' ).eq(0).addClass('clues-active').focus();
				
					// DELETE FOR BG
					puzInit.buildTable();
					puzInit.buildEntries();
					puzInit.buildHintButton();
					puzInit.adjustDims();
										
				},
				
				/*
					- Given beginning coordinates, calculate all coordinates for entries, puts them into entries array
					- Builds clue markup and puts screen focus on the first one
				*/
				calcCoords: function() {
					/*
						Calculate all puzzle entry coordinates, put into entries array
					*/
					for (var i = 0, p = entryCount; i < p; ++i) {		
						// set up array of coordinates for each problem
						entries.push(i);
						entries[i] = [];
						thisPuzz = puzz.data[i];

						for (var x=0, j = thisPuzz.answer.length; x < j; ++x) {
							entries[i].push(x);
							coords = thisPuzz.orientation === 'across' ? "" + thisPuzz.startx++ + "," + thisPuzz.starty + "" : "" + thisPuzz.startx + "," + thisPuzz.starty++ + "" ;
							entries[i][x] = coords; 
						}

						// while we're in here, add clues to DOM!
						$('.' + thisPuzz.orientation + ' ul').append(
							$('<li tabindex="1" data-position="' + i + '"></li>')
								.text(thisPuzz.clue)
								.prepend($('<span class="words">').text(thisPuzz.words ? thisPuzz.words : thisPuzz.answer.length+' letters'))
								.prepend('<span class="position">'+thisPuzz.position+'</span> ')
						);
					}				
					
					// Calculate rows/cols by finding max coords of each entry, then picking the highest
					for (var i = 0, p = entryCount; i < p; ++i) {
						for (var x=0; x < entries[i].length; x++) {
							cols.push(entries[i][x].split(',')[0]);
							rows.push(entries[i][x].split(',')[1]);
						};
					}

					rows = Math.max.apply(Math, rows) + "";
					cols = Math.max.apply(Math, cols) + "";
		
				},
				
				/*
					Build the table markup
					- adds [data-coords] to each <td> cell
				*/
				buildTable: function() {
					for (var i=1; i <= rows; ++i) {
						tbl.push("<tr>");
							for (var x=1; x <= cols; ++x) {
								tbl.push('<td data-coords="' + x + ',' + i + '"></td>');		
							};
						tbl.push("</tr>");
					};

					tbl.push("</table>");
					puzzEl.append(tbl.join(''));
				},
				
				/*
					Builds entries into table
					- Adds entry class(es) to <td> cells
					- Adds tabindexes to <inputs> 
				*/
				buildEntries: function() {
					var puzzCells = $('#puzzle td'),
						light,
						$groupedLights,
						hasOffset = false,
						positionOffset = entryCount - puzz.data[puzz.data.length-1].position; // diff. between total ENTRIES and highest POSITIONS
						
					for (var x=1, p = entryCount; x <= p; ++x) {
						var letters = puzz.data[x-1].answer.split('');

						for (var i=0; i < entries[x-1].length; ++i) {
							var thisPuzz = puzz.data[x-1];
							light = $('[data-coords="' + entries[x-1][i] + '"]');
							
							// check if POSITION property of the entry on current go-round is same as previous. 
							// If so, it means there's an across & down entry for the position.
							// Therefore you need to subtract the offset when applying the entry class.
							if(x > 1 ){
								if (thisPuzz.position === puzz.data[x-2].position) {
									hasOffset = true;
								};
							}
							
							if(light.is(':empty')){
								var $container = $('<div>');
								var $input = $('<input maxlength="1" val="" type="text" tabindex="-1" />');
								if(showAnswers){
									$input.val(letters[i]);
								}
								$container.append($input);
								
								light
									.addClass('light')
									.append($container);
							}

							var cells = light.data('cells') || [];

							cells.push({
								position : x-1,
								entry: x,
								letter : i,
								data : thisPuzz,
								el : light
							});
							light.data('cells',cells);

							// Add the number to the first letter of each word.
							if(i==0){
								light.find('div').append('<span>'+puzz.data[x-1].position+'</span>');
							}

							light
								.addClass('position-' + (x-1))
								.addClass('entry-' + (hasOffset ? x - positionOffset : x));
						};
						
					};
					
					util.highlightEntry();
					util.highlightClue();
					$('.active').eq(0).focus();
					$('.active').eq(0).select();
										
				},

				buildHintButton: function(){
					var textCaption = 'Reveal a letter (% remaining)';
					var $button = $('<a class="btn reveal"></a>');

					var updateHintsRemaining = function(remaining){
						$button.text(textCaption.replace('%',remaining));
					}
					updateHintsRemaining(hintsRemaining);
					$button.click(function(){
						if(hintsRemaining < 1){
							return;
						}

						var data = puzz.data[activePosition];
						var $entries = $('.position-'+(activePosition)+' input');
						var possibleCells = [];

						// filter out entries which have already been filled.
						$entries.each(function(i){
							if($(this).val() == ''){
								possibleCells.push(i);
							}
						});

						if(possibleCells.length == 0){
							// You've already solved this word.
							return;
						}
						var random = Math.round(Math.random()*(possibleCells.length-1));
						var $entry = $entries.eq(possibleCells[random]);

						var clue = data.answer.substr(possibleCells[random],1);
						$entry.val(clue);

						updateHintsRemaining(--hintsRemaining);
					});
					clues.prepend($button);

				},

				adjustDims : function(){
					var onResize = function(){
						var $table = $(puzzEl).find('table');
						var w = $table.width();
						$table.height(w);
						$table.css('font-size',w/400+'em');

						var cellHeight = Math.ceil($table.find('input').width());
						$table.find('input').height(cellHeight);
					};
					$(window).resize(onResize);
					onResize();

					// Sometimes this gets fired before time, so fire it again
					// on window load when the DOM's presumably settled.
					$(window).load(function(){
						onResize();
					})
				},
				
				
				/*
					- Checks current entry input group value against answer
					- If not complete, auto-selects next input for user
				*/
				checkAnswer: function(e) {					
					var valToCheck, currVal;
					
					util.getActivePositionFromClassGroup($(e.target));
				
					valToCheck = puzz.data[activePosition].answer.toLowerCase();

					currVal = $('.position-' + activePosition + ' input')
						.map(function() {
					  		return $(this)
								.val()
								.toLowerCase();
						})
						.get()
						.join('');
					
					if(valToCheck === currVal){	
						$('.active')
							.addClass('done')
							.removeClass('active');
					
						$('.clues-active').addClass('clue-done');

						solved.push(valToCheck);
						solvedToggle = true;
						return;
					}

				}				


			}; // end puzInit object
			

			var nav = {
				
				nextPrevNav: function(e, override) {
					var len = $actives.length,
						struck = override ? override : e.which,
						el = $(e.target),
						p = el.closest('td'),
						ps = el.closest('tr'),
						selector;
				
					util.getActivePositionFromClassGroup(el);
					util.highlightEntry();
					util.highlightClue();
					
					$('.current').removeClass('current');
					selector = '.position-' + activePosition + ' input';
					// move input focus/select to 'next' input
					switch(struck) {
						case 39:
							p
								.next()
								.find('input')
								.addClass('current')
								.select();

							break;
						
						case 37:
							p
								.prev()
								.find('input')
								.addClass('current')
								.select();

							break;

						case 40:
							ps
								.next()
								.find(selector)
								.addClass('current')
								.select();

							break;

						case 38:
							ps
								.prev()
								.find(selector)
								.addClass('current')
								.select();

							break;

						default:
						break;
					}
															
				},
	
				updateByNav: function(e) {
					var target;
					$('.clues-active').removeClass('clues-active');
					$('.active').removeClass('active');
					$('.current').removeClass('current');
					currIndex = 0;

					target = e.target;
					activePosition = $(e.target).data('position');
					
					util.highlightEntry();
					util.highlightClue();

					$('.active').eq(0).focus();
					$('.active').eq(0).select();
					$('.active').eq(0).addClass('current');
										
					activeClueIndex = $(clueLiEls).index(e.target);
					
				},
			
				// Sets activePosition var and adds active class to current entry
				updateByEntry: function(e, next) {
					var classes, next, clue, e1Ori, e2Ori, e1Cell, e2Cell;

					if(e.keyCode === 9 || next){
						// handle tabbing through problems, which keys off clues and requires different handling		
						activeClueIndex = activeClueIndex === clueLiEls.length-1 ? 0 : ++activeClueIndex;
					
						$('.clues-active').removeClass('.clues-active');
						
						if(++activePosition >= puzz.data.length){
							activePosition = 0;
						}

						// skips over already-solved problems.
						// Doesn't seem to do anything.
						// util.getSkips(activeClueIndex);
						
																								
					} else {
						activeClueIndex = activeClueIndex === clueLiEls.length-1 ? 0 : ++activeClueIndex;
						
						util.getActivePositionFromClassGroup(e.target);
						
						activeClueIndex = $(clueLiEls).index(clue);
						
					}

					currOri = puzz.data[activePosition].orientation;
					clue = $('[data-position=' + activePosition + ']');
					
					util.highlightEntry();
					util.highlightClue();
				}
				
			}; // end nav object

			
			var util = {
				calculateCluePositions : function(clues){

					for(var i=0; i<puzz.data.length; i++){
						puzz.data[i].position = (puzz.data[i].startx + puzz.data[i].starty*100);
					}

					// Reorder the problems array ascending by POSITION
					puzz.data.sort(function(a,b) {
						return a.position - b.position;
					});

					var index = 0;
					var lastIndex = false;
					for(var i=0; i<puzz.data.length; i++){
						if(puzz.data[i].position != lastIndex){
							index++;
						}
						lastIndex = puzz.data[i].position;
						puzz.data[i].position = index;
					}

					return clues;
				},

				highlightEntry: function() {
					// this routine needs to be smarter because it doesn't need to fire every time, only
					// when activePosition changes
					$actives = $('.active');
					$actives.removeClass('active');
					$actives = $('.position-' + activePosition + ' input').addClass('active');
					$actives.eq(0).focus();
					$actives.eq(0).select();
				},
				
				highlightClue: function() {
					var clue;				
					$('.clues-active').removeClass('clues-active');
					$('[data-position=' + activePosition + ']').addClass('clues-active');
					
					if (mode === 'interacting') {
						clue = $('[data-position=' + activePosition + ']');
						activeClueIndex = $(clueLiEls).index(clue);
					};
				},

				getActivePositionFromClassGroup: function(el){
					var cells = $(el).closest('td').data('cells');
					if(cells.length > 1){

						if(mode === "setting ui"){
							currOri = cells[(cells[0].word === 0) ? 0 : 1].data.orientation
						}

						for(var i=0;i<cells.length;i++){
							if(cells[i].data.orientation == currOri){
								activePosition = cells[i].position
							}
						}

					} else {
						activePosition = cells[0].position;						
					}
						
				},
				
				checkSolved: function(valToCheck) {
					for (var i=0, s=solved.length; i < s; i++) {
						if(valToCheck === solved[i]){
							return true;
						}

					}
				},
				
				getSkips: function(position) {
					if ($(clueLiEls[position]).hasClass('clue-done')){
						activeClueIndex = position === clueLiEls.length-1 ? 0 : ++activeClueIndex;
						util.getSkips(activeClueIndex);						
					} else {
						return false;
					}
				}
				
			}; // end util object

				
			puzInit.init();
	
							
	}
	
})(jQuery);