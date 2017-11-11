class LoginForm extends React.Component {
  render(){
    return(
      <form className="loginForm">
        <p>
          <label htmlFor="email" />
        </p>
        <p>
          <input 
            type="text"
            name="email"
            placeholder="Email" />
        </p>
        <p>
          <label htmlFor="password" />
        </p>
        <p>
          <input 
            type="password"
            name="password" 
            placeholder="Password" />
        </p>
        <p>
          <input 
            type="submit" 
            value="submit" />
        </p>
      </form>
    );
  }
}

var check = document.getElementById('loginform')

if (check){
  ReactDOM.render(
    <LoginForm />,
    document.getElementById('loginform')
  );
}