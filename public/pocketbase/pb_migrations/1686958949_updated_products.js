migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("smmg0030x7vzngc")

  // remove
  collection.schema.removeField("yphc2fyq")

  // remove
  collection.schema.removeField("qvux8hl7")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("smmg0030x7vzngc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yphc2fyq",
    "name": "fechaCaducidad",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qvux8hl7",
    "name": "fechaVenta",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
