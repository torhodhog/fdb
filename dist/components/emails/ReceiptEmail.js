"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptEmailHtml = exports.ReceiptEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const date_fns_1 = require("date-fns");
const utils_1 = require("../../lib/utils");
const ReceiptEmail = ({ email, date, orderId, products, deliveryFee = 0, // Standardverdi på 0 hvis frakten er gratis
 }) => {
    const total = products.reduce((acc, curr) => acc + curr.price, 0) + deliveryFee;
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsx)(components_1.Preview, { children: "Din kvittering fra Fotballdraktbutikken" }), (0, jsx_runtime_1.jsx)(components_1.Body, { style: main, children: (0, jsx_runtime_1.jsxs)(components_1.Container, { style: container, children: [(0, jsx_runtime_1.jsxs)(components_1.Section, { children: [(0, jsx_runtime_1.jsx)(components_1.Column, { children: (0, jsx_runtime_1.jsx)(components_1.Img, { src: "/public/logo-5.png", width: 100, height: 100, alt: "Fdblogo" }) }), (0, jsx_runtime_1.jsx)(components_1.Column, { align: "right", style: tableCell, children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: heading, children: "Kvittering" }) })] }), (0, jsx_runtime_1.jsx)(components_1.Section, { style: informationTable, children: (0, jsx_runtime_1.jsxs)(components_1.Row, { style: informationTableRow, children: [(0, jsx_runtime_1.jsxs)(components_1.Column, { style: informationTableColumn, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: informationTableLabel, children: "EMAIL" }), (0, jsx_runtime_1.jsx)(components_1.Link, { style: {
                                                    ...informationTableValue,
                                                }, children: email })] }), (0, jsx_runtime_1.jsxs)(components_1.Column, { style: informationTableColumn, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: informationTableLabel, children: "Fakturadato" }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: informationTableValue, children: (0, date_fns_1.format)(date, "dd MMM yyyy") })] }), (0, jsx_runtime_1.jsxs)(components_1.Column, { style: informationTableColumn, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: informationTableLabel, children: "BestillingsId" }), (0, jsx_runtime_1.jsx)(components_1.Link, { style: {
                                                    ...informationTableValue,
                                                }, children: orderId })] })] }) }), (0, jsx_runtime_1.jsx)(components_1.Section, { style: productTitleTable, children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: productsTitle, children: "Bestillingssammendrag" }) }), products.map((product) => {
                            const { image } = product.images[0];
                            return ((0, jsx_runtime_1.jsxs)(components_1.Section, { children: [(0, jsx_runtime_1.jsx)(components_1.Column, { style: { width: "64px" }, children: typeof image !== "string" && image.url ? ((0, jsx_runtime_1.jsx)(components_1.Img, { src: image.url, width: "64", height: "64", alt: "Product Image", style: productIcon })) : null }), (0, jsx_runtime_1.jsxs)(components_1.Column, { style: { paddingLeft: "22px" }, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: productTitle, children: product.name }), product.description ? ((0, jsx_runtime_1.jsx)(components_1.Text, { style: productDescription, children: product.description.length > 50
                                                    ? product.description?.slice(0, 50) + "..."
                                                    : product.description })) : null, (0, jsx_runtime_1.jsx)(components_1.Link, { href: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${orderId}`, style: productLink })] }), (0, jsx_runtime_1.jsx)(components_1.Column, { style: productPriceWrapper, align: "right", children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: productPrice, children: (0, utils_1.formatPrice)(product.price) }) })] }, product.id));
                        }), (0, jsx_runtime_1.jsxs)(components_1.Section, { children: [(0, jsx_runtime_1.jsx)(components_1.Column, { style: { width: "64px" } }), (0, jsx_runtime_1.jsx)(components_1.Column, { style: {
                                        paddingLeft: "40px",
                                        paddingTop: 20,
                                    }, children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: productTitle, children: "Leveringskostnader" }) }), (0, jsx_runtime_1.jsx)(components_1.Column, { style: productPriceWrapper, align: "right", children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: productPrice, children: (0, utils_1.formatPrice)(deliveryFee) }) })] }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: productPriceLine }), (0, jsx_runtime_1.jsxs)(components_1.Section, { align: "right", children: [(0, jsx_runtime_1.jsx)(components_1.Column, { style: tableCell, align: "right", children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: productPriceTotal, children: "TOTAL" }) }), (0, jsx_runtime_1.jsx)(components_1.Column, { style: productPriceVerticalLine }), (0, jsx_runtime_1.jsx)(components_1.Column, { style: productPriceLargeWrapper, children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: productPriceLarge, children: (0, utils_1.formatPrice)(total) }) })] }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: productPriceLineBottom }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: footerLinksWrapper, children: [(0, jsx_runtime_1.jsx)(components_1.Link, { href: "#", children: "Account Settings" }), " \u2022", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { href: "#", children: "Terms of Sale" }), " \u2022", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { href: "#", children: "Privacy Policy " })] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: footerCopyright, children: ["Copyright \u00A9 2023 Fotballdraktbutikken AS ", (0, jsx_runtime_1.jsx)("br", {}), " ", (0, jsx_runtime_1.jsx)(components_1.Link, { href: "#", children: "All rettigheter reservert" })] })] }) })] }));
};
exports.ReceiptEmail = ReceiptEmail;
const ReceiptEmailHtml = (props) => (0, components_1.render)((0, jsx_runtime_1.jsx)(exports.ReceiptEmail, { ...props }), {
    pretty: true,
});
exports.ReceiptEmailHtml = ReceiptEmailHtml;
const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: "#ffffff",
};
const resetText = {
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
};
const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "660px",
};
const tableCell = { display: "table-cell" };
const heading = {
    fontSize: "28px",
    fontWeight: "300",
    color: "#888888",
};
const informationTable = {
    borderCollapse: "collapse",
    borderSpacing: "0px",
    color: "rgb(51,51,51)",
    backgroundColor: "rgb(250,250,250)",
    borderRadius: "3px",
    fontSize: "12px",
    marginTop: "12px",
};
const informationTableRow = {
    height: "46px",
};
const informationTableColumn = {
    paddingLeft: "20px",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: "0px 1px 1px 0px",
    height: "44px",
};
const informationTableLabel = {
    ...resetText,
    color: "rgb(102,102,102)",
    fontSize: "10px",
};
const informationTableValue = {
    fontSize: "12px",
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
};
const productTitleTable = {
    ...informationTable,
    margin: "30px 0 15px 0",
    height: "24px",
};
const productsTitle = {
    background: "#fafafa",
    paddingLeft: "10px",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0",
};
const productIcon = {
    margin: "0 0 0 20px",
    borderRadius: "14px",
    border: "1px solid rgba(128,128,128,0.2)",
};
const productTitle = {
    fontSize: "12px",
    fontWeight: "600",
    ...resetText,
};
const productDescription = {
    fontSize: "12px",
    color: "rgb(102,102,102)",
    ...resetText,
};
const productLink = {
    fontSize: "12px",
    color: "rgb(0,112,201)",
    textDecoration: "none",
};
const productPriceTotal = {
    margin: "0",
    color: "rgb(102,102,102)",
    fontSize: "10px",
    fontWeight: "600",
    padding: "0px 30px 0px 0px",
    textAlign: "right",
};
const productPrice = {
    fontSize: "12px",
    fontWeight: "600",
    margin: "0",
};
const productPriceLarge = {
    margin: "0px 20px 0px 0px",
    fontSize: "16px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    textAlign: "right",
};
const productPriceWrapper = {
    display: "table-cell",
    padding: "0px 20px 0px 0px",
    width: "100px",
    verticalAlign: "top",
};
const productPriceLine = { margin: "30px 0 0 0" };
const productPriceVerticalLine = {
    height: "48px",
    borderLeft: "1px solid",
    borderColor: "rgb(238,238,238)",
};
const productPriceLargeWrapper = {
    display: "table-cell",
    width: "90px",
};
const productPriceLineBottom = { margin: "0 0 75px 0" };
const footerLinksWrapper = {
    margin: "8px 0 0 0",
    textAlign: "center",
    fontSize: "12px",
    color: "rgb(102,102,102)",
};
const footerCopyright = {
    margin: "25px 0 0 0",
    textAlign: "center",
    fontSize: "12px",
    color: "rgb(102,102,102)",
};
