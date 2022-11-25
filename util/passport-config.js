// By Tim
// import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
const LocalStrategy = passportLocal.Strategy;

export function initialize(passport, getUserByContactEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const { user } = await getUserByContactEmail(email);
    if (user === null) {
      return done(null, false, { message: "Incorrect credentials." });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect credentials." });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "contactEmail" }, authenticateUser)
  );
  passport.serializeUser((user, done) =>
    done(null, {
      // TODO: we've been using _id. do we want to keep doing that?
      id: user._id,
      username: user.username,
      organizations: user.organizations,
    })
  );

  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

export default initialize;
