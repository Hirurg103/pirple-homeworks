class ApplicationController {

  constructor(params, req, res) {
    this.params = params;
    this.req = req;
    this.res = res;
  }

  notFound() {
    this.res.end("Not Found");
  }

}

module.exports = ApplicationController;
