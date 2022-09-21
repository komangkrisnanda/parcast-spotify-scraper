const axios = require('axios');
const cheerio = require('cheerio');

const response = [];

const zodiacList = ["Pisces", "Aries", "Virgo", "Scorpio"];

const base_url = "https://open.spotify.com";

const getEpisodes = async () => {
	try {
		const { data } = await axios.get(
			`${base_url}/show/1UvmWHLiRH9IeTYfWC2zvc`
		);
		const $ = cheerio.load(data);
		const episodeTitles = [];

		$('div[data-testid^="episode-"]').each((_idx, el) => {
			const episodeEl = $(el).text()
            var episodeName = episodeEl.replace(/ .*/,'');
            console.log(episodeName);
            if(zodiacList.includes(episodeName)){
                response.push({
                    zodiac_name: episodeName,
                    href: `${base_url}${$(el).find('a').attr('href')}`
                })
            }
			
		});

		return episodeTitles;
	} catch (error) {
		throw error;
	}
};

getEpisodes()
    .then((episodeTitle) => console.log(response));