export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"Library MGMT" <${process.env.SMTP_EMAIL}>`, // sender address
    //"bar@example.com, baz@example.com", // list of receivers
    to: email,
    subject: "Action required - Activate your new account ✔", // Subject line
    text: `Hello ${name} follow the link to activate your account. ${url}  `, // plain text body
    html: `<p>Hello ${name} </p>
        <br/>
        <br/>
        <br/> 
       <p>your account has been created.click the button to activate your account </p>
        <br/>   
        <br/>
    <a href =${url}>
    <button style="background-color: #4CAF50 color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Activate now </button></a> 
        <br/>
        <br/>
    
        Reagrds,
        <p>Library Management</p>
        `, // html body
  };
};
