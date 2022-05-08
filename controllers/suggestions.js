const Suggestion = require("../models/suggestion");

module.exports.index = async (req, res) => {
    const suggestions = await Suggestion.find({}).populate("author");
    res.render("suggestions/index", { suggestions });
}

module.exports.renderNewForm = (req, res) => {
    res.render("suggestions/new");
}

module.exports.createSuggestion = async (req, res) => {
    const { body, usage } = req.body;
    const suggestion = new Suggestion({
        body,
        usage
    });
    suggestion.author = req.user._id;
    console.log(req.body);
    await suggestion.save();
    req.flash("success", "Added your suggestion! Will update you soon!");
    res.redirect("/suggestions");
}

module.exports.deleteSuggestion = async (req, res) => {
    const { suggestionId } = req.params;
    const deletedSuggestion = await Suggestion.findByIdAndDelete(suggestionId);
    req.flash("success", "Deleted suggestion!");
    res.redirect("/suggestions");
}

// module.exports.approveSuggestion = async(req, res) => {
//     const { suggestionId } = req.params;
//     const approvedSuggestion = await Suggestion.findByIdAndDelete(suggestionId);
//     req.flash("success", "Congratz! The suggestion was approved!");
// }