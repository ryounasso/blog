import ReactDOM from "react-dom/server";
import * as playwright from "playwright-aws-lambda";

const styles = `
    html, body {
        height: 100%;
        display: grid;
    }

    h1 { margin: auto }
`;

const Content = (props) => (
  <html>
    <head>
      <style>{styles}</style>
    </head>
    <body>
      <h1>{props.title}</h1>
    </body>
  </html>
);

export default async (req, res) => {
  const viewport = { width: 1200, height: 630 };

  const browser = await playwright.launchChromium();
  const page = await browser.newPage({ viewport });

  const props = { title: "Hello OGP!" };
  const markup = ReactDOM.renderToStaticMarkup(<Content {...props} />);
  const html = `<!doctype html>${markup}`;

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const image = await page.screenshot({ type: "png" });
  await browser.close();

  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");

  res.setHeader("Content-Type", "image/png");

  res.end(image);
};
