const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAuthor } = require("../middleware");
const suggestions = require("../controllers/suggestions");

const catchAsync = require("../utils/catchAsync");

router.get("/",  catchAsync(suggestions.index));

router.get("/new", isLoggedIn, suggestions.renderNewForm);

router.post("/", isLoggedIn, catchAsync(suggestions.createSuggestion));

router.delete("/:suggestionId", isLoggedIn, catchAsync(suggestions.deleteSuggestion));


module.exports = router;