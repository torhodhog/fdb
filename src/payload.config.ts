import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";

import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { ProductFiles } from "./collections/ProductFile";
import { Products } from "./collections/Products/Products";
import { Users } from "./collections/Users";
import { RichTextAdapter } from "payload/types";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Fotballdraktbutikken",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}) as unknown as RichTextAdapter<any, any, any>,
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  plugins: [
    // cloudStorage({
    //   collections: {
    //     media: {
    //       adapter: s3Adapter({
    //         config: {
    //           endpoint: process.env.S3_ENDPOINT || 'https://s3.standard-endpoint.com',
    //           region: process.env.AWS_REGION,  // Legg til regionen her
    //           credentials: {
    //             accessKeyId: process.env.S3_ACCESS_KEY_ID || 'standardAccessKeyId',
    //             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'standardSecretAccessKey',
    //           },
    //         },
    //         bucket: process.env.S3_BUCKET || 'standardBucketName',
    //       }),
    //     },
    //   },
    // }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});

