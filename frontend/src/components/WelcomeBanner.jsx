function WelcomeBanner() {
  const name = localStorage.getItem("name") || "User";

  const today = new Date().toLocaleDateString();

  return (
    <div className="welcome-banner">
      <div>
        <h2>👋 Welcome Back, {name}</h2>
        <p>{today}</p>
      </div>
      <br></br>

      <div>
        <h3>💰 Manage Your Expenses Smartly</h3>
      </div>
      <br></br>

      <div>
        <p>
        Track your expenses and manage
        your finances efficiently.
      </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;

