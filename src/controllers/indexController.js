class indexController {
  homePage(req, res) {
    res.render('index');
  }

  roomsPage(req, res) {
    res.render('rooms');
  }

  bookingPage(req, res) {
    res.render('booking-error');
  }

  newsPage(req, res) {
    res.render('news');
  }
}

module.exports = new indexController();
