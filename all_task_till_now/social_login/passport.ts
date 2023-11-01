import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from './database';

passport.serializeUser<any, any>((user, done:any) => {
  done (null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
        clientID: "409515368522-evadbu8ic4tl71cvi53ode23evtcrshd.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile:any, done:any) => {
      try {
        const [user, created] = await User.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            name: profile.displayName,
            picture: profile.photos[0].value,
          },
        });
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
