/**
 * This file handles the interface between the participant data model and the database
 * @module modules/accounts
 * @author Daniel Jones
 */

import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

/**
 * Accounts
 * ES6 module that handles participant registration and gaze data
 * The module also handles an assortment of CRUD operations associated with the users table
 */
class Accounts {
	/**
   * Create an account object
   * @param {String} [dbName="../clarifai_experiment_test.db"] - The name of the database file to use.
   */
	constructor(dbName = './clarifai_experiment_test.db') {
        this.dbName = dbName
    }
    async init() {
        this.db = await open({
            filename: this.dbName,
            driver: sqlite3.Database,
        })
    
        const createQuery =
                'CREATE TABLE IF NOT EXISTS users(\
                id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT,\
                timestamp TEXT, rt1_gazedata TEXT, rt1_gazedata_tool TEXT,\
                rt2_gazedata TEXT, rt2_gazedata_tool TEXT, width TEXT,\
                height TEXT, mouseovers TEXT);'
        await this.db.exec(createQuery)
    }

	/**
	 * Register participant
	 * @param {String} user aka paticipant ID (user defined)
     * @param {String} timestamp date + time of registration
	 * @returns {Int} returns the unique ID of the nearly created user in the database
	 */
	async register(user, timestamp) {
        const query = `INSERT INTO users (user, timestamp) VALUES (?, ?);`
    
        try {
            const result = await this.db.run(query, [user, timestamp])
            return result.lastID
        } catch (err) {
            console.error(`Error inserting user: ${err.message}`)
            throw err
        }
    }

    /**
	 * Update a field of the participant with eye tracking data
	 * @param {String} field the field to update
     * @param {String} data the eye tracking data as a serialised JSON object
     * @param {String} userid the unique ID of the user to update
	 * @returns {Boolean} returns true if the update was successful
	 */
    async update(field, data, userid) {
        const updateQuery = `UPDATE users SET ${field} = ? WHERE id = ?;`
        try {
            await this.db.run(updateQuery, [data, userid])
            return true
        } catch (err) {
            console.error(`Error updating user: ${err.message}`)
            throw err
        }
    }

    // Switched to get user by experiment ID (won't work with test data now; laziness)
    async get(field, userid) {
        const getQuery = `SELECT ${field} FROM users WHERE id = ?;`
        try {
            const result = await this.db.get(getQuery, [userid])
            return result
        } catch (err) {
            console.error(`Error getting user: ${err.message}`)
            throw err
        }
    }

	async close() {
		await this.db.close()
	}
}

export default Accounts