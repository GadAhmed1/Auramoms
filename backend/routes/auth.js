import express from 'express';
import passport from 'passport';

const router_google = express.Router();

// توجيه المستخدم إلى تسجيل الدخول عبر Google
router_google.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// المعالجة بعد تسجيل الدخول عبر Google
router_google.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // إعادة توجيه المستخدم إلى لوحة التحكم بعد تسجيل الدخول بنجاح
    res.redirect('/auth/dashboard');
  }
);

// تسجيل الخروج
router_google.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// Middleware للتحقق مما إذا كان المستخدم مصادقًا عليه
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google');
}

// استخدام middleware في مسار /dashboard
router_google.get('/dashboard', isLoggedIn, (req, res) => {
  // عرض معلومات المستخدم إذا كان مصادقًا عليه
  res.send(`
    <h1>Welcome, ${req.user.firstname} ${req.user.lastname}!</h1>
    <p>Your email: ${req.user.email}</p>
    <a href="/auth/logout">Logout</a>
  `);
});

export default router_google;
