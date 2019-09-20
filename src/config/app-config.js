const path = require('path'); 
const cookieParser = require('cookie-parser');
const logger = require('morgan');

module.exports = {
  init(app, express) {
    // view engine setup
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({
      extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '..', '..', 'public')));
  },
};