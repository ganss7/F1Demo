/*
 *  Just a util mixin for data transformation in components
 * 
 */
export default {
    methods: {
        getDriverFullName(driver) {
            return `${driver.givenName} ${driver.familyName}`
        },
        getDriverShortName(driver) {
            return `${driver.givenName[0]}. ${driver.familyName}`
        }
    }
}