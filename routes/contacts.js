const express = require('express');
const res = require('express/lib/response');

const contactsController = require('../controllers/contacts');
const router = express.Router();

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);


module.exports = router;