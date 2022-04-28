const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts-collection').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts-collection')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts-collection')
    .insertOne(newContact);
    // .insertOne(req.body, (error, result) => {
    //   if(error) {
    //     return res.status(500).send(error);
    //   }
    //   res.send(result.result);
    // });
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error occurred while creating contact.');
    }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts-collection')
    .replaceOne({_id:contactId}, contact);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error occurred while updating contact.');
    }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts-collection')
    .deleteOne({_id:contactId}, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error occurred while deleting contact.');
    }
};


module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };