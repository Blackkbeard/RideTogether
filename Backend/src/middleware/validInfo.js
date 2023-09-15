const validInfo = (req, res, next) => {
  const { email, full_name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }
  // ^: Asserts the start of a line.
  // \w+: Matches one or more word characters (equivalent to [a-zA-Z0-9_]).
  // ([\.-]?\w+)*: Matches zero or more occurrences of a period or a hyphen followed by one or more word characters.
  // @: Matches the at symbol.
  // \w+: Matches one or more word characters.
  // ([\.-]?\w+)*: Matches zero or more occurrences of a period or a hyphen followed by one or more word characters.
  // (\.\w{2,3})+: Matches one or more occurrences of a period followed by two to three word characters.
  // $: Asserts the end of a line.
  if (req.path === "/register") {
    console.log(!email.length);
    if (![email, full_name, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }

  next();
};
module.exports = { validInfo };
