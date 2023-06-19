migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("smmg0030x7vzngc")

  // remove
  collection.schema.removeField("nvconfty")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4n9dltem",
    "name": "foto",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("smmg0030x7vzngc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nvconfty",
    "name": "foto",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("4n9dltem")

  return dao.saveCollection(collection)
})
