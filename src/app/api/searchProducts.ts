// import { NextApiRequest, NextApiResponse } from "next";
// import { getPayloadClient } from "../../get-payload";

// const searchProducts = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).end(); // Return 405 if method is not POST
//   }

//   try {
//     console.log("Request body:", req.body);
//     const { limit, page, query } = req.body;
//     const { sortBy = "createdAt", sortOrder = "desc", searchTerm, liga_system, names, size, ...queryOpts } = query;

//     const payload = await getPayloadClient();

//     const parsedQueryOpts: Record<string, any> = {};
//     Object.entries(queryOpts).forEach(([key, value]) => {
//       parsedQueryOpts[key] = { equals: value };
//     });

//     if (searchTerm) {
//       parsedQueryOpts.name = { $regex: new RegExp(searchTerm, "i") };
//     }
//     if (liga_system) {
//       parsedQueryOpts.liga_system = { equals: liga_system };
//     }
//     if (names) {
//       parsedQueryOpts.name = { in: names };
//     }
//     if (size) {
//       parsedQueryOpts.size = { equals: size };
//     }

//     const sortDirection = sortOrder === "desc" ? "-" : "+";
//     const sortString = `${sortDirection}${sortBy}`;

//     const queryLimit = searchTerm || size ? 1000 : limit;

//     const { docs: items, hasNextPage, nextPage } = await payload.find({
//       collection: "products",
//       where: parsedQueryOpts,
//       sort: sortString,
//       depth: 1,
//       limit: queryLimit,
//       page,
//     });

//     res.status(200).json({
//       items,
//       nextPage: hasNextPage ? nextPage : null,
//       previousPage: page > 1 ? page - 1 : null,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Error fetching products" });
//   }
// };

// export default searchProducts;