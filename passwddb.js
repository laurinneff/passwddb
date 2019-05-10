const cryptoJson = require("crypto-json")

/** Contains multiple site object and utility functions */
class PasswordDB {
    /**
     * Create a new password database when no arguments given, otherwise decrypt one
     * @param {object} encrypted The encrypted object
     * @param {string} password The encryption algorithm
     * @param {object} options Custom crypto-json options
     */
    constructor(encrypted, password, options) {
        if (!arguments.length) {
            this.db = {
                sites: {}
            }
        }
        else {
            const dec = cryptoJson.decrypt(encrypted, password, options)
            this.db = dec
        }
    }

    /**
     * Get a site object in the database
     * @param {string} name The name of the site
     * @returns {Site} The site object
     */
    getSite(name) {
        const site = this.db.sites[name]
        return new Site(site.site.username, site.site.email, site.site.password)
    }

    /**
     * Add a new site
     * @param {string} name The name of the site
     * @param {Site} site The site to add to the database
     */
    addSite(name, site) {
        this.db.sites[name] = site
    }

    /**
     * Get a list of sites in the database
     * @returns {Array<string>} Array of site names
     */
    listSites() {
        return Object.keys(this.db.sites)
    }

    /**
     * Encrypt the database for saving
     * @param {string} password The encryption password
     * @param {object} options Custom crypto-json options
     * @returns {object} Encrypted database object
     */
    encrypt(password, options) {
        return cryptoJson.encrypt(this.db, password, options)
    }
}

/** Contains username, email and passwords of a user */
class Site {
    /**
     * Create a new site object
     * @param {string} username The username, empty string if not specified
     * @param {string} email The E-Mail address, empty string if not specified
     * @param {string} password The password, empty string if not specified
     */
    constructor(username, email, password) {
        this.site = {
            username: username || "",
            email: email || "",
            password: password || ""
        }
    }

    /**
     * Get the username
     * @returns {string} username
     */
    getUsername() {
        return this.site.username
    }

    /**
     * Get the E-Mail
     * @returns {string} E-Mail
     */
    getEmail() {
        return this.site.email
    }

    /**
     * Get the password
     * @returns {string} password
     */
    getPassword() {
        return this.site.password
    }
}

exports.PasswordDB = PasswordDB
exports.Site = Site
