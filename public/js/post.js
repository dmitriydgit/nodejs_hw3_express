"use strict";
(() => {

	const heading = document.querySelector(".heading");
	const subHeading = document.querySelector(".subheading");
	const meta = document.querySelector(".meta");
	const article = document.querySelector(".article");

	function showPost(post) {
		heading.innerHTML = post.header;
		subHeading.innerHTML = post.subheader;
		meta.innerHTML = post.meta;
		article.innerHTML = post.body;
	}

	const xhr = new XMLHttpRequest();
	xhr.open("GET", "post-data", true);
	xhr.send();

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 3) {
			if (xhr.status !== 200) {
				console.log(xhr.status + ': ' + xhr.statusText)
			} else {
				console.log(xhr.responseText)
				const post = JSON.parse(xhr.responseText);
				showPost(post);
			}
		}
	}
})()





/*
{
  "header": "Man must explore, and this is exploration at its greatest",
  "subheader": "Problems look mighty small from 150 miles up",
  "meta": "Posted by Start Bootstrap on August 24, 2018",
  "body": "Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center \u2014 an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.\r\n\r\nScience cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.\r\n\r\nWhat was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.\r\n\r\nA Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.\r\n\r\nFor those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us."
}

*/