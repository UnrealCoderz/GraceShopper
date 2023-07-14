import React from "react";

function Home({ user, token }) {
  return (
    <div>
      <h1>Welcome to UnrealBoosters!</h1>
      {/* <p>{token}</p> */}
      <div>Welcome,{user.username} </div>

      <h2>Today's featured product:</h2>
    </div>
  );
}
export default Home;
