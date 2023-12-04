const dataError = (err, req, res, next) => {
  console.log(err, "<");
  if (err.name === "LoginError") {
    res.status(401).json({
      msg: "Error login user not found atau password not matched",
    });
  } else if (err.name === "SequelizeValidationError") {
    const msg = err.errors
      .map((er) => {
        return er.message;
      })
      .join();

    res.status(400).json({
      message: msg,
    });
  } else if (err.name === "RegisError") {
    res.status(401).json({
      message: "Kindly check your input!",
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    const msg = err.errors
      .map((er) => {
        return er.message;
      })
      .join();

    res.status(400).json({
      message: msg,
    });
  } else if (err.name === "LoginErr") {
    res.status(404).json({
      message: "User not found. Please register!",
    });
  } else if (err.name === "PassErr") {
    res.status(400).json({
      message: "Kindly check your password input!",
    });
  } else if (err.name === "Unauthentication") {
    res.status(403).json({
      message: "Forbidden error di authentication",
    });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "Error authentication",
    });
  } else if (err.name === "Customer not found") {
    res.status(404).json({
      message: "Email not found. Please register!",
    });
  } else if (err.name === "No Movie") {
    res.status(404).json({
      message: "Movie not found!",
    });
  } else if (err.name === "SequelizeDatabaseError") {
    res.status(404).json({
      message: "Database Error",
    });
  } else if (err.name === "CO Ticket") {
    res.status(404).json({
      message: "Ticket not found",
    });
  }else if (err.name === "Seat taken") {
    res.status(400).json({
      message: "Seat already taken. Please choose another seat.",
    });
  }else if (err.name === "Ticket update fail") {
    res.status(404).json({
      message: "Ticket not found or not updated!",
    });
  }else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
  // else if (err.name) {
  //   if (err.code) {
  //     res.status(err.code).json({
  //       message: err.message,
  //     });
  //   } 
};

module.exports = dataError;
