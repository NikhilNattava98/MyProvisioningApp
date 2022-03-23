const { Client } = require('pg');
const testData = require('./../../testdata/testdata.json');

const client = new Client({
  user: testData.common.database.user,
  host: testData.common.database.host,
  database: testData.common.database.database,
  password: testData.common.database.password,
  port: testData.common.database.port,
  ssl: { rejectUnauthorized: false }
})


export class DataBaseValidation {
  result;

  /**
   * This method is used to connect to database server
   */

  async connectToDBServer() {
    await client.connect();
    console.log("Connected to database server")
  }

  /**
   * This metod is used to execute the query and the data table is returned
   * @param {*} query 
   * @returns 
   */
  async executeQuery(query) {
    await client.query(query)
      .then(res => {
        console.log(res.rows[0]);
        this.result = res.rows[0];
      })
      .catch(e => console.error(e.stack));
    return this.result;
  }

  /**
   * This method is used to disconnect DB connection
   */
  async disconnectDBServer() {
    await client.end();
    console.log("Disconnected from database server")
  }
}
