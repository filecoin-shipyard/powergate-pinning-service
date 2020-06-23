import React from "react";
import Lotus from "../../assets/lotus.png";
import Textile from "../../assets/textile.jpg";
import GitHubButton from "react-github-btn";

export default function Footer() {
  return (
    <div>
      <h3>Built Using</h3>
      <img src={Lotus} width="64" />
      <img src={Textile} width="64" />
      <br />
      <br />
      <GitHubButton
        href="https://github.com/dappkit/powergate-pinning-service"
        data-size="large"
        data-show-count="true"
        aria-label="A simple pinning service using textile powergate"
      >
        Star
      </GitHubButton>
    </div>
  );
}
