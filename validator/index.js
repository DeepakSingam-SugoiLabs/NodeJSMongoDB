const expressValidator = require('express-validator');

exports.createPostValidator = (req, res ,next) => {
  
    
        const errors = req.validationError;
        if (errors) {
            return res.status(400).json({ errors: errors.array() });
          }
        next();
};

exports.createSignUpValidator = (req, res ,next) => {
  
    
  const errors = req.validationError;
  if (errors) {
      return res.status(400).json({ errors: errors.array() });
    }
  next();
};