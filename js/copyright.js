// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, Ash Kyd, The [real] Dod, MIT/GPL 
// Content [c] Electronic Frontier Foundation, https://www.eff.org/copyright

(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var entryData = 
[
    {
        "answer": "ybstera",
        "clue": "Zoe ______, member of Congress who received one of EFF\u2019s 2014 Pioneer Awards, in part for her commitment to reforming the Digital Millennium Copyright Act",
        "orientation": "across",
        "position": 2,
        "rot13": true,
        "startx": 5,
        "starty": 2
    },
    {
        "answer": "fureybpx",
        "clue": "First name of the fictional detective who\u2014thanks to the Supreme Court's refusal to take up the case\u2014is officially in the public domain",
        "orientation": "across",
        "position": 7,
        "rot13": true,
        "startx": 8,
        "starty": 5
    },
    {
        "answer": "abevrtn",
        "clue": "Former Panamanian dictator who used the \u201cright of publicity\u201d to attack the creators of Call of Duty for including him in their game",
        "orientation": "across",
        "position": 8,
        "rot13": true,
        "startx": 2,
        "starty": 7
    },
    {
        "answer": "tvguho",
        "clue": "Code-sharing website from which Popcorn Time torrent software was removed after an elaborate takedown request from the MPAA",
        "orientation": "across",
        "position": 9,
        "rot13": true,
        "startx": 3,
        "starty": 9
    },
    {
        "answer": "nrerb",
        "clue": "Company that lost a major case before the Supreme Court over letting users rent dime-sized antennas to record television programming",
        "orientation": "across",
        "position": 10,
        "rot13": true,
        "startx": 10,
        "starty": 9
    },
    {
        "answer": "tnepvn",
        "clue": "Cindy Lee ______, actor who filed a copyright suit against Google over her five-second performance in the notorious \u201cInnocence of Muslims\u201d video",
        "orientation": "across",
        "position": 13,
        "rot13": true,
        "startx": 5,
        "starty": 11
    },
    {
        "answer": "jbeqcerff",
        "clue": "Blog site, run by Automattic, that earned all the possible stars in EFF\u2019s inaugural Who Has Your Back copyright and trademark report",
        "orientation": "across",
        "position": 14,
        "rot13": true,
        "startx": 1,
        "starty": 13
    },
    {
        "answer": "ncvf",
        "clue": "According to a dangerous decision by the Federal Circuit Court in Oracle v. Google, these Java specifications may be considered copyrightable",
        "orientation": "across",
        "position": 17,
        "rot13": true,
        "startx": 10,
        "starty": 15
    },
    {
        "answer": "frysvr",
        "clue": "\"Monkey _____\" (see crossword background) was the center of a controversy when a photographer didn\u2019t like that it was uploaded as a public domain image to Wikimedia Commons",
        "orientation": "across",
        "position": 18,
        "rot13": true,
        "startx": 2,
        "starty": 16
    },
    {
        "answer": "haybpx",
        "clue": "You can now do this to your cellphone to bring it to a different carrier, thanks to a bill signed by President Obama in Augus",
        "orientation": "across",
        "position": 19,
        "rot13": true,
        "startx": 7,
        "starty": 17
    },
    {
        "answer": "tnjxre",
        "clue": "News and gossip site that Quentin Tarantino filed a copyright lawsuit against after it linked to a leaked script of his upcoming movie The Hateful Eight",
        "orientation": "across",
        "position": 20,
        "rot13": true,
        "startx": 2,
        "starty": 18
    },
    {
        "answer": "trggl",
        "clue": "Photography licensing company that made its images \u201cfree to embed\u201d and announced it would dial back its copyright enforcement",
        "orientation": "across",
        "position": 21,
        "rot13": true,
        "startx": 7,
        "starty": 20
    },
    {
        "answer": "wbuaqbr",
        "clue": "Porn troll Malibu Media filed more than 1,600 copyright lawsuits in 2014, using this name in place of many of the yet-to-be-identified defendants",
        "orientation": "down",
        "position": 1,
        "rot13": true,
        "startx": 6,
        "starty": 1
    },
    {
        "answer": "ubbxnu",
        "clue": "An appeals court ruled that you can\u2019t copyright the shape of this tobacco paraphernalia",
        "orientation": "down",
        "position": 3,
        "rot13": true,
        "startx": 15,
        "starty": 2
    },
    {
        "answer": "qbbe",
        "clue": "Outgoing \u201cIP Czar\u201d Victoria Espinel has taken the top job at the Business Software Association. In political circles, this move is known as the revolving ___",
        "orientation": "down",
        "position": 4,
        "rot13": true,
        "startx": 4,
        "starty": 4
    },
    {
        "answer": "syvpxe",
        "clue": "Image-hosting site owned by Yahoo that raised some hackles when it announced it would be selling prints of some users\u2019 Creative Commons licensed prints",
        "orientation": "down",
        "position": 5,
        "rot13": true,
        "startx": 12,
        "starty": 4
    },
    {
        "answer": "fbal",
        "clue": "Company whose leaked emails revealed a secret anti-piracy meeting organized by the Department of Homeland Security",
        "orientation": "down",
        "position": 6,
        "rot13": true,
        "startx": 2,
        "starty": 5
    },
    {
        "answer": "fgneohpxf",
        "clue": "Comedy Central show Nathan For You tested the limits of fair use with its parody coffee shop, \u201cDumb ________\u201d",
        "orientation": "down",
        "position": 7,
        "rot13": true,
        "startx": 8,
        "starty": 5
    },
    {
        "answer": "bjaobl",
        "clue": "Brian Knappenberger released his Aaron Swartz documentary, \u201cThe Internet\u2019s ______\u201d under a Creative Commons License",
        "orientation": "down",
        "position": 11,
        "rot13": true,
        "startx": 14,
        "starty": 9
    },
    {
        "answer": "cvengronl",
        "clue": "In December, Swedish police raided this notoriously resilient torrent site, bringing it down worldwide",
        "orientation": "down",
        "position": 12,
        "rot13": true,
        "startx": 3,
        "starty": 11
    },
    {
        "answer": "guvpxr",
        "clue": "\u201cBlurred Lines\u201d singer Robin _____ went to court to ask for a declaratory judgment that his song does not infringe Marvin Gaye\u2019s \u201cGot To Give It Up\u201d",
        "orientation": "down",
        "position": 15,
        "rot13": true,
        "startx": 12,
        "starty": 13
    },
    {
        "answer": "xrhevt",
        "clue": "Maker of single-serving brewing pods that introduced something akin to DRM for coffee machines",
        "orientation": "down",
        "position": 16,
        "rot13": true,
        "startx": 7,
        "starty": 15
    }
];

/* ***
   * This tweak can be used to get rot13 from answers when composing.
   * To cheat, simply change showAnsers to true below (but shame on you).
   ***
		function rot13(s){
                    return (s ? s : this).split('').map(function(_)
                    {
                        if (!_.match(/[A-za-z]/)) return _;
                        c = Math.floor(_.charCodeAt(0) / 97);
                        k = (_.toLowerCase().charCodeAt(0) - 83) % 26 || 26;
                        return String.fromCharCode(k + ((c == 0) ? 64 : 96));
                    }).join('');
                }
                for (item in entryData) {
                    entryData[item].answer = rot13(entryData[item].answer);
                }
                console.log(JSON.stringify(entryData));
*/
                // Note: you can change showAnswers to true, but #CeilingKeith would know
		$('#puzzle-wrapper').crossword({ entryData: entryData, showAnswers: false, id: "crossword" });
	})
	
})(jQuery)
