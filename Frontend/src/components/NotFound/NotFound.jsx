import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page notfound">
      <div className="context">
        <img src="/" alt="notfound" />! ! ! hello ! ! !
        <Link to={"/"}>Return To Home</Link>
      </div>
    </section>
  );
}
