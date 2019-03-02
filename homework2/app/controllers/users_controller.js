const ApplicationController = require('./application_controller');

class UsersController extends ApplicationController {

  index() {

  }

  show() {
    this.res.end(`{ id: ${this.params.id}}`);
  }

}

module.exports = UsersController;
