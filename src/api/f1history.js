/*
 *  A simple revealing module for API calls
 * 
 */
export default (function(){
    let startingYear // the year of the first Grand Prix, needed for calculating offset
    let championsList = {} // cached lists of champions for a given period 

    return {
        // get the year of the first Grand Prix
        async getStartingYear () {
            if (!startingYear) {
                const response = await (await fetch('http://ergast.com/api/f1/seasons.json?limit=1')).json()
                startingYear = parseInt(response.MRData.SeasonTable.Seasons[0].season)
            }
            return startingYear
        },
        // get champions list from {yearFrom} to {yearTo}
        async getChampionsList ({yearFrom, yearTo}) {
            const period = `${yearFrom}-${yearTo}`
            const startingYear = await this.getStartingYear()

            // get the champions list for given period if not cached
            if (!championsList[period]) {
                const limit = yearTo - yearFrom + 1
                const offset = yearFrom - startingYear
                championsList[period] = await (await fetch(`http://ergast.com/api/f1/driverStandings/1.json?limit=${limit}&offset=${offset}`)).json()
            }
            return championsList[period]
        },
        // get the list of race winners for specified season
        async getSeasonWinnersList (season) {
            const response = await fetch(`http://ergast.com/api/f1/${season}/results/1.json`)
            return response.json()
        },
        // get the champion of specified season
        async getSeasonWinner (season) {
            const response = await fetch(`http://ergast.com/api/f1/${season}/driverStandings.json`)
            return response.json()
        }
    }
}())