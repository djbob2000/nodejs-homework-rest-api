const express = require("express");

const router = express.Router();

const {
  validateContactId,
  validateContactBody,
  validateFavorite,
  checkIsExistInDB,
} = require("../../middlewares/contactsMiddlewares");

const checkAuthMiddleware = require("../../middlewares/checkAuthMiddleware");

const {
  getListContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  putContactController,
  updateStatusContact,
} = require("../../controllers/contactController");

// add to all routes, check auth
router.use(checkAuthMiddleware);

router
  .route("/")
  .get(getListContactsController)
  .post(checkIsExistInDB, validateContactBody, addContactController);

router
  .route("/:contactId")
  .get(getByIdController)
  .put(validateContactBody, validateContactId, putContactController)
  .delete(validateContactId, removeContactController);

router
  .route("/:contactId/favorite")
  .patch(validateContactId, validateFavorite, updateStatusContact);

module.exports = router;
