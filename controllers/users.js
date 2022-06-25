const User = require("../models/user");
const Notification = require("../models/notification");

module.exports.usersIndex = async (req, res) => {
  const users = await User.find({});
  res.render("users/index", { users });
};

module.exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("followers").exec();
    res.render("users/show", { user });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("back");
  }
};

module.exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.followers.includes(req.user._id)) {
      req.flash("error", `Already following ${user.username}`);
    } else {
      user.followers.push(req.user._id);
      req.flash("success", `Successfully followed ${user.username}!`);
    }
    user.save();
    res.redirect(`/users/${id}`);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/posts");
  }
};

// module.exports.unFollowUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     user.followers.splice(user.followers.indexOf(req.user._id), 1);
//     await user.save();
//     req.flash('success', `Successfully unfollowed ${user.username} :(`);
//     res.redirect(`/users/${id}`);
//   } catch (e) {
//     req.flash('error', e.message);
//     res.redirect('/posts');
//   }
// };

module.exports.getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "notifications",
        options: { sort: { _id: -1 } },
      })
      .exec();
    let allNotifications = user.notifications;
    res.render("notifications/index", { allNotifications });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("back");
  }
};

module.exports.handleNotification = async (req, res) => {
  try {
    const { id } = req.params;
    let notification = await Notification.findById(id);
    notification.save();
    res.redirect(`/notifications/${notification.id}`);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/posts");
  }
};

module.exports.renderEditForm = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.render("users/edit", { user });
};

module.exports.editUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  // user.biography = req.body.biography.trim();
  user.email = req.body.email;
  if (req.body.adminCode === "smell2good") {
    user.isAdmin = true;
  } else if (req.body.adminCode === "") {
  } else {
    req.flash("error", "Admin code is incorrect!");
  }
  if (req.body.emailShown.toLowerCase() == "yes") {
    user.emailShown = true;
    console.log(user.emailShown);
  } else {
    user.emailShown = false;
    console.log(user.emailShown);
  }
  await user.save();
  req.flash("success", "Successfully updated profile!");
  res.redirect(`/users/${user._id}`);
};

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password, firstName, lastName, avatar } = req.body;
    const user = new User({
      email,
      username,
      firstName,
      lastName,
      avatar,
    });
    if (!req.file) {
      const rander = Math.floor(Math.random() * 2);
      if (rander == 1) {
        user.avatar = {
          url: "https://res.cloudinary.com/dgzorrtut/image/upload/v1650717015/Community%20Rises/love_ct0bqm.png",
          filename: "Community Rises/love_ct0bqm",
        };
      } else {
        user.avatar = {
          url: "https://res.cloudinary.com/dgzorrtut/image/upload/v1652613280/Community%20Rises/quds_pyikeq.jpg",
          filename: "Community Rises/quds_pyikeq",
        };
      }
    } else {
      user.avatar = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }
    if (req.body.adminCode === "smell2bad") {
      user.isAdmin = true;
    } else if (req.body.adminCode === "") {
    } else {
      req.flash("error", "Admin code is incorrect!");
    }
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash(
        "success",
        `Welcome to Community Rises, ${registeredUser.username}!`
      );
      res.redirect("/posts");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/posts";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Logged you out! We will miss you :(");
  res.redirect("/posts");
};
