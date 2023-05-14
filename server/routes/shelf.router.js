const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const newItem = req.body;
  const queryText = `INSERT INTO "item" ("description", "image_url")
                    VALUES ($1, $2)`;
  const queryValues = [
    newItem.description,
    newItem.image_url,
  ];
  pool.query(queryText, queryValues)
  .then(() => {res.sendStatus(201) })
  .catch((error) => {
    console.log(`Error adding new item in router`, error);
    res.sendStatus(500);
  });
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM "item" WHERE "id" = $1';
  pool.query(queryText, [req.params.id])
  .then(() => {res.sendStatus(200); })
  .catch((error) => {
    console.log(`Error completing DELETE in router ${error}`)
    res.sendStatus(500);
  })
});

module.exports = router;
