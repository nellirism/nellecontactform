const path = require("path");

const express = require("express");
const app = express();

const sendEmail = require("./utils/sendEmail");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("contact");
});

app.get("/sent", (req, res) => {
    res.render("sent");
});

app.post("/sendemail", (req, res) => {
    const { name, company, email, message } = req.body;

    const from = "nellirism@gmail.com"; // this is the email i set up to send the message from the app to the mateocannway@gmail.com from SendGrid
    const to = "mateocannway@gmail.com"; // this is the email i set up to receive the email from the app. 

    const subject = "New Contact Request";

    const output = `
    <p>You have a new Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Surname: ${company}</li>
      <li>Email: ${email}</li>
      <li>Email: ${message}</li>
    </ul>
  `;

    sendEmail(to, from, subject, output);
    res.redirect("/sent");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
