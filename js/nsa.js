// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, Ash Kyd, The [real] Dod, MIT/GPL 
// Content [c] Electronic Frontier Foundation, https://www.eff.org/copyright

(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var entryData = [
			 	{
					clue: "NSA program that the government claims is justified by Section 702 of the FISA Amendments Act.",
					answer: "cevfz",
					rot13: true,
					position: 1,
					orientation: "across",
					startx: 1,
					starty: 1
				},
			 	{
					clue: 'In its First Unitarian lawsuit, EFF argues the NSA is violating the First Amendment "Freedom of _________."',
					answer: "nffbpvngvba",
					rot13: true,
					position: 3,
					orientation: "across",
					startx: 11,
					starty: 1
				},
				{
					clue: "PINWALE, PRISM, NUCLEON, MAINWAY and MARINA are all part of this NSA umbrella program.",
					answer: "fgryynejvaq",
					rot13: true,
					position: 6,
					orientation: "across",
					startx: 4,
					starty: 3
				},
				{
					clue: "Abbreviated name for the DOD electronic warfare division led by 23-Across.",
					answer: "hfplorepbz",
					rot13: true,
					position: 8,
					orientation: "across",
					startx: 8,
					starty: 5
				},
				{
					clue: "Member of Congress who offered an amendment to the defense bill to cut funding for the NSA’s operations under Section 215 of the Patriot Act.",
					answer: "nznfu",
					rot13: true,
					position: 10,
					orientation: "across",	
					startx: 3,
					starty: 6
				},
				{
					clue: "Telecom corporation that whistleblower Mark Klein discovered allowed the NSA to tap into its system.",
					answer: "ngg",
					rot13: true,
					position: 11,
					orientation: "across",
					startx: 1,
					starty: 7
				},
				{
					clue: "The NSA's British counterpart.",
					answer: "tpud",
					rot13: true,
					position: 15,
					orientation: "across",
					startx: 1,
					starty: 9
				},
				{
					clue: "Senator from California who has long supported the NSA and is now offering a fake fix.",
					answer: "srvafgrva",
					rot13: true,
					position: 16,
					orientation: "across",
					startx: 7,
					starty: 9
				},
				{
					clue: 'A global coalition of civil society groups say nations should adopt "_________ and Proportionate Principles" when it comes to electronic surveillance.',
					answer: "arprffnel",
					rot13: true,
					position: 18,
					orientation: "across",
					startx: 3,
					starty: 11
				},
				{
					clue: 'The Director of National Intelligence who gave the "least untruthful" answer to Congress.',
					answer: "pynccre",
					rot13: true,
					position: 19,
					orientation: "across",
					startx: 15,
					starty: 11
				},
				{
					clue: "Acronym for the law EFF used to force the release of thousands of pages of NSA-related documents.",
					answer: "sbvn",
					rot13: true,
					position: 21,
					orientation: "across",
					startx: 7,
					starty: 13
				},
				{
					clue: "Top ranking general at the NSA.",
					answer: "nyrknaqre",
					rot13: true,
					position: 23,
					orientation: "across",
					startx: 1,
					starty: 15
				},
				{
					clue: "Email provider that shut down after the Department of Justice demanded access to its encryption key.",
					answer: "yninovg",
					rot13: true,
					position: 27,
					orientation: "across",
					startx: 14,
					starty: 17
				},
				{
					clue: "She received EFF's 2013 Pioneer Award for her work on the Snowden documents.",
					answer: "cbvgenf",
					rot13: true,
					position: 28,
					orientation: "across",
					startx: 4,
					starty: 19
				},
				{
					clue: "Senator from Oregon who, along with 26-down, has been warning the public about NSA spying for years.",
					answer: "jlqra",
					rot13: true,
					position: 29,
					orientation: "across",
					startx: 16,
					starty: 19
				},
				{
					clue: "Term for when an NSA worker uses electronic surveillance tools to spy on a romantic interest or ex-lover.",
					answer: "ybirvag",
					rot13: true,
					position: 30,
					orientation: "across",
					startx: 9,
					starty: 21
				},



				{
					clue: "Term for telephone call records that includes when you made a call, to whom, and for how long, but not the conversation itself.",
					answer: "zrgnqngn",
					rot13: true,
					position: 2,
					orientation: "down",
					startx: 5,
					starty: 1
				},
				{
					clue: "He authored the Patriot Act and says the NSA has stretched the law farther than Congress ever intended.",
					answer: "frafraoeraare",
					rot13: true,
					position: 4,
					orientation: "down",
					startx: 13,
					starty: 1
				},
				{
					clue: "EGOTISTICALGIRAFFE and EGOTISTICALGOAT are both NSA terms associated with undermining this anonymity tool.",
					answer: "gbe",
					rot13: true,
					position: 5,
					orientation: "down",
					startx: 18,
					starty: 1
				},
				{
					clue: "In October, the Stop _______ Us coalition marched in DC.",
					answer: "jngpuvat",
					rot13: true,
					position: 7,
					orientation: "down",
					startx: 3,
					starty: 5
				},
				{
					clue: "NSA codename for program that tapped into Google and Yahoo data centers abroad.",
					answer: "zhfphyne",
					rot13: true,
					position: 9,
					orientation: "down",
					startx: 17,
					starty: 5
				},
				{
					clue: "The NSA's computer tool, with dropdown menus and filters, for searching Internet activity.",
					answer: "kxrlfpber",
					rot13: true,
					position: 12,
					orientation: "down",
					startx: 8,
					starty: 7
				},
				{
					clue: "Acronym for games like World of Warcraft that the NSA infiltrated.",
					answer: "zzbect",
					rot13: true,
					position: 13,
					orientation: "down",
					startx: 19,
					starty: 7
				},
				{
					clue: "The _____ Committee investigated the NSA over similar abuses in the 1970s.",
					answer: "puhepu",
					rot13: true,
					position: 14,
					orientation: "down",
					startx: 21,
					starty: 8
				},
				{
					clue: "Private contractor where whistleblower Edward Snowden worked (for short).",
					answer: "obbmnyyra",
					rot13: true,
					position: 17,
					orientation: "down",
					startx: 1,
					starty: 11
				},
				{
					clue: "Airport where British police detained journalist Glenn Greenwald's partner, David Miranda, for nine hours under terrorism laws.",
					answer: "urnguebj",
					rot13: true,
					position: 20,
					orientation: "down",
					startx: 5,
					starty: 13
				},
				{
					clue: "Presiding judge of the FISA Court.",
					answer: "jnygba",
					rot13: true,
					position: 22,
					orientation: "down",
					startx: 20,
					starty: 14
				},
				{
					clue: 'US, UK, Canada, New Zealand and Australia are also known as the "Five ____."',
					answer: "rlrf",
					rot13: true,
					position: 24,
					orientation: "down",
					startx: 3,
					starty: 15
				},
				{
					clue: "Codename for NSA program to undermine and break encryption.",
					answer: "ohyyeha",
					rot13: true,
					position: 25,
					orientation: "down",
					startx: 14,
					starty: 15
				},
				{
					clue: "Senator from Colorado who, along with 29-Across, has been warning the public about NSA spying for years.",
					answer: "hqnyy",
					rot13: true,
					position: 26,
					orientation: "down",
					startx: 9,
					starty: 17
				}
			] 
                // Note: you can change showAnswers to true, but #CeilingKeith would know
		$('#puzzle-wrapper').crossword({ entryData: entryData, showAnswers: false, id: "nsa-crossword" });
	})
	
})(jQuery)
