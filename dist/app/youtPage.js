"use strict";
// // pages/yourPage.tsx
// import { getServerSideUser } from "@/lib/payload-utils";
// import Navbar from "@/components/Navbar";
// import { User as UserType } from "@/payload-types";
// type User = UserType & {
//   name?: string; // name is optional
// };
// export const getServerSideProps = async (context) => {
//   const { user } = await getServerSideUser(context.req.cookies);
//   return {
//     props: {
//       user: user as User, // pass the user data as a prop
//     },
//   };
// };
// const YourPage = ({ user }: { user: User }) => {
//   return <Navbar user={user} />;
// };
// export default YourPage;
