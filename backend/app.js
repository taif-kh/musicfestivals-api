const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
const eventsRouter = require('./routes/eventsRouter');
const usersRouter = require('./routes/usersRouter');
const keyRouter = require('./routes/keyRouter');

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
      }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      console.log('Authenticating user:', email);
      try {
        const user = await prisma.users.findUnique({
          where: { email }
        });

        if (!user) {
          console.log('User not found');
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log('Password mismatch');
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        console.log('Authentication successful');
        return done(null, user);
      } catch (err) {
        console.log('Error during authentication:', err);
        return done(err);
      }
    }
));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  },
  async (jwt_payload, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: { id: jwt_payload.id },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});


app.post("/sign-up", async (req, res) => {
  const {email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    response = await prisma.users.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during sign-up.");
  }
});



app.post("/log-in", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password." });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      // Include user details in the response
      res.json({
        token,
        id: user.id,
        email: user.email,
      });
    });
  })(req, res, next);
});

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});




app.get("/", (req, res) => {
    res.send("Yo");
});



app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/key', keyRouter);


// _________________________________________________


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});


// localStorage.removeItem('token');      CLEAR TOKEN AND LOG OUT