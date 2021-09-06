import { Template } from "../../utils.js";
import config from "../../config.js";

const Flat9SiteHeadingTemplate = Object.create(Template);

Flat9SiteHeadingTemplate.html = () =>
  `<h1 id="heading">${config.siteHeading}</h1>`;

Flat9SiteHeadingTemplate.css = () => `<style>
  #heading {
    font-size: var(--xxl-font-mobile);
    line-height: var(--xxl-line-height-mobile);
    letter-spacing: var(--xxl-letter-spacing-mobile);
    margin: var(--lg-spacing) 0 var(--base-spacing) 0;
  }

  span {
    color: var(--primary);
  }

  @media screen and (min-width: 601px) {
    #heading {
      margin: var(--xl-spacing) 0 var(--md-spacing) 0;
    }
  }

  @media screen and (min-width: 901px) {
    #heading {
      font-size: var(--xxl-font);
      line-height: var(--xxl-line-height);
      letter-spacing: var(--xxl-letter-spacing);
      margin: var(--lg-spacing) 0 var(--md-spacing) 0;
    }
  }

  @media screen and (min-width: 1281px) {
    #heading {
      max-width: 50vw;
    }
  }

  @media screen and (min-width: 1921px) {
    #heading {
      margin-top: var(--xl-spacing);
      max-width: 30vw;
    }
  }
</style>`;

export default Flat9SiteHeadingTemplate;
