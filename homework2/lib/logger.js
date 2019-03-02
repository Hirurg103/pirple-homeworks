const fs = require('fs');
const path = require('path');
const logger = {};

const logFile = function() {
  return path.join('log', `${process.env.NODE_ENV || 'development'}.log`);
};

const appendToLog = function(msg) {
  fs.open(logFile(), 'a', function(err, logFileDescriptor) {
    if(!err) {
      const time = new Date().toISOString();

      fs.appendFile(logFileDescriptor, `${time} ${msg}`, function(err) {
        if(!err) {
          fs.close(logFileDescriptor, function(err) {
            if(err) {
              console.log(`Error closing log file ${err}`);
            }
          });
        } else {
          console.log(`Error writing to log ${err}`);
        }
      });
    } else {
      console.log(`Error opening log file ${err}`);
    }
  });
};

logger.info = function(msg) {

  appendToLog(`[INFO] ${msg}\n`);
};

module.exports = logger;
