import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';

dotenv.config();

// إعداد استراتيجية Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // تحقق مما إذا كان المستخدم موجود بالفعل في قاعدة البيانات
    let user = await userModel.findOne({ googleId: profile.id });

    // إذا لم يكن المستخدم موجودًا، احفظه في قاعدة البيانات
    if (!user) {
      const newUser = new userModel({
        googleId: profile.id,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        password: 'google-oauth', // تعيين كلمة مرور افتراضية (لن يتم استخدامها مع تسجيل الدخول بجوجل)
        country: 'Not specified', // يمكن تحديثها لاحقًا
        phone: 0, // يمكن تحديثها لاحقًا
      });
      user = await newUser.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
