import PageMeta from "../../components/common/PageMeta";
 import AuthLayout from "./AuthPageLayout";
import VerficationPage from "../../components/auth/VerficationPage";


export default function Verfication() {
  return (
    <>
      <PageMeta
        title="React.js verfication Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js 2 step verfication page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
          <VerficationPage/>
      </AuthLayout>
        
      
    </>
  );
}
