"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryActionEmailHtml = exports.EmailTemplate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const EmailTemplate = ({ actionLabel, buttonText, href, }) => {
    const logoUrl = "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/logo-5.png";
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsx)(components_1.Preview, { children: "Din leverand\u00F8r for skjedne fotballdrakter" }), (0, jsx_runtime_1.jsx)(components_1.Body, { style: main, children: (0, jsx_runtime_1.jsxs)(components_1.Container, { style: container, children: [(0, jsx_runtime_1.jsx)(components_1.Img, { src: logoUrl, width: "150", height: "150", alt: "Fotballdraktbutikken", style: logo }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: paragraph, children: "Hallayen " }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: paragraph, children: ["Velkommen til fdb.343. H\u00E5per du blir forn\u00F8yd og send oss gjerne en melding om noe ikke lever opp til forventningene.", " ", actionLabel, ". ", " ", "/", " ", " Welcome to fdb.343. We hope you are satisfied, and please feel free to send us a message if something does not meet your expectations. ", actionLabel, "."] }), (0, jsx_runtime_1.jsx)(components_1.Section, { style: btnContainer, children: (0, jsx_runtime_1.jsx)(components_1.Button, { style: button, href: href, children: buttonText }) }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: paragraph, children: ["Med vennlig hilsen ", "", " / ", "", " Best regards,", (0, jsx_runtime_1.jsx)("br", {}), "Fotballdraktbutikken AS"] }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: hr }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: footer, children: ["Hvis du ikke forventet denne mailen, kan du se vekk i fra den.", "", " / ", "", " If you did not expect this email, you can ignore it."] })] }) })] }));
};
exports.EmailTemplate = EmailTemplate;
const PrimaryActionEmailHtml = (props) => (0, components_1.render)((0, jsx_runtime_1.jsx)(exports.EmailTemplate, { ...props }), { pretty: true });
exports.PrimaryActionEmailHtml = PrimaryActionEmailHtml;
const main = {
    backgroundColor: "#ffffff",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};
const logo = {
    margin: "0 auto",
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};
const btnContainer = {
    textAlign: "center",
};
const button = {
    padding: "12px 12px",
    backgroundColor: "#2563eb",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
};
const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};
const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
