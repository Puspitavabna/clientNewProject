 "use server";

 import { cookies } from "next/headers";
 import { permanentRedirect, redirect, RedirectType } from "next/navigation";

 export async function goToDashboard() {

   console.log("testooooooo");
  const token = cookies().get("token");

   if (!token) redirect("/sign-in");

  permanentRedirect("/dashboard", RedirectType.replace);
 }

// "use server";

// import { cookies } from "next/headers";
// import { permanentRedirect, redirect, RedirectType } from "next/navigation";

// export async function goToDashboard() {
//   try {
//     console.log("Checking token...");

//     const token = cookies().get("token")?.value;
//     console.log("Token retrieved:", token);

//     if (!token) {
//       console.log("No token found, redirecting to sign-in...");
//       return redirect("/sign-in");
//     }

//     console.log("Token found, redirecting to dashboard...");
//     return redirect("/dashboard");
//   } catch (error) {
//     console.error("Error in goToDashboard:", error);
//   }
// }
