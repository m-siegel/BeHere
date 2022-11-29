// By Tim
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
const LocalStrategy = passportLocal.Strategy;

export function initialize(passport, getUserByContactEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const { user } = await getUserByContactEmail(email?.toLowerCase());
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
      _id: user._id,
      username: user.username,
      organizations: user.organizations,
    })
  );

  passport.deserializeUser((_id, done) => {
    return done(null, getUserById(_id));
  });
}

export default initialize;
