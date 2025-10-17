"use client";

{/* I had to do the redirect this way asue of a run time hydration
    error I kept getting. :( */}
    
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/Kambaz/Account/Signin");
  }, [router]);
  
  return null;
}