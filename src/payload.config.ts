import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path"

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
})
;
import { buildConfig } from "payload/config";
import { RichTextAdapter } from "payload/types";

import { Newsletter } from "./collections/Newsletter";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { ProductFiles } from "./collections/ProductFile";
import { Products } from "./collections/Products/Products";
import { Users } from "./collections/Users";
import Favorites from "./collections/favorites";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders, Newsletter, Favorites],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Fotballdraktbutikken",
      favicon: "/logo.png",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 10000,
  },
  editor: slateEditor({}) as unknown as RichTextAdapter<any, any, any>,
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: s3Adapter({
            config: {
              endpoint: process.env.S3_ENDPOINT || 'https://s3.standard-endpoint.com',
              region: process.env.AWS_REGION,  
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
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});