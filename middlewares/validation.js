const validation = (schema) => {
  console.log("schema=====>");

  return (req, res, next) => {
    console.log("req.body===", req.body);
    const { error } = schema.validate(req.body);
    console.log("error======", error);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    next();
  };
};

module.exports = validation;
