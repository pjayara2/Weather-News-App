const Constants = {

    NewsBaseURL: 'https://newsapi.org/v2',
    WeatherBaseURL: 'https://api.openweathermap.org/data/2.5',

    concatUrl: {
        weather: {
            weather: '/weather'
        },
        news: {
            everything: '/everything',
            headlines: 'top-headlines',
        }
    },

    newsApiKey: '12ccc2c1783e4bbf96d5b75a6aae5aff',
    weatherApiKey: 'b43af1e39f7ccc55276bbeaf339831ab',
};

export default Constants;