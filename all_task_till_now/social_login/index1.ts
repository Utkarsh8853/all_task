import express from 'express';
import session from 'express-session';
import passport from 'passport';
import sequelize  from './database';
import './passport';

console.log(sequelize);

const app = express();
console.log('1');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
console.log('2');

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);
const PORT =3000;
console.log('3');


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
console.log('4');







// import express, { Request, Response } from 'express';
// import session from 'express-session';
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Sequelize } from 'sequelize';
// //import { User } from './models/user';

// const app = express();
// const sequelize = new Sequelize('postgres://postgres:      @localhost:5432/try');

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     gender: {
//       type: DataTypes.ENUM,
//       values: ['male', 'female', 'other'],
//       allowNull: true,
//     },
//     image: {
//       type: DataTypes.BLOB,
//       allowNull: true,
//     },
//     ph_no: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     }
//   },
//   {
//     timestamps:true,
//     sequelize,
//     tableName: 'users',
//   },
// );

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id: number, done) => {
//   const user = await User.findByPk(id);
//   done(null, user);
// });

// passport.use(new GoogleStrategy({
  // clientID: 'your-client-id',
  // clientSecret: 'your-client-secret',
  // callbackURL: 'http://localhost:3000/auth/google/callback',
// }, async (accessToken, refreshToken, profile, done) => {
//   const [user, created] = await User.findOrCreate({
//     where: { googleId: profile.id },
//     defaults: {
//       name: profile.displayName,
//       email: profile.emails[0].value,
//     },
//   });
//   done(null, user);
// }));

// app.get('/', (req: Request, res: Response) => {
//   res.render('index', { user: req.user });
// });

// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req: Request, res: Response) => {
//   res.redirect('/');
// });

// app.get('/logout', (req: Request, res: Response) => {
//   req.logout();
//   res.redirect('/');
// });

// sequelize.sync().then(() => {
//   app.listen(3000, () => {
//     console.log('Server started on http://localhost:3000');
//   });
// });












// // import express, { Request, Response } from 'express';
// // import { Pool } from 'pg';

// // const app = express();
// // const pool = new Pool({
// //   user: 'postgres',
// //   host: '192.168.2.175',
// //   database: 'try',
// //   password: '      ',
// //   port: 5432, // or your PostgreSQL port
// // });

// // app.use(express.json());

// // passport.use(new GoogleStrategy({
// //   clientID: 'your-client-id',
// //   clientSecret: 'your-client-secret',
// //   callbackURL: 'http://localhost:3000/auth/google/callback',
// // }, async (accessToken, refreshToken, profile, done) => {
// //   const [user, created] = await User.findOrCreate({
// //     where: { googleId: profile.id },
// //     defaults: {
// //       name: profile.displayName,
// //       email: profile.emails[0].value,
// //     },
// //   });
// //   done(null, user);
// // }));

// // // Define your routes here

// // app.listen(3000, () => {
// //   console.log('Server is running on port 3000');
// // });








// // // import express from 'express';
// // // import passport from 'passport';
// // // import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// // // const app = express();

// // // // Configure passport
// // // passport.use(new GoogleStrategy({
// // //   clientID: "409515368522-evadbu8ic4tl71cvi53ode23evtcrshd.apps.googleusercontent.com",
// // //   clientSecret: "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",
// // //   callbackURL: 'http://localhost:3000/auth/google/callback'
// // // }, (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) => {
// // //   // Handle the user's profile information
// // //   console.log(profile);
// // //   return done(null, profile);
// // // }));

// // // passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
// // //   done(null, user);
// // // });

// // // passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
// // //   done(null, user);
// // // });

// // // // Initialize passport
// // // app.use(passport.initialize());

// // // // Handle Google Sign-In
// // // app.get('/auth/google', passport.authenticate('google', {
// // //   scope: ['profile', 'email']
// // // }));

// // // // Handle Google Sign-In Callback
// // // app.get('/auth/google/callback', passport.authenticate('google', {
// // //   failureRedirect: '/login'
// // // }), (req: any, res: { redirect: (arg0: string) => void; }) => {
// // //   res.redirect('/');
// // // });

// // // app.listen(3000, () => {
// // //   console.log('Server started on port 3000');
// // // });
