"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var plugin_cloud_storage_1 = require("@payloadcms/plugin-cloud-storage");
var s3_1 = require("@payloadcms/plugin-cloud-storage/s3");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var config_1 = require("payload/config");
var Media_1 = require("./collections/Media");
var Orders_1 = require("./collections/Orders");
var ProductFile_1 = require("./collections/ProductFile");
var Products_1 = require("./collections/Products/Products");
var Users_1 = require("./collections/Users");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    collections: [Users_1.Users, Products_1.Products, Media_1.Media, ProductFile_1.ProductFiles, Orders_1.Orders],
    routes: {
        admin: "/sell",
    },
    admin: {
        user: "users",
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: "- Fotballdraktbutikken",
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg",
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: process.env.MONGODB_URL,
    }),
    plugins: [
        (0, plugin_cloud_storage_1.cloudStorage)({
            collections: {
                media: {
                    adapter: (0, s3_1.s3Adapter)({
                        config: {
                            endpoint: process.env.S3_ENDPOINT || 'https://s3.standard-endpoint.com',
                            credentials: {
                                accessKeyId: process.env.S3_ACCESS_KEY_ID || 'standardAccessKeyId',
                                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'standardSecretAccessKey',
                            },
                        },
                        bucket: process.env.S3_BUCKET || 'standardBucketName',
                    }),
                },
            },
        }),
    ],
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "payload-types.ts"),
    },
});
